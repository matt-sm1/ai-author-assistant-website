# How to plan & how to write a plan

Planning is a **compression of risk**: spend minutes to save hours of thrash.

## When planning is mandatory

- Multi-file or cross-layer work
- Unclear acceptance criteria
- Touches architecture, data shape, or public API
- Estimated > ~30 minutes
- Multiple valid approaches with different tradeoffs

When the task is a one-line fix in a known file, plan mentally and execute.

## How to plan (thinking process)

1. **Restate the outcome** in one sentence — if you can’t, ask.
2. **Inventory constraints**: stack, design system, perf, a11y, deadlines, “don’t break X”.
3. **Map current state**: routes, owners, existing patterns (search the repo; don’t invent).
4. **Generate 2 options** for non-trivial design (A simple / B extensible); pick with a one-line why.
5. **Sequence work** so each step leaves the system buildable (vertical slices > horizontal layers).
6. **Name risks** and the earliest check that kills a bad path.
7. **Define done** as observable behavior (prefer BDD scenarios).

### Vertical slice sequencing

Prefer:

```
thin end-to-end path → enrich → harden (tests, a11y, polish)
```

Over:

```
all markup → all logic → all wiring → hope it integrates
```

## How to write a plan (template)

Copy and fill — keep under ~40 lines unless the user asks for a design doc.

```markdown
# Plan: <short title>

## Goal
<one sentence>

## Constraints
- ...

## Current state
- <files / seams that matter>

## Approach
1. ...
2. ...
3. ...

## Risks
- <risk> → <mitigation / early check>

## Acceptance (Done)
- Given ... When ... Then ...
- ...

## Out of scope
- ...

## Open questions
- <only if blocking>
```

### Writing quality bar

- Steps are **actions**, not topics (“Extract `HeroContent` data props” not “Deal with hero”).
- Each step has a **verifiable** result.
- Call out file touch list when helpful (not a novel).
- Out of scope prevents gold-plating.

## Plan communication modes

| Mode | Use |
|------|-----|
| Bullet plan in chat | Default for agent work; wait for go-ahead if destructive/ambiguous |
| ADR (Architecture Decision Record) | Cross-cutting decisions that must persist |
| Spec + scenarios | Product behavior shared with non-engineers |
| Spike time-box | Unknown tech — time-box, then rewrite the real plan |

### Mini-ADR

```markdown
# ADR-XXX: <decision>
## Context
## Decision
## Consequences (+ / −)
## Revisit when
```

## Re-planning triggers

Stop and revise the plan when:

- A constraint was wrong
- An assumption failed a spike check
- Scope expanded mid-flight (explicitly renegotiate)

Do **not** silently expand scope.

## Planning anti-patterns

- Plans that are just task dumps with no acceptance
- Big-bang rewrites without strangler steps
- “We’ll clean it up later” without a ticket/revisit trigger
- Over-planning a spike that should take 30 minutes of code

## Link to execution

Once the plan is accepted (or the user said to proceed):

1. Execute steps in order
2. Keep diffs aligned to steps
3. Update the plan only when reality diverges — briefly note why
