/**
 * Strip CMS-only fields from a post row for public JSON / SSR.
 *
 * This is the canonical API boundary for Hostinger media URLs (ADR 0003).
 * All Hostinger /media/ URLs are normalised here — flat canonical + ?v= —
 * so every downstream consumer (SSR, OG meta, RSS, blog listing, post page)
 * receives clean URLs without additional per-site transforms.
 */
import {
  toCanonicalHostingerMediaUrl,
  rewriteHostingerMediaUrlsInHtml,
} from "@/shared/hostinger-media-url";

export function toPublicPost(post) {
  if (!post) return null;

  return {
    id: post.id,
    title: post.title ?? "",
    slug: post.slug ?? "",
    // Rewrite nested /media/media/... → flat /media/... + ?v= in HTML body
    content: rewriteHostingerMediaUrlsInHtml(post.content ?? ""),
    excerpt: post.excerpt ?? "",
    // Normalise featured image URL once so all consumers are correct
    featured_image: toCanonicalHostingerMediaUrl(post.featured_image ?? null),
    published_at: post.published_at ?? null,
    seo_title: post.seo_title ?? null,
    meta_description: post.meta_description ?? null,
    category_name: post.category_name ?? null,
    category_slug: post.category_slug ?? null,
    author: post.author
      ? {
          name: post.author.name ?? "",
          avatarUrl: post.author.avatarUrl ?? post.author.avatar_url ?? null,
        }
      : null,
    tags: Array.isArray(post.tags)
      ? post.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        }))
      : [],
  };
}

/** Listing cards — never include HTML body. */
export function toPublicPostList(post) {
  const full = toPublicPost(post);
  if (!full) return null;
  const { content: _content, ...rest } = full;
  return rest;
}
