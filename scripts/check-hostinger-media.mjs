/**
 * Ops health probe for Hostinger media CDN (ADR 0003).
 *
 * HEAD $HOSTINGER_PUBLIC_BASE_URL/media/<sample>[?v=VERSION]
 * - 2xx + image/*  → pass
 * - 3xx to foreign host → fail (catch-all redirect regression)
 * - missing env → warn + skip (exit 0)
 *
 * When NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION is set, the probe uses ?v=
 * (same as the app) so a still-cached hCDN 301 on bare URLs does not false-fail
 * while the busted URL returns 200.
 *
 * Env:
 *   HOSTINGER_PUBLIC_BASE_URL                 required for a real check
 *   HOSTINGER_MEDIA_SAMPLE_PATH               optional path under /media/
 *   NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION   optional cache-bust query
 *
 * Usage: npm run check:hostinger-media
 */

const base = (process.env.HOSTINGER_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
const samplePath = (
  process.env.HOSTINGER_MEDIA_SAMPLE_PATH ||
  "2026/10/01M5AA864J147R5D9MCE2GDJBN.png"
).replace(/^\/+/, "");
const version = (process.env.NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION || "").trim();

function fail(message) {
  console.error(`check-hostinger-media: FAIL — ${message}`);
  process.exit(1);
}

function warn(message) {
  console.warn(`check-hostinger-media: SKIP — ${message}`);
  process.exit(0);
}

if (!base) {
  warn("HOSTINGER_PUBLIC_BASE_URL is not set");
}

const url = new URL(`${base}/media/${samplePath}`);
if (version) url.searchParams.set("v", version);

console.log(`check-hostinger-media: HEAD ${url}`);

let res;
try {
  res = await fetch(url, { method: "HEAD", redirect: "manual" });
} catch (err) {
  fail(`network error: ${err?.message || err}`);
}

const status = res.status;
const location = res.headers.get("location") || "";
const contentType = (res.headers.get("content-type") || "").toLowerCase();

if (status >= 300 && status < 400) {
  let foreign = false;
  try {
    const locHost = new URL(location, url).hostname;
    const baseHost = new URL(base).hostname;
    foreign = locHost !== baseHost;
  } catch {
    foreign = Boolean(location);
  }
  if (foreign) {
    fail(
      `${status} redirect to foreign host (${location}). ` +
        "Likely restored catch-all .htaccess — see ADR 0003 Forbidden. " +
        "If origin was fixed, set NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION and/or purge hCDN.",
    );
  }
  fail(`${status} redirect to ${location || "(empty Location)"}`);
}

if (status < 200 || status >= 300) {
  fail(`unexpected status ${status}`);
}

if (!contentType.startsWith("image/")) {
  fail(`expected image/* Content-Type, got "${contentType || "(none)"}"`);
}

console.log(`check-hostinger-media: OK — ${status} ${contentType}`);
process.exit(0);
