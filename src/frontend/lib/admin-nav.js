/**
 * Admin soft-nav helpers.
 *
 * The TinyMCE post editor can leave App Router soft navigation stuck
 * (Link preventDefault runs, URL never changes). Leaving those routes
 * must hard-navigate so sidebar / back links still work.
 */

import {
  clearUiBodyLock,
  dispatchCloseAdminOverlays,
} from "@/frontend/lib/clear-ui-body-lock";

export function isAdminPostEditorPath(pathname = "") {
  if (!pathname) return false;
  if (pathname === "/admin/post/new") return true;
  return /^\/admin\/post\/[^/]+\/edit\/?$/.test(pathname);
}

/**
 * Tear down editor overlays and hard-navigate.
 * Use when leaving the post editor (or whenever soft-nav is known stuck).
 */
export function hardNavigateAdmin(href) {
  if (typeof window === "undefined" || !href) return;

  try {
    window.tinymce?.remove?.();
  } catch {
    // TinyMCE may already be torn down.
  }

  dispatchCloseAdminOverlays();
  clearUiBodyLock({ force: true });
  window.location.assign(href);
}
