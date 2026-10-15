# AuthorBot — AI Author Assistant Website

Marketing landing for **Author AI Assistant** (AuthorBot): a 24/7 AI sales assistant that helps authors engage readers and sell books.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · JavaScript

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright smoke tests |
| `npm run images:compress` | Re-encode `public/images/**` webps |
| `npm run check` | lint + unit + e2e + build |
| `npm audit` | Dependency vulnerabilities |

CI-ready gate:

```bash
npm run check
npm audit --audit-level=high
```

## Structure

```
public/images/
├── brand/               # logo
└── home/                # landing media (path strings in content)
src/
├── app/
│   ├── layout.js        # fonts + globals + skip link only
│   └── (marketing)/     # Header/Footer layout + home page
├── content/
│   ├── media.js         # MEDIA_BASE + path helpers (CDN-ready)
│   └── home/            # section data (no image binaries)
├── components/          # Section, Card, Header, Footer, ui
└── lib/                 # fonts, cn(), dynamicSection()
docs/                    # architecture, ADRs, acceptance
```

## Content & media

- Edit copy in `src/content/home/*.js` (string paths like `/images/home/feature_1.webp`)
- Brand/logo paths via `@/content/media`
- To point media at a CDN later, set `MEDIA_BASE` in `src/content/media.js`

## Performance rules

- `priority` only on logo + hero dashboard
- Above-fold: Hero + Features (eager)
- Below-fold sections: `dynamicSection()` (SSR on, separate JS chunks)
- Compress media with `npm run images:compress` after replacing source files in `public/images`

## Adding another marketing page

1. `src/app/(marketing)/<slug>/page.js` — compose sections
2. `src/content/<slug>/` — page data with path strings
3. `public/images/<slug>/` — optimized assets
4. Do **not** put page images or sections in `app/layout.js`

## Security overrides

`package.json` pins safe transitive versions until upstream catches up:

- `postcss` → `^8.5.23`
- `braces` → `npm:@bleedingdev/braces@3.0.4` until official `braces@>=3.0.4` ships

## UI primitives

```jsx
import { Heading, Paragraph, Button } from "@/components/ui";

<Heading>Section title</Heading>
<Heading as="h3">Subsection</Heading>
<Paragraph>Supporting copy.</Paragraph>
<Button href="#contact">Get In Touch</Button>
<Button type="button">Subscribe</Button>
```
