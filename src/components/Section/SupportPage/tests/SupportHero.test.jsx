import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import SupportHero from "../SupportHero";

const baseContent = {
  badge: "Dedicated Support Feature",
  headingLine1: "Turn Your Books Into",
  headingLine2: "a 24/7 AI Sales Assistant",
  description: "Leveraging cutting-edge AI.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
  ratingLabel: "Rated by 2k+ users",
  robotImage: "/images/support/hero-robot.webp",
  robotAlt: "AuthorBot robot icon",
};

describe("SupportHero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, heading lines, and description", () => {
    render(<SupportHero content={baseContent} />);

    expect(screen.getByText("Dedicated Support Feature")).toBeInTheDocument();
    expect(screen.getByText("Turn Your Books Into")).toBeInTheDocument();
    expect(screen.getByText("a 24/7 AI Sales Assistant")).toBeInTheDocument();
    expect(screen.getByText("Leveraging cutting-edge AI.")).toBeInTheDocument();
  });

  it("links the call to action to the contact section", () => {
    render(<SupportHero content={baseContent} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
      "href",
      "/#contact"
    );
  });

  it("renders the rating label and the robot image", () => {
    render(<SupportHero content={baseContent} />);

    expect(screen.getByText("Rated by 2k+ users")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "AuthorBot robot icon" })
    ).toBeInTheDocument();
  });
});
