import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import OmnichannelHero from "../OmnichannelHero";

const content = {
  badge: "Omnichannel Inbox Feature",
  headingLine1: "Turn Your Books Into",
  headingLine2: "a 24/7 AI Sales Assistant",
  description: "Streamline complex processes.",
  buttonLabel: "Get In Touch",
  buttonHref: "/#contact",
  ratingLabel: "Rated by 2k+ users",
  robotImage: "/images/omnichannel/hero-robot.webp",
  robotAlt: "AuthorBot robot icon",
};

describe("OmnichannelHero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the badge, two-line heading, and description", () => {
    render(<OmnichannelHero content={content} />);

    expect(screen.getByText("Omnichannel Inbox Feature")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Turn Your Books Into")).toBeInTheDocument();
    expect(screen.getByText("a 24/7 AI Sales Assistant")).toBeInTheDocument();
    expect(screen.getByText("Streamline complex processes.")).toBeInTheDocument();
  });

  it("renders the call-to-action link and rating label", () => {
    render(<OmnichannelHero content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
      "href",
      "/#contact"
    );
    expect(screen.getByText("Rated by 2k+ users")).toBeInTheDocument();
  });

  it("renders the robot icon with its alt text", () => {
    render(<OmnichannelHero content={content} />);

    expect(screen.getByRole("img", { name: "AuthorBot robot icon" })).toBeInTheDocument();
  });
});
