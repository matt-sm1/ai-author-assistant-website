import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assests/logo.png";
import Image from "next/image";

const pages = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#integrations" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

const utilityPages = [
  { label: "Always-On", href: "#always-on" },
  { label: "FAQ", href: "#faq" },
  { label: "Articles", href: "#articles" },
];

const socials = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "Twitter", icon: FaXTwitter },
  { label: "LinkedIn", icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="section white">
      <div className="mx-auto w-full max-w-[1344px] border-x border-[var(--line)] px-5 pt-16 sm:pt-20 md:pt-24">
        {/* Top Content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[120px]">
          {/* Left: Logo + Newsletter */}
          <div className="w-full lg:w-[580px] lg:shrink-0">
            <Image
              src={logo}
              alt="Author AI Assistant"
              width={160}
              height={54}
              className="h-8 w-auto object-contain sm:h-10"
            />

            <p className="mt-5 max-w-[380px] font-sans text-[16px] font-normal leading-[24.8px] tracking-[-0.2px] text-[var(--theme-hex-333743)]">
              Join our newsletter to stay up to date on features and releases.
            </p>

            <form className="mt-5 flex w-full max-w-[380.8px] gap-3 pb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-[44px] min-w-0 flex-1 rounded-[8px] border-[0.8px] border-white bg-[var(--theme-hex-f8f8f8)] px-[11.2px] py-2 text-[14px] text-[var(--theme-hex-333743)] outline-none placeholder:text-[var(--theme-hex-333743)]/60"
              />

              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-[8px] bg-[var(--theme-hex-333743)] px-5 py-2 text-[14px] font-medium text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right: Link Columns */}
          <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16 lg:flex-1 lg:justify-between">
            {/* Main Pages */}
            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-hex-09041d)]">
                Main Pages
              </h4>

              <ul className="mt-5 space-y-4">
                {pages.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      className="font-sans text-base leading-[24.8px] text-[var(--theme-hex-333743)] transition hover:text-[var(--theme-hex-09041d)]"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utility Pages */}
            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-hex-09041d)]">
                Explore
              </h4>

              <ul className="mt-5 space-y-4">
                {utilityPages.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      className="font-sans text-base leading-[24.8px] text-[var(--theme-hex-333743)] transition hover:text-[var(--theme-hex-09041d)]"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-sans text-base font-medium leading-[24.8px] text-[var(--theme-hex-09041d)]">
                Follow us
              </h4>

              <ul className="mt-5 space-y-4">
                {socials.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <span className="flex items-center gap-3 font-sans text-base font-semibold leading-[24.8px] text-[var(--theme-hex-09041d)]">
                      <Icon size={16} />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] py-8 text-xs text-copy sm:flex-row sm:items-center">
          <p className="font-sans text-[14px] leading-[21.7px]">
            © 2026 AuthorBot. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="#faq"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-hex-333743)] transition hover:text-[var(--theme-hex-09041d)]"
            >
              FAQ
            </Link>

            <Link
              href="#contact"
              className="font-sans text-[14px] leading-[21.7px] text-[var(--theme-hex-333743)] transition hover:text-[var(--theme-hex-09041d)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
