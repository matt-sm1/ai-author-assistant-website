import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  className = "",
  href,
  ...props
}) {
  return (
    <Link
      href={href}
      data-btn
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-lg bg-[linear-gradient(180deg,var(--theme-hex-333743)_0%,var(--theme-hex-09041d)_100%)] px-5 py-2.5 font-sans text-sm font-medium leading-5 text-white no-underline transition-[opacity,transform] duration-200 ease-out hover:scale-[1.02] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-hex-333743)] active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base sm:leading-6",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
