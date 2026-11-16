import { crmImages } from "@/content/media";

const sharedDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const crmShowcaseContent = {
  cards: [
    {
      id: "reader-overview",
      title: "Reader Overview",
      description: sharedDescription,
      image: crmImages.showcaseOverview,
      imageAlt: "AuthorBot chat showing a reader overview summary",
    },
    {
      id: "reader-activity",
      title: "Reader Activity Tracking",
      description: sharedDescription,
      image: crmImages.showcaseActivity,
      imageAlt: "AuthorBot chat showing reader activity tracking charts",
    },
    {
      id: "actionable-insights",
      title: "Actionable Reader Insights",
      description: sharedDescription,
      image: crmImages.showcaseInsights,
      imageAlt: "AuthorBot chat showing actionable reader insights",
    },
  ],
};
