import Image from "next/image";
import { homeImages } from "@/content/media";

function MetricCard({ image, alt, className, delay }) {
  return (
    <div
      data-enter="hero-image"
      className={`absolute z-20 hidden h-auto drop-shadow-[var(--shadow-hero-float)] md:block ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        width={190}
        height={120}
        data-bounce
        style={{ "--bounce-delay": delay }}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function HeroDecorations() {
  return (
    <>
      <MetricCard
        image={homeImages.heroBanner1}
        alt="Trends are up 72.5 percent"
        delay="1.1s"
        className="left-[4%] top-[26%] w-[clamp(120px,16vw,190px)] -rotate-[29deg]"
      />
      <MetricCard
        image={homeImages.heroBanner2}
        alt="Progress is up 99.7 percent"
        delay="1.7s"
        className="right-[4%] top-[29%] w-[clamp(120px,16vw,190px)] rotate-[29deg]"
      />
      <div
        data-enter="hero-image"
        className="absolute right-[19%] top-[10%] hidden h-[80px] w-[80px] rotate-[9deg] place-items-center md:grid"
        aria-hidden="true"
      >
        <Image
          src={homeImages.heroBot}
          alt=""
          width={80}
          height={80}
          data-bounce
          style={{ "--bounce-delay": "1.4s" }}
          className="h-full w-full object-contain"
        />
      </div>
    </>
  );
}
