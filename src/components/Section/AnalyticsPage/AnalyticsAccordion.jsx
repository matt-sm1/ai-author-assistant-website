"use client";

import { useState } from "react";
import Image from "next/image";
import { Heading, Paragraph } from "@/components/ui";
import AnalyticsAccordionItem from "./AnalyticsAccordionItem";
import { analyticsAccordionContent } from "@/content/analytics/accordion";

export default function AnalyticsAccordion({
  content = analyticsAccordionContent,
} = {}) {
  const [openId, setOpenId] = useState(content.defaultOpenId);
  const items = Array.isArray(content.items) ? content.items : [];
  const activeItem = items.find((item) => item.id === openId);
  const activeImage = activeItem?.image || content.image;
  const activeImageAlt = activeItem?.imageAlt || content.imageAlt;

  return (
    <section id="analytics-accordion" className="section">
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
            <Heading as="h2">{content.heading}</Heading>
            <Paragraph>{content.description}</Paragraph>

            <div className="mt-2 flex flex-col">
              {items.map((item, index) => (
                <AnalyticsAccordionItem
                  key={item.id}
                  id={item.id}
                  number={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.description}
                  open={openId === item.id}
                  onToggle={() =>
                    setOpenId(openId === item.id ? null : item.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
