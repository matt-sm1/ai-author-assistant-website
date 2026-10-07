export default function ContentPage({ eyebrow, title, description, children }) {
  return (
    <main className="min-h-[calc(100vh-var(--header-height))] bg-[radial-gradient(ellipse_at_50%_0%,var(--surface-glow),transparent_43%),var(--theme-hex-fbf9fc)] px-6 pt-[clamp(64px,9vw,112px)] pb-[88px] max-[720px]:px-[18px]">
      <div className="mx-auto max-w-[760px] text-center">
        <span className="text-[13px] font-semibold tracking-[.02em] text-accent">{eyebrow}</span>
        <h1 className="my-[14px] text-[clamp(36px,6vw,60px)] leading-[1.08] font-bold tracking-[-.045em] text-heading">{title}</h1>
        <p className="mx-auto max-w-[640px] text-base leading-[1.7] text-[var(--theme-hex-666477)]">{description}</p>
      </div>
      <div className="mx-auto mt-[58px] w-full max-w-[1000px]">{children}</div>
    </main>
  );
}

export function InfoCard({ title, children, className = "" }) {
  return (
    <article className={`min-h-[170px] rounded-2xl border border-[var(--theme-hex-36224e)]/[.09] bg-white/[.86] p-6 shadow-[var(--shadow-card-content)] max-[720px]:min-h-0 ${className}`}>
      <h2 className="mb-2.5 text-lg font-semibold text-heading">{title}</h2>
      <p className="m-0 text-sm leading-[1.65] text-[var(--theme-hex-666477)]">{children}</p>
    </article>
  );
}
