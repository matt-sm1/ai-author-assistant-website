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
    document.body.removeAttribute("data-scroll-locked");
    document
      .querySelectorAll(
        "[data-radix-focus-guard], .tox-dialog-wrap, .tox-tinymce-aux, [data-testid='overlay']",
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

  it("removes orphaned radix focus guards and TinyMCE dialog wraps", () => {
    const guard = document.createElement("span");
    guard.setAttribute("data-radix-focus-guard", "");
    document.body.appendChild(guard);

    const tox = document.createElement("div");
    tox.className = "tox-dialog-wrap";
    document.body.appendChild(tox);

    clearUiBodyLock({ force: true });

    expect(document.querySelector("[data-radix-focus-guard]")).toBeNull();
    expect(document.querySelector(".tox-dialog-wrap")).toBeNull();
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
    document.body.setAttribute("data-scroll-locked", "");

    // MutationObserver may or may not fire in jsdom; drive reclear via timers.
    vi.advanceTimersByTime(400);

    expect(document.body.style.pointerEvents).toBe("");
    expect(document.body.hasAttribute("data-scroll-locked")).toBe(false);

    dispose();
  });
});
