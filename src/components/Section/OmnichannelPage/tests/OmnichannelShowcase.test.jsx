import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import OmnichannelShowcase from "../OmnichannelShowcase";

const content = {
  cards: [
    {
      id: "inbox",
      title: "One Inbox, Every Channel",
      description: "Understand campaign impact.",
      image: "/images/omnichannel/showcase-inbox.webp",
      imageAlt: "Inbox chat",
    },
    {
      id: "platform",
      title: "One AI Across Every Platform",
      description: "Track engagement over time.",
      image: "/images/omnichannel/showcase-platform.webp",
      imageAlt: "Platform chat",
    },
  ],
};

describe("OmnichannelShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card with title, description, and image for each entry", () => {
    render(<OmnichannelShowcase content={content} />);

    expect(screen.getByRole("heading", { name: "One Inbox, Every Channel" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One AI Across Every Platform" })).toBeInTheDocument();
    expect(screen.getByText("Track engagement over time.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Inbox chat" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders no cards when cards is not an array", () => {
    render(<OmnichannelShowcase content={{ cards: null }} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
