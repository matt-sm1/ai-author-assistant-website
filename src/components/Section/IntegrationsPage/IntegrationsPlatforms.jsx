import Image from "next/image";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import { integrationsPlatformsContent } from "@/content/integrations/platforms";

export default function IntegrationsPlatforms({
  content = integrationsPlatformsContent,
} = {}) {
  return (
    <section id="platforms" className="section !border-b-0">
      <div className="container !border-x-0">
        <SectionInfo
          align="start"
          badge={content.badge}
          heading={content.heading}
          description={content.description}
          headingClassName="mt-4 max-w-[700px] font-display text-[28px] font-bold leading-[36px] tracking-[0px] text-[var(--theme-heading)] sm:text-[34px] sm:leading-[42px] md:text-[40px] md:leading-[50px]"
          descriptionClassName="mt-4 max-w-[560px]"
          className="w-full gap-0"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {content.platforms.map((platform) => (
            <article
              key={platform.id}
              data-reveal
              className="flex flex-col gap-5 rounded-[14px] border-[0.8px] border-[var(--theme-border)] bg-white p-6 sm:p-7"
            >
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[var(--theme-surface-muted)] shadow-[var(--shadow-icon)]">
                <Image
                  src={platform.icon}
                  alt=""
                  width={124}
                  height={118}
                  quality={95}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-heading md:text-xl">
                  {platform.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-copy">
                  {platform.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
