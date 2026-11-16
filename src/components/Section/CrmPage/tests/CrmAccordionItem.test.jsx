import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import CrmAccordionItem from "../CrmAccordionItem";

describe("CrmAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the number, title, and aria-expanded state", () => {
    render(
      <CrmAccordionItem
        id="reader-profile"
        number="01"
        title="Build A Complete Reader Profile"
        description="Profile details."
        open={false}
        onToggle={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: /Build A Complete Reader Profile/ });
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the panel as expanded when open", () => {
    render(
      <CrmAccordionItem
        id="auto-open"
        number="02"
        title="Understand Their Journey Over Time"
        description="Journey details."
        open
        onToggle={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Understand Their Journey/ })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("region")).toHaveClass("grid-rows-[1fr]");
  });

  it("calls onToggle when the header button is clicked", () => {
    const onToggle = vi.fn();
    render(
      <CrmAccordionItem
        id="reader-profile"
        number="01"
        title="Build A Complete Reader Profile"
        description="Profile details."
        open={false}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Build A Complete Reader Profile/ }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
