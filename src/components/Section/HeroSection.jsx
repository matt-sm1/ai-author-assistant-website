import Image from "next/image";
import HeroBottom from "@/assests/hero_bottom.webp";
import TrustedBy from "./Trustedby";
import HeroContent from "./Hero/HeroContent";
import HeroDashboard from "./Hero/HeroDashboard";
import HeroDecorations from "./Hero/HeroDecorations";

export default function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="relative bg-[var(--theme-hex-f7f5f8)] bg-[url('/hero.webp')] bg-cover bg-top bg-no-repeat"
      >
        <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden border-x-[0.8px] border-solid border-white px-5 pt-[96px] text-center sm:px-8 lg:px-10">
          <HeroDecorations />
          <HeroContent />
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
