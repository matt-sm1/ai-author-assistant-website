import { omnichannelImages } from "@/content/media";

export const omnichannelAccordionContent = {
  heading: "Manage Every Reader Conversation From One Place",
  description:
    "Connect every messaging channel to one hub so no reader conversation ever slips through the cracks.",
  image: omnichannelImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "one-inbox",
  items: [
    {
      id: "one-inbox",
      title: "Bring Every Channel Into One Inbox",
      image: omnichannelImages.itemInbox,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Receive messages from every connected channel in a single inbox.",
    },
    {
      id: "one-ai",
      title: "Keep One AI Experience Everywhere",
      image: omnichannelImages.itemOneAi,
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "human-anytime",
      title: "Switch Between AI & Human Anytime",
      image: omnichannelImages.itemHuman,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Hand any conversation to your team, or let AuthorBot take it back.",
    },
  ],
};
