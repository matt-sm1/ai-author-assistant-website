import { describe, expect, it } from "vitest";
import { mergeFaqItems } from "./merge-faq-items";

describe("mergeFaqItems", () => {
  it("prefers CMS answers on duplicate questions", () => {
    const merged = mergeFaqItems(
      [{ question: "What is it?", answer: "CMS answer" }],
      [{ question: "What is it?", answer: "HTML answer" }],
    );
    expect(merged).toEqual([
      { question: "What is it?", answer: "CMS answer" },
    ]);
  });

  it("appends unique HTML items after CMS", () => {
    const merged = mergeFaqItems(
      [{ question: "A?", answer: "1" }],
      [{ question: "B?", answer: "2" }],
    );
    expect(merged).toEqual([
      { question: "A?", answer: "1" },
      { question: "B?", answer: "2" },
    ]);
  });
});
