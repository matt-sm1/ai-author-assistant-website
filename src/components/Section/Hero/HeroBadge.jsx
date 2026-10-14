import { HiSparkles } from "react-icons/hi2";

export default function HeroBadge({ label }) {
  return (
    <span className="mx-auto inline-flex h-[49px] w-[272px] items-center justify-center gap-1.5 rounded-[30px] bg-[linear-gradient(180deg,var(--theme-white)_60%,var(--theme-purple-wash)_100%)] py-3 pr-[17px] pl-3 shadow-[4px_4px_9px_0px_var(--theme-shadow-inset-dark)_inset,-4px_-4px_4px_0px_var(--theme-shadow-inset-purple)_inset]">
      <HiSparkles className="shrink-0 text-[var(--theme-purple-brand)]" aria-hidden="true" />
      <span className="whitespace-nowrap text-center font-sans text-[13px] font-medium leading-[24.8px] tracking-[0] text-[var(--theme-purple-brand)] sm:text-[16px]">
        {label}
      </span>
    </span>
  );
}
