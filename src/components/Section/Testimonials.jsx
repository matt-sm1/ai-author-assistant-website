import Image from "next/image";
import SectionInfo from "@/components/SectionInfo/SectionInfo";

function Person({ name, role }) {
  return (
    <div className="min-w-0">
      <p className="font-sans text-[16px] font-semibold leading-[24px] tracking-normal capitalize text-[var(--theme-text-strong)] sm:text-[18px] sm:leading-[28.8px]">
        {name}
      </p>

      <p className="font-sans text-[13px] font-medium leading-[21px] tracking-normal text-[var(--theme-text-muted)] sm:text-[14px] sm:leading-[24.5px]">
        {role}
      </p>
    </div>
  );
}

function FeaturedCard({ quote, name, role, image, bg }) {
  return (
    <article
      className={`flex min-h-[500px] w-full flex-col gap-5 rounded-[12px] p-5 sm:min-h-[450px] sm:p-6 md:col-span-3 md:h-[322px] md:min-h-0 md:flex-row md:items-center md:justify-between md:gap-6 ${bg}`}
    >
      {/* Text */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-8 md:h-full md:gap-0">
        <p className="font-sans text-[14px] font-medium leading-[22px] tracking-normal text-heading sm:text-[15px] sm:leading-[24.8px]">
          {quote}
        </p>

        <Person name={name} role={role} />
      </div>

      <div className="relative h-[210px] w-full shrink-0 overflow-hidden rounded-[10px] sm:h-[230px] md:h-full md:w-[40%]">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        )}
      </div>
    </article>
  );
}

function CompactCard({ quote, name, role, image, bg }) {
  return (
    <article
      className={`flex min-h-[300px] w-full flex-col justify-between rounded-[12px] p-5 sm:min-h-[322px] sm:p-6 md:col-span-2 ${bg}`}
    >
      <p className="font-sans text-[14px] font-medium leading-[22px] tracking-normal text-[var(--theme-text-strong)] sm:text-[15px] sm:leading-[24.5px]">
        {quote}
      </p>

      <div className="flex items-center gap-2.5">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/30">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              sizes="40px"
              className="object-cover"
            />
          )}
        </span>

        <Person name={name} role={role} />
      </div>
    </article>
  );
}

export default function Testimonials({ badge, heading, testimonials = [] }) {
  return (
    <section className="section">
      <div className="container">
        <SectionInfo
          badge={badge}
          heading={heading}
        />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 md:grid-cols-6">
          {testimonials.map((t) =>
            t.variant === "featured" ? (
              <FeaturedCard key={t.id} {...t} />
            ) : (
              <CompactCard key={t.id} {...t} />
            )
          )}
        </div>
      </div>
    </section>
  );
}


