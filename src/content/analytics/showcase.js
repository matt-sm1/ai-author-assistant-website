import { analyticsImages } from "@/content/media";

const showcaseDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const analyticsShowcaseContent = {
  cards: [
    {
      id: "performance",
      title: "Performance Summary",
      description: showcaseDescription,
      image: analyticsImages.showcasePerformance,
      imageAlt: "AuthorBot chat showing a performance summary",
    },
    {
      id: "engagement",
      title: "Engagement Trends",
      description: showcaseDescription,
      image: analyticsImages.showcaseEngagement,
      imageAlt: "AuthorBot chat showing engagement trends over 30 days",
    },
    {
      id: "insights",
      title: "Actionable Insights",
      description: showcaseDescription,
      image: analyticsImages.showcaseInsights,
      imageAlt: "AuthorBot chat showing actionable insights and recommendations",
    },
  ],
};
