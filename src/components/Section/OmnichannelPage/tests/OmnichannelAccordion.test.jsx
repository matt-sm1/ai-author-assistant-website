import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OmnichannelAccordion from "../OmnichannelAccordion";

const content = {
  heading: "Manage Every Reader Conversation",
  description: "Customize how AuthorBot looks.",
  image: "/images/omnichannel/accordion-illustration.webp",
  imageAlt: "AuthorBot robot beside a chat widget",
  defaultOpenId: "one-ai",
  items: [
    { id: "one-inbox", title: "Bring Every Channel", description: "Inbox panel." },
    { id: "one-ai", title: "Keep One AI", description: "AI panel." },
    { id: "human", title: "Switch To Human", description: "Human panel." },
  ],
};

describe("OmnichannelAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading, description, and illustration", () => {
    render(<OmnichannelAccordion content={content} />);

    expect(screen.getByRole("heading", { name: "Manage Every Reader Conversation" })).toBeInTheDocument();
    expect(screen.getByText("Customize how AuthorBot looks.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "AuthorBot robot beside a chat widget" })).toBeInTheDocument();
  });

  it("numbers the items and opens only the default item", () => {
    render(<OmnichannelAccordion content={content} />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep One AI" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Bring Every Channel" })).toHaveAttribute("aria-expanded", "false");
  });

  it("switches the open item when another header is clicked", async () => {
    render(<OmnichannelAccordion content={content} />);

    await userEvent.click(screen.getByRole("button", { name: "Switch To Human" }));

    expect(screen.getByRole("button", { name: "Switch To Human" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Keep One AI" })).toHaveAttribute("aria-expanded", "false");
  });
});
