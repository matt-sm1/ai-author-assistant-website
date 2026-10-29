import { describe, expect, it, vi } from "vitest";
import { ingestExternalImagesInEditor } from "@/frontend/feature/post/lib/ingest-editor-images";

function makeEditor(imgs) {
  const body = {
    querySelectorAll: () => imgs,
  };
  return { getBody: () => body };
}

describe("ingestExternalImagesInEditor", () => {
  it("canonicalizes Hostinger URLs and skips import", async () => {
    const img = {
      getAttribute: () =>
        "https://x.hostingersite.com/media/media/2026/10/a.png",
      setAttribute: vi.fn(),
      dataset: {},
      isConnected: true,
      remove: vi.fn(),
    };
    const importFromUrl = vi.fn();
    await ingestExternalImagesInEditor(makeEditor([img]), { importFromUrl });
    expect(importFromUrl).not.toHaveBeenCalled();
    expect(img.setAttribute).toHaveBeenCalled();
    expect(img.dataset.mediaIngest).toBe("done");
  });

  it("imports external URLs and replaces src", async () => {
    const img = {
      getAttribute: () => "https://cdn.example.com/photo.png",
      setAttribute: vi.fn(),
      dataset: {},
      isConnected: true,
      remove: vi.fn(),
    };
    const importFromUrl = vi.fn().mockResolvedValue({
      url: "https://x.hostingersite.com/media/2026/10/a.png",
    });
    await ingestExternalImagesInEditor(makeEditor([img]), { importFromUrl });
    expect(importFromUrl).toHaveBeenCalledWith("https://cdn.example.com/photo.png");
    expect(img.setAttribute).toHaveBeenCalledWith(
      "src",
      "https://x.hostingersite.com/media/2026/10/a.png",
    );
  });

  it("removes img when import fails", async () => {
    const img = {
      getAttribute: () => "https://cdn.example.com/photo.png",
      setAttribute: vi.fn(),
      dataset: {},
      isConnected: true,
      remove: vi.fn(),
    };
    const onError = vi.fn();
    await ingestExternalImagesInEditor(makeEditor([img]), {
      importFromUrl: vi.fn().mockRejectedValue(new Error("blocked")),
      onError,
    });
    expect(img.remove).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });

  it("strips leftover data: images", async () => {
    const img = {
      getAttribute: () => "data:image/png;base64,aaa",
      setAttribute: vi.fn(),
      dataset: {},
      isConnected: true,
      remove: vi.fn(),
    };
    const onError = vi.fn();
    await ingestExternalImagesInEditor(makeEditor([img]), {
      importFromUrl: vi.fn(),
      onError,
    });
    expect(img.remove).toHaveBeenCalled();
  });
});
