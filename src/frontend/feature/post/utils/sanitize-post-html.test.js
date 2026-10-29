import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sanitizePostHtml } from "@/frontend/feature/post/utils/sanitize-post-html";

describe("sanitizePostHtml — Hostinger media (ADR 0003)", () => {
  it("flattens nested Hostinger img src", () => {
    const html =
      '<p><img src="https://cdn.example.hostingersite.com/media/media/2026/10/file.png" alt="x" /></p>';
    const out = sanitizePostHtml(html);
    expect(out).toContain("/media/2026/10/file.png");
    expect(out).not.toContain("/media/media/");
  });

  it("leaves non-Hostinger img src unchanged", () => {
    const html = '<p><img src="https://cdn.example.com/photos/a.png" alt="x" /></p>';
    const out = sanitizePostHtml(html);
    expect(out).toContain('src="https://cdn.example.com/photos/a.png"');
  });

  it("strips unsafe data URIs", () => {
    const html = '<p><img src="data:text/html;base64,PHNjcmlwdD4=" /></p>';
    const out = sanitizePostHtml(html);
    expect(out).not.toContain("data:text/html");
  });

  it("keeps safe image data URIs", () => {
    // minimal valid-looking png data uri pattern for the allowlist regex
    const safe =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const out = sanitizePostHtml(`<p><img src="${safe}" alt="p" /></p>`);
    expect(out).toContain("data:image/png;base64,");
  });
});

describe("sanitizePostHtml — cache-bust version when env set", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION", "20261029");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("appends ?v= to Hostinger img src when version env is set", async () => {
    const { sanitizePostHtml: sanitize } = await import(
      "@/frontend/feature/post/utils/sanitize-post-html"
    );
    const html =
      '<p><img src="https://cdn.example.hostingersite.com/media/2026/10/file.png" alt="x" /></p>';
    const out = sanitize(html);
    expect(out).toContain("v=20261029");
    expect(out).toContain("/media/2026/10/file.png");
  });
});
