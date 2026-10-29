import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ListboxSelect from "./ListboxSelect.jsx";

describe("ListboxSelect", () => {
  it("opens, selects an option, and does not touch body pointer-events", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    document.body.style.pointerEvents = "";

    render(
      <ListboxSelect
        id="status"
        label="Status"
        value="draft"
        onChange={onChange}
        options={[
          { value: "draft", label: "Draft" },
          { value: "scheduled", label: "Scheduled" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /status/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: /scheduled/i }));
    expect(onChange).toHaveBeenCalledWith("scheduled");
    expect(document.body.style.pointerEvents).toBe("");
    expect(
      [...document.body.classList].some((c) =>
        c.startsWith("block-interactivity-"),
      ),
    ).toBe(false);
  });
});
