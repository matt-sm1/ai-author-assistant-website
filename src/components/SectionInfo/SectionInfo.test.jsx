import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionInfo from "./SectionInfo";

describe("SectionInfo", () => {
  it("renders the section title as an h2", () => {
    render(
      <SectionInfo
        badge="FAQ"
        heading="Common questions"
        description="Answers for authors."
      />
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Common questions" })
    ).toBeInTheDocument();
  });
});
