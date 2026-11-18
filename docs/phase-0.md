# Phase 0: project foundation

## Implemented

- Next.js App Router, React, strict TypeScript, and the `@/` source alias.
- Tailwind CSS and shadcn/ui, with one Badge on a temporary Wander page.
- ESLint, Prettier with Tailwind class sorting, EditorConfig, and LF conventions.
- Vitest utility tests and Playwright browser/HTTP tests.
- Development, build, production serving, lint, formatting, type-checking,
  individual test commands, and a combined `verify` script.
- Environment example and ignores for credentials, dependencies, build output,
  and test artifacts.
- Local Git repository on `main`, with `origin` pointing to
  <https://github.com/Thomas1255/wander.git>.

No authentication, trip creation, maps, database, destination themes, AI, final
landing page, CI workflow, or deployment was added. The owner approved an initial
repository commit followed by a foundation commit. No push or deployment was made;
`git ls-remote origin` returned no references when the connection was verified.

## Environment and decisions

- Verified on Windows 11 with Node 24.14.0, npm 11.15.0, and Git 2.52.0.
- npm was functional; the installed pnpm launcher had no active Node version.
  No global tools or version-manager configuration were changed.
- Direct dependency versions are exact; the lockfile was verified with `npm ci`.
- TypeScript 5.9.3 fits the current lint parser's supported range. Strict mode,
  `noUncheckedIndexedAccess`, and TypeScript-only source checking are enabled.
- Vitest 5.1.0 respects npm's configured three-day release delay. The newly
  published 5.1.1 was rejected by that policy and was not forced through.
- ESLint 9.39.5 is retained because the React, accessibility, and import plugins
  used by `eslint-config-next` do not declare ESLint 10 compatibility. An attempted
  ESLint 10 install exposed peer conflicts; the final dependency tree has none.
- The home page remains a Server Component. A system font avoids build-time
  requests for Google Fonts. Neutral shadcn tokens are temporary configuration,
  not a final visual identity or destination theme system.
- The Next.js scaffolder's Tailwind/Turbopack integration is retained. The
  shadcn CLI and CSS build dependencies stay in development dependencies.
- Playwright uses an isolated local production server on port 3100, with no
  server reuse and no configurable deployment URL. Retries are disabled.
- The health endpoint checks application liveness only. It has no external
  dependencies and sends `Cache-Control: no-store`.
- `AGENTS.md` records the working agreement. Next.js automatic instruction-file
  edits are disabled; our guidance already points to version-matched local docs.

## Verification performed

| Command or check                                 | Actual result                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `npm ci`                                         | Passed; installed the locked dependency tree                                                |
| `npm run dev -- --hostname 127.0.0.1`            | Started successfully; ready in 398 ms on the verified run                                   |
| HTTP GET `/` on the development server           | 200; Wander heading and document title present                                              |
| HTTP GET `/api/health` on the development server | 200; expected JSON and `no-store` header                                                    |
| Chromium at a 390 x 844 viewport                 | Screenshot visually checked; readable text and wrapping                                     |
| `npm run format:check`                           | Passed                                                                                      |
| `npm run lint`                                   | Passed; zero lint warnings/errors                                                           |
| `npm run typecheck`                              | Passed; route types generated and `tsc --noEmit` succeeded                                  |
| `npm run test:unit`                              | 1 file, 3 tests passed                                                                      |
| `npm run build`                                  | Passed; home page prerendered and health endpoint dynamic                                   |
| `npm run test:e2e`                               | 4 tests passed, 0 retries; completed in 1.8 seconds                                         |
| `npm run verify`                                 | Complete command chain passed with exit code 0                                              |
| `npm ls --depth=0`                               | Passed; no missing or invalid direct dependencies                                           |
| `npm audit --omit=dev --json`                    | Passed; zero runtime dependency vulnerabilities reported                                    |
| `npm audit fix --ignore-scripts`                 | Exit 1; no compatible automatic remediation cleared the findings                            |
| Git ignore checks                                | Local environment files and generated outputs ignored; `.env.example` and lockfile included |

The three unit tests cover conditional classes, conflicting Tailwind overrides,
and empty input. The four Playwright checks are the same browser smoke test in
desktop Chromium and Pixel 7 emulation, plus GET and unsupported POST HTTP tests.
Both browser runs confirmed status 200, the title, visible project name, Phase 0
content, and no observed browser errors.

Initial sandboxed localhost requests were blocked. The verified server and
network/browser checks were rerun with the required local-network permission.
Development and Playwright-managed servers were stopped after verification.

## Files created or replaced

The project began in an empty directory. The initial commit contains `.gitignore`
and the concise README. The foundation adds the remaining files and a link from
the README to the development guide.

| Area                         | Files                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Project and dependency setup | `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `.npmrc`, `.nvmrc`     |
| Code quality                 | `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`  |
| Git and environment          | `.gitignore`, `.env.example`; local `.git` metadata                                            |
| Application                  | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/api/health/route.ts` |
| UI and utility               | `components.json`, `src/components/ui/badge.tsx`, `src/lib/utils.ts`                           |
| Unit testing                 | `vitest.config.mts`, `src/lib/utils.test.ts`                                                   |
| Browser and HTTP testing     | `playwright.config.ts`, `tests/e2e/home.browser.spec.ts`, `tests/api/health.api.spec.ts`       |
| Documentation                | `AGENTS.md`, `README.md`, `docs/development.md`, `docs/phase-0.md`                             |

Generated `next-env.d.ts`, `node_modules/`, `.next/`, `playwright-report/`, and
`test-results/` are intentionally ignored.

## Implementation notes and independent checks

The development guide records implementation choices, their reasoning, and alternatives
deferred from this phase, along with commands for independent verification.

To reproduce the full sequence:

```powershell
cd E:\wander
npm ci
npx playwright install chromium
npm run verify
```

For manual testing, run `npm run dev`, open <http://localhost:3000>, and check the
Wander title/heading and Phase 0 badge at desktop and phone widths. Open
<http://localhost:3000/api/health> and confirm
`{"status":"ok","name":"Wander"}`. Check developer tools for errors. The development guide
also describes checking Fast Refresh and running the production server manually.

## Known issues and limits

- The full dependency audit reports **22 development-tooling findings: 7 moderate
  and 15 high**. This includes the
  [picomatch ReDoS advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) and
  [minimatch amplification advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)
  propagated through lint, test, and shadcn tooling. The latest published
  picomatch version inspected remains affected. Forced tool downgrades or
  incompatible transitive overrides were not applied. Recheck upstream releases
  before dependency updates and CI/deployment work. The runtime-only audit is
  separate and reports zero findings.
- ESLint 9 prints an unsupported-version warning during installation. Retaining
  it avoids bypassing the current Next.js lint plugins' peer requirements; revisit
  the lint stack when compatible upstream releases are available.
- Playwright emitted terminal color-environment warnings because the host sets
  both `NO_COLOR` and `FORCE_COLOR`. They did not fail tests or appear as browser
  errors.
- Automated browser coverage is Chromium desktop/mobile emulation only. Safari,
  Firefox, physical devices, accessibility audits, and visual regression suites
  have not been verified in Phase 0.
- The temporary page has no product interactions. The health endpoint says nothing
  about future database or third-party service availability.
- GitHub remains unchanged until a push is explicitly approved. CI and
  hosting are not configured.

## Version history and review boundary

- `62831fd` — `chore: initialize Wander repository`; only `.gitignore` and README.
- `chore: establish Wander project foundation` — application, tooling, tests, and
  development documentation.

Suggested next phase: agree on the first real user journey and visual direction
before implementing product features. Phase 0 stops here for owner review.
