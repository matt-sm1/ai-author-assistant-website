"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Har section ke badge, heading, paragraph, list item aur card ko khud tag karta hai
  aur scroll par reveal karta hai. Hero (#home) is se bahar hai, kyunke uski
  load animations data-enter se chalti hain.

  Manual control chahiye to kisi bhi element par lagao:
    data-reveal-item                      -> reveal mein shamil karo
    data-reveal-from="left|right|zoom"    -> direction badlo
    data-no-reveal                        -> is element ko chhodo
*/
const SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main li",
  "main article",
  "main span[class*='rounded-[30px]']", // badge pill
  "main [data-badge]",
  "main [data-reveal]",
  "main [data-reveal-from]",
  "main [data-reveal-item]",
].join(",");

const STAGGER = 90; // ms, same parent ke elements ke beech
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
      // card ke andar wale elements card ke saath hi aate hain
      if (el.parentElement?.closest("[data-scroll-reveal]")) return;

      const parent = el.parentElement;
      const index = perParent.get(parent) ?? 0;
      perParent.set(parent, index + 1);

      el.setAttribute("data-scroll-reveal", "");
      el.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER, MAX_DELAY)}ms`);
      targets.push(el);
    });

    // Pehle se data-scroll-reveal wale elements bhi observe karo
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

          // Hidden state ko pehle paint kar ke reveal transition start karo.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!el.isConnected) return;
              el.setAttribute("data-revealed", "");
              // Reveal stagger sirf entrance par ho; hover turant respond kare.
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
