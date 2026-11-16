import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TbInbox, TbRobot } from "react-icons/tb";
import OmnichannelCards from "../OmnichannelCards";

const content = {
  heading: "Support For Every Step",
  description: "Lorem ipsum dolor sit amet.",
  cards: [
    {
      id: "connect",
      title: "Connect Every Channel",
      description: "Bring messages together.",
      Icon: TbRobot,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "inbox",
      title: "Centralized Inbox",
      description: "Manage from one view.",
      Icon: TbInbox,
      background: "#eef3ff",
      row: 2,
    },
  ],
};

describe("OmnichannelCards", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading and description", () => {
    render(<OmnichannelCards content={content} />);

    expect(screen.getByRole("heading", { name: "Support For Every Step" })).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
  });

  it("renders a card for every entry with its title and description", () => {
    render(<OmnichannelCards content={content} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Connect Every Channel" })).toBeInTheDocument();
    expect(screen.getByText("Manage from one view.")).toBeInTheDocument();
  });

  it("applies each card's background color", () => {
    render(<OmnichannelCards content={content} />);

    expect(screen.getByRole("heading", { name: "Connect Every Channel" }).closest("article")).toHaveStyle({
      background: "#fff0f4",
    });
  });
});
