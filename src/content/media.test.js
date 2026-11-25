import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { featureImages, integrationImages } from "./media";

describe("marketing WebP assets", () => {
  it("resolves the replacement images with their original dimensions", async () => {
    const assets = [
      [featureImages.heroBg, 3042, 2602],
      [featureImages.heroComposite, 2288, 1288],
      [featureImages.engagementDashboard, 1200, 846],
      [featureImages.profilesTable, 1200, 852],
      [featureImages.performanceSummary, 844, 564],
      [featureImages.smartScheduling, 672, 518],
      [featureImages.actionableInsights, 616, 544],
      [featureImages.integrationsBg, 2276, 770],
      ...[
        featureImages.iconAddBooks,
        featureImages.iconConversations,
        featureImages.iconBrand,
        featureImages.iconInsights,
        featureImages.iconChannels,
      ].map((src) => [src, 120, 120]),
      [integrationImages.heroBg, 3042, 1446],
      [integrationImages.hub, 2276, 770],
      ...[
        integrationImages.messenger,
        integrationImages.instagram,
        integrationImages.web,
        integrationImages.whatsapp,
        integrationImages.discord,
        integrationImages.gmail,
        integrationImages.telegram,
        integrationImages.slack,
      ].map((src) => [src, 124, 118]),
    ];

    for (const [src, width, height] of assets) {
      expect(src).toMatch(/^\/images\/.*\.webp$/);
      const metadata = await sharp(path.join(process.cwd(), "public", src)).metadata();
      expect(metadata).toMatchObject({ format: "webp", width, height });
    }
  });

  it("reuses the shared integration hub artwork", () => {
    expect(integrationImages.hub).toBe(featureImages.integrationsBg);
  });
});
