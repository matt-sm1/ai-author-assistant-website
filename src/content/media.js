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

export const integrationImages = {
  heroBg: mediaPath("/images/integrations/hero-bg.png"),
  hub: mediaPath("/images/integrations/hub.png"),
  messenger: mediaPath("/images/integrations/messenger.png"),
  instagram: mediaPath("/images/integrations/instagram.png"),
  web: mediaPath("/images/integrations/web.png"),
  whatsapp: mediaPath("/images/integrations/whatsapp.png"),
  discord: mediaPath("/images/integrations/discord.png"),
  gmail: mediaPath("/images/integrations/gmail.png"),
  telegram: mediaPath("/images/integrations/telegram.png"),
  slack: mediaPath("/images/integrations/slack.png"),
  cta: mediaPath("/images/home/cta.webp"),
};

/** Widget Feature page — cropped from the Live Chat 2.0 mockups (public/images/widget). */
export const widgetImages = {
  iconCustomize: mediaPath("/images/widget/icon-customize.webp"),
  iconBooks: mediaPath("/images/widget/icon-books.webp"),
  iconSupport: mediaPath("/images/widget/icon-support.webp"),
  iconLeads: mediaPath("/images/widget/icon-leads.webp"),
  iconIntegration: mediaPath("/images/widget/icon-integration.webp"),
  personalizeIllustration: mediaPath("/images/widget/personalize-illustration.webp"),
  cardPerformance: mediaPath("/images/widget/card-performance.webp"),
  cardScheduling: mediaPath("/images/widget/card-scheduling.webp"),
  cardInsights: mediaPath("/images/widget/card-insights.webp"),
  videoPoster: mediaPath("/images/widget/video-poster.webp"),
};

/** Dedicated Support Feature page — cropped from the Live Chat 2.0 mockups (public/images/support). */
export const supportImages = {
  heroRobot: mediaPath("/images/support/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/support/accordion-illustration.webp"),
  showcaseTechnical: mediaPath("/images/support/showcase-technical.webp"),
  showcaseSetup: mediaPath("/images/support/showcase-setup.webp"),
  showcaseAccount: mediaPath("/images/support/showcase-account.webp"),
  videoBanner: mediaPath("/images/support/video-banner.webp"),
};

/** Analytics Feature page — cropped from the Live Chat 2.0 (4) mockup (public/images/analytics). */
export const analyticsImages = {
  heroRobot: mediaPath("/images/analytics/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/analytics/accordion-illustration.webp"),
  showcasePerformance: mediaPath("/images/analytics/showcase-performance.webp"),
  showcaseEngagement: mediaPath("/images/analytics/showcase-engagement.webp"),
  showcaseInsights: mediaPath("/images/analytics/showcase-insights.webp"),
  videoBanner: mediaPath("/images/analytics/video-banner.webp"),
};

/** Omnichannel Inbox Feature page — cropped from the Live Chat 2.0 (5) mockup (public/images/omnichannel). */
export const omnichannelImages = {
  heroRobot: mediaPath("/images/omnichannel/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/omnichannel/accordion-illustration.webp"),
  showcaseInbox: mediaPath("/images/omnichannel/showcase-inbox.webp"),
  showcasePlatform: mediaPath("/images/omnichannel/showcase-platform.webp"),
  showcaseHandoff: mediaPath("/images/omnichannel/showcase-handoff.webp"),
  videoBanner: mediaPath("/images/omnichannel/video-banner.webp"),
};

/** CRM Feature page — cropped from the Live Chat 2.0 (6) mockup (public/images/crm). */
export const crmImages = {
  heroRobot: mediaPath("/images/crm/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/crm/accordion-illustration.webp"),
  showcaseOverview: mediaPath("/images/crm/showcase-overview.webp"),
  showcaseActivity: mediaPath("/images/crm/showcase-activity.webp"),
  showcaseInsights: mediaPath("/images/crm/showcase-insights.webp"),
  videoBanner: mediaPath("/images/crm/video-banner.webp"),
};

/** Upload Book Feature page — cropped from the Live Chat 2.0 (7) mockup (public/images/upload-book). */
export const uploadBookImages = {
  heroRobot: mediaPath("/images/upload-book/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/upload-book/accordion-illustration.webp"),
  showcaseManualUpload: mediaPath("/images/upload-book/showcase-manual-upload.webp"),
  showcaseImportUrl: mediaPath("/images/upload-book/showcase-import-url.webp"),
  showcaseDistribution: mediaPath("/images/upload-book/showcase-distribution.webp"),
  videoBanner: mediaPath("/images/upload-book/video-banner.webp"),
};

/** AI Chat Bot Feature page — cropped from the Live Chat 2.0 (8) mockup (public/images/ai-chat-bot). */
export const aiChatBotImages = {
  heroRobot: mediaPath("/images/ai-chat-bot/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/ai-chat-bot/accordion-illustration.webp"),
  showcaseEasySetup: mediaPath("/images/ai-chat-bot/showcase-easy-setup.webp"),
  showcaseCustomPersonalities: mediaPath("/images/ai-chat-bot/showcase-custom-personalities.webp"),
  showcaseSmarterConversations: mediaPath("/images/ai-chat-bot/showcase-smarter-conversations.webp"),
  videoBanner: mediaPath("/images/ai-chat-bot/video-banner.webp"),
};

/** Contact Feature page — cropped from the Live Chat 2.0 (9) mockup (public/images/contact). */
export const contactImages = {
  heroRobot: mediaPath("/images/contact/hero-robot.webp"),
};
