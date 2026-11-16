import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import OmnichannelCta from "../OmnichannelCta";

const content = {
  badge: "READY TO GROW YOUR READERSHIP?",
  heading: "Keep Readers Engaged",
  description: "Answers readers around the clock.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
};

describe("OmnichannelCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading, and description", () => {
    render(<OmnichannelCta content={content} />);

    expect(screen.getByText("READY TO GROW YOUR READERSHIP?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep Readers Engaged" })).toBeInTheDocument();
    expect(screen.getByText("Answers readers around the clock.")).toBeInTheDocument();
  });

  it("links the button to the configured href", () => {
    render(<OmnichannelCta content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute("href", "/#contact");
  });
});
