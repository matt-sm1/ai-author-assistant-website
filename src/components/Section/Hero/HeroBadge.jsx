import { HiSparkles } from "react-icons/hi2";

export default function HeroBadge() {
  return (
    <span className="mx-auto inline-flex h-[49px] w-[272px] items-center justify-center gap-1.5 rounded-[30px] bg-[linear-gradient(180deg,var(--theme-hex-ffffff)_60%,var(--theme-hex-f6e6ff)_100%)] py-3 pr-[17px] pl-3 shadow-[4px_4px_9px_0px_var(--theme-hex-3d3d3d1a)_inset,-4px_-4px_4px_0px_var(--theme-hex-b821ea14)_inset]">
      <HiSparkles className="shrink-0 text-[var(--theme-hex-8546ef)]" aria-hidden="true" />
      <span className="whitespace-nowrap text-center font-sans text-[13px] font-medium leading-[24.8px] tracking-[0] text-[var(--theme-hex-8546ef)] sm:text-[16px]">
        AI-Powered Author Assistant
      </span>
    </span>
  );
}
