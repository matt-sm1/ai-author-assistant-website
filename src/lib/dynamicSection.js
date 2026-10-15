import dynamic from "next/dynamic";

/**
 * Shared dynamic() defaults for marketing sections.
 * SSR stays on for SEO; JS loads as a separate chunk.
 */
export function dynamicSection(loader) {
  return dynamic(loader, { ssr: true });
}
