import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import CrmVideo from "../CrmVideo";

const content = {
  label: "Watch the CRM Feature overview",
  poster: "/images/crm/video-banner.webp",
  posterAlt: "Video preview",
  videoHref: null,
};

describe("CrmVideo", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the poster image with its alt text", () => {
    render(<CrmVideo content={content} />);

    expect(screen.getByRole("img", { name: "Video preview" })).toBeInTheDocument();
  });

  it("does not render a link when no video URL is set", () => {
    render(<CrmVideo content={content} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("wraps the poster in a link when a video URL is set", () => {
    render(<CrmVideo content={{ ...content, videoHref: "https://example.com/video" }} />);

    expect(screen.getByRole("link", { name: "Watch the CRM Feature overview" })).toHaveAttribute(
      "href",
      "https://example.com/video"
    );
  });
});
