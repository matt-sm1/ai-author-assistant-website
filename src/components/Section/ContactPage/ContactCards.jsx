import { Paragraph } from "@/components/ui";
import { contactCardsContent } from "@/content/contact/cards";

export default function ContactCards({ content = contactCardsContent } = {}) {
  const cards = Array.isArray(content.cards) ? content.cards : [];

  return (
    <section id="contact-cards" className="section">
      <div className="container">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-8">
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
              <article
                key={card.id}
                data-reveal
                data-card-hover
                className="flex w-full flex-col items-center gap-5 rounded-[20px] bg-white p-[30px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:w-[400px]"
              >
                <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#f5f3ff] text-black">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[20px] font-semibold leading-[28px] text-heading">
                    {card.title}
                  </h3>
                  <Paragraph className="text-[16px] leading-[24px]">
                    {card.description}
                  </Paragraph>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
