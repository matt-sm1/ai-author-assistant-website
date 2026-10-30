import { describe, expect, it } from "vitest";
import { buildPostJsonLd, stringifyJsonLd } from "./build-post-json-ld";

const ctx = {
  postUrl: "https://authoraiassistant.com/blogs/hello",
  marketingSiteUrl: "https://authoraiassistant.com",
  siteUrl: "https://authoraiassistant.com/blogs",
  publisherLogoUrl: "https://authoraiassistant.com/images/brand/logo.webp",
};

describe("buildPostJsonLd", () => {
  it("returns null without a headline", () => {
    expect(buildPostJsonLd({ title: "", seo_title: "" }, ctx)).toBeNull();
  });

  it("builds BlogPosting and BreadcrumbList", () => {
    const graph = buildPostJsonLd(
      {
        title: "Hello",
        seo_title: "Hello SEO",
        slug: "hello",
        excerpt: "Ex",
        featured_image: "https://cdn.example/media/a.png",
        published_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-02T00:00:00.000Z",
        author: { name: "Ada", avatarUrl: "https://cdn.example/a.png" },
        category_name: "News",
        tags: [{ name: "ai" }],
        faq_items: [],
        content: "",
        schema_json_ld: null,
      },
      ctx,
    );

    expect(graph["@context"]).toBe("https://schema.org");
    expect(graph["@graph"][0]["@type"]).toBe("BlogPosting");
    expect(graph["@graph"][0].headline).toBe("Hello SEO");
    expect(graph["@graph"][0].dateModified).toBe("2026-01-02T00:00:00.000Z");
    expect(graph["@graph"][1]["@type"]).toBe("BreadcrumbList");
    expect(graph["@graph"][1].itemListElement).toHaveLength(3);
  });

  it("adds FAQPage from CMS and HTML, CMS wins duplicates", () => {
    const graph = buildPostJsonLd(
      {
        title: "Post",
        content:
          '<details><summary>Shared?</summary><p>From HTML</p></details><details><summary>Only HTML?</summary><p>Yes</p></details>',
        faq_items: [{ question: "Shared?", answer: "From CMS" }],
        schema_json_ld: null,
      },
      ctx,
    );

    const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(2);
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe("From CMS");
    expect(faq.mainEntity[1].name).toBe("Only HTML?");
  });

  it("appends manual nodes after auto graph", () => {
    const graph = buildPostJsonLd(
      {
        title: "Post",
        content: "",
        faq_items: [],
        schema_json_ld: '{"@type":"Thing","name":"Extra"}',
      },
      ctx,
    );
    expect(graph["@graph"].at(-1)).toEqual({ "@type": "Thing", name: "Extra" });
  });

  it("omits empty image and escapes script stringify", () => {
    const graph = buildPostJsonLd(
      { title: "T", content: "", faq_items: [], schema_json_ld: null },
      ctx,
    );
    expect(graph["@graph"][0]).not.toHaveProperty("image");
    expect(stringifyJsonLd({ a: "<b>" })).toContain("\\u003c");
  });
});
