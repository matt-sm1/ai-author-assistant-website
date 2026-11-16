import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TbBook, TbCode } from "react-icons/tb";
import AiChatBotCards from "../AiChatBotCards";

const content = {
  heading: "Everything You Need",
  description: "Lorem ipsum dolor sit amet.",
  cards: [
    {
      id: "easy-website-setup",
      title: "Easy Website Setup",
      description: "Customize your chatbot.",
      Icon: TbBook,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "reader-assistance",
      title: "24/7 Reader Assistance",
      description: "Add AuthorBot with a code.",
      Icon: TbCode,
      background: "#eef3ff",
      row: 2,
    },
  ],
};

describe("AiChatBotCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading and description", () => {
    render(<AiChatBotCards content={content} />);

    expect(screen.getByRole("heading", { name: "Everything You Need" })).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<AiChatBotCards content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Easy Website Setup" })).toBeInTheDocument();
    expect(screen.getByText("Add AuthorBot with a code.")).toBeInTheDocument();
  });

  it("applies each card's background color", () => {
    render(<AiChatBotCards content={content} />);

    expect(screen.getByRole("heading", { name: "Easy Website Setup" }).closest("article")).toHaveStyle({
      background: "#fff0f4",
    });
  });
});
