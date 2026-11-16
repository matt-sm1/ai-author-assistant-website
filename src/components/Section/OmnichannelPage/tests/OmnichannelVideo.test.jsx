import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import OmnichannelVideo from "../OmnichannelVideo";

const content = {
  poster: "/images/omnichannel/video-banner.webp",
  posterAlt: "Author AI Assistant logo",
  label: "Watch the Omnichannel Inbox Feature overview",
  videoHref: null,
};

describe("OmnichannelVideo", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the poster image and its caption", () => {
    render(<OmnichannelVideo content={content} />);

    expect(screen.getByRole("img", { name: "Author AI Assistant logo" })).toBeInTheDocument();
    expect(screen.getByText("Watch the Omnichannel Inbox Feature overview")).toBeInTheDocument();
  });

  it("does not link the poster when no video URL is set", () => {
    render(<OmnichannelVideo content={content} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("wraps the poster in a link when a video URL is set", () => {
    render(<OmnichannelVideo content={{ ...content, videoHref: "https://example.com/video" }} />);

    expect(screen.getByRole("link", { name: "Watch the Omnichannel Inbox Feature overview" })).toHaveAttribute(
      "href",
      "https://example.com/video"
    );
  });
});
