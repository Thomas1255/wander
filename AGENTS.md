# Wander project guidance

Wander is a personal collaborative travel companion, built deliberately for real
trips with friends. The owner makes final product and architecture decisions.

## Working agreement

- Work only in the explicitly approved phase. Stop after its implementation and
  verification summary; wait for review before beginning another phase.
- Inspect the codebase, explain dependencies, and propose a small plan first.
- Explain meaningful tradeoffs and get approval for major design or architecture
  changes. Decide routine implementation details independently.
- Do not commit, push, deploy, or modify production resources without explicit
  approval. Keep changes small and suggest a descriptive commit message.
- Focus on building the product and explaining implementation choices, reasoning,
  alternatives, and tradeoffs. Do not add quizzes, practice tasks, or programming
  exercises unless explicitly requested.
- Report actual verification results and limitations. Never imply unfinished
  functionality works or disguise placeholders as real features.

## Product and design

- Prioritize travel usefulness, originality, accessibility, performance, and
  maintainability over feature count.
- The eventual identity draws on editorial travel design, expressive typography,
  destination imagery, and thoughtful visual rhythm. Phase 0 uses a temporary
  page and makes no final visual design decisions.
- Use shadcn/ui as accessible component source, not the full visual identity.
- Future destination themes should use reusable tokens with consistent navigation
  and accessibility. Do not build a theme engine before its approved phase.
- Do not add AI, voting, route optimization, expenses, memories, or other future
  enhancements without an explicit phase request.

## Engineering

- Use Next.js App Router, React, strict TypeScript, Tailwind CSS, and shadcn/ui.
- Read version-matched Next.js documentation under `node_modules/next/dist/docs/`
  before changing framework-specific code. Use official documentation as fallback.
- Keep business logic separate from presentation without speculative abstractions.
- Validate input at runtime and enforce authorization on the server when those
  features are introduced. TypeScript is not runtime input validation.
- Future backend work uses Route Handlers, Zod, Supabase PostgreSQL/Auth, database
  constraints, and RLS. Do not integrate them before their approved phases.
- Review current Google Maps pricing and terms before any integration. Account
  for destination time zones in future trip-related logic.
- Never expose secrets in client code or `NEXT_PUBLIC_*` variables.
- Write meaningful deterministic tests: Vitest for units, Playwright for browser
  and HTTP behavior, and SQL tests when a database exists. Mock paid external APIs
  and isolate test data from production. Do not weaken tests to hide failures.
- Run checks appropriate to the changes and provide independent manual steps.

## Phase completion

Report implemented features, created/modified files, implementation choices and
tradeoffs, test commands and actual results, manual checks, limitations, and a
suggested next phase. Stop and wait for the owner's review.
