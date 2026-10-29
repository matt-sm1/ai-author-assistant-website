/**
 * Clears leftover interaction locks from Radix Dialog/Select/Sheet
 * (DismissableLayer inline styles + react-remove-scroll classes) and
 * orphaned TinyMCE portals after abrupt unmount or soft navigation.
 *
 * Important: react-remove-scroll can add `block-interactivity-*` on <body>
 * (pointer-events: none via stylesheet). Clearing only inline styles is not enough.
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

function stripInteractivityClasses(root) {
  if (!root?.classList) return;
  const toRemove = [];
  root.classList.forEach((name) => {
    if (
      name.startsWith("block-interactivity-") ||
      name.startsWith("allow-interactivity-")
    ) {
      toRemove.push(name);
    }
  });
  toRemove.forEach((name) => root.classList.remove(name));
}

function removeOrphanOverlays() {
  if (typeof document === "undefined") return;

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

  document.querySelectorAll(".tox-dialog-wrap").forEach((node) => {
    node.remove();
  });

  document.querySelectorAll(".tox-tinymce-aux").forEach((node) => {
    if (!node.childElementCount) node.remove();
  });
}

function clearStaleAriaHidden() {
  if (typeof document === "undefined") return;
  // aria-hidden markers left by hideOthers when a dialog unmounted mid-cleanup
  document.querySelectorAll("[data-aria-hidden='true']").forEach((node) => {
    node.removeAttribute("data-aria-hidden");
    if (node.getAttribute("aria-hidden") === "true") {
      node.removeAttribute("aria-hidden");
    }
  });
  document.querySelectorAll("[data-inert-ed='true']").forEach((node) => {
    node.removeAttribute("data-inert-ed");
    node.removeAttribute("inert");
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
    stripInteractivityClasses(el);
  }

  body.removeAttribute("data-scroll-locked");
  documentElement?.removeAttribute("data-scroll-locked");

  // RemoveScroll may leave the class on body even when attribute was cleared.
  document.querySelectorAll("[class*='block-interactivity-']").forEach((node) => {
    stripInteractivityClasses(node);
  });
  document.querySelectorAll("[class*='allow-interactivity-']").forEach((node) => {
    stripInteractivityClasses(node);
  });

  clearStaleAriaHidden();
  removeOrphanOverlays();
}

/**
 * Clears immediately and re-clears if DismissableLayer / RemoveScroll
 * re-applies locks after soft-nav. Returns dispose().
 */
export function watchAndClearUiBodyLock(durationMs = 2500) {
  clearUiBodyLock({ force: true });
  if (typeof window === "undefined" || typeof MutationObserver === "undefined") {
    return () => {};
  }

  const isStillLocked = () => {
    const pe = document.body?.style?.pointerEvents;
    const locked = document.body?.hasAttribute("data-scroll-locked");
    const blocked = [...(document.body?.classList || [])].some((name) =>
      name.startsWith("block-interactivity-"),
    );
    return pe === "none" || locked || blocked;
  };

  const reclear = () => {
    if (hasLiveUiModal()) return;
    if (isStillLocked()) clearUiBodyLock({ force: true });
  };

  const observer = new MutationObserver(reclear);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style", "class", "data-scroll-locked"],
  });
  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class", "data-scroll-locked"],
    });
  }

  const timers = [
    window.setTimeout(reclear, 0),
    window.setTimeout(reclear, 100),
    window.setTimeout(reclear, 320),
    window.setTimeout(reclear, 800),
    window.setTimeout(reclear, 1500),
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

export function clearUiBodyLockSoon() {
  return watchAndClearUiBodyLock(2500);
}
