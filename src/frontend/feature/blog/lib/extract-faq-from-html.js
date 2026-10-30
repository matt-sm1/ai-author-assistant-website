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

function findFaqSectionBounds(html) {
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
    });
  }

  for (let i = 0; i < headings.length; i++) {
    const section = headings[i];
    if (!FAQ_HEADING_RE.test(section.text)) continue;

    let sectionEnd = html.length;
    for (let j = i + 1; j < headings.length; j++) {
      if (headings[j].level <= section.level) {
        sectionEnd = headings[j].start;
        break;
      }
    }

    return {
      headings,
      sectionIndex: i,
      sectionStart: section.end,
      sectionEnd,
      sectionLevel: section.level,
    };
  }

  return null;
}

/**
 * Pattern B + D: question headings inside FAQ section.
 * B: nested levels; D: any h2–h4 ending with ?
 */
function extractHeadingQuestions(html, bounds, items) {
  const { headings, sectionIndex, sectionEnd, sectionLevel } = bounds;
  const questionMinLevel = sectionLevel + 1;

  for (let j = sectionIndex + 1; j < headings.length && items.length < MAX_ITEMS; j++) {
    const qHeading = headings[j];
    if (qHeading.start >= sectionEnd) break;

    const endsWithQuestion = /\?\s*$/.test(qHeading.text);
    const nestedLevelOk =
      qHeading.level >= questionMinLevel &&
      qHeading.level <= Math.min(4, sectionLevel + 2);
    const patternD =
      endsWithQuestion && qHeading.level >= 2 && qHeading.level <= 4;

    if (!nestedLevelOk && !patternD) continue;
    // Skip the FAQ title itself if somehow nested
    if (FAQ_HEADING_RE.test(qHeading.text)) continue;

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
}

/**
 * Pattern C: TinyMCE <p><strong>Q?</strong></p> + following paragraphs.
 */
function extractBoldQuestions(sectionHtml, items) {
  // Split on block boundaries roughly by matching p / heading tags in order.
  const blockRe =
    /<(p|h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;
  while ((match = blockRe.exec(sectionHtml)) !== null) {
    blocks.push({
      tag: match[1].toLowerCase(),
      inner: match[2],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  const isBoldQuestion = (inner) => {
    const bold = /<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/i.exec(inner);
    if (!bold) return null;
    // Prefer when the paragraph is mostly the bold question
    const q = stripHtmlToText(bold[2]);
    if (!q || !/\?\s*$/.test(q)) return null;
    const rest = stripHtmlToText(inner.replace(bold[0], ""));
    if (rest.length > 0) return null;
    return q;
  };

  for (let i = 0; i < blocks.length && items.length < MAX_ITEMS; i++) {
    const block = blocks[i];
    if (block.tag !== "p") continue;
    const question = isBoldQuestion(block.inner);
    if (!question) continue;

    let answerEnd = sectionHtml.length;
    for (let j = i + 1; j < blocks.length; j++) {
      const next = blocks[j];
      if (/^h[1-6]$/.test(next.tag)) {
        answerEnd = next.start;
        break;
      }
      if (next.tag === "p" && isBoldQuestion(next.inner)) {
        answerEnd = next.start;
        break;
      }
    }

    const answerHtml = sectionHtml.slice(block.end, answerEnd);
    pushItem(items, question, answerHtml);
  }
}

function extractFromFaqSection(html, items) {
  const bounds = findFaqSectionBounds(html);
  if (!bounds) return;

  const before = items.length;
  extractHeadingQuestions(html, bounds, items);

  if (items.length < MAX_ITEMS) {
    const sectionHtml = html.slice(bounds.sectionStart, bounds.sectionEnd);
    extractBoldQuestions(sectionHtml, items);
  }

  // If section found but nothing extracted, before === items.length — OK.
  void before;
}

/**
 * Extract FAQ items from post HTML.
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
