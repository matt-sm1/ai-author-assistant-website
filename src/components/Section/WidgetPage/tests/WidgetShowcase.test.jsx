import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import WidgetShowcase from "../WidgetShowcase";

const content = {
  cards: [
    {
      id: "performance",
      title: "Performance Summary",
      description: "Campaign impact.",
      image: "/images/widget/card-performance.webp",
      imageAlt: "Chat recommending a book",
    },
    {
      id: "insights",
      title: "Actionable Insights",
      description: "Improvement ideas.",
      image: "/images/widget/card-insights.webp",
      imageAlt: "Widget settings panel",
    },
  ],
};

describe("WidgetShowcase", () => {
  it("renders each card with its title, description and image alt text", () => {
    render(<WidgetShowcase content={content} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Performance Summary" })
    ).toBeInTheDocument();
    expect(screen.getByText("Improvement ideas.")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Chat recommending a book" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Widget settings panel" })
    ).toBeInTheDocument();
  });
});
