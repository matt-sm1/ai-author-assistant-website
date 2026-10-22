import Image from "next/image";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import { featureImages } from "@/content/media";
import { featuresIntegrationsContent } from "@/content/features/integrations";

export default function FeaturesIntegrations({
  content = featuresIntegrationsContent,
} = {}) {
  return (
    <section id="integrations" className="section !border-b-0">
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
            src={featureImages.integrationsBg}
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
