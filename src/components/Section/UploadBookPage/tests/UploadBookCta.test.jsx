import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import UploadBookCta from "../UploadBookCta";

const content = {
  badge: "Ready to grow your readership?",
  heading: "Keep Readers Engaged",
  description: "AuthorBot answers questions.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
};

describe("UploadBookCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading, and description", () => {
    render(<UploadBookCta content={content} />);

    expect(screen.getByText("Ready to grow your readership?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep Readers Engaged" })).toBeInTheDocument();
    expect(screen.getByText("AuthorBot answers questions.")).toBeInTheDocument();
  });

  it("renders the call-to-action link", () => {
    render(<UploadBookCta content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute("href", "/#contact");
  });
});
