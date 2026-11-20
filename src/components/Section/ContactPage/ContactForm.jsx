"use client";

import { useState } from "react";
import { Button, Heading, Paragraph } from "@/components/ui";
import { contactFormContent } from "@/content/contact/form";

const fieldClass =
  "w-full border-b border-[#d9d9d9] bg-transparent py-3 font-sans text-[16px] text-heading outline-none transition-colors focus:border-[var(--theme-purple-brand)]";

const labelClass = "font-sans text-[16px] leading-[24px] text-copy";

export default function ContactForm({ content = contactFormContent, onSubmit } = {}) {
  const [values, setValues] = useState({});
  const [agreed, setAgreed] = useState(false);
  const fields = Array.isArray(content.fields) ? content.fields : [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({ ...values, agreed });
  };

  return (
    <section id="contact-form" className="section">
      <div className="container">
        <div className="flex flex-col gap-6 pb-12">
          <span className="inline-flex w-fit rounded-full border border-[#b889f5] bg-white px-5 py-2 font-sans text-[14px] uppercase leading-[21.7px] text-heading">
            {content.badge}
          </span>
          <Heading as="h2">{content.heading}</Heading>
          <Paragraph className="max-w-[640px]">{content.description}</Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
            {fields.map((field) => {
              const inputId = `contact-${field.id}`;
              return (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={inputId} className={labelClass}>
                    {field.label}*
                  </label>
                  <input
                    id={inputId}
                    name={field.id}
                    type={field.type}
                    required
                    autoComplete={field.autoComplete}
                    value={values[field.id] ?? ""}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col">
            <label htmlFor="contact-message" className={labelClass}>
              {content.messageLabel}*
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              value={values.message ?? ""}
              onChange={handleChange}
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <label htmlFor="contact-terms" className="flex items-center gap-3 font-sans text-[16px] text-copy">
              <input
                id="contact-terms"
                type="checkbox"
                required
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="h-5 w-5 rounded border-[#d9d9d9]"
              />
              <span>
                {content.termsPrefix}{" "}
                <span className="text-black">{content.termsLinkLabel}</span>
              </span>
            </label>
            <Button type="submit">{content.submitLabel}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
