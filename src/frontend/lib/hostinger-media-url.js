/**
 * Hostinger media URL helpers — frontend re-export.
 * Single implementation lives in src/shared/hostinger-media-url.js (ADR 0003).
 * Import from here in frontend code; import from @/shared/hostinger-media-url
 * in backend/shared code.
 */
export {
  toCanonicalHostingerMediaUrl,
  toNestedHostingerMediaUrl,
  toAlternateHostingerMediaUrl,
  isHostingerMediaUrl,
  rewriteHostingerMediaUrlsInHtml,
} from "@/shared/hostinger-media-url";
