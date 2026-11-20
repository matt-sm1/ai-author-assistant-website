import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ContactHero from "../ContactHero";

const content = {
  badge: "Contact Us",
  headingLine1: "Have Any questions?",
  headingLine2: "Don't hesitate to contact us",
  description: "Reach out any time.",
  buttonLabel: "Get In Touch",
  buttonHref: "#contact-form",
  ratingLabel: "Rated by 2k+ users",
  robotImage: "/images/contact/hero-robot.webp",
  robotAlt: "AuthorBot robot icon",
};

describe("ContactHero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders each heading line and the badge", () => {
    render(<ContactHero content={content} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Have Any questions?")).toBeInTheDocument();
    expect(screen.getByText("Don't hesitate to contact us")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("links the call to action to the contact form anchor", () => {
    render(<ContactHero content={content} />);

    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
      "href",
      "#contact-form"
    );
  });

  it("renders the robot illustration and rating label", () => {
    render(<ContactHero content={content} />);

    expect(screen.getByRole("img", { name: "AuthorBot robot icon" }).getAttribute("src")).toContain(
      "hero-robot"
    );
    expect(screen.getByText("Rated by 2k+ users")).toBeInTheDocument();
  });
});
