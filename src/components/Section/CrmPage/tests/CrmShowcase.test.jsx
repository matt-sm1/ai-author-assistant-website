import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import CrmShowcase from "../CrmShowcase";

const content = {
  cards: [
    {
      id: "overview",
      title: "Reader Overview",
      description: "Understand campaign impact.",
      image: "/images/crm/showcase-overview.webp",
      imageAlt: "Reader overview chat",
    },
    {
      id: "activity",
      title: "Reader Activity Tracking",
      description: "Track reader activity.",
      image: "/images/crm/showcase-activity.webp",
      imageAlt: "Reader activity chat",
    },
  ],
};

describe("CrmShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<CrmShowcase content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Reader Overview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reader Activity Tracking" })).toBeInTheDocument();
    expect(screen.getByText("Track reader activity.")).toBeInTheDocument();
  });

  it("renders each card image with its alt text", () => {
    render(<CrmShowcase content={content} />);

    expect(screen.getByRole("img", { name: "Reader overview chat" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Reader activity chat" })).toBeInTheDocument();
  });
});
