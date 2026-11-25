import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TbMail, TbMapPin, TbPhoneCall } from "react-icons/tb";
import ContactCards from "../ContactCards";
import { contactImages } from "@/content/media";

const content = {
  cards: [
    { id: "email", Icon: TbMail, title: "Info@Example.Com", description: "Send a message." },
    { id: "phone", Icon: TbPhoneCall, title: "(888) 123-4567", description: "Call us." },
    { id: "address", Icon: TbMapPin, title: "410 Sandtown", description: "Visit us." },
  ],
};

describe("ContactCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a card for each contact method", () => {
    const { container } = render(<ContactCards content={content} />);

    expect(screen.getByRole("heading", { name: "Info@Example.Com" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "(888) 123-4567" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "410 Sandtown" })).toBeInTheDocument();
    expect(container.querySelectorAll("article")).toHaveLength(3);
  });

  it("shows the supplied decorative map before the contact details", () => {
    const { container } = render(<ContactCards content={content} />);
    const map = container.querySelector('img[alt=""]');
    expect(map).toHaveAttribute("src", contactImages.worldMap);
    expect(map.compareDocumentPosition(screen.getByRole("heading", { name: "Info@Example.Com" })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders an icon in every card", () => {
    const { container } = render(<ContactCards content={content} />);

    container.querySelectorAll("article").forEach((card) => {
      expect(card.querySelector("svg")).not.toBeNull();
    });
  });

  it("renders no cards when the content has none", () => {
    const { container } = render(<ContactCards content={{ cards: [] }} />);

    expect(container.querySelectorAll("article")).toHaveLength(0);
  });
});
