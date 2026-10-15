# Expert code architecture — write & manage

Use this when designing modules, features, or refactors. Goal: change that stays cheap for years.

## Architecture bar

Expert output is not more files — it is **clear seams**:

| Seam | Owns | Must not own |
|------|------|--------------|
| UI / section | layout, presentation, interaction wiring | business rules, persistence details |
| Domain / lib | pure rules, transforms, invariants | React, fetch, CSS |
| Adapter | HTTP, storage, analytics | product decisions |
| Composition root | wiring (page, layout) | deep logic |

**Hexagonal intuition (light):** UI and I/O are adapters; core is testable without a browser.

## How to write code (expert checklist)

1. **Start from the use-case**, not the folder tree. Name the behavior, then place it.
2. **Design the data shape first** (props, DTO, event). Bad shapes force bad components.
3. **Push decisions to the edge**: feature flags, env, locale — inject; don’t scatter `process.env` reads.
4. **Cohesion over DRY**: two similar blocks that diverge for different reasons may stay duplicated until a real abstraction appears (rule of three + shared lifecycle).
5. **Cyclomatic budget**: if a function needs nested conditionals for variants, use strategy maps, compound components, or separate modules.
6. **Error policy**: classify — retryable, user-fixable, programmer bug. Handle each class once at the right layer.
7. **Performance as design**: avoid N+1 renders; colocate state with the owner; defer non-critical work; measure before micro-optimizing.

### Component guidelines (Next / React UI apps)

- Section components orchestrate; cards/rows present; `ui/` primitives stay dumb.
- Prefer controlled props + callbacks over deep context unless many distant consumers need the same state.
- CSS: prefer existing modules / tokens; no one-off magic numbers without a design reason.
- Server vs client: keep `"use client"` at the leaves; server components for composition and data fetch when the stack allows.

## How to manage code

### Structure

```
feature-or-section/
  Feature.jsx          # composition
  parts/ or sibling/   # focused pieces
  Feature.module.css   # if styles are local
```

- **Feature folders** for product surfaces; **shared ui/lib** only for true reuse.
- Barrel exports (`index.js`) for public API; keep internal files unexported.
- Assets live near usage or in a single `assets/` with stable names — no duplicate hero images.

### Lifecycle of a change

1. Locate the owning seam (don’t patch the wrong layer).
2. Add/adjust the smallest API that encodes the new behavior.
3. Update callers; delete obsolete paths in the same change when safe.
4. Leave the tree *more* navigable than you found it (names, dead code).

### Refactoring discipline

- **Behavioral lock**: test or checklist first.
- **Mikado / strangler**: introduce the new path beside the old; switch; delete.
- Never mix “rename everything” with “fix production bug” in one diff.

### Dependency management

- Add a dependency only if: (a) non-trivial, (b) maintained, (c) tree-cost acceptable, (d) no in-house primitive already covers 80%.
- Prefer platform APIs (Next, CSS, browser) over utility packages for trivial helpers.

## Anti-patterns (reject)

- Utility dumping grounds (`utils.js` absorbing domain)
- Prop drilling past 3 levels without extracting a seam
- “Temporary” flags that never die
- Abstract factories for one implementation
- Copy-paste of entire sections instead of extracting a real variant axis

## Done means

- A new engineer can find the behavior in <2 minutes from the route/section name.
- Changing one variant does not require editing unrelated sections.
- Core logic can be reasoned about (and ideally tested) without mounting the full page.
