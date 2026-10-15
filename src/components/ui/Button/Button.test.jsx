import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders as a link when href is provided", () => {
    render(<Button href="#contact">Get Started</Button>);
    const link = screen.getByRole("link", { name: "Get Started" });
    expect(link).toHaveAttribute("href", "#contact");
  });

  it("renders as a button when href is omitted", () => {
    render(<Button>Subscribe</Button>);
    expect(screen.getByRole("button", { name: "Subscribe" })).toHaveAttribute(
      "type",
      "button"
    );
  });
});
