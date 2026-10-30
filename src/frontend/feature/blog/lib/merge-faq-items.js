import { stripHtmlToText, truncateSchemaAnswer } from "./strip-html-text";

const MAX_ITEMS = 20;

export function normalizeFaqQuestionKey(question) {
  return stripHtmlToText(question).toLowerCase().replace(/\s+/g, " ").trim();
}

function normalizeItem(item) {
  if (!item || typeof item !== "object") return null;
  const question = stripHtmlToText(item.question);
  const answer = truncateSchemaAnswer(stripHtmlToText(item.answer));
  if (!question || !answer) return null;
  return { question, answer };
}

/**
 * Merge CMS FAQ rows with HTML-extracted FAQs. CMS wins on duplicate questions.
 * @param {unknown} cmsItems
 * @param {unknown} htmlItems
 * @returns {{ question: string, answer: string }[]}
 */
export function mergeFaqItems(cmsItems, htmlItems) {
  const merged = [];
  const seen = new Set();

  const push = (raw) => {
    const item = normalizeItem(raw);
    if (!item || merged.length >= MAX_ITEMS) return;
    const key = normalizeFaqQuestionKey(item.question);
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  };

  for (const item of Array.isArray(cmsItems) ? cmsItems : []) {
    push(item);
  }
  for (const item of Array.isArray(htmlItems) ? htmlItems : []) {
    push(item);
  }

  return merged;
}
