import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import ContactFaq from "../ContactFaq";

const content = {
  badge: "FAQ",
  heading: "Frequently Asked Questions",
  description: "Answers to common questions.",
  defaultOpenId: "second",
  items: [
    { id: "first", title: "First Question", description: "First answer." },
    { id: "second", title: "Second Question", description: "Second answer." },
  ],
};

describe("ContactFaq", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading, badge, and every question", () => {
    render(<ContactFaq content={content} />);

    expect(screen.getByRole("heading", { name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /First Question/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Second Question/ })).toBeInTheDocument();
  });

  it("opens the default item only", () => {
    render(<ContactFaq content={content} />);

    expect(screen.getByRole("button", { name: /Second Question/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /First Question/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("switches the open item when another question is clicked", () => {
    render(<ContactFaq content={content} />);

    fireEvent.click(screen.getByRole("button", { name: /First Question/ }));

    expect(screen.getByRole("button", { name: /First Question/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /Second Question/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the open item when it is clicked again", () => {
    render(<ContactFaq content={{ ...content, defaultOpenId: null }} />);

    fireEvent.click(screen.getByRole("button", { name: /First Question/ }));
    fireEvent.click(screen.getByRole("button", { name: /First Question/ }));

    expect(screen.getByRole("button", { name: /First Question/ })).toHaveAttribute("aria-expanded", "false");
  });
});
