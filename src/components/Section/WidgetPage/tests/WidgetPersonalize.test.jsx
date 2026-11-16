import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WidgetAccordionItem from "../WidgetAccordionItem";
import WidgetPersonalize from "../WidgetPersonalize";

const content = {
  headingLine1: "Make Every Reader Interaction Feel",
  headingLine2: "Personal",
  description: "Customize the widget.",
  image: "/images/widget/personalize-illustration.webp",
  imageAlt: "AuthorBot beside a chat widget",
  defaultOpen: 1,
  items: [
    { id: "one", title: "First item", description: "First detail." },
    { id: "two", title: "Second item", description: "Second detail." },
  ],
};

describe("WidgetAccordionItem", () => {
  it("reflects the open state and calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <WidgetAccordionItem
        id="solo"
        title="Solo item"
        description="Solo detail."
        open={false}
        onToggle={onToggle}
      />
    );

    const button = screen.getByRole("button", { name: "Solo item" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe("WidgetPersonalize", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens the configured default item only", () => {
    render(<WidgetPersonalize content={content} />);

    expect(screen.getByRole("button", { name: "First item" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(screen.getByRole("button", { name: "Second item" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("switches the open item when another item is clicked", async () => {
    const user = userEvent.setup();
    render(<WidgetPersonalize content={content} />);

    await user.click(screen.getByRole("button", { name: "First item" }));

    expect(screen.getByRole("button", { name: "First item" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "Second item" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("renders the illustration with its alt text", () => {
    render(<WidgetPersonalize content={content} />);

    expect(
      screen.getByRole("img", { name: "AuthorBot beside a chat widget" })
    ).toBeInTheDocument();
  });
});
