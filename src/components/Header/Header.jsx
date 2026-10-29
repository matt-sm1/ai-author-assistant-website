"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brandLogo } from "@/content/media";
import { Button } from "@/components/ui";

const links = [
  { label: "Home", href: "/" },
  { label: "Integrations", href: "/integrations" },
  { label: "Features", href: "/features" },
  { label: "Blogs", href: "/blogs" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash || "");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href) => {
    if (href === "/blogs") return pathname === "/blogs" || pathname?.startsWith("/blogs/");
    if (href === "/features") return pathname === "/features";
    if (href === "/integrations") return pathname === "/integrations";
    if (href === "/") return pathname === "/" && !hash;
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }
    return false;
  };

  // Marketing heroes sit under the nav via -mb-24; blog pages need normal document flow.
  const overlayHero = !pathname?.startsWith("/blogs");

  return (
    <header
      data-enter="navbar"
      className={`sticky top-0 z-50 h-24 w-full transition-[background-color,box-shadow] duration-300 ${
        overlayHero ? "-mb-24" : ""
      } ${
        scrolled || menuOpen || !overlayHero
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-24 w-[calc(100%-2rem)] max-w-[1200px] items-center justify-between sm:grid sm:w-[calc(100%-3rem)] sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center justify-self-start">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="AuthorBot home"
            className="flex items-center"
          >
            <Image
              src={brandLogo}
              alt="Author AI Assistant"
              width={160}
              height={54}
              priority
              className="h-9 w-auto object-contain sm:h-11"
            />
          </Link>
        </div>

        <nav
          className="hidden items-center justify-center gap-8 sm:flex"
          aria-label="Main navigation"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`relative rounded-md px-1 py-2 font-sans text-[13px] font-medium no-underline transition-[color,opacity] duration-200 hover:text-accent md:text-[16px] ${
                isActive(href) ? "text-accent" : "text-heading"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end">
          <div className="hidden sm:block">
            <Button
              href="/#contact"
              className="h-9 w-[112px] px-3 py-0 text-xs md:h-10 md:w-[128px] md:text-[13px]"
            >
              Get Started
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative grid size-10 place-items-center rounded-full text-heading transition-colors duration-200 hover:bg-heading/5 active:bg-heading/10 sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span
                className={`h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-24 bg-black/30 transition-opacity duration-300 sm:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`absolute inset-x-0 top-full origin-top border-t border-heading/10 bg-white px-4 pb-5 pt-3 shadow-xl transition-[opacity,transform,visibility] duration-300 ease-out sm:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium no-underline transition-colors active:bg-accent/5 ${
                  isActive(href)
                    ? "bg-accent/5 text-accent"
                    : "text-heading hover:bg-accent/5"
                }`}
              >
                {label}
                <span aria-hidden="true" className="text-heading/30">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/#contact" onClick={closeMenu} className="mt-4 h-11 w-full">
          Get Started
        </Button>
      </nav>
    </header>
  );
}
