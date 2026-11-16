import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TbPalette, TbBook, TbClock } from "react-icons/tb";
import AnalyticsCards from "../AnalyticsCards";

const content = {
  heading: "Support For Every Step Of Your AuthorBot Journey",
  description: "Lorem ipsum dolor sit amet.",
  cards: [
    {
      id: "performance-overview",
      title: "Performance Overview",
      description: "Customize your chatbot.",
      Icon: TbPalette,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "engagement-trends",
      title: "Engagement Trends",
      description: "Help readers discover books.",
      Icon: TbBook,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "upsell-analytics",
      title: "Upsell Analytics",
      description: "Answer questions anytime.",
      Icon: TbClock,
      background: "#f0ecff",
      row: 2,
    },
  ],
};

describe("AnalyticsCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the section heading and description", () => {
    render(<AnalyticsCards content={content} />);

    expect(
      screen.getByRole("heading", { name: "Support For Every Step Of Your AuthorBot Journey" })
    ).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
  });

  it("renders every card title and description", () => {
    render(<AnalyticsCards content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Performance Overview" })).toBeInTheDocument();
    expect(screen.getByText("Answer questions anytime.")).toBeInTheDocument();
  });

  it("groups cards into one row per row value", () => {
    const { container } = render(<AnalyticsCards content={content} />);

    const rows = container.querySelectorAll("section#analytics-cards .flex-wrap");
    expect(rows).toHaveLength(2);
    expect(rows[0].querySelectorAll("article")).toHaveLength(2);
    expect(rows[1].querySelectorAll("article")).toHaveLength(1);
  });
});
