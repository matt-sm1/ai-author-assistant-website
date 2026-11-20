"use client";

import { useState } from "react";
import { Heading, Paragraph } from "@/components/ui";
import ContactFaqItem from "./ContactFaqItem";
import { contactFaqContent } from "@/content/contact/faq";

export default function ContactFaq({ content = contactFaqContent } = {}) {
  const [openId, setOpenId] = useState(content.defaultOpenId);
  const items = Array.isArray(content.items) ? content.items : [];

  return (
    <section id="contact-faq" className="section">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit rounded-full border border-[#b889f5] bg-white px-5 py-2 font-sans text-[14px] text-copy">
              {content.badge}
            </span>
            <Heading as="h2">{content.heading}</Heading>
            <Paragraph>{content.description}</Paragraph>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-[16px] border border-[#d9d9d9] bg-white px-6"
              >
                <ContactFaqItem
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  open={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
