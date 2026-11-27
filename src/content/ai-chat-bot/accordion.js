import { aiChatBotImages } from "@/content/media";

export const aiChatBotAccordionContent = {
  heading: "Turn Every Website Visit Into A Helpful Conversation",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to fit your brand and engage readers from the first message.",
  image: aiChatBotImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "truly-yours",
  items: [
    {
      id: "truly-yours",
      title: "Make AuthorBot Truly Yours",
      image: aiChatBotImages.itemPersonality,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Adjust the name, colors, and welcome message so the chatbot matches your brand.",
    },
    {
      id: "instant-guidance",
      title: "Give Readers Instant Book Guidance",
      image: aiChatBotImages.itemGuidance,
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "opportunities",
      title: "Turn Conversations Into Opportunities",
      image: aiChatBotImages.itemOpportunities,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Turn every chat into a recommendation, a sale, or a new reader on your list.",
    },
  ],
};
