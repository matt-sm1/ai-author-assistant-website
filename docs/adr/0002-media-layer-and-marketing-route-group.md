# ADR 0002: Media layer and marketing route group

## Status
Accepted — 15 Oct 2026

## Context
The home page pulled ~24 static image modules through the JS graph and mounted Header/Footer in the root layout. That made first load heavy and would worsen as the site grows past 20 pages.

## Decision
1. **Path-based media:** Marketing images live under `public/images/{brand,home}/`. Content modules store string paths. `src/content/media.js` centralizes `MEDIA_BASE` so a CDN origin can be introduced without rewriting sections.
2. **Marketing route group:** `app/(marketing)/layout.js` owns Header/Footer. Root `app/layout.js` owns fonts, globals, and skip link only.
3. **Composition + code split:** Home page composes sections; below-fold sections load via `dynamicSection()` (`next/dynamic`, `ssr: true`).
4. **LCP priority:** Only brand logo and hero dashboard use `priority`.

## Consequences
- Images are no longer webpack/turbopack modules for marketing content
- Future pages cannot accidentally inflate the root layout bundle with page chrome or media
- CDN adoption is a config change (`MEDIA_BASE` + remote patterns), not a rewrite
- `npm run images:compress` re-encodes files already in `public/images`

## Rejected alternatives
- Keeping `src/assets` static imports (couples media to JS graph)
- Docs-only multi-page readiness without route-group code (does not prevent root-layout bloat)
