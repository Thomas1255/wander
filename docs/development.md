# Development guide

Local setup and verification for Wander's Phase 0 foundation.

Phase 0 provides a temporary home page, a liveness endpoint, and the development
and testing foundation. Travel features and deployment are not implemented.

## Prerequisites

- Node.js **24.x**, verified with **24.14.0** (recorded in `.nvmrc`).
- npm **11.15.0** was used for installation; Git is needed for version control.
- Windows 11 or another operating system supported by Playwright.
- Internet access for the first dependency and Chromium downloads.

Use npm and keep `package-lock.json` in version control. `npm ci` installs its
locked dependency tree. Use `npm install` for intentional dependency changes;
`.npmrc` saves new direct dependencies at exact versions.

The installed stack is Next.js 16.4.6, React 19.3.1, TypeScript 5.9.3, Tailwind
4.3.5, shadcn/ui CLI 4.23.0, Vitest 5.1.0, and Playwright 1.65.1. TypeScript 5.9
stays within the lint parser's supported range. Vitest 5.1.0 respects the local
npm three-day release delay; 5.1.1 was too recent during setup.

## Start locally

```powershell
cd E:\wander
npm ci
npx playwright install chromium
npm run dev
```

Open <http://localhost:3000>. Expect **Wander**, a **Phase 0** badge, and a short
explanation that trip planning comes later. Stop the server with `Ctrl+C`.

No environment file or credentials are required. `.env.example` documents future
configuration conventions. When needed, copy it to `.env.local`, which Git ignores.
Keep secrets in server-only variables. `NEXT_PUBLIC_*` values are exposed to
browser code and must never contain secrets. Add documented variable names to
`.env.example` with safe example values when introducing configuration.

## Commands

| Command                          | Purpose                                               |
| -------------------------------- | ----------------------------------------------------- |
| `npm run dev`                    | Development server with Fast Refresh                  |
| `npm run build`                  | Production build with type checking                   |
| `npm run start`                  | Serve the production build (build first)              |
| `npm run lint`                   | Next.js/React/TypeScript lint rules; warnings fail    |
| `npm run typecheck`              | Generate Next.js route types, then check TypeScript   |
| `npm run format`                 | Apply Prettier and Tailwind class sorting             |
| `npm run format:check`           | Check formatting without editing files                |
| `npm test` / `npm run test:unit` | Run Vitest once                                       |
| `npm run test:unit:watch`        | Rerun units as files change                           |
| `npm run test:e2e`               | Playwright browser and HTTP tests (build first)       |
| `npm run test:api`               | HTTP tests only (build first)                         |
| `npm run test:e2e:ui`            | Interactive Playwright runner (build first)           |
| `npm run verify`                 | Formatting, lint, types, units, build, and Playwright |

After installing Chromium, run the full sequence with `npm run verify`.
Playwright starts and stops its own **local production server on port 3100**.
Keep that port free. It never reuses a server or accepts a remote URL, preventing
accidental tests against a deployment. Port 3000 remains available for development.
Build after source changes before running individual Playwright commands;
`verify` does this automatically.

Desktop Chromium and Pixel 7 emulation share the browser smoke test. Emulation is
not physical-device or Safari testing. The API project uses an HTTP client without
launching a browser. Tests have no retries. Failure traces/screenshots and the HTML
report are Git-ignored; view the latter with `npx playwright show-report`.

## Structure

```text
src/
  app/
    api/health/route.ts   # GET /api/health
    globals.css          # Tailwind and stock neutral shadcn tokens
    layout.tsx           # Shared HTML document and metadata
    page.tsx             # Temporary home page
  components/ui/
    badge.tsx            # One shadcn/ui component, owned in this repository
  lib/
    utils.ts             # Shared cn class-merging utility export
    utils.test.ts        # Unit tests beside the utility
tests/
  api/                   # HTTP contract tests
  e2e/                   # Browser smoke tests
```

`@/` maps to `src/`. Add feature folders and server-only business logic when an
approved feature needs them. Empty service, hook, or repository layers are not
needed yet. Root files configure the tools. `AGENTS.md` preserves our project
working agreement for future coding sessions.

## Implementation choices

- **App Router:** keeps pages and HTTP endpoints in one Next.js application,
  matching the approved stack without introducing a separate backend service.
- **Server-rendered home page:** the temporary content needs no client state or
  event handlers, so adding a Client Component would add browser code without
  providing useful behavior.
- **Strict TypeScript:** strict checks and `noUncheckedIndexedAccess` expose unsafe
  assumptions early. Runtime request validation will be added when endpoints
  accept user input; static types alone cannot validate external data.
- **Tailwind and shadcn/ui:** one owned Badge component confirms the setup.
  Semantic CSS variables leave room for future visual work. Stock neutral tokens
  and a system font keep Phase 0 independent of final design decisions and font
  downloads; a destination theme engine is deferred.
- **Vitest and Playwright:** utility behavior runs in Node, while browser and HTTP
  checks exercise the production build. A simulated DOM or React testing library
  would add dependencies without helping these initial checks.
- **API boundary:** the page makes no API request because it needs no remote data.
  The health endpoint exists for HTTP verification. Future interactive features
  can use same-origin Route Handlers; Server Components can call shared server
  logic directly without an extra HTTP request to their own application.

`GET /api/health` returns:

```json
{ "status": "ok", "name": "Wander" }
```

It sets `Cache-Control: no-store`. This confirms application liveness only; it does
not inspect a database or external service and exposes no secrets.

## Manual verification

1. Run `npm run dev` and open <http://localhost:3000>.
2. Confirm the Wander heading, Phase 0 badge, and Wander browser-tab title.
3. Narrow the viewport to a phone width and check that text fits and is legible.
4. Open <http://localhost:3000/api/health> and confirm the JSON above.
5. Check browser developer tools for errors. Change a word in `page.tsx`, confirm
   Fast Refresh updates it, and restore the text.
6. Stop the server. Run `npm run build`, then `npm run start`, and confirm the
   same page and endpoint at <http://localhost:3000>.

## Git and phase boundaries

The local `main` branch is connected to
<https://github.com/Thomas1255/wander.git>. The owner approved two local commits:
an initial README and Git ignore, followed by the project foundation. Pushes and
deployments require separate approval.

See the [Phase 0 report](phase-0.md) for verification results and known tooling issues.
The suggested next phase is agreeing on the first user journey and visual
direction before adding product features. That phase requires owner approval.

## Official references

- [Next.js App Router installation](https://nextjs.org/docs/app/getting-started/installation)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next)
- [Vitest](https://vitest.dev/guide/)
- [Playwright](https://playwright.dev/docs/intro)

Version-matched Next.js documentation is installed at `node_modules/next/dist/docs/`.
