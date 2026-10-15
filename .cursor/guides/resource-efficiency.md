# Less resource, excellent output

Excellence is **high signal per unit cost** (tokens, time, tool calls, PR size, runtime).

## Agent / cognitive efficiency

1. **Orient once**: status, tree, key files — then act; avoid re-exploring.
2. **Batch reads/searches** that don’t depend on each other.
3. **Narrow tools**: `rg` with path/glob before reading entire trees.
4. **Surgical edits**: patch, don’t rewrite files for small changes.
5. **Reuse context**: decisions in the plan are canonical; don’t re-litigate.
6. **Depth on the critical path only** — polish, extras, and speculative refactors wait for a request.
7. **Stop condition**: acceptance met → ship; don’t gold-plate.

### Output style that saves rounds

- Lead with the verdict / change summary.
- Ask **one** blocking question, not a questionnaire.
- Prefer a short plan users can approve over silent wrong implementation.

## Engineering efficiency (runtime & codebase)

| Lever | Expert move |
|-------|-------------|
| **Dependencies** | Zero new packages if platform/local code suffices |
| **Bundle** | Dynamic import rare routes; keep client leaves small |
| **Images** | Right size, modern formats, dimensions set; don’t ship unused assets |
| **Render** | Avoid needless client state; derive; key lists stably |
| **Network** | Fetch once at the right level; cache; coalesce |
| **Build** | Don’t add lint/plugins that don’t pay for themselves |
| **Abstraction** | Cost of indirection must be < cost of duplication * probability of drift |

## Quality without waste

- **Tests**: few high-value tests > many brittle ones.
- **Types/docs**: document non-obvious invariants only.
- **Features**: vertical slice to “usable” before “perfect”.
- **Review**: self-check against SOLID/SWE guides before asking for review.

## Decision heuristic

```
If cost(now) is small and cost(later rewrite) is large → invest now.
If cost(now) is large and need is speculative → wait (YAGNI).
```

## Anti-patterns (resource drains)

- Regenerating whole components for className tweaks
- Wide `node_modules` archaeology for a one-line API
- Multiple competing abstractions “just in case”
- E2E for every CSS tweak
- Long essays when a table or diagram would do

## Personal scorecard (per task)

- [ ] Used existing patterns first
- [ ] Touched minimal files
- [ ] No unnecessary deps
- [ ] Acceptance covered (test or explicit checklist)
- [ ] Diagram only if it reduced ambiguity
