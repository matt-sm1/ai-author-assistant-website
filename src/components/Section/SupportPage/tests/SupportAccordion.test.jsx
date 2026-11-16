import React from "react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SupportAccordion from "../SupportAccordion";

const content = {
  heading: "Expert Support For Every Step",
  description: "Customize how AuthorBot looks.",
  image: "/images/support/accordion-illustration.webp",
  imageAlt: "AuthorBot robot beside a chat widget",
  defaultOpenId: "setup",
  items: [
    { id: "help", title: "Get Help", description: "Help panel text." },
    { id: "setup", title: "Get Guided", description: "Setup panel text." },
    { id: "account", title: "Manage Account", description: "Account panel text." },
  ],
};

describe("SupportAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading, description, and illustration", () => {
    render(<SupportAccordion content={content} />);

    expect(
      screen.getByRole("heading", { name: "Expert Support For Every Step" })
    ).toBeInTheDocument();
    expect(screen.getByText("Customize how AuthorBot looks.")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "AuthorBot robot beside a chat widget" })
    ).toBeInTheDocument();
  });

  it("numbers the items and opens only the default item", () => {
    render(<SupportAccordion content={content} />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Get Guided" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "Get Help" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("switches the open item when another header is clicked", async () => {
    render(<SupportAccordion content={content} />);

    await userEvent.click(screen.getByRole("button", { name: "Get Help" }));

    expect(screen.getByRole("button", { name: "Get Help" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "Get Guided" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
