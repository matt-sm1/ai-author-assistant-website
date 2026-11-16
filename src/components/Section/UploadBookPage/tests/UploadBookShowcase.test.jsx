import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import UploadBookShowcase from "../UploadBookShowcase";

const content = {
  cards: [
    {
      id: "manual-upload",
      title: "Manual Book Upload",
      description: "Understand campaign impact.",
      image: "/images/upload-book/showcase-manual-upload.webp",
      imageAlt: "Manual upload chat",
    },
    {
      id: "import-by-url",
      title: "Import By URL",
      description: "Track reader activity.",
      image: "/images/upload-book/showcase-import-url.webp",
      imageAlt: "Import by URL chat",
    },
  ],
};

describe("UploadBookShowcase", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<UploadBookShowcase content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Manual Book Upload" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Import By URL" })).toBeInTheDocument();
    expect(screen.getByText("Track reader activity.")).toBeInTheDocument();
  });

  it("renders each card image with its alt text", () => {
    render(<UploadBookShowcase content={content} />);

    expect(screen.getByRole("img", { name: "Manual upload chat" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Import by URL chat" })).toBeInTheDocument();
  });
});
