import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import FeaturesCta from "./FeaturesCta";

const content = {
  badge: "Ready to grow?",
  heading: "Keep readers engaged",
  description: "Always on.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
};

describe("FeaturesCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("keeps the badge black by default", () => {
    render(<FeaturesCta content={content} />);

    expect(screen.getByText("Ready to grow?")).toHaveClass("text-black");
  });

  it("applies a custom badge color when provided", () => {
    render(<FeaturesCta content={content} badgeClassName="text-white" />);

    const badge = screen.getByText("Ready to grow?");
    expect(badge).toHaveClass("text-white");
    expect(badge).not.toHaveClass("text-black");
  });
});
