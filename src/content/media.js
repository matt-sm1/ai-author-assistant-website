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

/** Shared vector trust logos (Figma) — used by home + features marquee */
export const trustLogos = [
  mediaPath("/images/features/trust/logo-1.svg"),
  mediaPath("/images/features/trust/logo-2.svg"),
  mediaPath("/images/features/trust/logo-3.svg"),
  mediaPath("/images/features/trust/logo-4.svg"),
  mediaPath("/images/features/trust/logo-5.svg"),
  mediaPath("/images/features/trust/logo-6.svg"),
  mediaPath("/images/features/trust/logo-7.svg"),
  mediaPath("/images/features/trust/logo-8.svg"),
  mediaPath("/images/features/trust/logo-9.svg"),
];

export const homeImages = {
  heroBanner: mediaPath("/images/home/hero_banner.webp"),
  heroBanner1: mediaPath("/images/home/hero_banner_1.webp"),
  heroBanner2: mediaPath("/images/home/hero_banner_2.webp"),
  heroBot: mediaPath("/images/home/hero_bot.webp"),
  heroBottom: mediaPath("/images/home/hero_bottom.webp"),
  trusted: mediaPath("/images/home/trusted.webp"),
  trustLogos,
  cta: mediaPath("/images/home/cta.webp"),
};

export const featureImages = {
  heroBg: mediaPath("/images/features/hero-bg.png"),
  heroComposite: mediaPath("/images/features/hero-composite.png"),
  star: mediaPath("/images/features/star.svg"),
  engagementDashboard: mediaPath("/images/features/engagement-dashboard.png"),
  profilesTable: mediaPath("/images/features/profiles-table.png"),
  performanceSummary: mediaPath("/images/features/performance-summary.png"),
  smartScheduling: mediaPath("/images/features/smart-scheduling.png"),
  actionableInsights: mediaPath("/images/features/actionable-insights.png"),
  integrationsBg: mediaPath("/images/features/integrations-bg.png"),
  iconAddBooks: mediaPath("/images/features/adv-add-books.png"),
  iconConversations: mediaPath("/images/features/adv-conversations.png"),
  iconBrand: mediaPath("/images/features/adv-brand.png"),
  iconInsights: mediaPath("/images/features/adv-insights.png"),
  iconChannels: mediaPath("/images/features/adv-channels.png"),
  trustLogos,
  cta: mediaPath("/images/home/cta.webp"),
};
