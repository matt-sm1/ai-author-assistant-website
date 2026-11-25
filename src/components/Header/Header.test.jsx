import React from "react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Mobile menu", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it("opens the menu and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close menu/i })
    ).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("links to Contact before Help in desktop and mobile navigation", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(within(desktopNav).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    const desktopLinks = within(desktopNav).getAllByRole("link").map((link) => link.textContent);
    expect(desktopLinks.indexOf("Contact") + 1).toBe(desktopLinks.indexOf("Help"));

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(within(mobileNav).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    const mobileLinks = within(mobileNav).getAllByRole("link").map((link) => link.textContent.trim());
    expect(mobileLinks.findIndex((text) => text.startsWith("Contact")) + 1).toBe(
      mobileLinks.findIndex((text) => text.startsWith("Help"))
    );
  });
});

describe("Features dropdown", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  it("opens the desktop dropdown and lists the Widget Feature link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    const trigger = within(desktopNav).getByRole("button", { name: /features/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      within(desktopNav).getByRole("link", { name: "Widget" })
    ).toHaveAttribute("href", "/features/widget");
    expect(
      within(desktopNav).getByRole("link", { name: "Overview" })
    ).toHaveAttribute("href", "/features");
  });

  it("lists the Analytics Feature link in the desktop dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    await user.click(within(desktopNav).getByRole("button", { name: /features/i }));

    expect(
      within(desktopNav).getByRole("link", { name: "Analytics" })
    ).toHaveAttribute("href", "/features/analytics-feature");
  });

  it("lists the Omnichannel Inbox Feature link in the desktop dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    await user.click(within(desktopNav).getByRole("button", { name: /features/i }));

    expect(
      within(desktopNav).getByRole("link", { name: "Omnichannel Inbox" })
    ).toHaveAttribute("href", "/features/omnichannel-inbox-feature");
  });

  it("lists the CRM Feature link in the desktop dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    await user.click(within(desktopNav).getByRole("button", { name: /features/i }));

    expect(
      within(desktopNav).getByRole("link", { name: "CRM" })
    ).toHaveAttribute("href", "/features/crm-feature");
  });

  it("lists the Upload Book Feature link in the desktop dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    await user.click(within(desktopNav).getByRole("button", { name: /features/i }));

    expect(
      within(desktopNav).getByRole("link", { name: "Upload Book" })
    ).toHaveAttribute("href", "/features/upload-book-feature");
  });

  it("lists the AI Chat Bot Feature link in the desktop dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    await user.click(within(desktopNav).getByRole("button", { name: /features/i }));

    expect(
      within(desktopNav).getByRole("link", { name: "AI Chat Bot" })
    ).toHaveAttribute("href", "/features/ai-chat-bot-feature");
  });

  it("keeps Contact out of the Features dropdown", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });

    const trigger = within(desktopNav).getByRole("button", { name: /features/i });
    await user.click(trigger);
    const dropdown = document.getElementById(trigger.getAttribute("aria-controls"));

    expect(within(dropdown).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });

  it("closes the desktop dropdown on outside click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });
    const trigger = within(desktopNav).getByRole("button", { name: /features/i });

    await user.click(trigger);
    await user.click(document.body);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      within(desktopNav).queryByRole("link", { name: "Widget" })
    ).not.toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });
    const trigger = within(desktopNav).getByRole("button", { name: /features/i });

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("opens the full-width panel on hover and closes when the pointer leaves", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });
    const trigger = within(desktopNav).getByRole("button", { name: /features/i });

    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders an icon beside every Features panel link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Main navigation" });
    const trigger = within(desktopNav).getByRole("button", { name: /features/i });

    await user.hover(trigger);

    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    expect(panel.querySelectorAll("li")).toHaveLength(8);
    panel.querySelectorAll("li").forEach((item) => {
      expect(item.querySelector("svg")).not.toBeNull();
    });
  });

  it("expands the mobile group to reveal the Widget Feature link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: "Mobile navigation" });

    const group = within(mobileNav).getByRole("button", { name: /features/i });
    await user.click(group);

    expect(group).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobileNav).getByRole("link", { name: "Widget" })
    ).toHaveAttribute("href", "/features/widget");
  });

  it("links both Get Started buttons to the Contact page", async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
      "href",
      "/contact"
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(
      within(screen.getByRole("navigation", { name: "Mobile navigation" })).getByRole(
        "link",
        { name: "Get Started" }
      )
    ).toHaveAttribute("href", "/contact");
  });
});

