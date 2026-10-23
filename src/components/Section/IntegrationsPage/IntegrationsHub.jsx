import Image from "next/image";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import { integrationImages } from "@/content/media";
import { integrationsHubContent } from "@/content/integrations/hub";

export default function IntegrationsHub({
  content = integrationsHubContent,
} = {}) {
  return (
    <section id="hub" className="section !border-b-0">
      <div className="container !border-x-0">
        <SectionInfo
          badge={content.badge}
          heading={content.heading}
          description={content.description}
          headingClassName="max-w-[820px]"
          descriptionClassName="max-w-[656px]"
        />

        <div data-reveal className="relative mx-auto mt-10 w-full max-w-[1136px] sm:mt-16">
          <Image
            src={integrationImages.hub}
            alt="AuthorBot connected to messaging and social platforms"
            width={2276}
            height={770}
            quality={95}
            sizes="(max-width: 1136px) 100vw, 1136px"
            className="mx-auto h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
