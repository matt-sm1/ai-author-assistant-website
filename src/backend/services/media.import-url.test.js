import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/backend/lib/fetch-remote-image.js", () => ({
  fetchRemoteImage: vi.fn(),
}));

vi.mock("@/backend/validators/media-upload.validator.js", () => ({
  validateMediaUpload: vi.fn(),
}));

vi.mock("@/backend/adapters/storage/hostinger-server-upload.js", () => ({
  uploadBufferToHostinger: vi.fn(),
}));

vi.mock("@/backend/adapters/storage/storage.factory.js", () => ({
  getStorageProviderName: () => "hostinger",
}));

import { fetchRemoteImage } from "@/backend/lib/fetch-remote-image.js";
import { validateMediaUpload } from "@/backend/validators/media-upload.validator.js";
import { uploadBufferToHostinger } from "@/backend/adapters/storage/hostinger-server-upload.js";
import { MediaService } from "@/backend/services/media.service.js";

describe("MediaService.importFromUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HOSTINGER_PUBLIC_BASE_URL = "https://cdn.example.hostingersite.com";
    process.env.HOSTINGER_MEDIA_API_BASE_URL = "https://cdn.example.hostingersite.com/media-api";
    process.env.HOSTINGER_MEDIA_SIGNING_SECRET = "test-secret-at-least-32-chars!!";
  });

  it("fetches, uploads, and finalizes a remote image", async () => {
    const buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    fetchRemoteImage.mockResolvedValue({
      buffer,
      contentType: "image/png",
      finalUrl: "https://images.example.com/pic.png",
    });
    validateMediaUpload.mockResolvedValue({
      resourceType: "image",
      mimeType: "image/png",
      format: "png",
      sizeBytes: buffer.length,
    });
    uploadBufferToHostinger.mockResolvedValue({
      mediaId: "m1",
      storageKey: "media/2026/10/01TEST.png",
      bytes: buffer.length,
      sha256: "abc",
      format: "png",
    });

    const repo = {
      create: vi.fn().mockResolvedValue({
        id: "m1",
        status: "pending",
        storage_key: "media/2026/10/01TEST.png",
        size_bytes: buffer.length,
        format: "png",
      }),
      findById: vi.fn().mockResolvedValue({
        id: "m1",
        status: "pending",
        storage_key: "media/2026/10/01TEST.png",
        size_bytes: buffer.length,
        format: "png",
      }),
      finalizePending: vi.fn().mockResolvedValue({
        id: "m1",
        status: "ready",
        url: "https://cdn.example.hostingersite.com/media/2026/10/01TEST.png",
        storage_key: "media/2026/10/01TEST.png",
        resource_type: "image",
        storage_provider: "hostinger",
      }),
      markFailed: vi.fn(),
    };

    const storage = {
      getThumbnailUrl: () => null,
      delete: vi.fn(),
    };

    // finalize verifies HMAC receipt — stub verify by mocking finalizeUpload path
    const service = new MediaService(repo, storage);
    vi.spyOn(service, "createUploadSession").mockResolvedValue({
      mediaId: "m1",
      storageKey: "media/2026/10/01TEST.png",
      ticket: { v: 1 },
      endpoints: { upload: "https://cdn.example.hostingersite.com/media-api/upload.php" },
      useChunked: false,
      chunkSize: 5_000_000,
    });
    vi.spyOn(service, "finalizeUpload").mockResolvedValue({
      id: "m1",
      url: "https://cdn.example.hostingersite.com/media/2026/10/01TEST.png",
      resource_type: "image",
    });

    const media = await service.importFromUrl("https://images.example.com/pic.png");
    expect(fetchRemoteImage).toHaveBeenCalled();
    expect(uploadBufferToHostinger).toHaveBeenCalled();
    expect(service.finalizeUpload).toHaveBeenCalled();
    expect(media.url).toContain("/media/");
  });

  it("rejects already-hosted Hostinger URLs", async () => {
    const service = new MediaService({}, {});
    await expect(
      service.importFromUrl(
        "https://cdn.example.hostingersite.com/media/2026/10/a.png",
      ),
    ).rejects.toThrow(/already hosted/i);
  });
});
