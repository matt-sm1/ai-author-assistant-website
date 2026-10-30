# Changelog

Keep this file current so future work does not overlap or undo prior decisions.
Newest entries first. Agents must read this before implementing, and append after meaningful changes.

## [Unreleased]

### Schema preview UX + broader FAQ HTML pickup
- Post SEO sidebar shows a live read-only **Auto-generated schema** preview (`build-editor-json-ld-preview.js` → `buildPostJsonLd`) from form state; **Detected FAQs from article** lists `extractFaqFromHtml(content)`.
- Manual JSON-LD is opt-in (**Add manual schema** / **Remove manual schema**); when open with content, preview shows the merged publish graph.
- FAQ HTML extract extended: Pattern C (TinyMCE `<p><strong|b>…?</strong|b></p>` under an FAQ heading) and Pattern D (h2–h4 ending with `?` inside FAQ section). Still no bold scraping outside FAQ-titled sections.
- Pattern E: `Question:`/`Answer:` (or `Q:`/`A:`/`Ans:`) paragraph pairs; FAQ title may be a plain `<p>FAQs</p>` (not only h1–h6) — matches common TinyMCE paste.
- Constraint: public emit contract unchanged (one `@graph`); CMS FAQ repeater remains optional overrides (CMS wins).

### Auto blog JSON-LD (BlogPosting + FAQ + manual)
- Public `/blogs/[slug]` emits one schema.org `@graph`: auto **BlogPosting** + **BreadcrumbList**, optional **FAQPage**, optional manual nodes.
- FAQ sources: CMS `faq_items` (SEO sidebar repeater) merged with HTML extract (`<details>/<summary>` or FAQ heading section); CMS wins duplicates.
- Manual JSON-LD textarea (`schema_json_ld`) appends validated JSON into the graph (does not replace auto nodes).
- Migration `012_post_schema_fields.sql`; `toPublicPost` exposes `updated_at`, `faq_items`, `schema_json_ld`.
- Seams: `build-post-json-ld.js`, `extract-faq-from-html.js`, `JsonLdScript.jsx`, PostSidebar SEO panel.

### Vitest JSX runtime for marketing components
- Set `jsxRuntime: "automatic"` / `esbuild.jsx: "automatic"` in `vitest.config.mjs` and `jsx: "react-jsx"` in `jsconfig.json` so marketing `.jsx` (no React import) matches Next’s transform — fixes Header/Button/Heading/Faq/SectionInfo tests (`React is not defined`).

### Post editor draft lifecycle (leave / autosave / reset)
- Removed post-editor `beforeunload` “Leave site?” dialog — local + server draft autosave is the source of truth.
- Server draft upsert: `useDraftServerAutosave` (2s debounce) creates/updates `posts.status=draft`; localStorage remains an 800ms crash buffer (`editor-draft.js`).
- `/admin/post/new` resumes the latest draft (`sortBy=updated_at`) then `replace`s to `/admin/post/:id/edit`; Reset All sets a one-shot fresh flag so a blank editor can open.
- Reset All + confirm deletes the draft row (draft only), clears buffers, hard-navs to `/admin/post/new`.
- Success leave: `hardNavigateAdmin(href, { teardownEditor })` + 1.5s Busy recovery remounts TinyMCE if navigation aborts; submit lock no longer sticks on “Saving…/Scheduling…”.
- Drafts tab sorts by `updated_at`; local banner only when no server drafts; delete clears `cms:editor-draft-{id}`.
- Seams: `draft-lifecycle.js`, `useDraftServerAutosave.js`, `PostEditor.jsx`, `PostsView.jsx`, `admin-nav.js`.

### Home pricing cards match reference scale
- Cards capped (`312px` side / `340px` Growth) in a centered flex row with gaps — between full-column stretch and the too-narrow 268/300 pass.
- Side tiers content-height; Growth taller via features + badge. Title, subtitle, Monthly/Annual labels; default Annual.

### Post editor sidebar soft-nav hang
- Repro on production: while on `/admin/post/new` or `/edit`, sidebar `Link` clicks focus but App Router never changes the URL (soft-nav no-op). Hard `location.assign` still works. Other admin pages soft-nav fine.
- Leaving the TinyMCE editor now hard-navigates via `hardNavigateAdmin` (`src/frontend/lib/admin-nav.js`) from Sidebar `onNavigate`, Back link, logout, and successful save — so Media / Categories / etc. work again.
- Constraint: do not rely on App Router soft-nav to leave the post editor until a TinyMCE-safe soft unmount is proven.

### Post editor navigation lock (real root cause)
- Clearing only inline `pointer-events` was insufficient: `react-remove-scroll` can leave `block-interactivity-*` classes on `body`, and DismissableLayer can restore captured `none` after soft-nav. TinyMCE portals can also linger.
- Status/Author use polished `ListboxSelect` (design-system look, keyboard listbox) — **not** native `<select>`, **not** Radix Select (Select@2.4 always body-locks).
- `clearUiBodyLock` strips RemoveScroll classes + stale `data-aria-hidden`/`inert` + tox orphans; admin chrome (`data-admin-chrome`) keeps `pointer-events-auto` + `z-40` so sidebar stays clickable even if body is locked.
- After successful save/schedule/publish: `window.location.assign("/admin/post")` hard teardown of TinyMCE/Radix (soft-nav was leaving locks).

### Schedule lock + duplicate posts (root causes)
- **Lock:** superseded by post-editor navigation lock entry above.
- **Duplicates:** `handleSubmitPost` raced on RTK `isLoading` (flips only after mutation start) so double-click / Schedule+Publish created two INSERTs (`slug` + `slug-2`). Sync `createSubmitLock` + `isSubmitting` before Yup; lock held through successful redirect; all action buttons disabled immediately.
- Note: admin `getPosts` still lazy-publishes due schedules (`published_at <= NOW()`) — near-now schedules correctly flip to Published on list load (not a second insert).

### Admin UI unlock after schedule (Radix body lock)
- Root cause: Radix Select/Dialog RemoveScroll can leave `pointer-events: none` / scroll-lock on `document.body` after choosing Scheduled (or closing MediaPicker) then soft-navigating — entire admin shell unclickable.
- ~~`Select` defaults to `modal={false}`~~ superseded — Select 2.4 ignores `modal`; use native selects on schedule path.
- Shared `clearUiBodyLock` / `watchAndClearUiBodyLock`; run on every `DashboardShell` pathname change, after MediaPicker close, and before post save/schedule redirect.
- Dialog `onCloseAutoFocus` prevented by default to avoid focus/lock races on soft nav.

### MediaPicker / schedule UX fixes
- Fix RTK Query error #38 after picker upload: do not `refetch()` a skipped browse query; keep uploaded row in state and `initiate` getMedia safely.
- Finalize optimistic cache updates both `limit: 10` (picker) and `limit: 20` (media page) keys.
- Hide Publish when post status is `scheduled` (desktop + mobile actions).
- Close MediaPicker and clear leftover `document.body` `pointer-events: none` before redirect after save/schedule (unstick sidebar).

### MediaPicker Upload + paste-to-library
- `MediaPicker`: All / Images / Videos / **Upload** modes. Upload reuses `MediaUpload` + session finalize; on success returns to browse with the new item as `pendingSelect`; user must click **Select** to apply (featured or insert). Cancel leaves library unchanged for the post field.
- TinyMCE: `automatic_uploads` + `images_upload_handler` uploads clipboard blobs to the media library. External `img` URLs are ingested via authenticated `POST /api/media/import-url` (SSRF-safe HTTPS fetch → Hostinger upload → finalize) so body HTML never hotlinks third parties.
- `sanitize-post-html`: Hostinger media URLs only — strips `data:` and non-library `img` src (defense in depth).
- Seams: `src/backend/lib/ssrf-url.js`, `fetch-remote-image.js`, `hostinger-server-upload.js`, `MediaService.importFromUrl`, `ingest-editor-images.js`.

### Header height vs Figma Home
- Marketing header `h-20` → `h-24` with matching `-mb-24` / mobile dimmer `top-24`; removed bottom border hairline.
- Home hero `pt-[112px]`; Features hero `pt-28` so badges clear the taller overlay. Integrations already `pt-28+`.

## 2026-10-29

### Post page layout (locked)
- Public post page (`BlogArticle`): **title → byline (author + date) → body**. Do **not** render `featured_image` as a hero above content — it duplicates assets already in HTML and was removed again in `91ad152`.
- `featured_image` remains for listing cards, home/features article cards, and OG/Twitter meta only.

### Durable Hostinger media boundary (ADR 0003) — verified on production
- **Status (29 Oct evening):** `/blogs/temp` and CDN media with `?v=20261029` load correctly on `authoraiassistant.com` after `9d82ffd` + layout fix `91ad152`.
- Single policy module: `src/shared/hostinger-media-url.js`; `src/frontend/lib/hostinger-media-url.js` is a thin re-export.
- Cache-bust: `NEXT_PUBLIC_HOSTINGER_MEDIA_URL_VERSION` (see `.env.example`). If **unset**, default is `20261029` (needed while browsers/hCDN still hold year-long cached 301s). Explicit `""` disables `?v=`. After hPanel CDN purge + bare `/media/*` 200 in real browsers, set env to `""` (or remove the code default) and redeploy.
- API boundary: `toPublicPost` / `toPublicPostList` canonicalize `featured_image` and rewrite HTML `content` once (OG meta uses `toPublicPost`).
- `sanitize-post-html` uses `toCanonicalHostingerMediaUrl` (no hand-rolled `/media/media` regex).
- Ops: `npm run check:hostinger-media`; ADR Forbidden + post-change checklist.
- Tests: shared URL helpers, `to-public-post`, sanitize, storage-key asserts no `/media/media/`.

### Hostinger media URLs — flat canonical (ADR 0003)
- Root cause: after PHP wrote flat `public_html/media/YYYY/...`, Node still used `publicUrlForKey` = `${base}/media/${storageKey}` → `/media/media/...`, and the frontend nested flat URLs on display — nested requests 404 on flat disk.
- Fix: `publicUrlForKey` → `${base}/${storageKey}`; `toCanonicalHostingerMediaUrl` + happy-path call sites flatten; `MediaImage` retries flat↔nested once; `.htaccess` serves both directions; ADR 0003 + tests lock flat as canonical. Nested is legacy fallback only — do not reintroduce happy-path `/media/media` without a new ADR.
- Ops note: if `HOSTINGER_PUBLIC_BASE_URL` 301s `/media/*` to the marketing site, fix Hostinger redirects / domain mapping and re-upload `hostinger-media-api/media/.htaccess` — app flat URLs alone cannot serve files when the CDN redirects away.
- Hostinger FTP (29 Oct): removed catch-all `public_html/.htaccess` rewrite that sent every `indigo-loris-*.hostingersite.com` request to `authoraiassistant.com/blogs` (backed up as `.htaccess.bak-redirect-fix`). Re-uploaded `media/.htaccess`. Disk still has legacy nested files under `media/media/YYYY/...`; flat URLs work via rewrite. Confirmed `/media/...` and `/media/media/...` return **200 image/***.
- Hostinger hCDN / browser disk still held cached **301** for bare media URLs (`max-age=31536000`, `immutable`). App appends `?v=20261029` so clients bypass that cache; purge hCDN then retire the query.

### Codebase assessment report
- Added root `CODEBASE_REPORT.md` — honest full-repo scores (overall **7.4/10**, modularity **8.0/10**), dimensions, strengths/weaknesses, and contrast with historical `QUALITY_REPORT.md` (landing-scoped 10/10, not authoritative for current tree).

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
