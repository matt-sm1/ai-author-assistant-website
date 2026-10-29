import { describe, expect, it } from "vitest";

import { isAdminPostEditorPath } from "./admin-nav";

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
