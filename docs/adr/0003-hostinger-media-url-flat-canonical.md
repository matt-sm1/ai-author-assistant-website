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
2. **Display/sanitize/TinyMCE** normalize nested → flat via
   `toCanonicalHostingerMediaUrl` / HTML rewrite.
3. **`/media/media/...` is legacy only** — `MediaImage` may retry the alternate
   flat↔nested path once on load error; Hostinger `.htaccess` may rewrite both
   directions until disks are cleaned up.
4. Do **not** reintroduce happy-path nesting or `${base}/media/${storageKey}`
   without a new ADR and a Hostinger disk-layout check.

## Consequences

- New uploads persist flat URLs in Neon.
- Old DB rows with nested URLs still work via flatten-on-display + fallback.
- Tests assert flat URLs so CI cannot “green” a nested regression.
- Operators should re-upload `hostinger-media-api/media/.htaccess` after deploy.
- Shared policy module: `src/shared/hostinger-media-url.js` (frontend re-exports
  via `src/frontend/lib/hostinger-media-url.js`). Normalize at `toPublicPost` /
  `toPublicPostList` so every public surface gets canonical URLs once.

## Forbidden

- Root `public_html/.htaccess` catch-all redirect of `*.hostingersite.com` to any
  other domain (e.g. `authoraiassistant.com/blogs`). Backup exists at
  `.htaccess.bak-redirect-fix` — **do not restore it**.
- Happy-path construction of `/media/media/...` in `publicUrlForKey` or UI helpers.
- Duplicating Hostinger URL rewrite logic outside `src/shared/hostinger-media-url.js`.

## Required after any Hostinger hPanel / FTP change

1. `curl -sI $HOSTINGER_PUBLIC_BASE_URL/media/<any-existing-file>` must return
   **200** with `Content-Type: image/*` (not 301/302 to a foreign host).
2. Run: `npm run check:hostinger-media`
3. If CDN still serves cached 301s (`Cache-Control: immutable` / year-long max-age):
   - Set `NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION=YYYYMMDD` in Vercel (and local
     `.env.local`), redeploy.
   - Purge Hostinger hCDN cache in hPanel.
   - After purge confirms 200 without `?v=`, clear the env var and redeploy.
