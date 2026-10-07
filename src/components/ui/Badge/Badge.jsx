export default function Badge({
  children = "Core Features",
  className = "",
  ...props
}) {
  return (
    <span
      data-badge
      className={`inline-flex rounded-[160px] bg-gradient-to-r from-[var(--theme-hex-f5c6ea)] via-[var(--theme-hex-c9a9f5)] to-[var(--theme-hex-9b72f2)] p-px ${className}`}
      {...props}
    >
      <span
        className="
          inline-flex items-center rounded-[160px]
          bg-white
          px-3 py-1
          font-sans text-[12px] font-normal
          uppercase leading-[18px]
          tracking-normal text-copy
          sm:px-[14px] sm:py-[5px]
          sm:text-[14px] sm:leading-[21.7px]
        "
      >
        {children}
      </span>
    </span>
  );
}
