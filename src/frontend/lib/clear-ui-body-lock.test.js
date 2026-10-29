import { afterEach, describe, expect, it, vi } from "vitest";

import {
  clearUiBodyLock,
  hasLiveUiModal,
  watchAndClearUiBodyLock,
} from "./clear-ui-body-lock.js";

describe("clearUiBodyLock", () => {
  afterEach(() => {
    document.body.style.cssText = "";
    document.documentElement.style.cssText = "";
    document.body.className = "";
    document.body.removeAttribute("data-scroll-locked");
    document
      .querySelectorAll(
        "[data-radix-focus-guard], .tox-dialog-wrap, .tox-tinymce-aux, [data-aria-hidden], [role='dialog']",
      )
      .forEach((n) => n.remove());
    vi.useRealTimers();
  });

  it("removes pointer-events and scroll-lock leftovers from body", () => {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    document.body.setAttribute("data-scroll-locked", "");

    clearUiBodyLock({ force: true });

    expect(document.body.style.pointerEvents).toBe("");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("");
    expect(document.body.hasAttribute("data-scroll-locked")).toBe(false);
  });

  it("removes react-remove-scroll block-interactivity classes", () => {
    document.body.classList.add("block-interactivity-3");
    document.body.style.pointerEvents = "none";

    clearUiBodyLock({ force: true });

    expect(document.body.classList.contains("block-interactivity-3")).toBe(
      false,
    );
    expect(document.body.style.pointerEvents).toBe("");
  });

  it("removes orphaned radix focus guards, TinyMCE wraps, and aria-hidden markers", () => {
    const guard = document.createElement("span");
    guard.setAttribute("data-radix-focus-guard", "");
    document.body.appendChild(guard);

    const tox = document.createElement("div");
    tox.className = "tox-dialog-wrap";
    document.body.appendChild(tox);

    const shell = document.createElement("div");
    shell.setAttribute("data-aria-hidden", "true");
    shell.setAttribute("aria-hidden", "true");
    document.body.appendChild(shell);

    clearUiBodyLock({ force: true });

    expect(document.querySelector("[data-radix-focus-guard]")).toBeNull();
    expect(document.querySelector(".tox-dialog-wrap")).toBeNull();
    expect(shell.hasAttribute("data-aria-hidden")).toBe(false);
    expect(shell.hasAttribute("aria-hidden")).toBe(false);
  });

  it("skips clear while a live dialog is open unless forced", () => {
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("data-state", "open");
    document.body.appendChild(dialog);
    document.body.style.pointerEvents = "none";

    expect(hasLiveUiModal()).toBe(true);
    clearUiBodyLock();
    expect(document.body.style.pointerEvents).toBe("none");

    clearUiBodyLock({ force: true });
    expect(document.body.style.pointerEvents).toBe("");
    dialog.remove();
  });

  it("re-clears when DismissableLayer restores pointer-events:none", () => {
    vi.useFakeTimers();
    document.body.style.pointerEvents = "";

    const dispose = watchAndClearUiBodyLock(2000);

    document.body.style.pointerEvents = "none";
    document.body.classList.add("block-interactivity-9");
    document.body.setAttribute("data-scroll-locked", "");

    vi.advanceTimersByTime(400);

    expect(document.body.style.pointerEvents).toBe("");
    expect(document.body.classList.contains("block-interactivity-9")).toBe(
      false,
    );
    expect(document.body.hasAttribute("data-scroll-locked")).toBe(false);

    dispose();
  });
});
