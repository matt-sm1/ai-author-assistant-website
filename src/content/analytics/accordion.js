import { analyticsImages } from "@/content/media";

export const analyticsAccordionContent = {
  heading: "See What Your AuthorBot Is Really Achieving",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to create a seamless experience on your author website.",
  image: analyticsImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "engagement",
  items: [
    {
      id: "performance",
      title: "Understand Your Performance At A Glance",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "See sessions, unique visitors, and link clicks in one summary view.",
    },
    {
      id: "engagement",
      title: "See How Engagement Changes Over Time",
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "measure",
      title: "Measure What Drives Reader Action",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description:
        "Track which conversations lead to link clicks and purchases so you know what works.",
    },
  ],
};
