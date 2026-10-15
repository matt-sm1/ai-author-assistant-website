# Testing techniques & BDD — expert guide

Tests exist to **protect valuable behavior** and enable fearless change — not to hit a coverage vanity number.

## Strategy (risk-based)

```
        /\
       /E2E\        few, critical journeys
      /------\
     / Integr.\     component + seams
    /----------\
   /    Unit    \   pure logic, abundant
  /--------------\
```

Invest where failure is costly (checkout, auth, data loss, core UX). Starving the pyramid (all E2E) creates slow flaky suites; inverting it (only unit) misses integration bugs.

## BDD (Behavior-Driven Development)

BDD aligns product language with executable examples.

### Workflow

1. **Discover** — concrete examples with stakeholders (or from the ticket).
2. **Formulate** — Gherkin or equivalent Given/When/Then.
3. **Automate** — map steps to tests (Playwright, Cypress, Testing Library, Jest).
4. **Implement** — code until scenarios pass (outside-in when greenfield).

### Scenario quality

**Good** — business outcome, stable language:

```gherkin
Feature: Article discovery
  Scenario: Reader opens an article from the home page
    Given articles are listed on the home page
    When the reader selects "Scaling RAG for authors"
    Then the article page shows that title and body
```

**Bad** — UI choreography coupled to CSS:

```gherkin
  When they click div.card:nth-child(2) button.btn-primary
```

### Scenario outline for variants

```gherkin
  Scenario Outline: Pricing CTA label
    Given the visitor is on the <plan> plan section
    Then the CTA reads "<label>"
    Examples:
      | plan    | label            |
      | free    | Start free       |
      | pro     | Upgrade to Pro   |
```

### Ubiquitous language

Keep a short glossary (Feature, Section, CTA, Article). Use the same words in code names, tests, and docs.

## Testing techniques

### Unit

- Pure functions, formatters, reducers, validators.
- Table-driven tests for edge cases (`[]`, `null`, unicode, boundaries).
- No I/O; inject clocks/RNG when needed.

### Component (Testing Library mindset)

- Query by role/label/text — how users and AT see the UI.
- Prefer `userEvent` over implementation `fireEvent` when available.
- Assert presence, state transitions, callbacks fired — not class names or styles unless styles are the requirement.

### Contract / API

- Schema validation (Zod etc.) at boundaries.
- Consumer-driven contracts when multiple services integrate.

### Visual / a11y (selective)

- Storybook + visual diff for design systems.
- axe checks on critical pages; keyboard path for primary flows.

### Property-based / fuzz (when warranted)

- Parsers, serializers, state machines — generate inputs; assert invariants.

### Mutation / fault injection (advanced)

- Confirm the suite fails when code is deliberately broken; use sparingly on critical modules.

## Test design patterns

| Pattern | Use |
|---------|-----|
| Arrange-Act-Assert | Default structure |
| Given-When-Then | Same as AAA with product language |
| Object Mother / fixtures | Shared valid graphs; specialize per test |
| Test double pyramid | Stub (canned), Fake (in-memory), Mock (interaction) — prefer fakes for clarity |
| Sociable vs solitary | Sociable for realistic seams; solitary for pure units |

## Flake control

- No real network/time/randomness without control.
- Deterministic sorting; fixed IDs in fixtures.
- Isolation: no shared mutable filesystem/DB without cleanup.
- Retries hide bugs — fix root cause.

## What not to test

- Framework internals, trivial pass-throughs, third-party library behavior.
- Snapshot oceans of markup (brittle); snapshot only stable serializations when valuable.

## Definition of done for a behavior change

- [ ] Scenarios or tests express the acceptance criteria
- [ ] Happy path + one meaningful edge/failure path covered at the right layer
- [ ] Regressions for the bug (if a fix) included
- [ ] Suite stays fast enough that people run it
