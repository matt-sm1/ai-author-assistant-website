# Changelog

Keep this file current so future work does not overlap or undo prior decisions.
Newest entries first. Agents must read this before implementing, and append after meaningful changes.

## [Unreleased]

## 2026-10-19
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
