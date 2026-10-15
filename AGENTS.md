# Agent instructions

This project enforces expert-level architecture and delivery. Always-apply rules live in `.cursor/rules/`. Deep guides live in `.cursor/guides/`.

## Every command

1. Follow `.cursor/rules/*.mdc` (all `alwaysApply: true`).
2. For non-trivial work, open the matching guide under `.cursor/guides/` before implementing.
3. Prefer planning → smallest correct change → proof (tests/BDD or explicit acceptance).

## Guide index

| Topic | File |
|-------|------|
| Write & manage code | [`.cursor/guides/code-architecture.md`](.cursor/guides/code-architecture.md) |
| SOLID + SWE | [`.cursor/guides/solid-and-swe.md`](.cursor/guides/solid-and-swe.md) |
| Testing + BDD | [`.cursor/guides/testing-and-bdd.md`](.cursor/guides/testing-and-bdd.md) |
| Plan & write plans | [`.cursor/guides/planning.md`](.cursor/guides/planning.md) |
| Graphs / diagrams | [`.cursor/guides/diagrams.md`](.cursor/guides/diagrams.md) |
| Less resource, excellent output | [`.cursor/guides/resource-efficiency.md`](.cursor/guides/resource-efficiency.md) |

## Bar

Expert architecture: clear seams, SOLID as decision filters, risk-based tests, short written plans, diagrams only when they answer a question, maximum signal per token/file/dependency.
