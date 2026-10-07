import Image from "next/image";
import { Button, Paragraph } from "../ui";

function FeatureRow({ title, description, buttonLabel, href, image, imageAlt, reverse }) {
  return (
    <div data-reveal  className="max-w-[1083px] mx-auto grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
      {/* Text */}
      <div className={` ${reverse ? "md:order-2" : ""}`}>
        <h3 className="font-display text-2xl font-semibold leading-8 tracking-normal text-heading sm:text-[44px] sm:leading-[52.8px]">{title}</h3>
        <Paragraph className="my-3 sm:my-5 text-left ml-0">
          {description}
        </Paragraph>

        <Button href={href}>
          {buttonLabel}
        </Button>
      </div>

      {/* IMAGE SLOT */}
      <div className={`w-full max-w-[520px] ${reverse ? "md:order-1 md:justify-self-start" : "md:justify-self-end"}`}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || (typeof title === "string" ? title : "")}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="h-auto w-full rounded-2xl"
          />
        ) : (
          <div className="aspect-[1.1] w-full rounded-2xl bg-[linear-gradient(135deg,var(--theme-hex-f5c6ea),var(--theme-hex-c9a9f5),var(--theme-hex-9b72f2))]" />
        )}
      </div>
    </div>
  );
}

export default FeatureRow
