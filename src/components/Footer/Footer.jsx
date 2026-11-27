import Link from "next/link";
import Image from "next/image";
import { brandLogo } from "@/content/media";

const pages = [
  { label: "Home", href: "/" },
  { label: "Integrations", href: "/integrations" },
  { label: "Features", href: "/features" },
  { label: "Blogs", href: "/blogs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const utilityPages = [
  { label: "Help", href: "/help" },
  { label: "Always-On", href: "/#always-on" },
  { label: "FAQ", href: "/#faq" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H16.7V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7.7v3h2.6v8h3.2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1-.8-.8-1.9-1.3-3.1-1.3-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1 1-3.5-.2-6.6-1.9-8.6-4.4-.4.6-.6 1.3-.6 2.1 0 1.5.7 2.8 1.9 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.4 4.1-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 3.9 2.9-1.4 1.1-3.2 1.8-5.2 1.8-.3 0-.7 0-1-.1 1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12-6.4 12-12v-.5c.8-.6 1.5-1.4 2-2.3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V10h2.6v8.3zM7 8.9c-.9 0-1.5-.6-1.5-1.5S6.1 6 7 6s1.5.6 1.5 1.5S7.9 8.9 7 8.9zm11.3 9.4h-2.6v-4.3c0-1-.4-1.8-1.4-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.7v4.4h-2.6V10h2.5v1.1c.4-.6 1.1-1.3 2.4-1.3 1.8 0 3.2 1.2 3.2 3.7v4.8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="section white">
      <div className="mx-auto w-full max-w-[1344px] border-x border-[var(--line)] px-5 pt-16 sm:pt-20 md:pt-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[120px]">
          <div className="w-full lg:w-[580px] lg:shrink-0">
            <Image
              src={brandLogo}
              alt="Author AI Assistant"
              width={160}
              height={54}
              className="h-8 w-auto object-contain sm:h-10"
            />

            <p className="mt-5 max-w-[380px] font-sans text-[16px] font-normal leading-[24.8px] tracking-[-0.2px] text-[var(--theme-copy)]">
              Join our newsletter to stay up to date on features and releases.
            </p>

            <form className="mt-5 flex w-full max-w-[380.8px] gap-3 pb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-[44px] min-w-0 flex-1 rounded-[8px] border-[0.8px] border-white bg-[var(--theme-surface-muted)] px-[11.2px] py-2 text-[14px] text-[var(--theme-copy)] outline-none placeholder:text-[var(--theme-copy)]/60"
              />

              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-[8px] bg-[var(--theme-copy)] px-5 py-2 text-[14px] font-medium text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-12 lg:flex-1 lg:justify-between">
            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-heading)]">
                Main Pages
              </h4>

              <ul className="mt-5 space-y-4">
                {pages.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      className="font-sans text-base leading-[24.8px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-heading)]">
                Explore
              </h4>

              <ul className="mt-5 space-y-4">
                {utilityPages.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      className="font-sans text-base leading-[24.8px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-heading)]">
                Follow us
              </h4>

              <ul className="mt-5 space-y-4">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 font-sans text-base leading-[24.8px] text-[var(--theme-heading)] transition hover:opacity-75"
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] py-8 text-xs text-copy sm:flex-row sm:items-center">
          <p className="font-sans text-[14px] leading-[21.7px]">
            © 2026 AuthorBot. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-service"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
