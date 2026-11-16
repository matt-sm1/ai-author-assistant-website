import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AnalyticsCta from "../AnalyticsCta";

const content = {
  badge: "READY TO GROW YOUR READERSHIP?",
  heading: "Keep Readers Engaged",
  description: "AuthorBot answers questions.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
};

describe("AnalyticsCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading, and description", () => {
    render(<AnalyticsCta content={content} />);

    expect(screen.getByText("READY TO GROW YOUR READERSHIP?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep Readers Engaged" })).toBeInTheDocument();
    expect(screen.getByText("AuthorBot answers questions.")).toBeInTheDocument();
  });

  it("links the button to the contact section", () => {
    render(<AnalyticsCta content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
      "href",
      "/#contact"
    );
  });
});
