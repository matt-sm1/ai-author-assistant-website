import { TbBook, TbClock, TbCode, TbLayoutDashboard, TbUserPlus } from "react-icons/tb";

export const crmCardsContent = {
  badge: "CRM",
  heading: "Support For Every Step Of Your AuthorBot Journey",
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "reader-dashboard",
      title: "Reader Dashboard",
      description: "Customize your chatbot's name, message, theme, and appearance.",
      Icon: TbLayoutDashboard,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "detailed-reader-profiles",
      title: "Detailed Reader Profiles",
      description: "Help readers discover books that match their interests.",
      Icon: TbBook,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "conversation-history",
      title: "Conversation History",
      description: "Answer questions and guide readers anytime.",
      Icon: TbClock,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "returning-reader-insights",
      title: "Returning Reader Insights",
      description: "Collect visitor names and emails effortlessly.",
      Icon: TbUserPlus,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "follow-up-management",
      title: "Follow-Up Management",
      description: "Add AuthorBot to your website with a simple code.",
      Icon: TbCode,
      background: "#eaefff",
      row: 2,
    },
  ],
};
