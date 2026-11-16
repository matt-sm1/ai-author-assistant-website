import { TbMessages, TbRobot, TbInbox, TbUsers, TbClock } from "react-icons/tb";

export const omnichannelCardsContent = {
  // Heading and descriptions are placeholders copied from the analytics page until final copy is provided.
  heading: "Support For Every Step Of Your AuthorBot Journey",
  description:
    "Lorem ipsum dolor sit amet consectetur. Suscipit viverra donec scelerisque tellus in vulputate. Cursus tempus congue faucibus faucibus dui feugiat sit.",
  cards: [
    {
      id: "connect-channels",
      title: "Connect Every Channel",
      description: "Bring messages from your social and email channels together.",
      Icon: TbMessages,
      background: "#fff0f4",
      row: 1,
    },
    {
      id: "one-ai",
      title: "One AI Everywhere",
      description: "Give readers the same helpful answers on every platform.",
      Icon: TbRobot,
      background: "#eef3ff",
      row: 1,
    },
    {
      id: "centralized-inbox",
      title: "Centralized Inbox",
      description: "Manage every reader conversation from a single view.",
      Icon: TbInbox,
      background: "#f0ecff",
      row: 2,
    },
    {
      id: "human-handoff",
      title: "AI & Human Handoff",
      description: "Pass conversations to your team whenever a reader needs it.",
      Icon: TbUsers,
      background: "#fbeefc",
      row: 2,
    },
    {
      id: "always-on",
      title: "Always-On Conversations",
      description: "Keep readers engaged around the clock, even when you are offline.",
      Icon: TbClock,
      background: "#eaefff",
      row: 2,
    },
  ],
};
