import {
  TbPalette,
  TbBook,
  TbClock,
  TbUserPlus,
  TbCode,
} from "react-icons/tb";

export const supportCardsContent = {
  badge: "Support",
  heading: "Support For Every Step Of Your AuthorBot Journey",
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "technical-help",
      title: "Technical Help",
      description:
        "Customize your chatbot\u2019s name, message, theme, and appearance.",
      Icon: TbPalette,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "setup-guidance",
      title: "Setup Guidance",
      description: "Help readers discover books that match their interests.",
      Icon: TbBook,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "integration-support",
      title: "Integration Support",
      description: "Answer questions and guide readers anytime.",
      Icon: TbClock,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "account-billing",
      title: "Account & Billing",
      description: "Collect visitor names and emails effortlessly.",
      Icon: TbUserPlus,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "product-guidance",
      title: "Product Guidance",
      description: "Add AuthorBot to your website with a simple code.",
      Icon: TbCode,
      background: "#eaefff",
      row: 2,
    },
  ],
};
