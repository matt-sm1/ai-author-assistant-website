import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OmnichannelAccordionItem from "../OmnichannelAccordionItem";

describe("OmnichannelAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the number, title, and a collapsed panel when closed", () => {
    render(
      <OmnichannelAccordionItem id="one" number="01" title="Bring Every Channel" description="Inbox panel." open={false} onToggle={() => {}} />
    );

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bring Every Channel" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Inbox panel.")).toBeInTheDocument();
  });

  it("marks the button as expanded when open", () => {
    render(
      <OmnichannelAccordionItem id="one" number="01" title="Bring Every Channel" description="Inbox panel." open onToggle={() => {}} />
    );

    expect(screen.getByRole("button", { name: "Bring Every Channel" })).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when the header is clicked", async () => {
    const onToggle = vi.fn();
    render(
      <OmnichannelAccordionItem id="one" number="01" title="Bring Every Channel" description="Inbox panel." open={false} onToggle={onToggle} />
    );

    await userEvent.click(screen.getByRole("button", { name: "Bring Every Channel" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
