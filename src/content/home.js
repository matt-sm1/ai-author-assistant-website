import article1 from "@/assets/article_1.webp";
import article2 from "@/assets/article_2.webp";
import article3 from "@/assets/article_3.webp";
import feature1 from "@/assets/feature_1.webp";
import feature2 from "@/assets/feature_2.webp";
import feature3 from "@/assets/feature_3.webp";
import feature4 from "@/assets/feature_4.webp";
import test1 from "@/assets/test_1.webp";
import test2 from "@/assets/test_2.webp";
import test3 from "@/assets/test_3.webp";
import test4 from "@/assets/test_4.webp";
import moreFeature1 from "@/assets/m_feature_1.webp";
import moreFeature2 from "@/assets/m_feature_2.webp";
import moreFeature3 from "@/assets/m_feature_3.webp";
import alwaysOn1 from "@/assets/always_1.webp";
import alwaysOn2 from "@/assets/always_2.webp";

export const heroContent = {
  badge: "AI-Powered Author Assistant",
  heading: "Turn Your Books Into a 24/7 AI Sales Assistant",
  description:
    "Leveraging cutting-edge AI and intelligent automation to streamline complex processes, eliminate manual inefficiencies, reduce operational costs.",
  buttonLabel: "Get In Touch",
  ratingLabel: "Rated by 2k+ users",
};

export const socialMediaContent = {
  badge: "Integrations",
  heading: "Integrate with 10+ Platforms",
  description:
    "Streamline your lead journey with visual progress bars, instant updates, and organized steps across your path.",
  platformLabels: {
    instagram: "Instagram",
    messenger: "Messenger",
    whatsapp: "WhatsApp",
    website: "Website",
    telegram: "Telegram",
    discord: "Discord",
    slack: "Slack",
    gmail: "Gmail",
  },
 rows: [
  {
    id: "row-primary",
    platforms: [
      "instagram",
      "messenger",
      "whatsapp",
      "website",
      "telegram",
      "discord",
      "slack",
      "gmail",
    ],
  },
  {
    id: "row-secondary",
    platforms: [
      "gmail",
      "slack",
      "discord",
      "telegram",
      "website",
      "whatsapp",
      "messenger",
      "instagram",
    ],
  },
]
};

export const advantagesContent = {
  badge: "AuthorBot Advantages",
  headingLines: ["Small Details.", "Smarter Reader Experiences."],
  description:
    "We offer a wide range of benefits designed to help you solve clients issue faster & make more profit.",
  items: [
    {
      icon: "bolt",
      title: "Add Books in Minutes",
      description:
        "Import book details using a URL so you can get your AI assistant ready without complicated setup.",
    },
    {
      icon: "conversations",
      title: "Smarter Reader Conversations",
      description:
        "Give relevant answers about your books while using custom Q&A settings to keep conversations aligned.",
    },
    {
      icon: "brand",
      title: "Match Your Author Brand",
      description:
        "Customize the chatbot's appearance and welcome experience so it feels like a natural part of your website.",
    },
    {
      icon: "insights",
      title: "See What Readers Care About",
      description:
        "Track chatbot activity, reader conversations, and performance to better understand how people interact.",
    },
    {
      icon: "channels",
      title: "Connect Across Channels",
      description:
        "Bring AuthorBot to your website and supported communication platforms so readers can engage.",
    },
  ],
  cta: {
    title: "Need Help Getting Started?",
    description:
      "Our support team is ready to help with setup, configuration, and questions whenever you need assistance.",
    buttonLabel: "Contact Us",
    href: "#contact",
  },
};

export const alwaysOnContent = {
  badge: "Always-On Experience",
  headingLines: ["Keep Readers Engaged", "Even When You’re Offline"],
  description:
    "AuthorBot keeps conversations moving around the clock while helping you stay connected to the reader activity that matters.",
  rows: [
    {
      id: "always-on-assistant",
      title: "Your AI Book Assistant Works 24/7",
      description:
        "Readers don't have to wait for you to be online. AuthorBot can answer questions about your books, recommend titles, and guide readers toward the right next step at any time.",
      buttonLabel: "Learn More",
      href: "#more-features",
      image: alwaysOn1,
      imageAlt: "AuthorBot assistant active 24/7",
    },
    {
      id: "reader-activity",
      title: "Stay Updated on Reader Activity",
      description:
        "Manage browser and email notifications so you can stay aware of important activity and respond when personal attention is needed.",
      buttonLabel: "Learn More",
      href: "#more-features",
      image: alwaysOn2,
      imageAlt: "Reader activity notifications",
    },
  ],
};

export const ctaContent = {
  badge: "Ready to grow your readership?",
  heading: "Keep Readers Engaged Even When You’re Offline",
  description:
    "AuthorBot answers questions, recommends the right books, and guides readers toward their next purchase 24/7, even when you’re offline.",
  buttonLabel: "Get In Touch",
};

export const moreFeaturesContent = {
  badge: "More Features",
  heading: "Explore the Power of AuthorBot to Engage Readers and Sell More Books",
  description:
    "Give readers smarter answers, personalized book recommendations, and a seamless way to discover your entire catalog.",
  features: [
    {
      id: "book-expert",
      title: "AI Book Expert That Knows Your Catalog",
      description:
        "AuthorBot uses your uploaded book information and custom knowledge to give readers relevant, book-focused answers whenever they have questions.",
      points: [
        "Answer questions about individual books",
        "Handle multiple titles from one author catalog",
        "Add custom Q&A for important information",
      ],
      image: moreFeature1,
      imageAlt: "AuthorBot answering questions about a book catalog",
    },
    {
      id: "recommendations",
      title: "Smart Recommendations That Turn Interest Into Action",
      description:
        "Help readers move from curiosity to the right book with personalized recommendations and natural paths toward previews and purchase links.",
      points: [
        "Recommend books based on reader interests",
        "Guide readers across your entire collection",
        "Keep engaging readers 24/7, even when you're offline",
      ],
      image: moreFeature2,
      imageAlt: "AuthorBot recommending a book",
    },
    {
      id: "brand-experience",
      title: "Your AI. Your Voice. Your Reader Experience.",
      description:
        "Shape how AuthorBot looks, communicates, and represents your brand while keeping visibility into how readers are interacting with it.",
      points: [
        "Customize the bot's tone and personality",
        "Monitor readers, chats, clicks, and engagement",
        "Use analytics to understand what readers care about",
      ],
      image: moreFeature3,
      imageAlt: "AuthorBot customization panel",
    },
  ],
};

export const faqContent = {
  badge: "FAQ",
  heading: "Frequently Asked Questions",
  description:
    "Everything you need to know about setting up AuthorBot, connecting your books, and engaging readers with AI.",
  faqs: [
    {
      question: "What is AuthorBot and how does it help authors?",
      answer:
        "AuthorBot is an AI assistant trained on your books. It answers reader questions, recommends the right title, and shows you what readers are interested in.",
    },
    {
      question: "How do I add my books to AuthorBot?",
      answer:
        "Import your book details using a URL, or add titles manually. Once uploaded, AuthorBot can start answering questions about them right away.",
    },
    {
      question:
        "Can I customize AuthorBot's appearance, personality, and communication style to match my author brand?",
      answer:
        "Yes. You can change the look of the chatbot, its tone and personality, and the welcome message so it feels like a natural part of your brand.",
    },
    {
      question: "How do I add AuthorBot to my website?",
      answer:
        "Copy the embed code from your dashboard and paste it into your website. The chatbot will appear on your pages as soon as you save.",
    },
    {
      question: "Can AuthorBot connect with channels beyond my website?",
      answer:
        "Yes. AuthorBot can connect to supported platforms such as Instagram, WhatsApp, Telegram, Messenger, Discord, Slack, and email.",
    },
  ],
};

export const articlesContent = {
  badge: "Articles",
  heading: "Latest Insights for Modern Authors",
  headingClassName: "max-w-[900px]",
  description:
    "Explore practical ideas on AI, reader engagement, book marketing, and smarter ways to turn more visitors into loyal readers.",
  articles: [
    {
      title: "How AI Can Help Authors Engage Readers 24/7",
      date: "September 28, 2026",
      image: article1,
      imageAlt: "AI helping authors engage with readers around the clock",
    },
    {
      title: "5 Ways to Turn Your Author Website Into a Book Sales Engine",
      date: "September 28, 2026",
      image: article2,
      imageAlt: "Author website strategies for increasing book sales",
    },
    {
      title: "Why Reader Insights Matter More Than Ever for Authors",
      date: "September 28, 2026",
      image: article3,
      imageAlt: "Reader insights helping authors understand their audience",
    },
  ],
};

const testimonialLorem =
  "Imperdiet elit ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero ipsum dolor sit amet consectetur.";

export const testimonialsContent = {
  badge: "Testimonials",
  heading: "Trusted by 2500+ Authors",
  testimonials: [
    {
      id: "david-kelly-featured",
      variant: "featured",
      quote:
        "Lorem ipsum dolor sit amet consectetur. Imperdiet elit lacus ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero ipsum dolor sit amet consectetur. Imperdiet elit lacus ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero.",
      name: "David K. Kelly",
      role: "Author",
      image: test1,
      bg: "bg-[var(--theme-purple-tint)]",
    },
    {
      id: "sophia-jackson",
      variant: "featured",
      quote: `Lorem ipsum dolor sit amet consectetur. ${testimonialLorem}`,
      name: "Sophia Jackson",
      role: "Author",
      image: test2,
      bg: "bg-[var(--theme-mint-pale)]",
    },
    {
      id: "david-kelly-1",
      variant: "compact",
      quote:
        "Lorem ipsum dolor sit amet consectetur. Imperdiet elit ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero ipsum dolor sit amet consectetur.",
      name: "David K. Kelly",
      role: "Author",
      image: test3,
      bg: "bg-[var(--theme-pink-soft)]",
    },
    {
      id: "david-kelly-2",
      variant: "compact",
      quote:
        "Lorem ipsum dolor sit amet consectetur. Imperdiet elit ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero ipsum dolor sit amet consectetur.",
      name: "David K. Kelly",
      role: "Author",
      image: test4,
      bg: "bg-[var(--theme-orange-soft)]",
    },
    {
      id: "david-kelly-3",
      variant: "compact",
      quote:
        "Lorem ipsum dolor sit amet consectetur. Imperdiet elit ultrices sed porta tincidunt lectus. Viverra elementum nunc molestie diam massa dignissim eu erat libero ipsum dolor sit amet consectetur.",
      name: "David K. Kelly",
      role: "Author",
      image: null,
      bg: "bg-[var(--theme-blue-pale)]",
    },
  ],
};

export const featuresContent = {
  badge: "Core Features",
  heading: "Everything You Need to Engage Readers & Sell More Books",
  description:
    "AuthorBot brings book knowledge, reader conversations, sales insights, and omnichannel engagement into one intelligent platform built for authors.",
  headingClassName: "max-w-[900px]",
  features: [
    {
      title: "AI That Knows Your Books",
      description:
        "Upload your titles and let AuthorBot answer questions, explain your books, and recommend the right title based on each reader's interests.",
      image: feature1,
    },
    {
      title: "Understand Every Reader Better",
      description:
        "Track reader conversations, activity, and book interactions so you can create more personalised experiences and recognize buying intent.",
      image: feature2,
    },
    {
      title: "One AI Across Every Channel",
      description:
        "Connect AuthorBot to your website and supported communication channels so readers can get the same intelligent assistance wherever they reach you.",
      image: feature3,
    },
    {
      title: "Turn Reader Activity Into Insights",
      description:
        "See how readers interact with your AI, which books get attention, what readers are asking, and which conversations lead to book-link clicks.",
      image: feature4,
    },
  ],
};
