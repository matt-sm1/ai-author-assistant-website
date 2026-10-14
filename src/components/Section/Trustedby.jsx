import Image from "next/image";
import trusted from "@/assets/trusted.webp";

export default function TrustedBy() {
  return (
    <section className="w-full overflow-hidden border-y-[0.8px] border-solid border-[var(--theme-border)] bg-[var(--theme-background)] pb-10 pt-9">
      <h3 className="mb-7 text-center font-sans text-[14px] md:text-[18px] font-normal leading-[27.9px] tracking-[0] text-[var(--theme-copy)]">
        Trusted by 300+ companies
      </h3>

      <div className="group [mask-image:linear-gradient(to_right,transparent,var(--theme-black)_8%,var(--theme-black)_92%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Image
            src={trusted}
            alt="Our partners"
            priority
            draggable={false}
            className="h-12 w-auto max-w-none shrink-0"
          />

          <Image
            src={trusted}
            alt=""
            aria-hidden="true"
            priority
            draggable={false}
            className="h-12 w-auto max-w-none shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
