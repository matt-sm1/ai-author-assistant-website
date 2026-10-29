"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingContent } from "@/content/home/pricing";

const GRADIENT =
  "linear-gradient(90deg, var(--theme-pink-soft) 0%, var(--theme-purple-bright) 45%, var(--theme-purple-brand) 100%)";

function planPrice(priceMonthly, yearly) {
  if (!yearly) return priceMonthly;
  return Math.round(priceMonthly * (1 - pricingContent.billing.yearly.discount));
}

function PricingCard({ plan, yearly }) {
  const price = planPrice(plan.priceMonthly, yearly);
  const billingLabel = yearly
    ? pricingContent.billing.yearly.label
    : pricingContent.billing.monthly.label;
  const popular = Boolean(plan.popular);

  return (
    <div
      data-reveal
      className={`relative flex shrink-0 flex-col rounded-[20px] p-[1.5px] ${
        popular ? "w-[min(100%,300px)]" : "w-[min(100%,268px)]"
      }`}
      style={{ backgroundImage: GRADIENT }}
    >
      {popular ? (
        <span
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1 font-sans text-[12px] font-medium leading-none text-white shadow-[var(--shadow-badge)] sm:text-[13px]"
          style={{ backgroundImage: GRADIENT }}
        >
          {plan.popularLabel}
        </span>
      ) : null}

      {/* Fixed narrow width — matches tall reference cards, not full grid column */}
      <div className="flex flex-col rounded-[18.5px] bg-white px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7">
        <p className="font-display text-[12px] font-bold uppercase tracking-[0.04em] text-heading sm:text-[13px]">
          {plan.name}
        </p>

        <div className="mt-3 flex items-end gap-1">
          <span className="font-display text-[36px] font-bold leading-none tracking-tight text-heading sm:text-[40px]">
            ${price}
          </span>
          <span className="mb-1 font-sans text-[14px] font-medium text-heading sm:mb-1.5 sm:text-[15px]">
            /mo
          </span>
        </div>
        <p className="mt-1.5 font-sans text-[12px] text-copy sm:text-[13px]">
          {billingLabel}
        </p>

        <div className="my-4 h-px w-full bg-[var(--theme-border)]" />

        <ul className="flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="font-sans text-[13px] leading-snug text-heading sm:text-[14px]"
            >
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={pricingContent.ctaHref}
          className="mt-6 inline-flex w-full items-center justify-center rounded-[12px] px-4 py-3 font-sans text-[14px] font-semibold text-white no-underline transition-[opacity,transform] duration-200 hover:scale-[1.01] hover:opacity-95 sm:mt-7 sm:text-[15px]"
          style={{ backgroundImage: GRADIENT }}
        >
          {pricingContent.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export default function Pricing({ content = pricingContent } = {}) {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="section !border-b-0 bg-[var(--theme-background)]">
      <div className="container !border-x-0">
        <div className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10">
          <h2 className="font-display text-[32px] font-bold leading-tight tracking-tight text-heading sm:text-[40px] md:text-[48px]">
            {content.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] font-sans text-[14px] leading-relaxed text-copy sm:mt-4 sm:text-[16px] sm:leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5 sm:mb-12 sm:gap-3">
          <span
            className={`font-sans text-[14px] font-medium sm:text-[15px] ${
              yearly ? "text-copy" : "text-heading"
            }`}
          >
            {content.billing.monthly.switchLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={yearly ? "Annual billing" : "Monthly billing"}
            onClick={() => setYearly((v) => !v)}
            className="relative h-8 w-[52px] shrink-0 cursor-pointer rounded-full p-1 transition-opacity hover:opacity-95 sm:h-9 sm:w-[58px]"
            style={{ backgroundImage: GRADIENT }}
          >
            <span
              className={`block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out sm:h-7 sm:w-7 ${
                yearly ? "translate-x-[22px] sm:translate-x-[24px]" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`font-sans text-[14px] font-medium sm:text-[15px] ${
              yearly ? "text-heading" : "text-copy"
            }`}
          >
            {content.billing.yearly.switchLabel}
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-sans text-[12px] font-medium text-white sm:px-3.5 sm:text-[13px]"
            style={{ backgroundImage: GRADIENT }}
          >
            {content.saveBadge}
          </span>
        </div>

        {/* Centered narrow cards with air between — do not stretch to container thirds */}
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-5 lg:gap-8">
          {content.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} yearly={yearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
