import { Heading, Paragraph } from "@/components/ui";
import { crmCardsContent } from "@/content/crm/cards";

export default function CrmCards({ content = crmCardsContent } = {}) {
  const cards = Array.isArray(content.cards) ? content.cards : [];
  const rowIds = [...new Set(cards.map((card) => card.row))];

  return (
    <section id="crm-cards" className="section">
      <div className="container">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5 text-center">
          <Heading as="h2" className="max-w-[760px]">
            {content.heading}
          </Heading>
          <Paragraph>{content.description}</Paragraph>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          {rowIds.map((rowId) => (
            <div
              key={rowId}
              className="flex w-full flex-wrap justify-center gap-6 md:gap-8"
            >
              {cards
                .filter((card) => card.row === rowId)
                .map((card) => {
                  const Icon = card.Icon;
                  return (
                    <article
                      key={card.id}
                      data-reveal
                      data-card-hover
                      className="flex w-full items-start gap-5 rounded-[20px] p-[30px] sm:w-[410px]"
                      style={{ background: card.background }}
                    >
                      <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white text-[var(--theme-purple-brand)]">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-[20px] font-semibold leading-[28px] text-heading">
                          {card.title}
                        </h3>
                        <p className="font-sans text-[16px] leading-[24px] text-copy">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
