import Image from "next/image";
import { widgetShowcaseContent } from "@/content/widget/showcase";

export default function WidgetShowcase({
  content = widgetShowcaseContent,
} = {}) {
  const cards = Array.isArray(content.cards) ? content.cards : [];

  return (
    <section id="widget-showcase" className="section">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              data-reveal
              data-card-hover
              className="flex flex-col overflow-hidden rounded-[20px] bg-white p-3 shadow-[var(--shadow-card-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-raised)]"
            >
              <div className="relative aspect-[1.5] w-full overflow-hidden rounded-[14px] bg-[var(--theme-surface-hover)]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 px-3 pb-3 pt-5">
                <h3 className="font-display text-[20px] font-semibold leading-[27px] text-heading">
                  {card.title}
                </h3>
                <p className="font-sans text-[14px] leading-[22px] text-copy">
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
