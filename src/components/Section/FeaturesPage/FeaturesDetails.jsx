import Link from "next/link";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import AdvantageIcon from "@/components/Section/FeaturesPage/AdvantageIcon";
import { featuresDetailsContent } from "@/content/features/details";

export default function FeaturesDetails({
  content = featuresDetailsContent,
} = {}) {
  return (
    <section id="advantages" className="section !border-b-0">
      <div className="container !border-x-0">
        <SectionInfo
          badge={content.badge}
          heading={
            <>
              {content.headingLine1}
              <br className="hidden sm:block" /> {content.headingLine2}
            </>
          }
          description={content.description}
          headingClassName="max-w-[821px]"
          descriptionClassName="max-w-[512px]"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <article
              key={item.id}
              data-reveal
              className="flex flex-col gap-8 rounded-[14px] border-[0.8px] border-[var(--theme-border)] bg-white p-6"
            >
              <AdvantageIcon id={item.id} src={item.icon} />
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-heading md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-copy">
                  {item.description}
                </p>
              </div>
            </article>
          ))}

          <article
            data-reveal
            className="flex flex-col justify-between gap-8 rounded-[14px] border-[0.8px] border-[var(--theme-border)] p-6"
            style={{
              backgroundImage:
                "linear-gradient(-18deg, var(--theme-pink-rose) 7.7%, var(--theme-purple-brand) 92.3%)",
            }}
          >
            <div>
              <h3 className="font-display text-[28px] font-semibold leading-[33.6px] text-white">
                {content.help.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white">
                {content.help.description}
              </p>
            </div>
            <Link
              href={content.help.buttonHref}
              className="inline-flex w-fit items-center justify-center rounded-lg bg-[linear-gradient(180deg,var(--theme-copy)_0%,var(--theme-heading)_100%)] px-6 py-3 font-sans text-base font-medium leading-6 text-white no-underline transition-[opacity,transform] duration-200 hover:scale-[1.02] hover:opacity-95"
            >
              {content.help.buttonLabel}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
