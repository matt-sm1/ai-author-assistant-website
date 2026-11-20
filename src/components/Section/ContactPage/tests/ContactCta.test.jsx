import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ContactCta from "../ContactCta";

const content = {
  badge: "Ready to grow your readership?",
  heading: "Keep Readers Engaged",
  description: "Answer questions around the clock.",
  buttonLabel: "Get In Touch",
  buttonHref: "#contact-form",
};

describe("ContactCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading, and description", () => {
    render(<ContactCta content={content} />);

    expect(screen.getByText("Ready to grow your readership?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep Readers Engaged" })).toBeInTheDocument();
    expect(screen.getByText("Answer questions around the clock.")).toBeInTheDocument();
  });

  it("links the button to the configured href", () => {
    render(<ContactCta content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute("href", "#contact-form");
  });
});
