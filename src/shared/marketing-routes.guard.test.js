import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { RESERVED_SLUGS } from "@/shared/slug";

describe("Marketing route guardrails", () => {
  it("does not claim /blogs or /admin under (marketing)", () => {
    const root = path.join(process.cwd(), "src/app/(marketing)");
    expect(existsSync(path.join(root, "blogs"))).toBe(false);
    expect(existsSync(path.join(root, "admin"))).toBe(false);
  });

  it("reserves blogs and admin slugs for app routes", () => {
    expect(RESERVED_SLUGS.has("blogs")).toBe(true);
    expect(RESERVED_SLUGS.has("admin")).toBe(true);
    expect(RESERVED_SLUGS.has("api")).toBe(true);
  });
});
