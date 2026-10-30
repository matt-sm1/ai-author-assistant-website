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

  it("fails soft on malformed markup", () => {
    expect(extractFaqFromHtml("<details><summary>Q</summary><p>A")).toEqual([]);
  });
});
