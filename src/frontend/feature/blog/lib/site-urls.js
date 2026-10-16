const DEFAULT_MARKETING = "https://authoraiassistant.com";

export function getMarketingSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_MARKETING_SITE_URL?.trim();
  return (raw || DEFAULT_MARKETING).replace(/\/+$/, "");
}

/**
 * Canonical blog base URL (must include `/blogs`).
 * If NEXT_PUBLIC_SITE_URL is only an origin, `/blogs` is appended.
 */
export function getPublicSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const base = raw.replace(/\/+$/, "");
    try {
      const { pathname } = new URL(base);
      if (!pathname || pathname === "/") {
        return `${base}/blogs`;
      }
    } catch {
      /* relative or invalid — use as-is after trim */
    }
    return base;
  }
  return `${getMarketingSiteUrl()}/blogs`;
}

export function marketingPath(path = "/") {
  const base = getMarketingSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute or same-origin public article URL under `/blogs/{slug}`. */
export function publicPostUrl(slug) {
  const safe = String(slug || "").replace(/^\/+/, "");
  const base = getPublicSiteUrl();
  if (base) return `${base}/${safe}`;
  return `/blogs/${safe}`;
}
