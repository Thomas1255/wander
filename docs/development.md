# Development guide

Local setup and verification for Wander. The current Phase 1 application is a
visual preview; all displayed trips and travelers are sample data.

## Prerequisites

- Node.js 24.x (verified with 24.14.0, recorded in .nvmrc).
- npm 11.15.0 was used; use npm and retain package-lock.json.
- A Playwright-supported OS and internet access for initial dependency/browser downloads.

## Local setup

```powershell
cd E:\wander
npm ci
npx playwright install chromium
npm run dev
```

No environment file or external credentials are needed. Future secrets belong in
Git-ignored .env.local; NEXT_PUBLIC_* values are exposed to the browser. Document
future variables in .env.example without real secrets.

| Screen             | Local URL                                  |
| ------------------ | ------------------------------------------ |
| Landing            | <http://localhost:3000>                    |
| Sample trips       | <http://localhost:3000/trips>              |
| Empty collection   | <http://localhost:3000/trips?view=empty>   |
| Loading collection | <http://localhost:3000/trips?view=loading> |

The trip state selector is explicitly a preview control. Loading can be inspected
without introducing an artificial delay into the application.

## Commands

| Command                          | Purpose                                               |
| -------------------------------- | ----------------------------------------------------- |
| `npm run dev`                    | Development server with Fast Refresh                  |
| `npm run build`                  | Production build                                      |
| `npm run start`                  | Serve the production build; build first               |
| `npm run lint`                   | ESLint; warnings fail                                 |
| `npm run typecheck`              | Generate route types and run strict TypeScript checks |
| `npm run format`                 | Prettier and Tailwind class sorting                   |
| `npm run format:check`           | Check formatting                                      |
| `npm test` / `npm run test:unit` | Run utility tests                                     |
| `npm run test:unit:watch`        | Watch unit tests                                      |
| `npm run test:e2e`               | Browser, accessibility, and HTTP tests; build first   |
| `npm run test:api`               | HTTP tests only; build first                          |
| `npm run test:e2e:ui`            | Interactive Playwright runner; build first            |
| `npm run verify`                 | Format, lint, types, units, build, then Playwright    |

Playwright owns a local production server on port 3100; keep that port free.
It never reuses a server or accepts a deployment URL. Tests run with no retries
and at most four local workers. Desktop Chromium and Pixel 7 emulation cover the
screens, keyboard navigation, reduced motion, responsive widths, and basic axe
checks. Reports and failure traces are ignored by Git.

```powershell
npm run verify
npx playwright show-report
```

Use `npm ci` to reproduce the lockfile and `npm install` for intentional dependency
changes. New dependencies are saved at exact versions. TypeScript 5.9 fits the
current lint parser; ESLint 9 is retained for its plugins' peer compatibility.
The existing development-tooling audit findings are recorded in the phase reports.

## Structure

- src/app: landing, trips, route loading, metadata, semantic tokens, and composition CSS.
- src/components: navigation, destination/trip patterns, states, and small UI primitives.
- src/lib: deterministic design fixtures and the shared class utility.
- public: local photographs and asset licenses.
- tests/e2e: browser, keyboard, responsive, reduced-motion, and accessibility checks.
- tests/api: health endpoint HTTP contracts.

Pages stay server-rendered. The mobile menu uses client state and Radix's dialog
behavior. The destination globe has a separate client boundary; its React Bits
renderer is dynamically loaded near the viewport. Reduced motion and unavailable
WebGL use a still picker with the same destination controls. The Next.js
Tailwind/Turbopack setup is retained. The current Paprika palette trial shares
semantic CSS variables across the existing cinematic compositions and components.

## Review documentation

- [Design system and decisions](design-system.md)
- [Photograph sources and licenses](assets.md)
- [Phase 1 results, manual checks, and limitations](phase-1.md)
- [Phase 0 foundation history](phase-0.md)

The owner approves each phase. Create a descriptive checkpoint commit after each
completed, verified change within that phase so it can be reverted independently.
Additional commit approval is not required; pushing and deploying still require
explicit approval. Do not begin
Phase 2 until the current visual result is approved.
