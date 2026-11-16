import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import WidgetFeatureCards from "../WidgetFeatureCards";

const content = {
  heading: "Everything You Need",
  description: "All the tools in one place.",
  cards: [
    {
      id: "a",
      title: "Card Alpha",
      description: "Alpha copy.",
      icon: "/images/widget/icon-customize.webp",
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "b",
      title: "Card Beta",
      description: "Beta copy.",
      icon: "/images/widget/icon-books.webp",
      background: "#eef3ff",
      row: 1,
    },
  ],
};

describe("WidgetFeatureCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the section heading and every card title and description", () => {
    render(<WidgetFeatureCards content={content} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Everything You Need" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Card Alpha" })
    ).toBeInTheDocument();
    expect(screen.getByText("Beta copy.")).toBeInTheDocument();
  });

  it("marks card icons as decorative", () => {
    const { container } = render(<WidgetFeatureCards content={content} />);

    const icons = container.querySelectorAll("article img");
    expect(icons).toHaveLength(2);
    icons.forEach((icon) => expect(icon).toHaveAttribute("alt", ""));
  });
});
