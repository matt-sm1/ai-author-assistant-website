# Changelog

Keep this file current so future work does not overlap or undo prior decisions.
Newest entries first. Agents must read this before implementing, and append after meaningful changes.

## [Unreleased]

## 2026-10-17

### Blogs → CMS app rewrite
- Removed stub `(marketing)/blogs` page so it does not shadow the proxy.
- Added `vercel.json` rewrites: `/blogs` and `/blogs/:path*` → `https://author-ai-assistant.vercel.app/blogs…`.
- Header/footer **Blogs** still link to `/blogs` (served by the dashboard app with `basePath`).

### Blogs page (superseded)
- Temporary marketing `/blogs` stub removed in favor of the rewrite above.

### Favicon
- Replaced `src/app/icon.svg` with purple gradient chat-bot mark (Downloads source).

### Block crawlers
- Site-wide `metadata.robots` noindex/nofollow in `src/app/layout.js`.
- `src/app/robots.js` serves `/robots.txt` with `User-Agent: *` / `Disallow: /`.

### Change records
- Added root `CHANGELOG.md` + always-on rule `.cursor/rules/06-change-records.mdc`.
- Global template/rule draft: `~/.cursor/USER_RULE_change-records.md` and `~/.cursor/templates/CHANGELOG.md` (paste User Rule into Cursor Customize for all projects).

## 2026-10-16

### Favicon
- Added AuthorBot brand SVG as App Router favicon: `src/app/icon.svg`.

### Performance architecture
- Path-based media under `public/images/{brand,home}/` + `src/content/media.js` (`MEDIA_BASE` CDN-ready).
- Marketing route group: `src/app/(marketing)/layout.js` (Header/Footer); root layout is fonts/globals/skip only.
- Home page composition-only; below-fold sections via `dynamicSection()` (`ssr: true`).
- LCP: `priority` only on logo + hero dashboard.
- Fonts trimmed: Inter 400/500/700; Host Grotesk 600/700.
- Removed JS-bundled `src/assets/`; dead modules (`SocailMedia`, `ContentPage`) removed.
- Quality gate: Vitest + Playwright (`e2e` on port 3100); docs/ADRs + `QUALITY_REPORT.md` evidence.
- Commits: `0df9603` (perf architecture), `65cf3eb` (favicon).

## 2026-10-15

### Quality / tooling baseline
- Content seam under `src/content/home/*`; ADR 0001 (content + security overrides).
- Expert pack: `.cursor/rules`, `.cursor/guides`, `AGENTS.md`.
