import Image from "next/image";
import { Paragraph } from "@/components/ui";
import { contactCardsContent } from "@/content/contact/cards";
import { contactImages } from "@/content/media";

export default function ContactCards({ content = contactCardsContent } = {}) {
  const cards = Array.isArray(content.cards) ? content.cards : [];

  return (
    <section id="contact-cards" className="section">
      <div className="container">
        <div className="mx-auto mb-10 max-w-[1212px]">
          <Image
            src={contactImages.worldMap}
            alt=""
            aria-hidden="true"
            width={1913}
            height={768}
            sizes="(max-width: 1212px) 100vw, 1212px"
            className="h-auto w-full"
          />
        </div>
        <div className="mx-auto grid max-w-[1136px] grid-cols-1 rounded-[24px] bg-white px-6 py-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
              <article
                key={card.id}
                className="flex flex-col items-center gap-4 border-b border-[var(--line)] px-6 py-8 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--line)] text-heading">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[20px] font-semibold leading-[28px] text-heading">
                    {card.title}
                  </h3>
                  <Paragraph className="text-[16px] leading-[24px]">
                    {card.description}
                  </Paragraph>
                  <p className="text-sm text-[var(--theme-purple-brand)]">Details coming soon</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
