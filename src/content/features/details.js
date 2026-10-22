import { featureImages } from "@/content/media";

export const featuresDetailsContent = {
  badge: "AUTHORBOT ADVANTAGES",
  headingLine1: "Small Details.",
  headingLine2: "Smarter Reader Experiences.",
  description:
    "We offer a wide range of benefits designed to help you solve clients issue faster & make more profit.",
  items: [
    {
      id: "add-books",
      title: "Add Books in Minutes",
      description:
        "Import book details using a URL so you can get your AI assistant ready without complicated setup.",
      icon: featureImages.iconAddBooks,
    },
    {
      id: "conversations",
      title: "Smarter Reader Conversations",
      description:
        "Give relevant answers about your books while using custom Q&A settings to keep conversations aligned.",
      icon: featureImages.iconConversations,
    },
    {
      id: "brand",
      title: "Match Your Author Brand",
      description:
        "Customize the chatbot’s appearance and welcome experience so it feels like a natural part of your website.",
      icon: featureImages.iconBrand,
    },
    {
      id: "insights",
      title: "See What Readers Care About",
      description:
        "Track chatbot activity, reader conversations, and performance to better understand how people interact.",
      icon: featureImages.iconInsights,
    },
    {
      id: "channels",
      title: "Connect Across Channels",
      description:
        "Bring AuthorBot to your website and supported communication platforms so readers can engage.",
      icon: featureImages.iconChannels,
    },
  ],
  help: {
    title: "Need Help Getting Started?",
    description:
      "Our support team is ready to help with setup, configuration, and questions whenever you need assistance.",
    buttonLabel: "Contact Us",
    buttonHref: "/#contact",
  },
};
