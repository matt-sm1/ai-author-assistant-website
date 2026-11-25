import { supportImages } from "@/content/media";

export const supportAccordionContent = {
  heading: "Expert Support For Every Step Of Your AuthorBot Journey",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to create a seamless experience on your author website.",
  image: supportImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "setup",
  items: [
    {
      id: "help",
      title: "Get Help When Something Goes Wrong",
      image: supportImages.itemTechnical,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description:
        "Get quick answers to technical questions and step-by-step fixes for common issues.",
    },
    {
      id: "setup",
      title: "Get Guided Through Setup & Integrations",
      image: supportImages.itemSetup,
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "account",
      title: "Manage Your Account With Confidence",
      image: supportImages.itemAccount,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description:
        "Review your billing, subscription, and account settings whenever you need them.",
    },
  ],
};
