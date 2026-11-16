import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import SupportVideo from "../SupportVideo";

const baseContent = {
  poster: "/images/support/video-banner.webp",
  posterAlt: "Author AI Assistant logo",
  label: "Watch the Dedicated Support Feature overview",
};

describe("SupportVideo", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the poster without a link when no video URL is set", () => {
    render(<SupportVideo content={{ ...baseContent, videoHref: null }} />);

    expect(screen.getByRole("img", { name: "Author AI Assistant logo" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("wraps the poster in a link when a video URL is set", () => {
    render(
      <SupportVideo content={{ ...baseContent, videoHref: "https://example.com/video" }} />
    );

    expect(
      screen.getByRole("link", { name: "Watch the Dedicated Support Feature overview" })
    ).toHaveAttribute("href", "https://example.com/video");
  });
});
