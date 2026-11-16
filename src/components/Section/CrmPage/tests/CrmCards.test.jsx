import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TbBook, TbCode } from "react-icons/tb";
import CrmCards from "../CrmCards";

const content = {
  heading: "Support For Every Step",
  description: "Lorem ipsum dolor sit amet.",
  cards: [
    {
      id: "dashboard",
      title: "Reader Dashboard",
      description: "Customize your chatbot.",
      Icon: TbBook,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "follow-up",
      title: "Follow-Up Management",
      description: "Add AuthorBot with a code.",
      Icon: TbCode,
      background: "#eef3ff",
      row: 2,
    },
  ],
};

describe("CrmCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading and description", () => {
    render(<CrmCards content={content} />);

    expect(screen.getByRole("heading", { name: "Support For Every Step" })).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<CrmCards content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Reader Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Add AuthorBot with a code.")).toBeInTheDocument();
  });

  it("applies each card's background color", () => {
    render(<CrmCards content={content} />);

    expect(screen.getByRole("heading", { name: "Reader Dashboard" }).closest("article")).toHaveStyle({
      background: "#fff0f4",
    });
  });
});
