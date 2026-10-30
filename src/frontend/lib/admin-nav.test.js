import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { isAdminPostEditorPath, hardNavigateAdmin } from "./admin-nav";

describe("isAdminPostEditorPath", () => {
  it("matches new and edit post routes only", () => {
    expect(isAdminPostEditorPath("/admin/post/new")).toBe(true);
    expect(isAdminPostEditorPath("/admin/post/abc/edit")).toBe(true);
    expect(isAdminPostEditorPath("/admin/post/abc/edit/")).toBe(true);

    expect(isAdminPostEditorPath("/admin/post")).toBe(false);
    expect(isAdminPostEditorPath("/admin/post/abc/preview")).toBe(false);
    expect(isAdminPostEditorPath("/admin/media")).toBe(false);
    expect(isAdminPostEditorPath("")).toBe(false);
  });
});

describe("hardNavigateAdmin", () => {
  let remove;

  beforeEach(() => {
    remove = vi.fn();
    window.tinymce = { remove };
  });

  afterEach(() => {
    delete window.tinymce;
  });

  it("tears down TinyMCE by default before assign", () => {
    try {
      hardNavigateAdmin("/admin/post");
    } catch {
      // jsdom may throw on location.assign — teardown still ran first.
    }
    expect(remove).toHaveBeenCalled();
  });

  it("skips TinyMCE teardown when teardownEditor is false", () => {
    try {
      hardNavigateAdmin("/admin/post", { teardownEditor: false });
    } catch {
      // jsdom may throw on location.assign
    }
    expect(remove).not.toHaveBeenCalled();
  });
});
