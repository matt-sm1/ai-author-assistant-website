import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import WidgetHero from "../WidgetHero";

const content = {
  badge: "✨ Widget Feature",
  headingLine1: "Turn Your Books Into",
  headingLine2: "a 24/7 AI Sales Assistant",
  description: "Engage readers around the clock.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
  ratingLabel: "Rated by 2k+ users",
};

describe("WidgetHero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, both heading lines and rating label", () => {
    render(<WidgetHero content={content} />);

    expect(screen.getByText("✨ Widget Feature")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /Turn Your Books Into/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Rated by 2k+ users")).toBeInTheDocument();
  });

  it("links the call to action to the configured href", () => {
    render(<WidgetHero content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
      "href",
      "/#contact"
    );
  });

  it("does not render a robot image above the fold", () => {
    render(<WidgetHero content={content} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
