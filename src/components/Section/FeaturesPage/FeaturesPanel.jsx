/**
 * Inset white rounded panel used by Features marketing sections.
 * Sits on page grey (`--theme-background`); not full-bleed.
 */
export default function FeaturesPanel({ children, className = "" }) {
  return (
    <div
      className={`rounded-[20px] bg-[var(--theme-surface)] px-5 py-8 sm:rounded-[24px] sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 ${className}`}
    >
      {children}
    </div>
  );
}
