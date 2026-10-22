import Image from "next/image";
import { featureImages } from "@/content/media";
import { featuresCtaContent } from "@/content/features/cta";
import { Button, Heading, Paragraph } from "@/components/ui";

export default function FeaturesCta({
  content = featuresCtaContent,
} = {}) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="relative mx-auto flex w-full max-w-[1297px] items-center justify-center overflow-hidden rounded-[20px] px-5 py-16 text-center sm:py-20 md:py-[120px]">
          <Image
            src={featureImages.cta}
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 size-full object-cover"
          />

          <div className="relative z-10 mx-auto w-full max-w-[900px]">
            <span
              data-reveal-step="badge"
              className="inline-flex rounded-full bg-[linear-gradient(124deg,var(--theme-pink-wash)_6.56%,var(--theme-purple-medium)_93.44%)] px-[14px] py-[5px] font-sans text-[14px] font-normal uppercase leading-[21.7px] tracking-[0px] text-white shadow-[var(--shadow-badge)] backdrop-blur-[12px]"
            >
              {content.badge}
            </span>

            <Heading data-reveal-step="heading" className="my-5 max-w-[700px]">
              {content.heading}
            </Heading>

            <Paragraph data-reveal-step="paragraph" className="mb-5">
              {content.description}
            </Paragraph>

            <Button href={content.buttonHref} data-reveal-step="action">
              {content.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
