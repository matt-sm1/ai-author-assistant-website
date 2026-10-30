import { describe, expect, it } from "vitest";
import { extractFaqFromHtml } from "./extract-faq-from-html";

describe("extractFaqFromHtml", () => {
  it("returns empty for nullish or empty", () => {
    expect(extractFaqFromHtml(null)).toEqual([]);
    expect(extractFaqFromHtml("")).toEqual([]);
    expect(extractFaqFromHtml("   ")).toEqual([]);
  });

  it("extracts details/summary pairs", () => {
    const html = `
      <details><summary>What is AuthorBot?</summary><p>An AI assistant.</p></details>
      <details><summary>Is it free?</summary><p>There is a free tier.</p></details>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      { question: "What is AuthorBot?", answer: "An AI assistant." },
      { question: "Is it free?", answer: "There is a free tier." },
    ]);
  });

  it("extracts FAQ heading section with h3 questions", () => {
    const html = `
      <h2>FAQ</h2>
      <h3>How do I start?</h3>
      <p>Create an account.</p>
      <h3>Can I cancel?</h3>
      <p>Yes, anytime.</p>
      <h2>Next section</h2>
      <p>Not FAQ.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      { question: "How do I start?", answer: "Create an account." },
      { question: "Can I cancel?", answer: "Yes, anytime." },
    ]);
  });

  it("merges details and FAQ section", () => {
    const html = `
      <details><summary>From details?</summary><p>Yes.</p></details>
      <h2>Frequently Asked Questions</h2>
      <h3>From section?</h3>
      <p>Also yes.</p>
    `;
    const items = extractFaqFromHtml(html);
    expect(items).toHaveLength(2);
    expect(items[0].question).toBe("From details?");
    expect(items[1].question).toBe("From section?");
  });

  it("ignores unstructured content", () => {
    expect(extractFaqFromHtml("<p><strong>Q?</strong> A.</p>")).toEqual([]);
  });

  it("ignores bold questions outside an FAQ section", () => {
    const html = `
      <h2>Introduction</h2>
      <p><strong>What is this?</strong></p>
      <p>Not an FAQ section answer.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([]);
  });

  it("extracts TinyMCE bold questions under an FAQ heading (Pattern C)", () => {
    const html = `
      <h2>FAQ</h2>
      <p><strong>What is AuthorBot?</strong></p>
      <p>An AI writing assistant for authors.</p>
      <p>It helps with drafts and SEO.</p>
      <p><b>Is there a free plan?</b></p>
      <p>Yes, there is a free tier.</p>
      <h2>Conclusion</h2>
      <p><strong>Ignored outside FAQ?</strong></p>
      <p>Should not appear.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      {
        question: "What is AuthorBot?",
        answer: "An AI writing assistant for authors. It helps with drafts and SEO.",
      },
      {
        question: "Is there a free plan?",
        answer: "Yes, there is a free tier.",
      },
    ]);
  });

  it("extracts h2–h4 question headings ending with ? inside FAQ (Pattern D)", () => {
    const html = `
      <h1>FAQ</h1>
      <h2>How do credits work?</h2>
      <p>Credits are used per generation.</p>
      <h2>Can I export?</h2>
      <p>Yes, to Markdown and DOCX.</p>
      <h1>Elsewhere</h1>
      <h2>Random heading?</h2>
      <p>Not under FAQ.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      {
        question: "How do credits work?",
        answer: "Credits are used per generation.",
      },
      {
        question: "Can I export?",
        answer: "Yes, to Markdown and DOCX.",
      },
    ]);
  });

  it("extracts Question:/Answer: pairs under a paragraph FAQs title (Pattern E)", () => {
    // Typical TinyMCE paste — "FAQs" is a <p>, not an <h2>
    const html = `
      <p>FAQs</p>
      <p>Question: what is the name of this site?</p>
      <p>Answer: Author ai assistant.</p>
      <p>Hi guys.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      {
        question: "what is the name of this site?",
        answer: "Author ai assistant.",
      },
    ]);
  });

  it("extracts Q:/A: pairs under an FAQ heading", () => {
    const html = `
      <h2>FAQs</h2>
      <p>Q: Is schema automatic?</p>
      <p>A: Yes, from the post fields.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      {
        question: "Is schema automatic?",
        answer: "Yes, from the post fields.",
      },
    ]);
  });

  it("extracts mixed Question/Answer and Q/Ans labels", () => {
    const html = `
      <p>FAQs</p>
      <p>Question: what is the name of this site?</p>
      <p>Answer: Author ai assistant.</p>
      <p>Q: can i test this for free?</p>
      <p>Ans: yes you can test any package for free on free trial.</p>
      <p>Hi guys.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([
      {
        question: "what is the name of this site?",
        answer: "Author ai assistant.",
      },
      {
        question: "can i test this for free?",
        answer: "yes you can test any package for free on free trial.",
      },
    ]);
  });

  it("ignores Question:/Answer: outside an FAQ section", () => {
    const html = `
      <p>Question: orphan?</p>
      <p>Answer: should not count.</p>
    `;
    expect(extractFaqFromHtml(html)).toEqual([]);
  });

  it("fails soft on malformed markup", () => {
    expect(extractFaqFromHtml("<details><summary>Q</summary><p>A")).toEqual([]);
  });
});
