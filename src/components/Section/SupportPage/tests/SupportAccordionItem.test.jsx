import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SupportAccordionItem from "../SupportAccordionItem";

const baseProps = {
  id: "setup",
  number: "02",
  title: "Get Guided Through Setup & Integrations",
  description: "Choose the widget's position on your website.",
};

describe("SupportAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the number and title, and marks the closed panel as collapsed", () => {
    render(<SupportAccordionItem {...baseProps} open={false} onToggle={() => {}} />);

    expect(screen.getByText("02")).toBeInTheDocument();
    const button = screen.getByRole("button", {
      name: "Get Guided Through Setup & Integrations",
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the open panel as expanded", () => {
    render(<SupportAccordionItem {...baseProps} open onToggle={() => {}} />);

    expect(
      screen.getByRole("button", { name: "Get Guided Through Setup & Integrations" })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when the header is clicked", async () => {
    const onToggle = vi.fn();
    render(<SupportAccordionItem {...baseProps} open={false} onToggle={onToggle} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Get Guided Through Setup & Integrations" })
    );

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
