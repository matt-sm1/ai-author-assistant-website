import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import SupportShowcase from "../SupportShowcase";

const content = {
  cards: [
    {
      id: "technical",
      title: "Technical Support",
      description: "Understand campaign impact.",
      image: "/images/support/showcase-technical.webp",
      imageAlt: "Technical support chat",
    },
    {
      id: "setup",
      title: "Setup Assistance",
      description: "Setup help text.",
      image: "/images/support/showcase-setup.webp",
      imageAlt: "Setup chat",
    },
  ],
};

describe("SupportShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card per configured item with its title and description", () => {
    render(<SupportShowcase content={content} />);

    expect(screen.getByRole("heading", { name: "Technical Support" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Setup Assistance" })).toBeInTheDocument();
    expect(screen.getByText("Setup help text.")).toBeInTheDocument();
  });

  it("renders each card's mockup image with its alt text", () => {
    render(<SupportShowcase content={content} />);

    expect(screen.getByRole("img", { name: "Technical support chat" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Setup chat" })).toBeInTheDocument();
  });
});
