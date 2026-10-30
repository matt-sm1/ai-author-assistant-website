import { stripHtmlToText, truncateSchemaAnswer } from "./strip-html-text";

const FAQ_HEADING_RE = /^(faqs?|frequently\s+asked\s+questions?)$/i;
const MAX_ITEMS = 20;

function headingLevel(tag) {
  const match = /^h([1-6])$/i.exec(tag ?? "");
  return match ? Number(match[1]) : null;
}

function pushItem(items, question, answer) {
  const q = stripHtmlToText(question);
  const a = truncateSchemaAnswer(stripHtmlToText(answer));
  if (!q || !a) return;
  if (items.length >= MAX_ITEMS) return;
  items.push({ question: q, answer: a });
}

function extractFromDetails(html, items) {
  const detailsRe = /<details\b[^>]*>([\s\S]*?)<\/details>/gi;
  let match;
  while ((match = detailsRe.exec(html)) !== null && items.length < MAX_ITEMS) {
    const inner = match[1] ?? "";
    const summaryMatch = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i.exec(inner);
    if (!summaryMatch) continue;
    const question = summaryMatch[1];
    const answerHtml = inner.replace(summaryMatch[0], " ");
    pushItem(items, question, answerHtml);
  }
}

/**
 * Pattern B: FAQ h2/h3 section with nested question headings.
 */
function extractFromFaqSection(html, items) {
  const headingRe = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let match;
  while ((match = headingRe.exec(html)) !== null) {
    headings.push({
      tag: match[1].toLowerCase(),
      level: headingLevel(match[1]),
      text: stripHtmlToText(match[2]),
      start: match.index,
      end: match.index + match[0].length,
      full: match[0],
    });
  }

  for (let i = 0; i < headings.length && items.length < MAX_ITEMS; i++) {
    const section = headings[i];
    if (!FAQ_HEADING_RE.test(section.text)) continue;

    const sectionLevel = section.level;
    let sectionEnd = html.length;
    for (let j = i + 1; j < headings.length; j++) {
      if (headings[j].level <= sectionLevel) {
        sectionEnd = headings[j].start;
        break;
      }
    }

    const questionMinLevel = sectionLevel + 1;
    const questionMaxLevel = Math.min(4, sectionLevel + 2);

    for (let j = i + 1; j < headings.length && items.length < MAX_ITEMS; j++) {
      const qHeading = headings[j];
      if (qHeading.start >= sectionEnd) break;
      if (qHeading.level < questionMinLevel || qHeading.level > questionMaxLevel) {
        continue;
      }

      let answerEnd = sectionEnd;
      for (let k = j + 1; k < headings.length; k++) {
        const next = headings[k];
        if (next.start >= sectionEnd) break;
        if (next.level <= qHeading.level) {
          answerEnd = next.start;
          break;
        }
      }

      const answerHtml = html.slice(qHeading.end, answerEnd);
      pushItem(items, qHeading.text, answerHtml);
    }

    // Only first FAQ section (deterministic).
    break;
  }
}

/**
 * Extract FAQ items from post HTML (details/summary + FAQ heading section).
 * @param {string|null|undefined} html
 * @returns {{ question: string, answer: string }[]}
 */
export function extractFaqFromHtml(html) {
  try {
    if (html == null || typeof html !== "string" || !html.trim()) {
      return [];
    }

    const items = [];
    extractFromDetails(html, items);
    if (items.length < MAX_ITEMS) {
      extractFromFaqSection(html, items);
    }
    return items.slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}
