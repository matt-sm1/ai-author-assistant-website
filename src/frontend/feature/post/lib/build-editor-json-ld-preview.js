import { buildPostJsonLd } from "@/frontend/feature/blog/lib/build-post-json-ld";
import { extractFaqFromHtml } from "@/frontend/feature/blog/lib/extract-faq-from-html";
import {
  getMarketingSiteUrl,
  getPublicSiteUrl,
  publicPostUrl,
} from "@/frontend/feature/blog/lib/site-urls";

/**
 * Map PostEditor form state → public-post shape for live JSON-LD preview.
 * @param {object} form
 * @param {{ includeManual?: boolean }} [options]
 */
export function mapEditorFormToPublicPost(form) {
  if (!form || typeof form !== "object") return null;

  return {
    title: form.title ?? "",
    slug: form.slug || "preview-draft",
    content: form.content ?? "",
    excerpt: form.excerpt ?? "",
    featured_image: form.featuredImage || null,
    published_at: form.publishDate || null,
    updated_at: null,
    seo_title: form.seoTitle || null,
    meta_description: form.metaDescription || null,
    category_name: null,
    category_slug: null,
    author: form.author?.name
      ? {
          name: form.author.name,
          avatarUrl: form.author.avatarUrl ?? form.author.avatar_url ?? null,
        }
      : null,
    tags: Array.isArray(form.tags)
      ? form.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        }))
      : [],
    faq_items: Array.isArray(form.faqItems) ? form.faqItems : [],
    schema_json_ld: null,
  };
}

/**
 * Live schema preview for the SEO panel.
 * @param {object} form - PostEditor formData-like object (sidebar `post` + content)
 * @param {{ includeManual?: boolean }} [options]
 */
export function buildEditorJsonLdPreview(form, { includeManual = false } = {}) {
  const publicPost = mapEditorFormToPublicPost(form);
  if (!publicPost) return null;

  if (includeManual && form.schemaJsonLd?.trim()) {
    publicPost.schema_json_ld = form.schemaJsonLd.trim();
  }

  const marketingSiteUrl = getMarketingSiteUrl();
  const siteUrl = getPublicSiteUrl();
  const postUrl = publicPostUrl(publicPost.slug);

  return buildPostJsonLd(publicPost, {
    postUrl,
    marketingSiteUrl,
    siteUrl,
    publisherLogoUrl: `${marketingSiteUrl}/images/brand/logo.webp`,
  });
}

export function getDetectedFaqsFromEditor(form) {
  return extractFaqFromHtml(form?.content ?? "");
}
