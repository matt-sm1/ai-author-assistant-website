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
  heroBg: mediaPath("/images/features/hero-bg.webp"),
  heroComposite: mediaPath("/images/features/hero-composite.webp"),
  star: mediaPath("/images/features/star.svg"),
  engagementDashboard: mediaPath("/images/features/engagement-dashboard.webp"),
  profilesTable: mediaPath("/images/features/profiles-table.webp"),
  performanceSummary: mediaPath("/images/features/performance-summary.webp"),
  smartScheduling: mediaPath("/images/features/smart-scheduling.webp"),
  actionableInsights: mediaPath("/images/features/actionable-insights.webp"),
  integrationsBg: mediaPath("/images/features/integrations-bg.webp"),
  iconAddBooks: mediaPath("/images/features/adv-add-books.webp"),
  iconConversations: mediaPath("/images/features/adv-conversations.webp"),
  iconBrand: mediaPath("/images/features/adv-conversations.webp"),
  iconInsights: mediaPath("/images/features/adv-insights.webp"),
  iconChannels: mediaPath("/images/features/adv-channels.webp"),
  trustLogos,
  cta: mediaPath("/images/home/cta.webp"),
};

export const integrationImages = {
  heroBg: mediaPath("/images/integrations/hero-bg.webp"),
  hub: mediaPath("/images/features/integrations-bg.webp"),
  messenger: mediaPath("/images/integrations/messenger.webp"),
  instagram: mediaPath("/images/integrations/instagram.webp"),
  web: mediaPath("/images/integrations/web.webp"),
  whatsapp: mediaPath("/images/integrations/whatsapp.webp"),
  discord: mediaPath("/images/integrations/discord.webp"),
  gmail: mediaPath("/images/integrations/gmail.webp"),
  telegram: mediaPath("/images/integrations/telegram.webp"),
  slack: mediaPath("/images/integrations/slack.webp"),
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
  itemCustomize: mediaPath("/images/widget/item-customize.webp"),
  itemPlacement: mediaPath("/images/widget/item-integration.webp"),
  itemLeads: mediaPath("/images/widget/item-leads.webp"),
  cardPerformance: mediaPath("/images/widget/card-performance.webp"),
  cardScheduling: mediaPath("/images/widget/card-scheduling.webp"),
  cardInsights: mediaPath("/images/widget/card-insights.webp"),
  videoPoster: mediaPath("/images/widget/video-poster.webp"),
};

/** Dedicated Support Feature page — cropped from the Live Chat 2.0 mockups (public/images/support). */
export const supportImages = {
  heroRobot: mediaPath("/images/support/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/support/accordion-illustration.webp"),
  itemTechnical: mediaPath("/images/support/item-technical.webp"),
  itemSetup: mediaPath("/images/support/item-setup.webp"),
  itemAccount: mediaPath("/images/support/item-account.webp"),
  showcaseTechnical: mediaPath("/images/support/showcase-technical.webp"),
  showcaseSetup: mediaPath("/images/support/showcase-setup.webp"),
  showcaseAccount: mediaPath("/images/support/showcase-account.webp"),
  videoBanner: mediaPath("/images/support/video-banner.webp"),
};

/** Analytics Feature page — cropped from the Live Chat 2.0 (4) mockup (public/images/analytics). */
export const analyticsImages = {
  heroRobot: mediaPath("/images/analytics/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/analytics/accordion-illustration.webp"),
  itemPerformance: mediaPath("/images/analytics/item-performance.webp"),
  itemEngagement: mediaPath("/images/analytics/item-engagement.webp"),
  itemInsights: mediaPath("/images/analytics/item-insights.webp"),
  showcasePerformance: mediaPath("/images/analytics/showcase-performance.webp"),
  showcaseEngagement: mediaPath("/images/analytics/showcase-engagement.webp"),
  showcaseInsights: mediaPath("/images/analytics/showcase-insights.webp"),
  videoBanner: mediaPath("/images/analytics/video-banner.webp"),
};

/** Omnichannel Inbox Feature page — cropped from the Live Chat 2.0 (5) mockup (public/images/omnichannel). */
export const omnichannelImages = {
  heroRobot: mediaPath("/images/omnichannel/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/omnichannel/accordion-illustration.webp"),
  itemInbox: mediaPath("/images/omnichannel/item-inbox.webp"),
  itemOneAi: mediaPath("/images/omnichannel/item-one-ai.webp"),
  itemHuman: mediaPath("/images/omnichannel/item-human.webp"),
  showcaseInbox: mediaPath("/images/omnichannel/showcase-inbox.webp"),
  showcasePlatform: mediaPath("/images/omnichannel/showcase-platform.webp"),
  showcaseHandoff: mediaPath("/images/omnichannel/showcase-handoff.webp"),
  videoBanner: mediaPath("/images/omnichannel/video-banner.webp"),
};

/** CRM Feature page — cropped from the Live Chat 2.0 (6) mockup (public/images/crm). */
export const crmImages = {
  heroRobot: mediaPath("/images/crm/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/crm/accordion-illustration.webp"),
  itemReaderProfile: mediaPath("/images/crm/item-reader-profile.webp"),
  itemJourney: mediaPath("/images/crm/item-journey.webp"),
  itemReaderAction: mediaPath("/images/crm/item-reader-action.webp"),
  showcaseOverview: mediaPath("/images/crm/showcase-overview.webp"),
  showcaseActivity: mediaPath("/images/crm/showcase-activity.webp"),
  showcaseInsights: mediaPath("/images/crm/showcase-insights.webp"),
  videoBanner: mediaPath("/images/crm/video-banner.webp"),
};

/** Upload Book Feature page — cropped from the Live Chat 2.0 (7) mockup (public/images/upload-book). */
export const uploadBookImages = {
  heroRobot: mediaPath("/images/upload-book/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/upload-book/accordion-illustration.webp"),
  itemAddBooks: mediaPath("/images/upload-book/item-add-books.webp"),
  itemAvailability: mediaPath("/images/upload-book/item-availability.webp"),
  itemGuideReaders: mediaPath("/images/upload-book/item-guide-readers.webp"),
  showcaseManualUpload: mediaPath("/images/upload-book/showcase-manual-upload.webp"),
  showcaseImportUrl: mediaPath("/images/upload-book/showcase-import-url.webp"),
  showcaseDistribution: mediaPath("/images/upload-book/showcase-distribution.webp"),
  videoBanner: mediaPath("/images/upload-book/video-banner.webp"),
};

/** AI Chat Bot Feature page — cropped from the Live Chat 2.0 (8) mockup (public/images/ai-chat-bot). */
export const aiChatBotImages = {
  heroRobot: mediaPath("/images/ai-chat-bot/hero-robot.webp"),
  accordionIllustration: mediaPath("/images/ai-chat-bot/accordion-illustration.webp"),
  itemPersonality: mediaPath("/images/ai-chat-bot/item-personality.webp"),
  itemGuidance: mediaPath("/images/ai-chat-bot/item-guidance.webp"),
  itemOpportunities: mediaPath("/images/ai-chat-bot/item-opportunities.webp"),
  showcaseEasySetup: mediaPath("/images/ai-chat-bot/showcase-easy-setup.webp"),
  showcaseCustomPersonalities: mediaPath("/images/ai-chat-bot/showcase-custom-personalities.webp"),
  showcaseSmarterConversations: mediaPath("/images/ai-chat-bot/showcase-smarter-conversations.webp"),
  videoBanner: mediaPath("/images/ai-chat-bot/video-banner.webp"),
};

/** Contact Feature page — cropped from the Live Chat 2.0 (9) mockup (public/images/contact). */
export const contactImages = {
  heroRobot: mediaPath("/images/contact/hero-robot.webp"),
};
