import { Button, Heading, Paragraph } from "@/components/ui";
import { omnichannelCtaContent } from "@/content/omnichannel/cta";

export default function OmnichannelCta({ content = omnichannelCtaContent } = {}) {
  return (
    <section id="omnichannel-cta" className="section">
      <div className="container">
        <div
          className="flex flex-col items-center gap-6 rounded-[24px] px-6 py-16 text-center md:py-20"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 48px, rgba(255,255,255,0.35) 64px, rgba(255,255,255,0) 80px), linear-gradient(90deg, #d9d4ff 0%, #ece8ff 40%, #f7e6f8 75%, #fbd6e8 100%)",
          }}
        >
          <span
            className="inline-flex rounded-full px-[16px] py-[6px] font-sans text-[14px] font-normal uppercase leading-[21.7px] text-black"
            style={{
              background: "linear-gradient(90deg, #f3d6f7 0%, #b889f5 100%)",
            }}
          >
            {content.badge}
          </span>
          <Heading as="h2" className="max-w-[760px]">
            {content.heading}
          </Heading>
          <Paragraph className="max-w-[640px]">{content.description}</Paragraph>
          <Button href={content.buttonHref}>{content.buttonLabel}</Button>
        </div>
      </div>
    </section>
  );
}
