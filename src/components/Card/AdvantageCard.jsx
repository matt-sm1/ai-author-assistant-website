import { cn } from "@/lib/utils";

export default function AdvantageCard({
  Icon,
  title,
  description,
  className = "",
}) {
  return (
    <article
      className={cn(
        "flex h-[241.4px] flex-col justify-between rounded-[14px] border-[0.8px] border-[var(--theme-hex-e1e1e1)] bg-white p-6",
        className
      )}
    >
      <span className="flex h-[61.6px] w-[61.6px] shrink-0 items-center justify-center rounded-[14px] border-[0.8px] border-[var(--theme-hex-eae8ec)] bg-[var(--theme-hex-8546ef)] p-[14px] shadow-[var(--shadow-icon)]">
        <Icon className="h-full w-full text-white" aria-hidden="true" />
      </span>

      <div>
        <h3 className="font-display text-[18px] leading-[22px] font-semibold tracking-normal text-heading sm:text-[20px] sm:leading-6">
          {title}
        </h3>

        <p className="mt-2 max-w-[370px] font-sans text-[13px] leading-[21px] font-normal tracking-normal text-copy sm:text-[14px] sm:leading-[23.1px]">
          {description}
        </p>
      </div>
    </article>
  );
}
