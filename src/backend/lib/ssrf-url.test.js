import { describe, expect, it } from "vitest";
import { parseHttpsImportUrl, assertPublicHostname } from "@/backend/lib/ssrf-url";

describe("parseHttpsImportUrl", () => {
  it("accepts https URLs", () => {
    const url = parseHttpsImportUrl("https://images.example.com/a.png");
    expect(url.hostname).toBe("images.example.com");
  });

  it("rejects http", () => {
    expect(() => parseHttpsImportUrl("http://images.example.com/a.png")).toThrow(
      /HTTPS/i,
    );
  });

  it("rejects credentials", () => {
    expect(() =>
      parseHttpsImportUrl("https://user:pass@images.example.com/a.png"),
    ).toThrow(/credentials/i);
  });
});

describe("assertPublicHostname", () => {
  it("rejects localhost", async () => {
    await expect(assertPublicHostname("localhost")).rejects.toThrow(/not allowed/i);
  });

  it("rejects private IPv4 literals", async () => {
    await expect(assertPublicHostname("127.0.0.1")).rejects.toThrow(/not allowed/i);
    await expect(assertPublicHostname("10.0.0.5")).rejects.toThrow(/not allowed/i);
    await expect(assertPublicHostname("192.168.1.1")).rejects.toThrow(/not allowed/i);
  });
});
