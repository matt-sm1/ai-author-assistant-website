import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faq from "./Faq";

const faqs = [
  {
    question: "What is AuthorBot?",
    answer: "An AI sales assistant for authors.",
  },
  {
    question: "Can I customize it?",
    answer: "Yes, tone and appearance.",
  },
];

describe("FAQ accordion", () => {
  it("toggles aria-expanded when a question is activated", async () => {
    const user = userEvent.setup();
    render(
      <Faq
        badge="FAQ"
        heading="Questions"
        description="Help for authors."
        faqs={faqs}
      />
    );

    const first = screen.getByRole("button", { name: /What is AuthorBot/i });
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("faq-panel-0")).toBeInTheDocument();
  });
});
