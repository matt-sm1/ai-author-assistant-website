import { widgetImages } from "@/content/media";

export const widgetPersonalizeContent = {
  headingLine1: "Make Every Reader Interaction Feel",
  headingLine2: "Personal",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to create a seamless experience on your author website.",
  image: widgetImages.personalizeIllustration,
  imageAlt:
    "AuthorBot robot beside a website window with a chat widget and an embed code snippet",
  defaultOpen: 1,
  items: [
    {
      id: "personalize",
      title: "Personalize Your Chatbot",
      description:
        "Customize your chatbot's name, message, theme, and appearance.",
    },
    {
      id: "placement",
      title: "Control When & Where It Appears",
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "leads",
      title: "Capture Leads Through Conversations",
      description: "Collect visitor names and emails effortlessly.",
    },
  ],
};
