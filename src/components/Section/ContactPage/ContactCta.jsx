import Image from "next/image";
import { Button, Heading, Paragraph } from "@/components/ui";
import { contactCtaContent } from "@/content/contact/cta";
import { featureImages } from "@/content/media";

export default function ContactCta({ content = contactCtaContent } = {}) {
  return (
    <section id="contact-cta" className="section">
      <div className="container">
        <div
          className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[24px] px-6 py-16 text-center md:py-20"
        >
          <Image
            src={featureImages.cta}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
          <span
            className="relative inline-flex rounded-full px-[16px] py-[6px] font-sans text-[14px] font-normal uppercase leading-[21.7px] text-black"
            style={{
              background: "linear-gradient(90deg, #f3d6f7 0%, #b889f5 100%)",
            }}
          >
            {content.badge}
          </span>
          <Heading as="h2" className="relative max-w-[760px]">
            {content.heading}
          </Heading>
          <Paragraph className="relative max-w-[640px]">{content.description}</Paragraph>
          <Button href={content.buttonHref} className="relative">{content.buttonLabel}</Button>
        </div>
      </div>
    </section>
  );
}
