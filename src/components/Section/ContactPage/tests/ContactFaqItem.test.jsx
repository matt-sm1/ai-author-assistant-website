import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import ContactFaqItem from "../ContactFaqItem";

describe("ContactFaqItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("reflects the open state on the toggle button", () => {
    render(
      <ContactFaqItem id="q1" title="Question" description="Answer" open onToggle={() => {}} />
    );

    expect(screen.getByRole("button", { name: "Question" })).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when the question is clicked", () => {
    const onToggle = vi.fn();
    render(
      <ContactFaqItem id="q1" title="Question" description="Answer" open={false} onToggle={onToggle} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Question" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("links the toggle to its answer region", () => {
    render(
      <ContactFaqItem id="q1" title="Question" description="Answer" open onToggle={() => {}} />
    );

    const button = screen.getByRole("button", { name: "Question" });
    const region = screen.getByRole("region", { name: "Question" });

    expect(button).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveTextContent("Answer");
  });
});
