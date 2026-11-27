import { describe, expect, it } from "vitest";
import { mediaMetadataSchema } from "@/frontend/feature/media/schema/media.schema";

describe("mediaMetadataSchema", () => {
  it("accepts optional title with other metadata fields", async () => {
    const result = await mediaMetadataSchema.validate(
      {
        title: "Hero illustration",
        alt_text: "Robot waving",
        caption: "",
        description: "",
      },
      { abortEarly: false, stripUnknown: true },
    );

    expect(result.title).toBe("Hero illustration");
    expect(result.alt_text).toBe("Robot waving");
  });

  it("rejects title over 255 characters", async () => {
    await expect(
      mediaMetadataSchema.validate({
        title: "x".repeat(256),
        alt_text: "",
        caption: "",
        description: "",
      }),
    ).rejects.toThrow(/Title cannot exceed/);
  });
});