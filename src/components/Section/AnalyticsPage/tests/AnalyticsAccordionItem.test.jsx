import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalyticsAccordionItem from "../AnalyticsAccordionItem";

const baseProps = {
  id: "engagement",
  number: "02",
  title: "See How Engagement Changes Over Time",
  description: "Choose the widget's position.",
};

describe("AnalyticsAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the number, title, and a plus icon when collapsed", () => {
    const { container } = render(
      <AnalyticsAccordionItem {...baseProps} open={false} onToggle={() => {}} />
    );

    expect(screen.getByText("02")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "See How Engagement Changes Over Time" })
    ).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("marks the region as expanded when open", () => {
    render(<AnalyticsAccordionItem {...baseProps} open onToggle={() => {}} />);

    expect(
      screen.getByRole("button", { name: "See How Engagement Changes Over Time" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "analytics-button-engagement"
    );
  });

  it("calls onToggle when the header is clicked", async () => {
    const onToggle = vi.fn();
    render(<AnalyticsAccordionItem {...baseProps} open={false} onToggle={onToggle} />);

    await userEvent.click(
      screen.getByRole("button", { name: "See How Engagement Changes Over Time" })
    );

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
