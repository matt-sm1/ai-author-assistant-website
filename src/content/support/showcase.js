import { supportImages } from "@/content/media";

const showcaseDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const supportShowcaseContent = {
  cards: [
    {
      id: "technical",
      title: "Technical Support",
      description: showcaseDescription,
      image: supportImages.showcaseTechnical,
      imageAlt: "AuthorBot chat showing a technical support conversation",
    },
    {
      id: "setup",
      title: "Setup Assistance",
      description: showcaseDescription,
      image: supportImages.showcaseSetup,
      imageAlt: "AuthorBot chat showing setup and integration help",
    },
    {
      id: "account",
      title: "Account Guidance",
      description: showcaseDescription,
      image: supportImages.showcaseAccount,
      imageAlt: "AuthorBot chat showing account and billing guidance",
    },
  ],
};
