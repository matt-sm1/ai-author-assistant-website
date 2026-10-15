# ADR 0001: Content seam and security overrides

## Status
Accepted — 15 Oct 2026

## Context
The AuthorBot landing previously mixed marketing copy inside section components and surfaced npm audit findings from nested `postcss` (via Next) and `braces` (via the ESLint toolchain). We needed a maintainable content boundary and a clean audit without jumping to Next 16 or downgrading ESLint.

## Decision
1. **Content seam:** All home marketing data lives under `src/content/home/*`. Sections import their own modules; `app/(marketing)/page.js` composes sections only (see ADR 0002 for media + route-group follow-on).
2. **Security overrides:** Until upstream publishes fixed versions, `package.json` uses:
   - `"postcss": "^8.5.23"`
   - `"braces": "npm:@bleedingdev/braces@3.0.4"` (depth-guarded 3.0.4 alias; switch to official `braces@>=3.0.4` when available)

## Consequences
- Copy and section media can change without editing presentation components.
- `npm audit` stays at 0 with current overrides; dependency upgrades must re-verify audit and remove aliases when safe.
- Case-sensitive CI requires file names to match import casing (`AlwaysOn.jsx`, etc.).
