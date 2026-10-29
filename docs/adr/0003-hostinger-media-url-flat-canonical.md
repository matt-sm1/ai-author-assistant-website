# ADR 0003: Hostinger media URL — flat canonical

## Status

Accepted — 29 Oct 2026

## Context

Storage keys are `media/YYYY/MM/file.ext`. Hostinger `media_root` is already
`public_html/media`, so PHP writes files at `public_html/media/YYYY/...` and
the correct public URL is `{HOSTINGER_PUBLIC_BASE_URL}/media/YYYY/...`.

An earlier workaround built URLs as `${base}/media/${storageKey}` →
`/media/media/YYYY/...` because old PHP nested keys under `media_root` again.
The frontend also rewrote flat URLs to nested on every display path.

After PHP was fixed to write flat files, the Next app still preferred nested
URLs. Nested requests against a flat disk 404 — media disappeared on the site.

## Decision

1. **Canonical public URL is flat:** `publicUrlForKey` returns
   `` `${base}/${storageKey}` `` (never `${base}/media/${storageKey}`).
2. **Normalize once at the API boundary:** `toPublicPost` /
   `toPublicPostList` run `toCanonicalHostingerMediaUrl` on `featured_image`
   and `rewriteHostingerMediaUrlsInHtml` on `content`. Sanitize/TinyMCE also
   use the shared helpers — do not invent per-leaf URL rewrites.
3. **`/media/media/...` is legacy only** — `MediaImage` may retry the alternate
   flat↔nested path once on load error; Hostinger `.htaccess` may rewrite both
   directions until disks are cleaned up.
4. **Cache-bust query:** `NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION`. When the env
   is **unset**, code defaults to `20261029` until hCDN/browser year-long 301
   caches are gone. Explicit empty string disables `?v=`.
5. Do **not** reintroduce happy-path nesting or `${base}/media/${storageKey}`
   without a new ADR and a Hostinger disk-layout check.
6. **Public post page layout:** title → author/date byline → HTML body only.
   Do **not** render `featured_image` as an article hero (cards + OG only).
7. **No external image dependencies in post HTML:** pasted/local images and
   remote image URLs must be uploaded into the Hostinger media library
   (`images_upload_handler` + `POST /api/media/import-url`). Sanitize strips
   `data:` and non-Hostinger `img` src. MediaPicker includes an Upload mode;
   after upload the user confirms Select (no auto-apply).

## Consequences

- New uploads persist flat URLs in Neon.
- Old DB rows with nested URLs still work via flatten-on-read + fallback.
- Tests assert flat URLs so CI cannot “green” a nested regression.
- Operators should re-upload `hostinger-media-api/media/.htaccess` after deploy.
- Shared policy module: `src/shared/hostinger-media-url.js` (frontend re-exports
  via `src/frontend/lib/hostinger-media-url.js`).
- Verified working on production 29 Oct 2026 (`9d82ffd` media boundary,
  `91ad152` post layout).

## Forbidden

- Root `public_html/.htaccess` catch-all redirect of `*.hostingersite.com` to any
  other domain (e.g. `authoraiassistant.com/blogs`). Backup exists at
  `.htaccess.bak-redirect-fix` — **do not restore it**.
- Happy-path construction of `/media/media/...` in `publicUrlForKey` or UI helpers.
- Duplicating Hostinger URL rewrite logic outside `src/shared/hostinger-media-url.js`.
- Re-adding a featured-image hero on `BlogArticle` without an explicit product
  change (causes double images when the asset is also in post HTML).
- Leaving third-party or `data:` image URLs in saved/published post HTML.
- Auto-applying MediaPicker uploads without an explicit Select confirm.

## Required after any Hostinger hPanel / FTP change

1. `curl -sI $HOSTINGER_PUBLIC_BASE_URL/media/<any-existing-file>` must return
   **200** with `Content-Type: image/*` (not 301/302 to a foreign host).
2. Run: `npm run check:hostinger-media`
3. If CDN or browsers still serve cached 301s (`Cache-Control: immutable`):
   - Keep / bump `NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION=YYYYMMDD` (or rely on
     the temporary code default), redeploy.
   - Purge Hostinger hCDN cache in hPanel.
   - After bare `/media/*` returns 200 in a real browser without `?v=`, set the
     env to `""`, remove the code default, and redeploy.
