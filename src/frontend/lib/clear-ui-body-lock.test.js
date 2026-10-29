import { afterEach, describe, expect, it } from "vitest";

import { clearUiBodyLock } from "./clear-ui-body-lock.js";

describe("clearUiBodyLock", () => {
  afterEach(() => {
    document.body.style.cssText = "";
    document.documentElement.style.cssText = "";
    document.body.removeAttribute("data-scroll-locked");
    document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove());
  });

  it("removes pointer-events and scroll-lock leftovers from body", () => {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    document.body.setAttribute("data-scroll-locked", "");

    clearUiBodyLock();

    expect(document.body.style.pointerEvents).toBe("");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("");
    expect(document.body.hasAttribute("data-scroll-locked")).toBe(false);
  });

  it("removes orphaned radix focus guards", () => {
    const guard = document.createElement("span");
    guard.setAttribute("data-radix-focus-guard", "");
    document.body.appendChild(guard);

    clearUiBodyLock();

    expect(document.querySelector("[data-radix-focus-guard]")).toBeNull();
  });
});
