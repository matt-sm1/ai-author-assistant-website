import { cn } from "@/lib/utils";

export default function Heading({
  as: Tag = "h1",
  children,
  className = "",
  ...props
}) {
  return (
    <Tag
      className={cn(
        "mx-auto text-center font-display text-[26px] leading-8 font-bold text-heading sm:text-4xl sm:leading-[46px] md:text-[56px] md:leading-[70px]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}