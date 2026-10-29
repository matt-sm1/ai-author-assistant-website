/**
 * Clears leftover interaction locks from Radix Dialog/Select/Sheet
 * (RemoveScroll + DismissableLayer) and orphaned TinyMCE portals after
 * abrupt unmount or soft navigation.
 *
 * Select @2.4.1 always sets disableOutsidePointerEvents and can restore a
 * captured `pointer-events: none` on body after our first clear — callers
 * should use watchAndClearUiBodyLock / clearUiBodyLockSoon.
 */

export const ADMIN_CLOSE_OVERLAYS_EVENT = "admin:close-overlays";

export function dispatchCloseAdminOverlays() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ADMIN_CLOSE_OVERLAYS_EVENT));
}

export function hasLiveUiModal() {
  if (typeof document === "undefined") return false;
  return Boolean(
    document.querySelector('[role="dialog"][data-state="open"]') ||
      document.querySelector('[data-radix-select-content][data-state="open"]') ||
      document.querySelector(
        '[data-state="open"][class*="fixed"][class*="inset-0"]',
      ) ||
      document.querySelector(".tox-dialog-wrap"),
  );
}

function removeOrphanOverlays({ force = false } = {}) {
  if (typeof document === "undefined") return;
  if (!force && hasLiveUiModal()) return;

  document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => {
    node.remove();
  });

  document
    .querySelectorAll(
      '[data-state="closed"][class*="fixed"][class*="inset-0"]',
    )
    .forEach((node) => {
      node.remove();
    });

  // Soft-nav can leave TinyMCE dialog chrome after editor.destroy races.
  document.querySelectorAll(".tox-dialog-wrap").forEach((node) => {
    node.remove();
  });

  document.querySelectorAll(".tox-tinymce-aux").forEach((node) => {
    if (!node.childElementCount) node.remove();
  });
}

export function clearUiBodyLock({ force = false } = {}) {
  if (typeof document === "undefined") return;
  if (!force && hasLiveUiModal()) return;

  const { body, documentElement } = document;
  if (!body) return;

  for (const el of [body, documentElement]) {
    if (!el?.style) continue;
    el.style.removeProperty("pointer-events");
    el.style.removeProperty("overflow");
    el.style.removeProperty("padding-right");
    el.style.removeProperty("margin-right");
  }

  body.removeAttribute("data-scroll-locked");
  documentElement?.removeAttribute("data-scroll-locked");

  removeOrphanOverlays({ force });
}

/**
 * Clears immediately and re-clears if DismissableLayer restores
 * pointer-events:none after soft-nav (common Select/Dialog race).
 * Returns a dispose function.
 */
export function watchAndClearUiBodyLock(durationMs = 2000) {
  clearUiBodyLock({ force: true });
  if (typeof window === "undefined" || typeof MutationObserver === "undefined") {
    return () => {};
  }

  const reclear = () => {
    if (hasLiveUiModal()) return;
    const pe = document.body?.style?.pointerEvents;
    const locked = document.body?.hasAttribute("data-scroll-locked");
    if (pe === "none" || locked) {
      clearUiBodyLock({ force: true });
    }
  };

  const observer = new MutationObserver(reclear);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style", "data-scroll-locked"],
  });
  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "data-scroll-locked"],
    });
  }

  const timers = [
    window.setTimeout(reclear, 0),
    window.setTimeout(reclear, 100),
    window.setTimeout(reclear, 320),
    window.setTimeout(reclear, 800),
    window.setTimeout(reclear, durationMs),
  ];

  const frame = requestAnimationFrame(reclear);

  const dispose = () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    timers.forEach((id) => window.clearTimeout(id));
  };

  window.setTimeout(dispose, durationMs + 50);
  return dispose;
}

/** @deprecated Prefer watchAndClearUiBodyLock for soft-nav; kept as alias. */
export function clearUiBodyLockSoon() {
  return watchAndClearUiBodyLock(2000);
}
