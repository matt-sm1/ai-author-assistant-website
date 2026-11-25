"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { contactFormContent } from "@/content/contact/form";

const fieldClass =
  "w-full rounded-lg border border-[var(--theme-border)] bg-white px-4 py-3 font-sans text-[16px] text-heading outline-none transition-colors placeholder:text-copy/50 focus:border-[var(--theme-purple-brand)]";

const labelClass = "mb-2 font-sans text-sm font-medium text-heading";

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
        <div className="mx-auto max-w-[1212px] rounded-[24px] bg-white p-6 sm:p-10 md:p-12">
          <h2 className="font-display text-3xl font-bold text-heading">{content.heading}</h2>
          <p className="mt-3 text-sm text-copy">{content.description}</p>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              {fields.map((field) => {
                const inputId = `contact-${field.id}`;
                return (
                  <div key={field.id} className="flex flex-col">
                    <label htmlFor={inputId} className={labelClass}>
                      {field.label}
                    </label>
                    <input
                      id={inputId}
                      name={field.id}
                      type={field.type}
                      required
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
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
                {content.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder={content.messagePlaceholder}
                value={values.message ?? ""}
                onChange={handleChange}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <label htmlFor="contact-terms" className="flex items-center gap-3 font-sans text-sm text-copy">
                <input
                  id="contact-terms"
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="h-5 w-5 rounded border-[#d9d9d9]"
                />
                <span>{content.termsLabel}</span>
              </label>
              <Button
                type="submit"
                disabled={!onSubmit}
                className="disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {content.submitLabel}
              </Button>
            </div>
            {!onSubmit && (
              <p role="status" className="text-sm text-copy">
                Contact form submissions are not available yet.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
