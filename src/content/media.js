/**
 * Media path helpers. Swap MEDIA_BASE for a CDN origin later without rewriting sections.
 * Example: export const MEDIA_BASE = "https://cdn.example.com";
 */
export const MEDIA_BASE = "";

export function mediaPath(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE}${normalized}`;
}

export const brandLogo = mediaPath("/images/brand/logo.webp");
export const homeImages = {
  heroBanner: mediaPath("/images/home/hero_banner.webp"),
  heroBanner1: mediaPath("/images/home/hero_banner_1.webp"),
  heroBanner2: mediaPath("/images/home/hero_banner_2.webp"),
  heroBot: mediaPath("/images/home/hero_bot.webp"),
  heroBottom: mediaPath("/images/home/hero_bottom.webp"),
  trusted: mediaPath("/images/home/trusted.webp"),
  cta: mediaPath("/images/home/cta.webp"),
};
