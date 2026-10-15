import Image from "next/image";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import { featuresContent } from "@/content/home/features";

function FeatureCard({ title, description, image }) {
  return (
    <article className="h-auto w-full rounded-3xl bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-black/5 md:h-[533px]">
      <div className="relative w-full overflow-hidden rounded-2xl md:h-[370px]">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={700}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
          className="h-auto w-full md:h-full md:object-cover"
        />
      </div>

      <div className="px-2 pb-3 pt-5 md:px-5">
        <h3 className="text-lg font-bold tracking-tight text-heading md:text-xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-copy">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function FeaturesSection({
  badge = featuresContent.badge,
  heading = featuresContent.heading,
  description = featuresContent.description,
  headingClassName = featuresContent.headingClassName,
  features = featuresContent.features,
} = {}) {
  return (
    <section id="features" className="section">
      <div className="container">

        <SectionInfo
          badge={badge}
          heading={heading}
          description={description}
          headingClassName={headingClassName}
        />

        <div className="mt-5 sm:mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {features.map((f, index) => (
            <div
              key={f.title}
              className={
                index === 0
                  ? "md:col-span-5"
                  : index === 1
                    ? "md:col-span-7"
                    : index === 2
                      ? "md:col-span-7"
                      : "md:col-span-5"
              }
            >
              <FeatureCard {...f} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
