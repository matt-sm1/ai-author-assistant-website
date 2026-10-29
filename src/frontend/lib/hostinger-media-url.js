/**
 * Hostinger layout (ADR 0003):
 *   media_root = public_html/media
 *   storage key = media/YYYY/MM/file.ext
 *   canonical public URL = /media/YYYY/MM/file.ext (flat)
 *
 * Legacy uploads may still exist under public_html/media/media/YYYY/...
 * Prefer flat URLs on the happy path; use toNestedHostingerMediaUrl only as
 * an error-fallback alternate.
 */

const FLAT_MEDIA_PATH = /^\/media\/(\d{4}\/\d{2}\/.+)$/;
const NESTED_MEDIA_PATH = /^\/media\/media\/(\d{4}\/\d{2}\/.+)$/;

/**
 * Canonical flat Hostinger URL: /media/media/YYYY/... → /media/YYYY/...
 * Idempotent for already-flat URLs.
 */
export function toCanonicalHostingerMediaUrl(src) {
  if (typeof src !== "string" || !src) return src;
  try {
    const url = new URL(src);
    const nested = url.pathname.match(NESTED_MEDIA_PATH);
    if (nested) {
      url.pathname = `/media/${nested[1]}`;
      return url.toString();
    }
  } catch {
    /* ignore */
  }
  return src;
}

/**
 * Legacy nested URL for MediaImage error fallback only.
 * Flat /media/YYYY/... → /media/media/YYYY/...
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
      return url.toString();
    }
  } catch {
    /* ignore */
  }
  return src;
}

/**
 * Alternate path for load fallback: flat↔nested.
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
 * Rewrite nested Hostinger /media/media/YYYY/... URLs inside HTML to flat
 * /media/YYYY/... so TinyMCE and article bodies match ADR 0003.
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
