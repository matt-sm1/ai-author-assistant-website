import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AnalyticsVideo from "../AnalyticsVideo";

const content = {
  poster: "/images/analytics/video-banner.webp",
  posterAlt: "Analytics overview poster",
  label: "Watch the Analytics Feature overview",
  videoHref: null,
};

describe("AnalyticsVideo", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the poster image with its alt text and caption", () => {
    render(<AnalyticsVideo content={content} />);

    expect(screen.getByRole("img", { name: "Analytics overview poster" })).toBeInTheDocument();
    expect(screen.getByText("Watch the Analytics Feature overview")).toBeInTheDocument();
  });

  it("wraps the poster in a link when a video href is provided", () => {
    render(<AnalyticsVideo content={{ ...content, videoHref: "https://example.com/video" }} />);

    expect(
      screen.getByRole("link", { name: "Watch the Analytics Feature overview" })
    ).toHaveAttribute("href", "https://example.com/video");
  });

  it("does not render a link when no video href is provided", () => {
    render(<AnalyticsVideo content={content} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
