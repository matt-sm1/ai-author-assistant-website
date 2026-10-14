"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Paragraph } from "@/components/ui";
import SectionInfo from "@/components/SectionInfo/SectionInfo";



function PlusMinus({ open }) {
  const Icon = open ? FiMinus : FiPlus;

  return (
    <Icon
      className="h-[18px] w-[18px] shrink-0 text-[var(--theme-heading)] sm:h-5 sm:w-5"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

function FaqItem({ id, question, answer, open, onToggle }) {
  return (
    <div data-reveal className="w-full overflow-hidden rounded-[12px] bg-white">

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        id={`faq-button-${id}`}
        className="cursor-pointer flex w-full items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-4 text-left transition-colors duration-200 hover:bg-[var(--theme-surface-hover)] active:scale-[.998] sm:gap-4 sm:px-5 sm:py-4 md:px-6"
      >
        <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <span className="min-w-0 font-display text-[16px] font-semibold leading-[23px] tracking-normal text-[var(--theme-heading)] sm:text-[18px] sm:leading-[25px] md:text-[20px] md:leading-[27px]">
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
  badge,
  heading,
  description,
  faqs = [],
  defaultOpen = null,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const faqList = Array.isArray(faqs) ? faqs : [];

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16 xl:grid-cols-[1.1fr_1.35fr] xl:gap-20">
          {/* LEFT */}
          <SectionInfo
            align="start"
            badge={badge}
            heading={heading}
            description={description}
            headingClassName="mt-4 max-w-[700px] font-display text-[28px] font-bold leading-[36px] tracking-[0px] text-[var(--theme-heading)] sm:text-[34px] sm:leading-[42px] md:text-[40px] md:leading-[50px]"
            descriptionClassName="mt-4 max-w-[560px]"
            className="w-full gap-0 lg:pr-4 xl:pr-6"
          />

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
