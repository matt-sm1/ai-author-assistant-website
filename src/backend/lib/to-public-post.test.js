import { describe, expect, it } from "vitest";
import { toPublicPost, toPublicPostList } from "@/backend/lib/to-public-post";

describe("toPublicPost", () => {
  it("returns null for nullish input", () => {
    expect(toPublicPost(null)).toBeNull();
    expect(toPublicPost(undefined)).toBeNull();
  });

  it("normalizes missing fields and author.avatar_url snake_case", () => {
    const result = toPublicPost({
      id: "1",
      author: { name: "A", avatar_url: "/x.png" },
      tags: null,
    });

    expect(result.title).toBe("");
    expect(result.slug).toBe("");
    expect(result.content).toBe("");
    expect(result.excerpt).toBe("");
    expect(result.featured_image).toBeNull();
    expect(result.updated_at).toBeNull();
    expect(result.faq_items).toEqual([]);
    expect(result.schema_json_ld).toBeNull();
    expect(result.author).toEqual({ name: "A", avatarUrl: "/x.png" });
    expect(result.tags).toEqual([]);
  });

  it("exposes updated_at, faq_items, and schema_json_ld", () => {
    const result = toPublicPost({
      id: "1",
      updated_at: "2026-10-31T00:00:00.000Z",
      faq_items: [{ question: " Q? ", answer: " A ", extra: 1 }],
      schema_json_ld: ' {"@type":"Thing"} ',
    });

    expect(result.updated_at).toBe("2026-10-31T00:00:00.000Z");
    expect(result.faq_items).toEqual([{ question: "Q?", answer: "A" }]);
    expect(result.schema_json_ld).toBe(' {"@type":"Thing"} ');
  });

  it("keeps only safe tag fields", () => {
    const result = toPublicPost({
      id: "1",
      tags: [{ id: "t", name: "N", slug: "n", created_at: "x" }],
    });

    expect(result.tags).toEqual([{ id: "t", name: "N", slug: "n" }]);
  });

  // ADR 0003: media URL normalization at the API boundary

  it("flattens nested /media/media/ featured_image to /media/ (ADR 0003)", () => {
    const result = toPublicPost({
      id: "1",
      featured_image:
        "https://indigo-loris-172446.hostingersite.com/media/media/2026/10/file.png",
    });

    expect(result.featured_image).not.toContain("/media/media/");
    expect(result.featured_image).toContain("/media/2026/10/file.png");
  });

  it("passes through already-flat featured_image unchanged (except ?v=)", () => {
    const flat =
      "https://indigo-loris-172446.hostingersite.com/media/2026/10/file.png";
    const result = toPublicPost({ id: "1", featured_image: flat });

    expect(result.featured_image).toContain("/media/2026/10/file.png");
    expect(result.featured_image).not.toContain("/media/media/");
  });

  it("flattens nested /media/media/ src= URLs in HTML content (ADR 0003)", () => {
    const nested =
      "https://indigo-loris-172446.hostingersite.com/media/media/2026/10/img.jpg";
    const result = toPublicPost({
      id: "1",
      content: `<p><img src="${nested}" /></p>`,
    });

    expect(result.content).not.toContain("/media/media/");
    expect(result.content).toContain("/media/2026/10/img.jpg");
  });

  it("does not include content in toPublicPostList", () => {
    const result = toPublicPostList({
      id: "1",
      content: "<p>body</p>",
    });

    expect(result).not.toHaveProperty("content");
    expect(result.id).toBe("1");
  });
});
