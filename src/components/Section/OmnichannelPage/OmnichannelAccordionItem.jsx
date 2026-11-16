"use client";

import { FiPlus, FiMinus } from "react-icons/fi";

export default function OmnichannelAccordionItem({
  id,
  number,
  title,
  description,
  open,
  onToggle,
}) {
  const Icon = open ? FiMinus : FiPlus;

  return (
    <div className="w-full border-b border-[#d9d9d9] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`omnichannel-panel-${id}`}
        id={`omnichannel-button-${id}`}
        className="flex w-full cursor-pointer items-center gap-4 py-5 text-left"
      >
        <span
          aria-hidden="true"
          className="font-sans text-[16px] font-medium leading-[24px] text-[var(--theme-purple-brand)]"
        >
          {number}
        </span>
        <span className="min-w-0 flex-1 font-display text-[16px] font-semibold leading-[23px] text-black sm:text-[18px] sm:leading-[25px] md:text-[20px] md:leading-[27px]">
          {title}
        </span>
        <Icon
          className="h-[18px] w-[18px] shrink-0 text-black sm:h-5 sm:w-5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      <div
        id={`omnichannel-panel-${id}`}
        role="region"
        aria-labelledby={`omnichannel-button-${id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-[52px] text-[14px] leading-[22px] text-copy">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
