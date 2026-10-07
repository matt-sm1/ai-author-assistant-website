import { FaStar } from "react-icons/fa";
import { Button, Paragraph } from "../../ui";
import HeroBadge from "./HeroBadge";

function HeroRating() {
  return (
    <div data-enter="hero-rating" className="mt-4 flex items-center justify-center gap-2 text-[16px] text-[var(--theme-hex-514c60)]">
      <span className="flex gap-0.5 text-[var(--theme-hex-c72ee8)]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar className="h-7 w-7" key={index} aria-hidden="true" />
        ))}
      </span>
      Rated by 2k+ users
    </div>
  );
}

export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-[850px]">
      <HeroBadge />
      <h1
        data-enter="hero-title"
        className="mx-auto my-4 max-w-[920px] px-4 font-display text-[clamp(35px,5.25vw,68.8px)] leading-[clamp(40px,5.77vw,75.68px)] font-bold tracking-[0] text-center text-[var(--theme-hex-09041d)]"
      >
        Turn Your Books Into a 24/7 AI Sales Assistant
      </h1>
      <Paragraph data-enter="hero-copy">
        Leveraging cutting-edge AI and intelligent automation to streamline complex processes, eliminate manual inefficiencies, reduce operational costs.
      </Paragraph>
      <Button
        href="#contact"
        data-enter="hero-cta"
        className="my-5 min-w-[188px] bg-[linear-gradient(180deg,var(--theme-hex-262236)_0%,var(--theme-hex-09041d)_100%)] px-6 py-2 text-[13px] shadow-[var(--shadow-hero-cta)] sm:mt-6"
      >
        Get In Touch
      </Button>
      <HeroRating />
    </div>
  );
}
