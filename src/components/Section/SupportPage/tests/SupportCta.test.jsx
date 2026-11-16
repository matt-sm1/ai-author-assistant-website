import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import SupportCta from "../SupportCta";

const content = {
  badge: "READY TO GROW YOUR READERSHIP?",
  heading: "Keep Readers Engaged",
  description: "AuthorBot answers questions.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
};

describe("SupportCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading, and description", () => {
    render(<SupportCta content={content} />);

    expect(screen.getByText("READY TO GROW YOUR READERSHIP?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Keep Readers Engaged" })).toBeInTheDocument();
    expect(screen.getByText("AuthorBot answers questions.")).toBeInTheDocument();
  });

  it("renders the badge in black text", () => {
    render(<SupportCta content={content} />);

    expect(screen.getByText("READY TO GROW YOUR READERSHIP?")).toHaveClass("text-black");
  });

  it("links the button to the contact section", () => {
    render(<SupportCta content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute("href", "/#contact");
  });
});
