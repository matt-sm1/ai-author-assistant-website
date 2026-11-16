import { aiChatBotImages } from "@/content/media";

const sharedDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const aiChatBotShowcaseContent = {
  cards: [
    {
      id: "easy-website-setup",
      title: "Easy Website Setup",
      description: sharedDescription,
      image: aiChatBotImages.showcaseEasySetup,
      imageAlt: "AuthorBot chat showing the easy website setup steps",
    },
    {
      id: "custom-bot-personalities",
      title: "Custom Bot Personalities",
      description: sharedDescription,
      image: aiChatBotImages.showcaseCustomPersonalities,
      imageAlt: "AuthorBot chat showing custom bot personality options",
    },
    {
      id: "smarter-conversations",
      title: "Smarter Conversations",
      description: sharedDescription,
      image: aiChatBotImages.showcaseSmarterConversations,
      imageAlt: "AuthorBot chat showing reader recommendations",
    },
  ],
};
