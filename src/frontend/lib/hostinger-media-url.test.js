import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  toAlternateHostingerMediaUrl,
  toCanonicalHostingerMediaUrl,
  toNestedHostingerMediaUrl,
  rewriteHostingerMediaUrlsInHtml,
} from "./hostinger-media-url";

describe("toCanonicalHostingerMediaUrl (default: no version env)", () => {
  it("flattens nested Hostinger media URLs", () => {
    const out = toCanonicalHostingerMediaUrl(
      "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
    expect(out).toBe(
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
    expect(out).not.toContain("/media/media/");
  });

  it("keeps already-flat paths", () => {
    const flat =
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    expect(toCanonicalHostingerMediaUrl(flat)).toBe(flat);
  });

  it("returns nullish / empty unchanged", () => {
    expect(toCanonicalHostingerMediaUrl(null)).toBeNull();
    expect(toCanonicalHostingerMediaUrl("")).toBe("");
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

  it("leaves already-nested path unchanged (no forced nest)", () => {
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

describe("toCanonicalHostingerMediaUrl with NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION", "20261029");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("appends ?v= when env is set", async () => {
    const { toCanonicalHostingerMediaUrl: toCanonical } = await import(
      "@/shared/hostinger-media-url"
    );
    const flat =
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp";
    expect(toCanonical(flat)).toBe(`${flat}?v=20261029`);
  });

  it("flattens nested and appends ?v=", async () => {
    const { toCanonicalHostingerMediaUrl: toCanonical } = await import(
      "@/shared/hostinger-media-url"
    );
    expect(
      toCanonical(
        "https://cdn.example.hostingersite.com/media/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
      ),
    ).toBe(
      "https://cdn.example.hostingersite.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp?v=20261029",
    );
  });
});
