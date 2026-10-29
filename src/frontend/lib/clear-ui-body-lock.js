/**
 * Clears leftover interaction locks from Radix Dialog/Select/Sheet
 * (RemoveScroll + DismissableLayer) after abrupt unmount or soft navigation.
 * Safe to call repeatedly; no-ops when nothing is locked.
 */
export function clearUiBodyLock() {
  if (typeof document === "undefined") return;

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

  // Orphaned focus guards / closed overlays can sit full-viewport and eat clicks.
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
}

/**
 * Clears immediately and again after paint / exit animations.
 * Use before soft navigation and on admin pathname changes.
 */
export function clearUiBodyLockSoon() {
  clearUiBodyLock();
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    clearUiBodyLock();
    window.setTimeout(clearUiBodyLock, 0);
    window.setTimeout(clearUiBodyLock, 100);
    window.setTimeout(clearUiBodyLock, 320);
  });
}
