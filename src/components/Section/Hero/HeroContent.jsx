import { FaStar } from "react-icons/fa";
import { Button, Paragraph } from "@/components/ui";
import HeroBadge from "./HeroBadge";

function HeroRating({ label }) {
  return (
    <div data-enter="hero-rating" className="mt-4 flex items-center justify-center gap-2 text-[16px] text-[var(--theme-text-rating)]">
      <span className="flex gap-0.5 text-[var(--theme-purple-star)]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar className="h-7 w-7" key={index} aria-hidden="true" />
        ))}
      </span>
      {label}
    </div>
  );
}

export default function HeroContent({ badge, heading, description, buttonLabel, ratingLabel }) {
  return (
    <div className="relative z-10 mx-auto max-w-[850px]">
      <HeroBadge label={badge} />
      <h1
        data-enter="hero-title"
        className="mx-auto my-4 max-w-[920px] px-4 font-display text-[clamp(35px,5.25vw,68.8px)] leading-[clamp(40px,5.77vw,75.68px)] font-bold tracking-[0] text-center text-[var(--theme-heading)]"
      >
        {heading}
      </h1>
      <Paragraph data-enter="hero-copy">
        {description}
      </Paragraph>
      <Button
        href="#contact"
        data-enter="hero-cta"
        className="my-5 min-w-[188px] bg-[linear-gradient(180deg,var(--theme-ink-purple)_0%,var(--theme-heading)_100%)] px-6 py-2 text-[13px] shadow-[var(--shadow-hero-cta)] sm:mt-6"
      >
        {buttonLabel}
      </Button>
      <HeroRating label={ratingLabel} />
    </div>
  );
}
