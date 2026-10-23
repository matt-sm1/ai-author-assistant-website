import Image from "next/image";
import { homeImages, integrationImages } from "@/content/media";
import { integrationsHeroContent } from "@/content/integrations/hero";
import { Button } from "@/components/ui";

export default function IntegrationsHero({
  content = integrationsHeroContent,
} = {}) {
  return (
    <section
      id="integrations-hero"
      className="relative overflow-hidden bg-[var(--theme-background-soft)]"
    >
      <Image
        src={integrationImages.heroBg}
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover object-top"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1344px] flex-col items-center border-x-[0.8px] border-white px-5 pb-20 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-32 lg:px-10">
        <div className="relative mx-auto w-full max-w-[900px]">
          <span
            data-reveal-step="badge"
            className="mx-auto inline-flex items-center rounded-[30px] bg-gradient-to-b from-white from-[60%] to-[var(--theme-purple-wash)] px-3 py-3 font-sans text-base font-medium leading-[24.8px] text-[var(--theme-purple-brand)] shadow-[inset_-4px_-4px_4px_0_rgba(184,33,234,0.08),inset_4px_4px_9px_0_rgba(61,61,61,0.1)]"
          >
            {content.badge}
          </span>

          <h1
            data-reveal-step="heading"
            className="mt-5 font-display text-[26px] font-bold leading-8 text-heading sm:text-4xl sm:leading-[46px] md:text-[56px] md:leading-[70px]"
          >
            <span className="block">{content.headingLine1}</span>
            <span className="block">{content.headingLine2}</span>
          </h1>

          <p
            data-reveal-step="paragraph"
            className="mx-auto mt-4 max-w-[672px] font-sans text-[14px] font-normal leading-[1.55] tracking-normal text-copy sm:text-[16px] sm:leading-[1.6]"
          >
            {content.description}
          </p>

          <div
            data-reveal-step="action"
            className="mt-8 flex flex-col items-center gap-8"
          >
            <Button href={content.buttonHref}>{content.buttonLabel}</Button>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-start" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    className="h-[17px] w-[18px]"
                  >
                    <path
                      d="M9.05972 13.0318L3.86081 16.2071L5.27419 10.2811L0.648438 6.3187L6.72029 5.83224L9.05972 0.207031L11.3992 5.83224L17.4719 6.3187L12.8453 10.2811L14.2586 16.2071L9.05972 13.0318Z"
                      fill="#B821EA"
                    />
                  </svg>
                ))}
              </div>
              <p className="font-sans text-base font-medium leading-[24.8px] text-copy">
                {content.ratingLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={homeImages.heroBottom}
        alt=""
        aria-hidden="true"
        width={1920}
        height={200}
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-auto w-full"
      />
    </section>
  );
}
