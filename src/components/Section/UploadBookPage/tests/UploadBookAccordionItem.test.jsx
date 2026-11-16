import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import UploadBookAccordionItem from "../UploadBookAccordionItem";

describe("UploadBookAccordionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the number, title, and collapsed state", () => {
    render(
      <UploadBookAccordionItem
        id="add-books"
        number="01"
        title="Add Your Books Your Way"
        description="Panel details."
        open={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Your Books Your Way/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("marks the panel as expanded when open", () => {
    render(
      <UploadBookAccordionItem
        id="book-availability"
        number="02"
        title="Discover Where Your Books Are Available"
        description="Panel details."
        open
        onToggle={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Discover Where/ })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("region")).toHaveClass("grid-rows-[1fr]");
  });

  it("calls onToggle when the header button is clicked", () => {
    const onToggle = vi.fn();
    render(
      <UploadBookAccordionItem
        id="add-books"
        number="01"
        title="Add Your Books Your Way"
        description="Panel details."
        open={false}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Your Books Your Way/ }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
