import fs from "fs";
import path from "path";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Very small markdown -> HTML converter tailored for project demo files.
 * Handles frontmatter, headings, blockquotes, lists, code blocks, links, bold, italics, inline code.
 * This is intentionally small and dependency-free so it works without installing extra packages.
 */
export function markdownFileToHtml(relPath: string) {
  const abs = path.join(process.cwd(), relPath);
  let md = fs.readFileSync(abs, "utf8");

  // Remove YAML frontmatter if present
  md = md.replace(/^---[\s\S]*?---\s*/, "");

  // Code blocks
  md = md.replace(/```([\s\S]*?)```/g, (_m, code) => {
    return `<pre class="rounded-md bg-zinc-900 p-4 overflow-auto"><code>${escapeHtml(code)}</code></pre>`;
  });

  // Headings
  md = md.replace(/^###### (.*$)/gm, "<h6>$1</h6>");
  md = md.replace(/^##### (.*$)/gm, "<h5>$1</h5>");
  md = md.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
  md = md.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  md = md.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  md = md.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Blockquotes
  md = md.replace(/^> (.*$)/gm, "<blockquote class=\"pl-4 border-l-4 border-zinc-300 italic\">$1</blockquote>");

  // Unordered lists: group consecutive lines starting with - or *
  md = md.replace(/((?:^[-*] .+(?:\n|$))+)/gm, (m) => {
    const items = m
      .trim()
      .split(/\n+/)
      .map((line) => line.replace(/^[-*] /, ""))
      .filter(Boolean)
      .map((item) => `<li>${item}</li>`)
      .join("");
    return `<ul class=\"list-disc pl-6 mb-4\">${items}</ul>`;
  });

  // Links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bold and italic
  md = md.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  md = md.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Inline code
  md = md.replace(/`([^`]+)`/g, (m, code) => `<code class=\"rounded bg-zinc-200 px-1 py-0.5\">${escapeHtml(code)}</code>`);

  // Convert remaining double-newline separated blocks into paragraphs if they are not already block-level
  const blocks = md.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const processed = blocks
    .map((block) => {
      // if block starts with an HTML tag we generated, or contains any HTML tags, keep it as-is
      if (/^<h[1-6]|^<ul|^<pre|^<blockquote|^<p|^<img|^<div/.test(block) || /<[^>]+>/.test(block)) return block;
      // otherwise wrap as paragraph (preserve single newlines)
      return `<p>${escapeHtml(block).replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return processed;
}
