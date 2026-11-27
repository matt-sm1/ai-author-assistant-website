import { Heading, Paragraph } from "@/components/ui";
import Badge from "@/components/ui/Badge/Badge.jsx";
import { uploadBookCardsContent } from "@/content/upload-book/cards";

export default function UploadBookCards({ content = uploadBookCardsContent } = {}) {
  const cards = Array.isArray(content.cards) ? content.cards : [];
  const rowIds = [...new Set(cards.map((card) => card.row))];

  return (
    <section id="upload-book-cards" className="section">
      <div className="container">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5 text-center">
          {content.badge && <Badge>{content.badge}</Badge>}
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
                      className="flex w-full items-center gap-4 rounded-[20px] px-8 py-6 sm:w-[392px]"
                      style={{ background: card.background }}
                    >
                      <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[12px] bg-white text-[var(--theme-purple-brand)]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 className="font-display text-[18px] font-semibold leading-[25px] text-heading">
                          {card.title}
                        </h3>
                        <p
                          lang="en"
                          className="min-h-[42px] hyphens-auto font-sans text-[14px] leading-[21px] text-copy"
                        >
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
