import Link from "next/link";
import Image from "next/image";
import { brandLogo } from "@/content/media";

const pages = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/#integrations" },
  { label: "Features", href: "/features" },
  { label: "Blogs", href: "/blogs" },
  { label: "Pricing", href: "/#contact" },
  { label: "Contact", href: "/#contact" },
];

const utilityPages = [
  { label: "Always-On", href: "/#always-on" },
  { label: "FAQ", href: "/#faq" },
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

          <div className="grid w-full grid-cols-2 gap-10 sm:gap-16 lg:flex-1 lg:justify-between">
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
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] py-8 text-xs text-copy sm:flex-row sm:items-center">
          <p className="font-sans text-[14px] leading-[21.7px]">
            © 2026 AuthorBot. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="#faq"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
            >
              FAQ
            </Link>

            <Link
              href="#contact"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-copy)] transition hover:text-[var(--theme-heading)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
