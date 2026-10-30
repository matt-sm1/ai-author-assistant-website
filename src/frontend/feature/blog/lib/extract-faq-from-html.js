import { stripHtmlToText, truncateSchemaAnswer } from "./strip-html-text";

const FAQ_HEADING_RE = /^(faqs?|frequently\s+asked\s+questions?)$/i;
const LABELED_QUESTION_RE = /^(?:questions?|q)\s*:\s*(.+)$/i;
// Answer / Answers / Ans / A (order matters: longer tokens before bare "a")
const LABELED_ANSWER_RE = /^(?:answers?|ans|a)\s*:\s*(.+)$/i;
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

function collectHeadings(html) {
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
  return headings;
}

function nextHeadingStart(headings, afterIndex, maxLevel) {
  for (const heading of headings) {
    if (heading.start <= afterIndex) continue;
    if (heading.level <= maxLevel) return heading.start;
  }
  return null;
}

/**
 * FAQ section from h1–h6 title, or a lone paragraph/bold line "FAQs"
 * (common TinyMCE paste — not always a heading).
 */
function findFaqSectionBounds(html) {
  const headings = collectHeadings(html);

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

  // Paragraph / strong-only FAQ title (e.g. <p>FAQs</p> or <p><strong>FAQs</strong></p>)
  const blockRe = /<(p|h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = blockRe.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    if (tag !== "p") continue;
    const text = stripHtmlToText(match[2]);
    if (!FAQ_HEADING_RE.test(text)) continue;

    const sectionStart = match.index + match[0].length;
    // End at next real heading, else end of document (labeled Q/A ignore trailing chatter)
    const endAt = nextHeadingStart(headings, match.index, 6);
    const sectionEnd = endAt ?? html.length;

    return {
      headings,
      sectionIndex: -1,
      sectionStart,
      sectionEnd,
      sectionLevel: 6,
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
  if (sectionIndex < 0) return;

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

function collectSectionBlocks(sectionHtml) {
  const blockRe = /<(p|h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;
  while ((match = blockRe.exec(sectionHtml)) !== null) {
    blocks.push({
      tag: match[1].toLowerCase(),
      inner: match[2],
      text: stripHtmlToText(match[2]),
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return blocks;
}

/**
 * Pattern C: TinyMCE <p><strong>Q?</strong></p> + following paragraphs.
 */
function extractBoldQuestions(sectionHtml, items) {
  const blocks = collectSectionBlocks(sectionHtml);

  const isBoldQuestion = (inner) => {
    const bold = /<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/i.exec(inner);
    if (!bold) return null;
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
      if (next.tag === "p" && LABELED_QUESTION_RE.test(next.text)) {
        answerEnd = next.start;
        break;
      }
    }

    const answerHtml = sectionHtml.slice(block.end, answerEnd);
    pushItem(items, question, answerHtml);
  }
}

/**
 * Pattern E: "Question: …" / "Answer: …" (or Q:/A:) paragraph pairs — TinyMCE plain paste.
 */
function extractLabeledQuestions(sectionHtml, items) {
  const blocks = collectSectionBlocks(sectionHtml).filter((b) => b.tag === "p");

  for (let i = 0; i < blocks.length && items.length < MAX_ITEMS; i++) {
    const text = blocks[i].text;

    // Same paragraph: Question: … Answer: …
    const sameLine =
      /^(?:questions?|q)\s*:\s*(.+?)\s+(?:answers?|ans|a)\s*:\s*(.+)$/i.exec(text);
    if (sameLine) {
      pushItem(items, sameLine[1], sameLine[2]);
      continue;
    }

    const qMatch = LABELED_QUESTION_RE.exec(text);
    if (!qMatch) continue;

    const next = blocks[i + 1];
    if (!next) continue;
    const aMatch = LABELED_ANSWER_RE.exec(next.text);
    if (!aMatch) continue;

    pushItem(items, qMatch[1], aMatch[1]);
    i += 1; // consume answer paragraph
  }
}

function extractFromFaqSection(html, items) {
  const bounds = findFaqSectionBounds(html);
  if (!bounds) return;

  extractHeadingQuestions(html, bounds, items);

  if (items.length < MAX_ITEMS) {
    const sectionHtml = html.slice(bounds.sectionStart, bounds.sectionEnd);
    extractBoldQuestions(sectionHtml, items);
  }

  if (items.length < MAX_ITEMS) {
    const sectionHtml = html.slice(bounds.sectionStart, bounds.sectionEnd);
    extractLabeledQuestions(sectionHtml, items);
  }
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
