import { TbBook, TbClock, TbCode, TbPalette, TbUserPlus } from "react-icons/tb";

export const uploadBookCardsContent = {
  badge: "Upload Book",
  heading: "Support For Every Step Of Your AuthorBot Journey",
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "manual-book-upload",
      title: "Manual Book Upload",
      description: "Customize your chatbot's name, message, theme, and appearance.",
      Icon: TbPalette,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "import-by-url",
      title: "Import By URL",
      description: "Help readers discover titles and stories matching their interests.",
      Icon: TbBook,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "distribution-discovery",
      title: "Distribution Discovery",
      description: "Answer reader questions and guide book discovery anytime.",
      Icon: TbClock,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "ai-book-knowledge",
      title: "AI Book Knowledge",
      description: "Collect visitor names, preferences, and emails effortlessly.",
      Icon: TbUserPlus,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "book-management",
      title: "Book Management",
      description: "Add AuthorBot to your website using a single embed code.",
      Icon: TbCode,
      background: "#eaefff",
      row: 2,
    },
  ],
};
