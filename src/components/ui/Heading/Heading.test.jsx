import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading", () => {
  it("defaults to an h2", () => {
    render(<Heading>Section title</Heading>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Section title" })
    ).toBeInTheDocument();
  });
});
