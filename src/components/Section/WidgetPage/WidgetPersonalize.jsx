"use client";

import { useState } from "react";
import Image from "next/image";
import { Heading, Paragraph } from "@/components/ui";
import WidgetAccordionItem from "@/components/Section/WidgetPage/WidgetAccordionItem";
import { widgetPersonalizeContent } from "@/content/widget/personalize";

export default function WidgetPersonalize({
  content = widgetPersonalizeContent,
} = {}) {
  const items = Array.isArray(content.items) ? content.items : [];
  const [openIndex, setOpenIndex] = useState(content.defaultOpen ?? 0);
  const activeItem = items[openIndex] ?? items[0];
  const activeImage = activeItem?.image || content.image;
  const activeImageAlt = activeItem?.imageAlt || content.imageAlt;

  return (
    <section id="widget-personalize" className="section">
      <div className="container !border-x-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative w-full">
            <Image
              key={activeImage}
              src={activeImage}
              alt={activeImageAlt}
              width={2079}
              height={2518}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="accordion-image-transition h-auto w-full object-contain"
            />
          </div>

          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-5">
              <Heading
                as="h2"
                className="!mx-0 !text-left max-w-[600px] font-display !text-[26px] font-bold !leading-[34px] text-heading sm:!text-[32px] sm:!leading-[40px] md:!text-[40px] md:!leading-[48px]"
              >
                {content.headingLine1} {content.headingLine2}
              </Heading>
              <Paragraph className="!mx-0 !text-left max-w-[560px]">
                {content.description}
              </Paragraph>
            </div>

            <div className="flex w-full flex-col gap-2.5">
              {items.map((item, i) => (
                <WidgetAccordionItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
