import { crmImages } from "@/content/media";

export const crmAccordionContent = {
  heading: "Manage Every Reader Conversation From One Place",
  description:
    "Customize how AuthorBot looks, welcomes visitors, and starts conversations to create a seamless experience on your author website.",
  image: crmImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "auto-open",
  items: [
    {
      id: "reader-profile",
      title: "Build A Complete Reader Profile",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Capture what each reader cares about to shape every conversation.",
    },
    {
      id: "auto-open",
      title: "Understand Their Journey Over Time",
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "reader-interest",
      title: "Turn Reader Interest Into Action",
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Guide interested readers toward their next purchase at the right time.",
    },
  ],
};
