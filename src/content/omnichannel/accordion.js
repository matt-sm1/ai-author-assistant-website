import { omnichannelImages } from "@/content/media";

export const omnichannelAccordionContent = {
  heading: "Manage Every Reader Conversation From One Place",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to create a seamless experience on your author website.",
  image: omnichannelImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "one-ai",
  items: [
    {
      id: "one-inbox",
      title: "Bring Every Channel Into One Inbox",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Receive messages from every connected channel in a single inbox.",
    },
    {
      id: "one-ai",
      title: "Keep One AI Experience Everywhere",
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "human-anytime",
      title: "Switch Between AI & Human Anytime",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Hand any conversation to your team, or let AuthorBot take it back.",
    },
  ],
};
