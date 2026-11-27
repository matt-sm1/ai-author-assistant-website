"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function WidgetAccordionItem({
  id,
  title,
  description,
  open,
  onToggle,
}) {
  const Icon = open ? FiChevronUp : FiChevronDown;

  return (
    <div data-reveal className="w-full overflow-hidden rounded-[12px] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`widget-panel-${id}`}
        id={`widget-button-${id}`}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-4 text-left transition-colors duration-200 hover:bg-[var(--theme-surface-hover)] sm:gap-4 sm:px-5 md:px-6"
      >
        <span className="min-w-0 flex-1 font-display text-[16px] font-semibold leading-[23px] text-[var(--theme-heading)] sm:text-[18px] sm:leading-[25px] md:text-[20px] md:leading-[27px]">
          {title}
        </span>
        <Icon
          className="h-[18px] w-[18px] shrink-0 text-[var(--theme-heading)] sm:h-5 sm:w-5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      <div
        id={`widget-panel-${id}`}
        role="region"
        aria-labelledby={`widget-button-${id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-5 text-[13px] leading-[21px] text-copy sm:px-5 sm:text-sm sm:leading-relaxed md:px-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
