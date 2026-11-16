import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AiChatBotShowcase from "../AiChatBotShowcase";

const content = {
  cards: [
    {
      id: "easy-website-setup",
      title: "Easy Website Setup",
      description: "Understand campaign impact.",
      image: "/images/ai-chat-bot/showcase-easy-setup.webp",
      imageAlt: "Easy setup chat",
    },
    {
      id: "smarter-conversations",
      title: "Smarter Conversations",
      description: "Recommend books to readers.",
      image: "/images/ai-chat-bot/showcase-smarter-conversations.webp",
      imageAlt: "Reader recommendation chat",
    },
  ],
};

describe("AiChatBotShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<AiChatBotShowcase content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Easy Website Setup" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Smarter Conversations" })).toBeInTheDocument();
    expect(screen.getByText("Recommend books to readers.")).toBeInTheDocument();
  });

  it("renders each card image with its alt text", () => {
    render(<AiChatBotShowcase content={content} />);

    expect(screen.getByRole("img", { name: "Easy setup chat" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Reader recommendation chat" })).toBeInTheDocument();
  });

  it("renders no cards when the content has no cards", () => {
    render(<AiChatBotShowcase content={{ cards: [] }} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
