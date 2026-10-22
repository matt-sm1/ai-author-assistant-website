import { trustLogos } from "@/content/media";

function LogoStrip({ logos, labeled }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 sm:gap-12 md:gap-14"
      aria-hidden={!labeled}
    >
      {logos.map((src, i) => (
        <img
          key={`${labeled ? "a" : "b"}-${i}`}
          src={src}
          alt={labeled && i === 0 ? "Partner companies" : ""}
          width={203}
          height={49}
          draggable={false}
          className="h-10 w-auto max-w-none shrink-0 object-contain sm:h-12"
        />
      ))}
    </div>
  );
}

export default function TrustedBy({
  heading = "Trusted by 300+ companies",
  headingAs: HeadingTag = "h3",
  logos = trustLogos,
} = {}) {
  return (
    <section className="w-full overflow-hidden border-y-[0.8px] border-solid border-[var(--theme-border)] bg-[var(--theme-background)] pb-10 pt-9">
      <HeadingTag className="mb-7 text-center font-sans text-[14px] font-normal leading-[27.9px] tracking-[0] text-copy md:text-[18px]">
        {heading}
      </HeadingTag>

      <div className="group [mask-image:linear-gradient(to_right,transparent,var(--theme-black)_8%,var(--theme-black)_92%,transparent)]">
        <div className="flex w-max gap-10 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-12 md:gap-14">
          <LogoStrip logos={logos} labeled />
          <LogoStrip logos={logos} labeled={false} />
        </div>
      </div>
    </section>
  );
}
