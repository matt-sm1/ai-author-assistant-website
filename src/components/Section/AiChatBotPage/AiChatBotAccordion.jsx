"use client";

import { useState } from "react";
import Image from "next/image";
import { Heading, Paragraph } from "@/components/ui";
import AiChatBotAccordionItem from "./AiChatBotAccordionItem";
import { aiChatBotAccordionContent } from "@/content/ai-chat-bot/accordion";

export default function AiChatBotAccordion({ content = aiChatBotAccordionContent } = {}) {
  const items = Array.isArray(content.items) ? content.items : [];
  const [openId, setOpenId] = useState(content.defaultOpenId ?? items[0]?.id);
  const activeItem = items.find((item) => item.id === openId) ?? items[0];
  const activeImage = activeItem?.image || content.image;
  const activeImageAlt = activeItem?.imageAlt || content.imageAlt;

  return (
    <section id="ai-chat-bot-accordion" className="section">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[24px] bg-[#f7f7f7] p-6 md:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="relative aspect-[0.825] w-full overflow-hidden rounded-[20px]">
            <Image
              key={activeImage}
              src={activeImage}
              alt={activeImageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="accordion-image-transition object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <Heading
              as="h2"
              className="!mx-0 !text-left !text-[26px] !leading-[34px] sm:!text-[32px] sm:!leading-[40px] md:!text-[40px] md:!leading-[48px]"
            >
              {content.heading}
            </Heading>
            <Paragraph className="!mx-0 !text-left">{content.description}</Paragraph>

            <div className="mt-2 flex flex-col">
              {items.map((item, index) => (
                <AiChatBotAccordionItem
                  key={item.id}
                  id={item.id}
                  number={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.description}
                  open={openId === item.id}
                  onToggle={() => setOpenId(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
