import { omnichannelImages } from "@/content/media";

// Descriptions are copied from the analytics mockup; the Omnichannel mockup shows the same text.
const showcaseDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const omnichannelShowcaseContent = {
  cards: [
    {
      id: "inbox",
      title: "One Inbox, Every Channel",
      description: showcaseDescription,
      image: omnichannelImages.showcaseInbox,
      imageAlt: "AuthorBot chat showing messages from every channel in one inbox",
    },
    {
      id: "platform",
      title: "One AI Across Every Platform",
      description: showcaseDescription,
      image: omnichannelImages.showcasePlatform,
      imageAlt: "AuthorBot chat showing AI and human handoff across platforms",
    },
    {
      id: "handoff",
      title: "AI & Human Handoff",
      description: showcaseDescription,
      image: omnichannelImages.showcaseHandoff,
      imageAlt: "AuthorBot chat showing a conversation hand-off to a team member",
    },
  ],
};
