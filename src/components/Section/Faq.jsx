"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Badge from "../ui/Badge/Badge";
import { Paragraph } from "../ui";

const defaultFaqs = [
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
];

function PlusMinus({ open }) {
  const Icon = open ? FiMinus : FiPlus;

  return (
    <Icon
      className="h-[18px] w-[18px] shrink-0 text-[var(--theme-hex-09041d)] sm:h-5 sm:w-5"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

function FaqItem({ id, question, answer, open, onToggle }) {
  return (
    <div data-reveal className="w-full overflow-hidden rounded-[12px] bg-white">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        id={`faq-button-${id}`}
        className="flex w-full items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-4 text-left transition-colors duration-200 hover:bg-[var(--theme-hex-faf9fc)] active:scale-[.998] sm:gap-4 sm:px-5 sm:py-4 md:px-6"
      >
        <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <span className="min-w-0 font-display text-[16px] font-semibold leading-[23px] tracking-normal text-[var(--theme-hex-09041d)] sm:text-[18px] sm:leading-[25px] md:text-[20px] md:leading-[27px]">
            {question}
          </span>

          <PlusMinus open={open} />
        </span>
      </button>

      {/* Answer */}
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-button-${id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-5 text-[13px] leading-[21px] text-copy sm:px-5 sm:text-sm sm:leading-relaxed md:px-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq({
  badge = "FAQ",
  heading = "Frequently Asked Questions",
  description = "Everything you need to know about setting up AuthorBot, connecting your books, and engaging readers with AI.",
  faqs = defaultFaqs,
  defaultOpen = null,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const faqList = Array.isArray(faqs) ? faqs : defaultFaqs;

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16 xl:grid-cols-[1.1fr_1.35fr] xl:gap-20">
          {/* LEFT */}
          <div className="w-full lg:pr-4 xl:pr-6">
            <Badge data-reveal-step="badge">{badge}</Badge>

            <h2 data-reveal-step="heading" className="mt-4 max-w-[700px] font-display text-[28px] font-bold leading-[36px] tracking-[0px] text-[var(--theme-hex-09041d)] sm:text-[34px] sm:leading-[42px] md:text-[40px] md:leading-[50px]">
              {heading}
            </h2>

            <Paragraph data-reveal-step="paragraph" className="mt-4 max-w-[560px] text-left">
              {description}
            </Paragraph>
          </div>

          {/* RIGHT */}
          <div className="flex w-full flex-col gap-2.5">
            {faqList.map((faq, i) => (
              <FaqItem
                key={faq.question || i}
                id={i}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
