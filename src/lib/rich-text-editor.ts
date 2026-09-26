import { Marked } from "marked";

/**
 * Rich text editor for the admin panel.
 *
 * The editing surface is a `contenteditable` element, but the value that gets
 * saved is **Markdown**, so the content keeps flowing through the site's
 * existing pipeline (`renderMarkdown()` in `src/lib/markdown.ts`).
 *
 * Usage (see `src/components/admin/ProjectForm.astro`):
 *   markup: [data-rich-editor] wrapper containing
 *           [data-rich-toolbar], [data-rich-surface] and [data-rich-source]
 *   client: `initRichTextEditors(form)` on load and
 *           `syncRichTextEditors(form)` right before reading the form data.
 */

type EditorMode = "rich" | "source";

interface EditorHandle {
  /** Writes the current surface content back into the hidden textarea. */
  sync: () => void;
}

/** The single source of truth for markdown -> HTML inside the editor. */
const marked = new Marked({ gfm: true, breaks: false });

/** Handles are keyed by the wrapper so `syncRichTextEditors()` can find them. */
const handles = new WeakMap<HTMLElement, EditorHandle>();

type ExecCommand = (
  commandId: string,
  showUI?: boolean,
  value?: string
) => boolean;

/**
 * `document.execCommand` is deprecated but is still by far the most portable
 * way to drive a `contenteditable` toolbar without pulling in an editor
 * library. Routing it through one helper keeps that deprecation contained.
 */
function exec(command: string, value = ""): boolean {
  const api = (document as unknown as { execCommand?: ExecCommand }).execCommand;
  if (typeof api !== "function") return false;
  return api.call(document, command, false, value);
}

const HEADING_LEVELS: Record<string, number> = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6,
};

/** Tags that are rendered inline (inside a paragraph). */
const INLINE_TAGS = new Set([
  "A", "ABBR", "B", "BDI", "BDO", "BR", "CITE", "CODE", "DEL", "EM", "FONT",
  "I", "IMG", "INS", "KBD", "MARK", "Q", "S", "SAMP", "SMALL", "SPAN",
  "STRIKE", "STRONG", "SUB", "SUP", "TIME", "TT", "U", "VAR", "WBR",
]);

/** Tags that start a new block in Markdown. */
const BLOCK_TAGS = new Set([
  "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "CAPTION", "CENTER", "DD",
  "DIV", "DL", "DT", "FIGURE", "FIGCAPTION", "FOOTER", "FORM", "H1", "H2",
  "H3", "H4", "H5", "H6", "HEADER", "HR", "LI", "MAIN", "NAV", "OL", "P",
  "PRE", "SECTION", "TABLE", "TD", "TH", "TR", "UL",
]);

function isElement(node: Node): boolean {
  return node.nodeType === Node.ELEMENT_NODE;
}

function tagName(node: Node): string {
  return isElement(node) ? (node as Element).tagName.toUpperCase() : "";
}

function isInline(node: Node): boolean {
  return node.nodeType === Node.TEXT_NODE || INLINE_TAGS.has(tagName(node));
}

/** Escapes characters that would otherwise change the meaning of the markdown. */
function escapeText(text: string, atLineStart = false): string {
  let out = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/([\\`*_\[\]])/g, "\\$1");

  if (atLineStart) {
    /* A literal "- ", "# " or "1. " at the start of a line would become a list. */
    out = out.replace(/^(\s*)(#{1,6}\s|[-+*>]\s|\d+\.\s)/, "$1\\$2");
  }

  return out;
}

function maxBacktickRun(text: string): number {
  return text.split(/[^`]+/).reduce((max, run) => Math.max(max, run.length), 0);
}

function detectLanguage(element: Element | null): string {
  const className = element?.getAttribute("class") ?? "";
  const match = /(?:language|lang)-([\w+#-]+)/.exec(className);
  return match ? match[1] : "";
}

function safeHref(href: string): string {
  const value = (href ?? "").trim();
  if (!value || /^(javascript|data|vbscript):/i.test(value)) return "";
  return value;
}

/* ------------------------------------------------------------------------- */
/* HTML -> Markdown                                                          */
/* ------------------------------------------------------------------------- */

function inlineChildren(element: Node): string {
  return inlineToMarkdown(Array.from(element.childNodes));
}

function inlineToMarkdown(nodes: Node[]): string {
  let output = "";
  let atStart = true;

  for (const node of nodes) {
    const chunk = inlineNodeToMarkdown(node, atStart);
    if (chunk.trim() !== "") atStart = false;
    output += chunk;
  }

  return output;
}

function inlineNodeToMarkdown(node: Node, atStart: boolean): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeText(node.textContent ?? "", atStart);
  }
  if (!isElement(node)) return "";

  const element = node as HTMLElement;

  switch (element.tagName) {
    case "BR":
      return "  \n";
    case "STRONG":
    case "B":
      return wrap("**", inlineChildren(element));
    case "EM":
    case "I":
      return wrap("*", inlineChildren(element));
    case "DEL":
    case "S":
    case "STRIKE":
      return wrap("~~", inlineChildren(element));
    case "CODE":
      return inlineCodeToMarkdown(element.textContent ?? "");
    case "A":
      return linkToMarkdown(element);
    case "IMG":
      return imageToMarkdown(element);
    case "U":
      /* Markdown has no underline: keep the text, drop the formatting. */
      return inlineChildren(element);
    default:
      if (BLOCK_TAGS.has(element.tagName)) {
        return `\n${nodeToMarkdown(element)}\n`;
      }
      return inlineChildren(element);
  }
}

function wrap(marker: string, text: string): string {
  return text.trim() === "" ? "" : `${marker}${text}${marker}`;
}

function inlineCodeToMarkdown(text: string): string {
  if (text === "") return "";
  const ticks = "`".repeat(maxBacktickRun(text) + 1);
  const padded = text.startsWith("`") || text.endsWith("`") || text.startsWith(" ") || text.endsWith(" ");
  return padded ? `${ticks} ${text} ${ticks}` : `${ticks}${text}${ticks}`;
}

function linkToMarkdown(element: HTMLElement): string {
  const href = safeHref(element.getAttribute("href") ?? "");
  const text = inlineChildren(element).trim() || escapeText(href);
  return href === "" ? text : `[${text}](${href})`;
}

function imageToMarkdown(element: HTMLElement): string {
  const src = element.getAttribute("src") ?? "";
  /* Inline `data:` payloads would bloat the document — drop them. */
  if (!src || src.startsWith("data:")) return "";
  const alt = element.getAttribute("alt") ?? "";
  return `![${escapeText(alt)}](${src})`;
}

function preToMarkdown(element: HTMLElement): string {
  const code = element.querySelector("code");
  const text = (code ?? element).textContent ?? "";
  const fence = "`".repeat(Math.max(3, maxBacktickRun(text) + 1));
  const language = detectLanguage(code ?? element);
  return `${fence}${language}\n${text.replace(/\n+$/, "")}\n${fence}`;
}

function listToMarkdown(list: Element, ordered: boolean): string {
  const items = Array.from(list.children).filter(
    (child) => child.tagName === "LI"
  );

  return items
    .map((item, index) => {
      const contentNodes: Node[] = [];
      const nested: string[] = [];

      item.childNodes.forEach((child) => {
        const tag = tagName(child);
        if (tag === "UL" || tag === "OL") {
          nested.push(nodeToMarkdown(child));
        } else {
          contentNodes.push(child);
        }
      });

      const marker = ordered ? `${index + 1}. ` : "- ";
      const content = inlineToMarkdown(contentNodes).trim();
      const indented = nested
        .map((block) =>
          block
            .split("\n")
            .map((line) => (line ? `  ${line}` : line))
            .join("\n")
        )
        .join("\n");

      return indented ? `${marker}${content}\n${indented}` : `${marker}${content}`;
    })
    .join("\n");
}

function blockquoteToMarkdown(element: HTMLElement): string {
  return childrenToMarkdown(element)
    .split("\n")
    .map((line) => (line === "" ? ">" : `> ${line}`))
    .join("\n");
}

/** Small markdown table so pasted tables survive the round trip. */
function tableToMarkdown(element: HTMLElement): string {
  const rows = Array.from(element.querySelectorAll("tr"))
    .map((row) =>
      Array.from(row.querySelectorAll("th, td")).map((cell) =>
        inlineChildren(cell).trim().replace(/\|/g, "\\|")
      )
    )
    .filter((cells) => cells.length > 0);

  if (rows.length === 0) return "";

  const width = rows.reduce((max, cells) => Math.max(max, cells.length), 0);
  const pad = (cells: string[]) =>
    `| ${Array.from({ length: width }, (_, i) => cells[i] ?? "").join(" | ")} |`;

  const [header, ...body] = rows;
  const separator = `| ${Array.from({ length: width }, () => "---").join(" | ")} |`;

  return [pad(header), separator, ...body.map(pad)].join("\n");
}

/** Serializes the children of `parent`, buffering consecutive inline nodes. */
function childrenToMarkdown(parent: Node): string {
  const blocks: string[] = [];
  let inline: Node[] = [];

  const flush = () => {
    if (inline.length === 0) return;
    const text = inlineToMarkdown(inline).trim();
    if (text !== "") blocks.push(text);
    inline = [];
  };

  parent.childNodes.forEach((child) => {
    if (isInline(child)) {
      inline.push(child);
      return;
    }
    flush();
    const block = nodeToMarkdown(child).trim();
    if (block !== "") blocks.push(block);
  });

  flush();

  return blocks.join("\n\n");
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeText(node.textContent ?? "", true);
  }
  if (!isElement(node)) return "";

  const element = node as HTMLElement;
  const tag = element.tagName;

  const headingLevel = HEADING_LEVELS[tag];
  if (headingLevel) {
    return `${"#".repeat(headingLevel)} ${inlineChildren(element).trim()}`;
  }

  switch (tag) {
    case "UL":
      return listToMarkdown(element, false);
    case "OL":
      return listToMarkdown(element, true);
    case "LI":
      return inlineChildren(element).trim();
    case "BLOCKQUOTE":
      return blockquoteToMarkdown(element);
    case "PRE":
      return preToMarkdown(element);
    case "HR":
      return "---";
    case "BR":
      return "";
    case "TABLE":
      return tableToMarkdown(element);
    default:
      return isInline(element)
        ? inlineChildren(element).trim()
        : childrenToMarkdown(element);
  }
}

/** Converts an editable surface (or any element) into Markdown. */
export function toMarkdown(element: Element): string {
  return childrenToMarkdown(element).trim();
}

/* ------------------------------------------------------------------------- */
/* Editor                                                                    */
/* ------------------------------------------------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(markdown: string): string {
  return marked.parse(markdown ?? "", { async: false }) as string;
}

/**
 * Pasted HTML is normalized through markdown so only safe, known tags end up
 * in the editor (and therefore in the database).
 */
function normalizePastedHtml(html: string): string {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  return markdownToHtml(toMarkdown(parsed.body));
}

function initEditor(wrapper: HTMLElement): void {
  if (wrapper.dataset.ready === "true") return;

  const surface = wrapper.querySelector<HTMLElement>("[data-rich-surface]");
  const source = wrapper.querySelector<HTMLTextAreaElement>("[data-rich-source]");
  const toolbar = wrapper.querySelector<HTMLElement>("[data-rich-toolbar]");
  /*
   * The toggle lives next to the field label, outside the bordered wrapper,
   * so look through the wrapper's parent as well.
   */
  const toggle =
    wrapper.querySelector<HTMLButtonElement>("[data-rich-toggle]") ??
    wrapper.parentElement?.querySelector<HTMLButtonElement>(
      "[data-rich-toggle]"
    ) ??
    null;

  if (!surface || !source) return;
  wrapper.dataset.ready = "true";

  let mode: EditorMode = "rich";
  let dirty = false;

  const normalizeEmpty = () => {
    if ((surface.textContent ?? "").trim() === "") surface.innerHTML = "";
  };

  const render = (markdown: string) => {
    surface.innerHTML = markdownToHtml(markdown);
    normalizeEmpty();
  };

  const setMode = (next: EditorMode) => {
    if (next === mode) return;

    if (next === "source") {
      if (dirty) source.value = toMarkdown(surface);
      source.focus();
    } else {
      render(source.value);
      dirty = false;
      surface.focus();
    }

    mode = next;
    wrapper.dataset.mode = next;

    if (toggle) {
      toggle.textContent = next === "rich" ? "Markdown source" : "Rich text";
    }
  };

  const insertInlineCode = () => {
    const text = window.getSelection()?.toString() ?? "";
    if (text === "") return;
    exec("insertHTML", `<code>${escapeHtml(text)}</code>`);
  };

  const insertLink = () => {
    const text = window.getSelection()?.toString() ?? "";
    const input = (window.prompt("Link URL", "https://") ?? "").trim();
    if (input === "") return;

    const href =
      safeHref(input) || (/^[a-z][\w+.-]*:/i.test(input) ? "" : `https://${input}`);
    if (href === "") return;

    if (text !== "") {
      exec("createLink", href);
    } else {
      exec("insertHTML", `<a href="${escapeHtml(href)}">${escapeHtml(href)}</a>`);
    }
  };

  /* Keep the caret inside the surface while a toolbar button is pressed. */
  toolbar?.addEventListener("mousedown", (event) => {
    if ((event.target as HTMLElement).closest("button")) event.preventDefault();
  });

  toolbar?.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "button[data-rich-command], button[data-rich-action]"
    );
    if (!button || mode !== "rich") return;

    const command = button.dataset.richCommand;
    const action = button.dataset.richAction;
    const value = button.dataset.richValue ?? "";

    surface.focus();

    if (command) {
      exec(command, value);
    } else if (action === "block" && value !== "") {
      exec("formatBlock", `<${value}>`);
    } else if (action === "inlineCode") {
      insertInlineCode();
    } else if (action === "link") {
      insertLink();
    }

    dirty = true;
    normalizeEmpty();
  });

  surface.addEventListener("input", () => {
    if (mode === "rich") dirty = true;
  });

  surface.addEventListener("blur", normalizeEmpty);

  surface.addEventListener("paste", (event) => {
    const clipboard = event.clipboardData;
    if (!clipboard) return;

    const html = clipboard.getData("text/html");
    const text = clipboard.getData("text/plain");

    event.preventDefault();

    if (html !== "") {
      try {
        exec("insertHTML", normalizePastedHtml(html));
        dirty = true;
        return;
      } catch {
        /* Fall back to plain text below. */
      }
    }

    if (text !== "") {
      exec("insertText", text);
      dirty = true;
    }
  });

  toggle?.addEventListener("click", () => {
    setMode(mode === "rich" ? "source" : "rich");
  });

  /* Prefer plain tags over inline styles so the markdown stays clean. */
  exec("styleWithCSS", "false");
  exec("defaultParagraphSeparator", "p");

  render(source.value);
  wrapper.dataset.mode = mode;

  handles.set(wrapper, {
    sync: () => {
      if (mode === "rich" && dirty) source.value = toMarkdown(surface);
    },
  });
}

/** Wires up every `[data-rich-editor]` found inside `root`. */
export function initRichTextEditors(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-rich-editor]").forEach(initEditor);
}

/** Call this right before reading the form data so the textarea is current. */
export function syncRichTextEditors(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-rich-editor]").forEach((wrapper) => {
    handles.get(wrapper)?.sync();
  });
}

