import { TbBook, TbClock, TbCode, TbPalette, TbUserPlus } from "react-icons/tb";

export const aiChatBotCardsContent = {
  heading: "Everything You Need To Turn Conversations Into Book Sales",
  // Placeholder: the mockup shows lorem ipsum here, so this copy is provisional.
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "easy-website-setup",
      title: "Easy Website Setup",
      description: "Customize your chatbot\u2019s name, message, theme, and appearance.",
      Icon: TbPalette,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "custom-bot-personality",
      title: "Custom Bot Personality",
      description: "Help readers discover books that match their interests.",
      Icon: TbBook,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "book-focused-conversations",
      title: "Book-Focused Conversations",
      description: "Answer questions and guide readers anytime.",
      Icon: TbClock,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "smart-recommendations",
      title: "Smart Recommendations",
      description: "Collect visitor names and emails effortlessly.",
      Icon: TbUserPlus,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "reader-assistance",
      title: "24/7 Reader Assistance",
      description: "Add AuthorBot to your website with a simple code.",
      Icon: TbCode,
      background: "#eaefff",
      row: 2,
    },
  ],
};
