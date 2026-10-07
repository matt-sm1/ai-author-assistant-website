import { cn } from "@/lib/utils";

export default function Paragraph({
  children,
  className = "",
  ...props
}) {
  return (
    <p
      className={cn(
        "mx-auto w-full max-w-[600px] text-center font-sans text-[14px] leading-[1.55] font-normal tracking-normal text-copy sm:text-[16px] sm:leading-[1.6]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}