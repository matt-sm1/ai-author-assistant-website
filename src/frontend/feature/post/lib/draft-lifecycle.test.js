import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

import {
  UNTITLED_DRAFT_TITLE,
  EDITOR_FRESH_NEW_KEY,
  buildDraftAutosavePayload,
  hashDraftAutosavePayload,
  canResetDraft,
  createEmptyPostForm,
  markFreshNewPost,
  consumeFreshNewPost,
} from "./draft-lifecycle";

describe("draft-lifecycle", () => {
  describe("buildDraftAutosavePayload", () => {
    it("returns null without authorId", () => {
      expect(buildDraftAutosavePayload({ title: "Hi" })).toBeNull();
    });

    it("uses Untitled draft when title is empty", () => {
      const payload = buildDraftAutosavePayload({
        authorId: "11111111-1111-1111-1111-111111111111",
        title: "  ",
        content: "<p>x</p>",
        tags: [{ name: "a" }],
        category: "",
      });
      expect(payload.title).toBe(UNTITLED_DRAFT_TITLE);
      expect(payload.status).toBe("draft");
      expect(payload.tags).toEqual(["a"]);
      expect(payload.publishedAt).toBeNull();
    });

    it("hashes stably for unchanged skip", () => {
      const payload = buildDraftAutosavePayload({
        authorId: "11111111-1111-1111-1111-111111111111",
        title: "T",
        content: null,
        tags: [],
      });
      expect(hashDraftAutosavePayload(payload)).toBe(
        hashDraftAutosavePayload(payload),
      );
    });
  });

  describe("canResetDraft", () => {
    it("allows reset on new and draft only", () => {
      expect(canResetDraft("draft", false)).toBe(true);
      expect(canResetDraft("draft", true)).toBe(true);
      expect(canResetDraft("published", true)).toBe(false);
      expect(canResetDraft("scheduled", true)).toBe(false);
    });
  });

  describe("createEmptyPostForm", () => {
    it("starts as draft with empty fields", () => {
      const form = createEmptyPostForm({ authorId: "a" });
      expect(form.status).toBe("draft");
      expect(form.title).toBe("");
      expect(form.authorId).toBe("a");
      expect(form.featuredMediaId).toBeNull();
    });
  });

  describe("fresh new flag", () => {
    beforeEach(() => {
      const store = new Map();
      vi.stubGlobal("sessionStorage", {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k),
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("skips resume once after Reset All", () => {
      expect(consumeFreshNewPost()).toBe(false);
      markFreshNewPost();
      expect(sessionStorage.getItem(EDITOR_FRESH_NEW_KEY)).toBe("1");
      expect(consumeFreshNewPost()).toBe(true);
      expect(consumeFreshNewPost()).toBe(false);
    });
  });
});
