import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PricingComparison from "./PricingComparison";

afterEach(cleanup);

describe("PricingComparison", () => {
  it("compares the features already listed for each plan", () => {
    render(<PricingComparison />);

    expect(screen.getByRole("heading", { name: "Compare Our Plans" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /growth/i })).toBeInTheDocument();
    const documents = screen.getByRole("row", { name: /Documents/ });
    expect(within(documents).getAllByText("5 documents")).toHaveLength(2);
    expect(within(documents).getByText("25 documents")).toBeInTheDocument();
    const dashboard = screen.getByRole("row", { name: /Dashboard and SLA/ });
    expect(within(dashboard).getByText("Live dashboard + SLA")).toBeInTheDocument();
    expect(within(dashboard).getAllByText("—")).toHaveLength(2);
  });
});
