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
