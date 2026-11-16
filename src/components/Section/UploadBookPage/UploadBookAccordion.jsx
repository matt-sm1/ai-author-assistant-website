"use client";

import { useState } from "react";
import Image from "next/image";
import { Heading, Paragraph } from "@/components/ui";
import UploadBookAccordionItem from "./UploadBookAccordionItem";
import { uploadBookAccordionContent } from "@/content/upload-book/accordion";

export default function UploadBookAccordion({ content = uploadBookAccordionContent } = {}) {
  const [openId, setOpenId] = useState(content.defaultOpenId);
  const items = Array.isArray(content.items) ? content.items : [];

  return (
    <section id="upload-book-accordion" className="section">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[24px] bg-[#f7f7f7] p-6 md:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="relative aspect-[0.825] w-full overflow-hidden rounded-[20px]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <Heading as="h2">{content.heading}</Heading>
            <Paragraph>{content.description}</Paragraph>

            <div className="mt-2 flex flex-col">
              {items.map((item, index) => (
                <UploadBookAccordionItem
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
