import { describe, expect, it } from "vitest";
import {
  toAlternateHostingerMediaUrl,
  toCanonicalHostingerMediaUrl,
  toNestedHostingerMediaUrl,
  rewriteHostingerMediaUrlsInHtml,
} from "./hostinger-media-url";

describe("toCanonicalHostingerMediaUrl", () => {
  it("flattens nested Hostinger media URLs", () => {
    expect(
      toCanonicalHostingerMediaUrl(
        "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
      ),
    ).toBe(
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
  });

  it("leaves flat URLs unchanged", () => {
    const flat =
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    expect(toCanonicalHostingerMediaUrl(flat)).toBe(flat);
  });
});

describe("toNestedHostingerMediaUrl (legacy fallback)", () => {
  it("nests flat Hostinger media URLs", () => {
    expect(
      toNestedHostingerMediaUrl(
        "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
      ),
    ).toBe(
      "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
  });

  it("leaves already-nested URLs unchanged", () => {
    const nested =
      "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    expect(toNestedHostingerMediaUrl(nested)).toBe(nested);
  });
});

describe("toAlternateHostingerMediaUrl", () => {
  it("swaps flat ↔ nested", () => {
    const flat =
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    const nested =
      "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    expect(toAlternateHostingerMediaUrl(flat)).toBe(nested);
    expect(toAlternateHostingerMediaUrl(nested)).toBe(flat);
  });
});

describe("rewriteHostingerMediaUrlsInHtml", () => {
  it("rewrites nested img src to flat", () => {
    const html =
      '<p><img src="https://x.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp" alt="a" /></p>';
    expect(rewriteHostingerMediaUrlsInHtml(html)).toContain(
      "/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
    expect(rewriteHostingerMediaUrlsInHtml(html)).not.toContain(
      "/media/media/",
    );
  });
});
