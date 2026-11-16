import { widgetImages } from "@/content/media";

export const widgetCardsContent = {
  heading: "Everything You Need To Engage Readers Smarter",
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "customize",
      title: "Customize Your Widget",
      description: "Customize your chatbot’s name, message, theme, and appearance.",
      icon: widgetImages.iconCustomize,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "books",
      title: "Book Suggestions",
      description: "Help readers discover books that match their interests.",
      icon: widgetImages.iconBooks,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "support",
      title: "24/7 AI Support",
      description: "Answer questions and guide readers anytime.",
      icon: widgetImages.iconSupport,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "leads",
      title: "Reader Lead Capture",
      description: "Collect visitor names and emails effortlessly.",
      icon: widgetImages.iconLeads,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "integration",
      title: "Easy Website Integration",
      description: "Add AuthorBot to your website with a simple code.",
      icon: widgetImages.iconIntegration,
      background: "#eaefff",
      row: 2,
    },
  ],
};
