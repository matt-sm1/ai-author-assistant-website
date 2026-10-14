import Image from "next/image";
import HeroBottom from "@/assets/hero_bottom.webp";
import TrustedBy from "@/components/Section/TrustedBy";
import HeroContent from "@/components/Section/Hero/HeroContent";
import HeroDashboard from "@/components/Section/Hero/HeroDashboard";
import HeroDecorations from "@/components/Section/Hero/HeroDecorations";

export default function HeroSection({ heroContent }) {
  return (
    <>
      <section
        id="home"
        className="relative bg-[var(--theme-background-soft)] bg-[url('/hero.webp')] bg-cover bg-top bg-no-repeat"
      >
        <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden border-x-[0.8px] border-solid border-white px-5 pt-[96px] text-center sm:px-8 lg:px-10">
          <HeroDecorations />
          <HeroContent {...heroContent} />
          <HeroDashboard />
        </div>
        <Image
          src={HeroBottom}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-auto w-full"
        />
      </section>
      <TrustedBy />
    </>
  );
}
