import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import CrmAccordion from "../CrmAccordion";

const content = {
  heading: "Manage Every Reader Conversation",
  description: "Customize how AuthorBot looks.",
  image: "/images/crm/accordion-illustration.webp",
  imageAlt: "AuthorBot beside a chat widget",
  defaultOpenId: "second",
  items: [
    { id: "first", title: "First Item", description: "First details." },
    { id: "second", title: "Second Item", description: "Second details." },
  ],
};

describe("CrmAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading, description, and illustration", () => {
    render(<CrmAccordion content={content} />);

    expect(screen.getByRole("heading", { name: "Manage Every Reader Conversation" })).toBeInTheDocument();
    expect(screen.getByText("Customize how AuthorBot looks.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "AuthorBot beside a chat widget" })).toBeInTheDocument();
  });

  it("opens the default item and numbers the items", () => {
    render(<CrmAccordion content={content} />);

    expect(screen.getByRole("button", { name: /Second Item/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /First Item/ })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("switches the open item when another header is clicked", () => {
    render(<CrmAccordion content={content} />);

    fireEvent.click(screen.getByRole("button", { name: /First Item/ }));

    expect(screen.getByRole("button", { name: /First Item/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /Second Item/ })).toHaveAttribute("aria-expanded", "false");
  });
});
