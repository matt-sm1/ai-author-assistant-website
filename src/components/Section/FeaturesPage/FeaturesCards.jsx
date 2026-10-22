import Image from "next/image";
import { featuresCardsContent } from "@/content/features/cards";

export default function FeaturesCards({
  content = featuresCardsContent,
} = {}) {
  return (
    <section className="section !border-b-0">
      <div className="container !border-x-0 !py-3 sm:!py-4">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.id}
              data-reveal
              className="flex flex-col overflow-hidden rounded-[20px] bg-[var(--theme-surface)] shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[416/282] w-full overflow-hidden bg-[var(--theme-surface-muted)]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  quality={95}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-3 px-6 py-6 sm:px-8 sm:py-8">
                <h3 className="font-display text-lg font-bold tracking-tight text-heading md:text-xl">
                  {card.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-copy">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
