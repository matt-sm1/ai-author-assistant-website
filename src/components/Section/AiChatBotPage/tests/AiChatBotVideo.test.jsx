import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AiChatBotVideo from "../AiChatBotVideo";

const baseContent = {
  label: "Watch the overview",
  poster: "/images/ai-chat-bot/video-banner.webp",
  posterAlt: "Video preview",
  videoHref: null,
};

describe("AiChatBotVideo", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the poster image with its alt text", () => {
    render(<AiChatBotVideo content={baseContent} />);

    expect(screen.getByRole("img", { name: "Video preview" })).toBeInTheDocument();
  });

  it("renders the poster without a link when no video URL is set", () => {
    render(<AiChatBotVideo content={baseContent} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("wraps the poster in a new-tab link when a video URL is set", () => {
    render(
      <AiChatBotVideo content={{ ...baseContent, videoHref: "https://example.com/video" }} />
    );

    const link = screen.getByRole("link", { name: "Watch the overview" });
    expect(link).toHaveAttribute("href", "https://example.com/video");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
