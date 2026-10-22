export default function AdvantageIcon({ src }) {
  return (
    <div
      className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[14px] bg-[var(--theme-purple-brand)] shadow-[var(--shadow-icon)]"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={60}
        height={60}
        decoding="async"
        className="h-[60px] w-[60px] object-cover object-center"
      />
    </div>
  );
}
