import Image from "next/image";
import Dashboard from "@/assets/hero_banner.webp";

export default function HeroDashboard() {
  return (
    <div data-enter="hero-image" className="relative z-10 mx-auto mt-10 w-full max-w-[1080px] overflow-hidden rounded-t-2xl border border-white/85 bg-white/50 p-2 pb-0 shadow-[var(--shadow-hero)] sm:mt-12 sm:p-3 sm:pb-0">
      <Image
        src={Dashboard}
        alt="AuthorBot dashboard for reader conversations and book recommendations"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 84vw, 1080px"
        className="block h-auto w-full rounded-t-xl"
      />
    </div>
  );
}
