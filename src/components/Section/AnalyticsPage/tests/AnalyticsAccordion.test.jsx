import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalyticsAccordion from "../AnalyticsAccordion";

const content = {
  heading: "See What Your AuthorBot Is Really Achieving",
  description: "Customize how AuthorBot looks.",
  image: "/images/analytics/accordion-illustration.webp",
  imageAlt: "AuthorBot robot beside a chat widget",
  defaultOpenId: "engagement",
  items: [
    { id: "performance", title: "Understand Performance", description: "Performance panel." },
    { id: "engagement", title: "See Engagement", description: "Engagement panel." },
    { id: "measure", title: "Measure Action", description: "Measure panel." },
  ],
};

describe("AnalyticsAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading, description, and illustration", () => {
    render(<AnalyticsAccordion content={content} />);

    expect(
      screen.getByRole("heading", { name: "See What Your AuthorBot Is Really Achieving" })
    ).toBeInTheDocument();
    expect(screen.getByText("Customize how AuthorBot looks.")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "AuthorBot robot beside a chat widget" })
    ).toBeInTheDocument();
  });

  it("numbers the items and opens only the default item", () => {
    render(<AnalyticsAccordion content={content} />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "See Engagement" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "Understand Performance" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("switches the open item when another header is clicked", async () => {
    render(<AnalyticsAccordion content={content} />);

    await userEvent.click(screen.getByRole("button", { name: "Understand Performance" }));

    expect(screen.getByRole("button", { name: "Understand Performance" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "See Engagement" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
