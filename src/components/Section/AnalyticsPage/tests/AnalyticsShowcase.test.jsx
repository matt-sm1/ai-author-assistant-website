import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AnalyticsShowcase from "../AnalyticsShowcase";

const content = {
  cards: [
    {
      id: "performance",
      title: "Performance Summary",
      description: "Understand campaign impact.",
      image: "/images/analytics/showcase-performance.webp",
      imageAlt: "Performance summary chat",
    },
    {
      id: "engagement",
      title: "Engagement Trends",
      description: "Track engagement over time.",
      image: "/images/analytics/showcase-engagement.webp",
      imageAlt: "Engagement trends chat",
    },
  ],
};

describe("AnalyticsShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card with title, description, and image for each entry", () => {
    render(<AnalyticsShowcase content={content} />);

    expect(screen.getByRole("heading", { name: "Performance Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Engagement Trends" })).toBeInTheDocument();
    expect(screen.getByText("Track engagement over time.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Performance summary chat" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders nothing in the grid when cards is not an array", () => {
    render(<AnalyticsShowcase content={{ cards: null }} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
