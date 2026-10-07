import Image from "next/image";
import bot from "@/assests/hero_bot.webp";
import Trends from "@/assests/hero_banner_1.webp";
import Progress from "@/assests/hero_banner_2.webp";

function MetricCard({ image, alt, className, delay }) {
  return (
    <div data-enter="hero-image" className={`absolute z-20 hidden h-auto drop-shadow-[var(--shadow-hero-float)] md:block ${className}`}>
      <Image src={image} alt={alt} data-bounce style={{ "--bounce-delay": delay }} className="h-auto w-full" />
    </div>
  );
}

export default function HeroDecorations() {
  return (
    <>
      <MetricCard image={Trends} alt="Trends are up 72.5 percent" delay="1.1s" className="left-[4%] top-[26%] w-[clamp(120px,16vw,190px)] -rotate-[29deg]" />
      <MetricCard image={Progress} alt="Progress is up 99.7 percent" delay="1.7s" className="right-[4%] top-[29%] w-[clamp(120px,16vw,190px)] rotate-[29deg]" />
      <div data-enter="hero-image" className="absolute right-[19%] top-[10%] hidden w-[80px] h-[80px] rotate-[9deg] place-items-center md:grid" aria-hidden="true">
        <Image src={bot} alt="" width={80} height={80} data-bounce style={{ "--bounce-delay": "1.4s" }} className="w-full h-full object-contain" />
      </div>
    </>
  );
}
