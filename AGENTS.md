# Agent instructions

This project enforces expert-level architecture and delivery. Always-apply rules live in `.cursor/rules/`. Deep guides live in `.cursor/guides/`.

## Every command

1. Follow `.cursor/rules/*.mdc` (all `alwaysApply: true`).
2. Read and maintain root [`CHANGELOG.md`](CHANGELOG.md) so updates do not overlap prior decisions.
3. For non-trivial work, open the matching guide under `.cursor/guides/` before implementing.
4. Prefer planning → smallest correct change → proof (tests/BDD or explicit acceptance).

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


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
