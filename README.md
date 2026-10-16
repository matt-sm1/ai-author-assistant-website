# AuthorBot — website + blog CMS

Single Next.js app for **authoraiassistant.com**:

| Path | Purpose |
|------|---------|
| `/` | Marketing homepage |
| `/blogs`, `/blogs/[slug]` | Published articles |
| `/admin` | Blog CMS (login at `/admin/login`) |
| `/api/*` | CMS + public + cron APIs |

**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Neon Postgres · Hostinger media

## Architecture rules

1. Add marketing pages under `src/app/(marketing)/<slug>/` — **never** `blogs` or `admin`.
2. Public posts live only under `/blogs/[slug]` (no root catch-all).
3. Redux/`Providers` load only under `/admin` (not marketing/blog).
4. Public blog data goes through `post.service` published methods.

## Run

```bash
cp .env.example .env.local   # fill secrets
npm install
npm run copy:tinymce
npm run setup:db             # migrate + bootstrap admin (first time)
npm run dev
```

- Marketing: http://localhost:3000  
- Blogs: http://localhost:3000/blogs  
- Admin: http://localhost:3000/admin/login  

## Cron

Vercel **Hobby** only allows **daily** native crons:

- `/api/cron/publish-scheduled` — `0 0 * * *` (midnight UTC)
- `/api/cron/media-orphan-cleanup` — `0 1 * * *` (01:00 UTC)

**Lazy publish:** public blog reads and the admin posts list also flip due `scheduled` posts to `published`, so posts go live even between daily cron runs.

For **every 1 minute** publishing without waiting for traffic, use an external scheduler (cron-job.org, etc.):

```bash
curl -sS -H "Authorization: Bearer $CRON_SECRET" \
  "https://www.authoraiassistant.com/api/cron/publish-scheduled"
```

Schedule that GET every minute. Or upgrade Vercel to **Pro** and set `"schedule": "* * * * *"` in `vercel.json`.

## Rollback

See [docs/MERGE_ROLLBACK.md](./docs/MERGE_ROLLBACK.md).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run migrate` / `bootstrap` / `setup:db` | Database |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright |
| `npm run copy:tinymce` | Vendor TinyMCE into `public/` |
