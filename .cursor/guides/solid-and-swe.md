# SOLID & SWE principles — expert application

Principles are **decision filters**, not religion. Apply them when they reduce change cost.

## SOLID in practice

### S — Single Responsibility

- A module has one **axis of change** (e.g. “how testimonials are rendered”), not one “thing” in casual English.
- Split when two stakeholders would request conflicting edits to the same file (design vs data vs analytics).
- Counterfeit S: exploding every function into a file — that raises navigation cost.

### O — Open/Closed

- Prefer extension points: `variant`, slots/children, strategy maps, plugin-style registries.
- Close the core algorithm; open configuration and composition.
- Do **not** open everything; unstable APIs should stay closed until use-cases stabilize.

### L — Liskov Substitution

- If `B` replaces `A`, callers must not need special cases.
- In UI: a “Button” subtype that navigates sometimes and submits sometimes without declaring it violates L — make intent explicit (`as="a"`, `type="submit"`).
- In data: never return a narrower or lying type than the contract promises.

### I — Interface Segregation

- Fat props objects (`config` with 40 fields) force every consumer to know everything — split by role (`layout`, `content`, `analytics`).
- Hooks should expose focused returns; avoid mega-hooks that mix fetch, form, and toast.

### D — Dependency Inversion

- High-level policy (page flow, domain rules) must not import low-level details (raw `fetch`, concrete SDK).
- Inject ports: `getArticles()`, `track(event)` — implement once at the edge.
- In frontend without DI containers: pass functions/hooks from the composition root; keep leaves free of concrete clients when testing matters.

## Core SWE principles (architecture-grade)

| Principle | Expert move |
|-----------|-------------|
| **Separation of concerns** | UI / domain / infrastructure layers; don’t mix CSS decisions into data mappers. |
| **Least astonishment** | Names and side effects match intuition; no silent writes. |
| **Fail fast** | Validate at boundaries; corrupt state never travels deep. |
| **YAGNI** | Build for the *known* next requirement, not imaginary platform plays. |
| **KISS** | Prefer linear readable code over clever indirection until metrics demand it. |
| **DRY (careful)** | Share *knowledge*, not *coincidence*. |
| **Law of Demeter** | Talk to neighbors, not `a.b.c.d`; introduce facades when chains appear. |
| **CQRS-lite** | Separate read models (display DTOs) from write commands when shapes diverge. |
| **Idempotency** | Safe retries for mutations where the product allows. |
| **Observability** | Log/metric/trace at boundaries with correlation IDs when systems grow. |

## Tradeoff ledger (write it down for big choices)

When choosing between two designs, record:

1. What becomes easier
2. What becomes harder
3. Reversal cost
4. Revisit trigger (e.g. “third variant of this card”)

## Architecture smells → SOLID remedy

| Smell | Likely fix |
|-------|------------|
| File grows with every feature request | S + extract policy |
| Switch/case on type everywhere | O + polymorphism/strategy |
| `if (isSpecialCase)` in callers | L — fix hierarchy/contract |
| Optional props ignored by half the callers | I — split interfaces |
| Can’t unit test without mocking the world | D — invert dependencies |

## Review questions (use before finishing a design)

1. What is the next likely change — does this design make it a one-file edit?
2. Which module would a bug in this feature live in?
3. Can I test the valuable logic without a browser?
4. Did I add an abstraction that has only one implementation and one call site? (If yes, inline it.)
