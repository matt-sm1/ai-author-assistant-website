import FeatureSplit from "@/components/Card/FeatureSplit";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
export default function MoreFeatures({ badge, heading, description, features = [] }) {
  return (
    <section id="more-features" className="section">
      <div className="container">
        <SectionInfo
          badge={badge}
          heading={heading}
          description={description}
        />

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 md:gap-16">
          {features.map((feature, i) => (
            <FeatureSplit key={feature.id ?? i} {...feature} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
