// components/FeatureSplit.jsx
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { Paragraph } from "../ui";

export default function FeatureSplit({
  title,
  description,
  points = [],
  image = null,
  imageAlt = "",
  reverse = false,
}) {
  const featurePoints = Array.isArray(points) ? points : [];

  return (
    <section data-reveal data-card-hover className="w-full rounded-[12px] bg-white p-3 shadow-[var(--shadow-card-sm)] md:p-[18px]">
      <div
        className={`grid grid-cols-1 items-center gap-6 md:gap-6 ${
          reverse
            ? "md:grid-cols-[42%_1fr]"
            : "md:grid-cols-[1fr_42%]"
        }`}
      >
        {/* Text */}
        <div
          className={`px-2 py-2 sm:px-4 md:px-10 md:py-8 ${
            reverse ? "md:order-2" : ""
          }`}
        >
          <h2 className="font-display text-2xl font-semibold leading-8 tracking-normal text-heading sm:text-[44px] sm:leading-[52.8px]">
            {title}
          </h2>

          <Paragraph className="mt-5 text-left ml-0">
            {description}
          </Paragraph>

          {featurePoints.length > 0 && (
            <ul className="mt-6 space-y-3.5">
              {featurePoints.map((point, index) => (
                <li
                  key={`${point}-${index}`}
                  className="flex items-start gap-3 text-sm text-copy sm:text-base"
                >
                  <FaCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-heading sm:h-4 sm:w-4" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image */}
        <div
          className={`relative aspect-[1.1] w-full overflow-hidden rounded-xl ${
            reverse ? "md:order-1" : ""
          }`}
        >
          {image ? (
            <Image
              src={image}
              alt={imageAlt || (typeof title === "string" ? title : "")}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,var(--theme-hex-f5c6ea),var(--theme-hex-c9a9f5),var(--theme-hex-9b72f2))]" />
          )}
        </div>
      </div>
    </section>
  );
}
