import { describe, expect, it } from "vitest";
import { parseManualJsonLd } from "./parse-manual-json-ld";

describe("parseManualJsonLd", () => {
  it("returns empty for invalid or empty input", () => {
    expect(parseManualJsonLd(null)).toEqual([]);
    expect(parseManualJsonLd("")).toEqual([]);
    expect(parseManualJsonLd("not-json")).toEqual([]);
    expect(parseManualJsonLd('"string"')).toEqual([]);
  });

  it("normalizes object, array, and @graph", () => {
    expect(parseManualJsonLd('{"@type":"Thing","@context":"https://schema.org"}')).toEqual([
      { "@type": "Thing" },
    ]);
    expect(parseManualJsonLd('[{"@type":"Thing"}]')).toEqual([{ "@type": "Thing" }]);
    expect(
      parseManualJsonLd(
        '{"@context":"https://schema.org","@graph":[{"@type":"Thing","name":"X"}]}',
      ),
    ).toEqual([{ "@type": "Thing", name: "X" }]);
  });
});
