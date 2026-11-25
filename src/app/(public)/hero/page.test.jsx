import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HeroPage from "./HeroPage";

describe("Help center", () => {
  afterEach(cleanup);

  it("links each guide in the navigation to its section", () => {
    render(<HeroPage />);
    const navigation = screen.getByRole("navigation", { name: "Help guides" });
    const links = within(navigation).getAllByRole("link");
    expect(links).toHaveLength(7);
    for (const link of links) {
      const section = document.getElementById(link.getAttribute("href").slice(1));
      expect(section).not.toBeNull();
      expect(within(section).getByRole("heading", { level: 2 })).toHaveTextContent(link.textContent.slice(2));
    }
    expect(screen.getByRole("link", { name: "Start with the first guide" })).toHaveAttribute("href", "#getting-started");
  });

  it("directs visitors to support and labels unavailable tutorials", () => {
    render(<HeroPage />);
    expect(screen.getByRole("link", { name: "Contact Support" })).toHaveAttribute("href", "/contact");
    expect(screen.getAllByText("Video tutorial coming soon")).toHaveLength(7);
    expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
  });
});
