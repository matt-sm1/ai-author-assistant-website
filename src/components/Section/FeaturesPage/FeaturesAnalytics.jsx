import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { Paragraph } from "@/components/ui";
import FeaturesPanel from "@/components/Section/FeaturesPage/FeaturesPanel";
import { featuresAnalyticsContent } from "@/content/features/analytics";

export default function FeaturesAnalytics({
  content = featuresAnalyticsContent,
} = {}) {
  return (
    <section id="analytics" className="section !border-b-0">
      <div className="container !border-x-0 !py-3 sm:!py-4">
        <FeaturesPanel>
          <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className="max-w-[560px]">
              <h2 className="font-display text-2xl font-semibold leading-8 tracking-normal text-heading sm:text-[44px] sm:leading-[52.8px]">
                {content.heading}
              </h2>
              <Paragraph className="mt-5 !mx-0 !text-left">
                {content.description}
              </Paragraph>
              <ul className="mt-6 space-y-3.5">
                {content.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-copy sm:text-base"
                  >
                    <FaCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-heading sm:h-4 sm:w-4" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="relative mx-auto w-full max-w-[600px]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                width={1200}
                height={846}
                quality={95}
                sizes="(max-width: 1023px) 100vw, 600px"
                className="h-auto w-full rounded-[20px] object-contain shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
        </FeaturesPanel>
      </div>
    </section>
  );
}
