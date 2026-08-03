import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

/**
 * Class maps mirror the `components={{...}}` overrides the original
 * React project passed to `react-markdown` / `MDXRemote`, so rendered
 * markdown keeps identical styling.
 */
export type MarkdownVariant = "about" | "project" | "blog" | "chat";

const CLASS_MAP: Record<MarkdownVariant, Record<string, string>> = {
  about: {
    h1: "text-lg font-semibold mb-4 mt-8 text-foreground",
    h2: "text-lg font-semibold mb-4 mt-8 text-foreground",
    h3: "text-lg font-semibold mb-4 mt-8 text-foreground",
    p: "text-secondary-foreground leading-relaxed mb-4",
    ul: "space-y-3 mb-6 pl-2",
    ol: "space-y-3 mb-6 pl-2 list-decimal",
    li: "about-li flex items-start gap-2 text-secondary-foreground",
    strong: "font-semibold text-foreground",
    a: "font-semibold text-foreground hover:underline",
  },
  project: {
    h1: "text-sm font-medium uppercase tracking-wider mb-3 mt-6",
    h2: "text-sm font-medium uppercase tracking-wider mb-3 mt-6",
    h3: "text-sm font-medium uppercase tracking-wider mb-3 mt-6",
    p: "leading-relaxed mb-4 text-[15px]",
    ul: "space-y-2 mb-4",
    ol: "space-y-2 mb-4 list-decimal",
    li: "project-li flex items-start gap-2.5 text-[15px]",
    a: "text-primary hover:underline",
  },
  blog: {
    h1: "text-3xl md:text-4xl font-bold mb-6 mt-8 text-foreground",
    h2: "text-2xl md:text-3xl font-semibold mb-4 mt-8 text-foreground",
    h3: "text-xl md:text-2xl font-semibold mb-3 mt-6 text-foreground",
    p: "text-muted-foreground leading-relaxed mb-4 text-base md:text-lg",
    ul: "space-y-2 mb-6 ml-6",
    ol: "space-y-2 mb-6 ml-6 list-decimal",
    li: "blog-li flex items-start gap-2 text-muted-foreground text-base md:text-lg",
    code: "px-1.5 py-0.5 rounded text-sm font-mono text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800",
    blockquote: "border-l-4 border-border pl-4 italic text-muted-foreground my-6",
    a: "text-primary hover:underline",
  },
  chat: {
    a: "text-blue-500 hover:underline",
    p: "my-1",
    pre: "my-1 bg-zinc-800 p-2 rounded-lg",
  },
};

/** Bullet markers the original site rendered as a `<span>` before list text. */
const BULLET: Partial<Record<MarkdownVariant, string>> = {
  about: '<span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0"></span>',
  project: '<span class="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"></span>',
  blog: '<span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0"></span>',
};

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      try {
        return hljs.highlight(code, { language }).value;
      } catch {
        return code;
      }
    },
  }),
  { gfm: true, breaks: false }
);

function addClass(html: string, tag: string, className: string) {
  if (!className) return html;
  const open = new RegExp(`<${tag}(\\s[^>]*)?>`, "g");
  return html.replace(open, (_match, attrs = "") => {
    const existing = attrs || "";
    if (/\sclass="/.test(existing)) {
      // `code` already carries the highlight.js classes on fenced blocks;
      // the inline-code chip styling must not be merged into those.
      if (tag === "code") return `<${tag}${existing}>`;
      return `<${tag}${existing.replace(
        /\sclass="([^"]*)"/,
        (_m: string, c: string) => ` class="${c} ${className}"`
      )}>`;
    }
    return `<${tag}${existing} class="${className}">`;
  });
}

/**
 * Renders markdown to HTML with the same element classes the React
 * components applied. `variant` selects the class map.
 */
export function renderMarkdown(
  source: string | undefined,
  variant: MarkdownVariant = "blog"
): string {
  if (!source) return "";

  let html = marked.parse(source, { async: false }) as string;
  const classes = CLASS_MAP[variant];
  const bullet = BULLET[variant];

  // Anchors in the original markdown renderers always opened in a new tab.
  html = html.replace(/<a\s+href="(https?:[^"]*)"/g, (_m, href) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"`;
  });

  // Wrap `<li>` inner content in a `<span>` and prefix the custom bullet dot.
  if (bullet) {
    html = html.replace(/<li>([\s\S]*?)<\/li>/g, (_m, inner: string) => {
      return `<li>${bullet}<span class="leading-relaxed">${inner.trim()}</span></li>`;
    });
  }

  for (const [tag, className] of Object.entries(classes)) {
    html = addClass(html, tag, className);
  }

  return html;
}

/**
 * Escapes HTML so raw strings can be embedded safely.
 */
export function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
