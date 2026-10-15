"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main article",
  "main [data-badge]",
  "main [data-reveal]",
  "main [data-reveal-from]",
  "main [data-reveal-item]",
  "main [data-reveal-step]",
].join(",");

const STAGGER = 90;
const MAX_DELAY = 450;

export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const perParent = new Map();
    const targets = [];

    document.querySelectorAll(SELECTOR).forEach((el) => {
      if (el.hasAttribute("data-scroll-reveal")) return;
      if (el.closest("[data-no-reveal], #home, [data-enter], [data-bounce], [data-marquee]")) return;
      // Nested content inside an already-revealed card animates with the card
      if (el.parentElement?.closest("[data-scroll-reveal]")) return;

      const parent = el.parentElement;
      const index = perParent.get(parent) ?? 0;
      perParent.set(parent, index + 1);

      el.setAttribute("data-scroll-reveal", "");
      el.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER, MAX_DELAY)}ms`);
      targets.push(el);
    });

    document.querySelectorAll("[data-scroll-reveal]:not([data-revealed])").forEach((el) => {
      if (!targets.includes(el)) targets.push(el);
    });

    root.setAttribute("data-reveal-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!el.isConnected) return;
              el.setAttribute("data-revealed", "");
              // Clear stagger after entrance so hover responds immediately
              window.setTimeout(() => el.style.setProperty("--reveal-delay", "0ms"), 1400);
            });
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
