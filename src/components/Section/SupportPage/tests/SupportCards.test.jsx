import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { FiTool } from "react-icons/fi";
import SupportCards from "../SupportCards";

const content = {
  heading: "Support For Every Step",
  description: "Lorem ipsum dolor sit amet.",
  cards: [
    { id: "a", title: "Technical Help", description: "Fast answers.", Icon: FiTool, background: "#fff0f4", row: 1 },
    { id: "b", title: "Setup Guidance", description: "Launch help.", Icon: FiTool, background: "#eef3ff", row: 1 },
    { id: "c", title: "Integration Support", description: "Connect channels.", Icon: FiTool, background: "#f0ecff", row: 2 },
  ],
};

describe("SupportCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading and description", () => {
    render(<SupportCards content={content} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Support For Every Step" })
    ).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
  });

  it("renders every card title and description", () => {
    render(<SupportCards content={content} />);

    expect(screen.getByRole("heading", { level: 3, name: "Technical Help" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Setup Guidance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Integration Support" })).toBeInTheDocument();
    expect(screen.getByText("Connect channels.")).toBeInTheDocument();
  });

  it("groups cards into rows by their row value", () => {
    const { container } = render(<SupportCards content={content} />);

    const rows = container.querySelectorAll("section > .container > div > div");
    expect(rows).toHaveLength(2);
    expect(rows[0].querySelectorAll("article")).toHaveLength(2);
    expect(rows[1].querySelectorAll("article")).toHaveLength(1);
  });

  it("lays out the default mockup cards as two in row one and three in row two", () => {
    const { container } = render(<SupportCards />);

    const rows = container.querySelectorAll("section > .container > div > div");
    expect(rows).toHaveLength(2);
    expect(rows[0].querySelectorAll("article")).toHaveLength(2);
    expect(rows[1].querySelectorAll("article")).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 3, name: "Product Guidance" })).toBeInTheDocument();
  });
});
