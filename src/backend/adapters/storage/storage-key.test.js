import { describe, expect, it } from "vitest";
import {
  assertSafeStorageKey,
  buildMediaStorageKey,
  publicUrlForKey,
  STORAGE_KEY_PATTERN,
} from "@/backend/adapters/storage/storage-key";

describe("storage-key", () => {
  it("builds keys matching the allowlist pattern", () => {
    const key = buildMediaStorageKey("jpg");
    expect(STORAGE_KEY_PATTERN.test(key)).toBe(true);
    expect(key.startsWith("media/")).toBe(true);
  });

  it("emits flat public URLs matching Hostinger media_root layout (ADR 0003)", () => {
    const url = publicUrlForKey(
      "https://cdn.example.com",
      "media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
    expect(url).toBe(
      "https://cdn.example.com/media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
  });

  it("rejects path traversal", () => {
    expect(() => assertSafeStorageKey("../etc/passwd")).toThrow();
    expect(() => assertSafeStorageKey("/media/x.jpg")).toThrow();
    expect(() =>
      assertSafeStorageKey("media/2026/10/../evil.jpg"),
    ).toThrow();
    expect(() =>
      assertSafeStorageKey("media/2026/10/not-a-ulid.jpg"),
    ).toThrow();
  });

  it("rejects null bytes", () => {
    expect(() =>
      assertSafeStorageKey("media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.jpg\0"),
    ).toThrow();
  });

  it("never produces /media/media/ double-path (ADR 0003)", () => {
    const url = publicUrlForKey(
      "https://cdn.example.com",
      "media/2026/10/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    );
    expect(url).not.toContain("/media/media/");
    expect(url).toMatch(/\/media\/\d{4}\/\d{2}\//);
  });
});
