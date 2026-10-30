/**
 * Strip tags / scripts and normalize whitespace for schema plain text.
 */
export function stripHtmlToText(html) {
  if (html == null) return "";
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateSchemaAnswer(text, max = 5000) {
  const value = String(text ?? "");
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}
