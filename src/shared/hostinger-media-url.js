/**
 * Canonical Hostinger media URL helpers (ADR 0003).
 *
 * Single source of truth — usable by both backend (Node / server) and
 * frontend (browser) code. Do NOT duplicate logic in feature files.
 *
 * Hostinger layout:
 *   media_root          = public_html/media
 *   storage key         = media/YYYY/MM/file.ext
 *   canonical public URL = {base}/media/YYYY/MM/file.ext  (flat)
 *
 * Legacy uploads may reside at public_html/media/media/YYYY/... (nested).
 * Happy-path is always flat; nested is legacy fallback only.
 *
 * Cache-bust:
 *   Set NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION in .env to force a new ?v=
 *   query that bypasses Hostinger hCDN long-lived caches. When the env var
 *   is absent (or empty) no query parameter is appended — safe for fresh
 *   deployments that have never cached bad URLs.
 *
 * Forbidden:
 *   - Do NOT build /media/media/... on the happy path (ADR 0003).
 *   - Do NOT call toNestedHostingerMediaUrl outside of error-retry code.
 *   - Do NOT duplicate these helpers in feature modules.
 */

// Next.js replaces NEXT_PUBLIC_* at build time (client) and reads process.env
// at runtime (Node). Both work correctly here.
//
// Temporary default "20261029" when the env var is unset — required until
// Hostinger hCDN year-long cached 301s are purged. After purge: set the env
// to "" (empty) or remove the default here. Explicit "" disables ?v=.
const CACHE_BUST_VERSION = (() => {
  // eslint-disable-next-line no-undef
  if (typeof process === "undefined") return "20261029";
  const raw = process.env?.NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION;
  if (raw !== undefined) return String(raw).trim();
  // Keep unit tests deterministic without an env file
  if (process.env.NODE_ENV === "test") return "";
  return "20261029";
})();

const FLAT_MEDIA_PATH = /^\/media\/(\d{4}\/\d{2}\/.+)$/;
const NESTED_MEDIA_PATH = /^\/media\/media\/(\d{4}\/\d{2}\/.+)$/;

/**
 * Apply ?v=<version> cache-bust to a URL object (mutates in place).
 * No-op when CACHE_BUST_VERSION is empty or URL is not a /media/ path.
 */
function applyVersionQuery(url) {
  if (!(url instanceof URL)) return url;
  if (!url.pathname.startsWith("/media/")) return url;
  if (CACHE_BUST_VERSION && !url.searchParams.has("v")) {
    url.searchParams.set("v", CACHE_BUST_VERSION);
  }
  return url;
}

/**
 * Canonical flat Hostinger URL.
 * - /media/media/YYYY/... → /media/YYYY/...  (flatten nested legacy)
 * - Already-flat URLs pass through unchanged.
 * - Appends ?v= when NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION is set.
 * - Idempotent; safe to call multiple times.
 *
 * @param {string|null|undefined} src
 * @returns {string} canonical URL, or original src on parse failure / non-media
 */
export function toCanonicalHostingerMediaUrl(src) {
  if (typeof src !== "string" || !src) return src;
  try {
    const url = new URL(src);
    const nested = url.pathname.match(NESTED_MEDIA_PATH);
    if (nested) {
      url.pathname = `/media/${nested[1]}`;
    }
    if (url.pathname.startsWith("/media/")) {
      applyVersionQuery(url);
      return url.toString();
    }
  } catch {
    /* non-parseable: return original */
  }
  return src;
}

/**
 * Legacy nested URL — for MediaImage error-retry ONLY.
 * Flat /media/YYYY/... → /media/media/YYYY/...
 * Do NOT use on the happy path.
 *
 * @param {string|null|undefined} src
 * @returns {string}
 */
export function toNestedHostingerMediaUrl(src) {
  if (typeof src !== "string" || !src) return src;
  try {
    const url = new URL(src);
    if (
      FLAT_MEDIA_PATH.test(url.pathname) &&
      !url.pathname.startsWith("/media/media/")
    ) {
      url.pathname = `/media${url.pathname}`;
      applyVersionQuery(url);
      return url.toString();
    }
  } catch {
    /* ignore */
  }
  return src;
}

/**
 * Alternate path for MediaImage load-error fallback: flat↔nested.
 * Returns nested when given flat; returns flat (canonical) when given nested.
 *
 * @param {string|null|undefined} src
 * @returns {string}
 */
export function toAlternateHostingerMediaUrl(src) {
  if (typeof src !== "string" || !src) return src;
  try {
    const url = new URL(src);
    if (NESTED_MEDIA_PATH.test(url.pathname)) {
      return toCanonicalHostingerMediaUrl(src);
    }
    if (
      FLAT_MEDIA_PATH.test(url.pathname) &&
      !url.pathname.startsWith("/media/media/")
    ) {
      return toNestedHostingerMediaUrl(src);
    }
  } catch {
    /* ignore */
  }
  return src;
}

/**
 * Returns true when src is any Hostinger-served /media/ URL
 * (either flat or nested).
 *
 * @param {string|null|undefined} src
 * @returns {boolean}
 */
export function isHostingerMediaUrl(src) {
  if (typeof src !== "string" || !src) return false;
  try {
    const url = new URL(src);
    return (
      url.pathname.startsWith("/media/") &&
      (url.hostname.endsWith(".hostingersite.com") ||
        url.hostname.endsWith(".hostinger.site"))
    );
  } catch {
    return false;
  }
}

/**
 * Canonicalize all Hostinger /media/ URLs inside an HTML string.
 * Rewrites src= and href= attributes: nested → flat + ?v= applied.
 *
 * Used at the API boundary (toPublicPost) and in sanitize-post-html so that
 * post bodies are clean before they reach the browser.
 *
 * @param {string} html
 * @returns {string}
 */
export function rewriteHostingerMediaUrlsInHtml(html) {
  if (typeof html !== "string" || !html) return html || "";

  return html.replace(
    /\b(src|href)=(["'])(https?:\/\/[^"']+)\2/gi,
    (match, attr, quote, url) => {
      const canonical = toCanonicalHostingerMediaUrl(url);
      if (canonical === url) return match;
      return `${attr}=${quote}${canonical}${quote}`;
    },
  );
}
