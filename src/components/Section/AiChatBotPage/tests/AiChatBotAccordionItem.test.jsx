import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import AiChatBotAccordionItem from "../AiChatBotAccordionItem";

describe("AiChatBotAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the number and title, and hides the description when closed", () => {
    render(
      <AiChatBotAccordionItem
        id="item"
        number="01"
        title="Make It Yours"
        description="Customize the chatbot."
        open={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Make It Yours/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the header as expanded when open", () => {
    render(
      <AiChatBotAccordionItem
        id="item"
        number="02"
        title="Make It Yours"
        description="Customize the chatbot."
        open
        onToggle={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Make It Yours/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Customize the chatbot.")).toBeInTheDocument();
  });

  it("calls onToggle when the header is clicked", () => {
    const onToggle = vi.fn();
    render(
      <AiChatBotAccordionItem
        id="item"
        number="01"
        title="Make It Yours"
        description="Customize the chatbot."
        open={false}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Make It Yours/ }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
