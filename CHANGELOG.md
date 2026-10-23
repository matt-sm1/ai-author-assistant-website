# Changelog

Keep this file current so future work does not overlap or undo prior decisions.
Newest entries first. Agents must read this before implementing, and append after meaningful changes.

## [Unreleased]

### Home pricing section
- New `Pricing` section (`src/components/Section/Pricing.jsx` + `src/content/home/pricing.js`) matched to `pricing-section.png` cards/toggle: monthly/yearly + Save 20%, three gradient-border cards (Starter / Growth / Enterprise), Growth “Most popular” badge, gradient CTAs; section uses page `--theme-background` (not black) to match other home sections.
- Inserted on home before Testimonials; Header/Footer Pricing → `/#pricing`.

### Integrations marketing page (`/integrations`)
- New route `src/app/(public)/integrations/page.js` — Hero → TrustedBy → Hub → 3×3 Platforms → FAQ → CTA. No pricing.
- Content seam `src/content/integrations/*`; media `integrationImages` + assets under `public/images/integrations/`.
- Header/Footer label **Integrations** → `/integrations`; **Features** → `/features` (active states included). Home `#integrations` section unchanged.
- FAQ mirrors Features accordion UX with integrations-specific Q&A; platform cards use real channel names (Figma placeholders were all “Messenger”).
- Hero polish: Features + Integrations remove full-bleed white wash; hero Image `quality={100}`.
- Features hero: light bottom padding (`pb-6`/`sm:pb-8`) under `hero-composite` so it isn’t flush against the section edge.
- Features + Integrations heroes: reuse home `heroBottom` white shade strip at section bottom (same as homepage).

### Build: self-host Inter + Host Grotesk
- Replaced `next/font/google` with `next/font/local` + WOFF2 under `src/fonts/` so Vercel Turbopack builds no longer fail on Google’s extensionless `/l/font?kit=` URLs (next.js#99114).

### Features marketing page (`/features`)
- New route `src/app/(public)/features/page.js` composed from `src/components/Section/FeaturesPage/*` (hero, trust, analytics, cards, profiles, integrations, details, FAQ, articles, CTA). No pricing section.
- Content seam `src/content/features/*` + barrel `src/content/features.js`; media registry `featureImages` in `src/content/media.js`.
- Static mock assets under `public/images/features/` (local Live Chat 2.0 exports + star SVG).
- Header and Footer “Features” links point to `/features` (Header active state included). Home `/` unchanged. No pricing section on the page.
- Polish: advantage icons cropped to purple tile, black corners filled with `#8546ef`, rendered `fill`/`object-cover` in 60×60; Image `quality={90–100}` + native widths; typography aligned to homepage Heading/Paragraph/SectionInfo/FaCheck patterns.
- White panels (per Feature.png / Figma): inset rounded `FeaturesPanel` (`rounded-[20–24px]`, not full-bleed) on analytics, profiles, articles. Cards stay as individual white cards on page grey. Integrations / advantages / FAQ stay on page grey (FAQ not wrapped in a section panel). Removed mistaken full-width `section white`.
- Trust marquee (home + features): replaced blurry `trusted.webp` (1600×35) with Figma vector SVGs `public/images/features/trust/logo-*.svg` via shared `trustLogos`; `TrustedBy` owns the marquee, `FeaturesTrust` reuses it.

## 2026-10-19
### Admin routes professional redesign
- `preview-draft.js`: replaced all `sessionStorage` with `localStorage` — fixes "No draft to preview" caused by `window.open` + `noopener` creating a fresh browsing context. Test stub updated to match.
- New `(preview)` route group: `src/app/(admin)/admin/(preview)/layout.js` — calls `requireAuth`, renders children full-width with no DashboardShell. Replaces the `(cms)` group for both preview routes so article previews are clean, sidebar-free pages.
- Moved `post/preview/page.js` and `post/[id]/preview/page.js` from `(cms)` into `(preview)`. URLs unchanged (`/admin/post/preview`, `/admin/post/:id/preview`).
- `new/page.js`: removed dead props (`categories`, `tags`, `authors`, `siteUrl`, `images`) — PostEditor fetches these internally via hooks.
- `edit/page.js`: converted from `"use client"` + `use(params)` to a proper async server component using `await params`.
### Draft tab + status filter tabs on Posts list
- `PostsView.jsx`: All / Draft / Published / Scheduled filter tabs; passes `status` param to `useGetPostsQuery`; reads `cms:editor-draft-new` from localStorage when Draft tab is active via new `readEditorDraftMeta` helper.
- `PostsTable.jsx`: accepts `localDraft` + `onLocalDraftDiscard` props; renders amber `LocalDraftBanner` above the DataTable with title, autosave time, "Continue editing" (→ `/admin/post/new`) and discard (×) actions.
- `editor-draft.js`: refactored to private `parseEditorDraftPayload`; `readEditorDraft` unchanged; new `readEditorDraftMeta` returns `{ formData, savedAt }`.

### Post Editor localStorage autosave
- New `src/frontend/feature/post/lib/editor-draft.js` — `editorDraftKey`, `writeEditorDraft`, `readEditorDraft`, `clearEditorDraft` (localStorage, mirrors preview-draft.js pattern).
- `PostEditorForm` gains three `useEffect`s: (1) silent restore from draft on mount, (2) debounced 800 ms autosave on every `formData` change, (3) `beforeunload` warning when form is dirty.
- Draft cleared via `clearEditorDraft(draftKey)` on successful save/publish/schedule before `router.push`.
- Keys: `cms:editor-draft-new` for new posts, `cms:editor-draft-{id}` for edits — no cross-post bleed.

## 2026-10-17

### Merge CMS into this project
- Inlined full blog CMS (backend, `/api`, `/admin`, Neon, Hostinger, TinyMCE).
- Public blog at `/blogs` + `/blogs/[slug]` with marketing Header/Footer (no rewrite, no `basePath`).
- Route groups: `(marketing)` / `(blogs)` / `(admin)` — Redux only under `/admin`.
- Lean published list queries, ISR + `revalidateTag`, blog pagination, paged sitemap.
- `vercel.json` crons on `/api/cron/*`; robots allow public, disallow `/admin` + `/api`.
- Home Articles section reads live published posts (limit 3).

### Blogs → CMS app rewrite (superseded)
- External rewrite to `author-ai-assistant.vercel.app` removed after in-app merge.

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
