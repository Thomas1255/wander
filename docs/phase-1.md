# Phase 1: Blue Hour visual identity

## Scope delivered

The owner approved Blue Hour following three creative proposals. This phase adds
the visual foundation and initial preview screens only:

- A cinematic landing page with local destination photography.
- A dashboard with three deterministic, explicitly labeled sample trips.
- Trip and destination compositions that adapt to desktop and phone widths.
- Responsive navigation, with a keyboard-accessible mobile dialog.
- Empty and loading collection states, including the actual route loading fallback.
- Shared typography, color, spacing, button, focus, and motion rules.
- Semantic tokens prepared for a later destination theme layer.

No authentication, trip creation, database, maps, collaboration, AI, persistence,
or theme engine was added. Phase 1 is saved in local checkpoint commits; pushing
and deployment require the owner's explicit approval.

## Preview locally

```powershell
cd E:\wander
npm ci
npm run dev
```

| Screen                | URL                                        |
| --------------------- | ------------------------------------------ |
| Landing               | <http://localhost:3000>                    |
| Upcoming sample trips | <http://localhost:3000/trips>              |
| No trips              | <http://localhost:3000/trips?view=empty>   |
| Loading preview       | <http://localhost:3000/trips?view=loading> |

The collection preview links switch among these states. `view=loading` is an
explicit visual review state; the actual route fallback is not delayed to make
it appear. Dates and travelers are fixed examples, not real user information.

## Decisions and alternatives

See [the design system](design-system.md) for the tokens and interaction rules,
and [asset sources](assets.md) for photo credits and font licensing.

- The dark foundation and apricot actions echo the warm/cool balance in the hero
  photograph. Opaque detail panels preserve practical readability.
- One variable font avoids mixing several typographic voices. Larger trip dates
  and supporting copy were applied after the first phone screenshot review.
- The dashboard gives the next departure emphasis rather than giving every trip
  the same visual weight. Phone layouts retain chronological reading order.
- Local photos and font files avoid third-party network dependencies in the
  preview and tests. The hero is prioritized; destination thumbnails remain lazy.
  All three dashboard covers load eagerly because they may be above the fold on
  desktop, trading a small initial image cost for consistent cover loading.
- Shared UI stays server-rendered where possible. Navigation alone needs local
  state; Radix supplies the menu's accessible dialog behavior.
- The buttons use the shadcn composition pattern with Wander's visual rules.
  There is no added component framework or animation library.
- Native links and disclosure elements are used for navigation and photography
  credits. There are no dead buttons or actions implying unimplemented features.

## Automated and visual verification

`npm run verify` runs formatting, lint, route type generation and TypeScript,
Vitest, the production build, and Playwright against a local production server.

| Check                    | Result                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Formatting               | Passed                                                                                                    |
| ESLint                   | Passed, zero warnings/errors                                                                              |
| Type checking            | Passed                                                                                                    |
| Vitest                   | 3 utility tests passed                                                                                    |
| Production build         | Passed; landing static, trips rendered on request                                                         |
| Playwright               | 30 tests passed with no retries                                                                           |
| Basic axe scans          | No violations reported for landing, trips, empty, loading, or mobile navigation in either browser project |
| Runtime dependency audit | Zero findings                                                                                             |

The Playwright suite covers browser rendering and the hero image, primary and
destination navigation, preview state changes, keyboard-only navigation, menu
focus trapping and restoration, the skip link, photography disclosure, reduced
motion, and horizontal overflow at 320/768/1440 pixels. It includes the existing
health endpoint HTTP checks. No accessibility rules were disabled.

Desktop and phone screenshots were inspected for actual image crops, spacing,
type scale, trip hierarchy, and empty-state composition. The initial browser
review surfaced Next.js image-loading and smooth-scroll integration warnings;
explicit loading hints and the documented scroll attribute address those paths.

Final production captures of the landing, trips, loading, phone empty state, and
mobile menu recorded no browser errors, no horizontal overflow, and no external
network hosts. Manrope was the computed font on each screen. Screenshots were
inspected directly; the loading and empty layouts were reviewed beyond compiling.

## Manual checks

1. Open the landing page on desktop and phone widths. Check headline wrapping,
   image crops, body readability, and the destination compositions.
2. Follow a destination card to its highlighted sample trip. Use the header to
   return to Discover.
3. Switch to No trips and Loading. Return using their working links and preview
   navigation. The page should remain usable while loading is shown.
4. On a phone-width viewport, open Menu; use Tab/Shift+Tab and Escape. Focus should
   remain in the open dialog and return to the trigger when dismissed.
5. Start from the address bar and Tab into the page. Activate Skip to content;
   check visible focus and keyboard activation of navigation and actions.
6. Enable reduced motion in browser/OS settings and check that skeletons stay
   still. Open Photography with the keyboard to inspect the source credits.

## Files changed

- Routes: `src/app/page.tsx`, `layout.tsx`, `globals.css`, `blue-hour.css`,
  `icon.svg`, `trips/page.tsx`, and `trips/loading.tsx`.
- Shared UI: `site-header.tsx`, `site-footer.tsx`, `destination-card.tsx`,
  `ui/button.tsx`, and the files under `src/components/trips/`.
- Fixtures: `src/lib/demo-trips.ts`.
- Assets: three JPEGs in `public/images/` and the Manrope license in
  `public/licenses/`.
- Verification: `playwright.config.ts` and
  `tests/e2e/visual-foundation.browser.spec.ts`, replacing the Phase 0 smoke test.
- Dependencies: `package.json` and `package-lock.json` add Manrope, Lucide, and axe.
- Guidance: `AGENTS.md`, `README.md`, `docs/development.md`, and the three Phase 1
  design, asset, and review documents.

## Limits and visual review

- This is a visual preview. Samples cannot be created, edited, saved, or shared.
- Dark surfaces and the exact photography/type balance still need the owner's
  visual approval, including comfort on an actual phone outdoors.
- Automated coverage uses Chromium desktop and Pixel emulation. Physical-device,
  Safari, Firefox, screen-reader, and real-world performance testing remain open.
  Axe and keyboard checks do not certify complete accessibility.
- The full dependency installation continues to report 22 development-tooling
  advisories (7 moderate, 15 high), and ESLint 9's existing maintenance warning
  remains. The runtime-only audit reports zero findings.
- Theme overrides, persistent data, and product flows belong to later approved
  phases. Phase 2 is not started.

Suggested commit after review: `feat: introduce Blue Hour identity and trip previews`.

The next step is visual review and any requested adjustments within Phase 1.

## Landing hero revision

Owner feedback narrowed the opening to a destination, a short factual description,
and one direct action. The hero now shows Greece, Santorini, and caldera/beach/Oia
highlights, with a link to the Santorini sample trip. The description is grounded
in the [Greek National Tourism Organisation's Santorini overview](https://www.visitgreece.gr/en/islands/cyclades/santorini).
Slogans, the extra action, and the repeated photo caption were removed. The logo
and lower landing sections are reserved for subsequent review.

The introductory slogan section is removed. The hero keeps a bounded height
for quicker access to the destinations directly below it.

The viewport checks also exposed a mobile fragment-navigation race: the initial
jump could happen while the trip page still showed its loading fallback. A small
client boundary resolves the requested destination after the trip cards mount.
Regression coverage checks the destination is actually in view. The updated
browser suite passes all 30 tests, including the compact-opening checks.

## Destination carousel prototype

The opening now features Japan (Tokyo), Greece (Santorini), and Iceland (South
Coast), in that order. Full-width photography fades into the existing canvas,
while the bounded hero height remains 600 pixels on desktop and 560 on phones.
Each destination has one short factual description and one sample-trip link.

The new `src/components/destination-carousel.tsx` is the only additional client
boundary. It uses React state and native buttons without a carousel dependency.
Previous/next controls wrap; labeled country segments select a slide directly.
Horizontal touch swipes change slides, while vertical gestures scroll normally.
Manual control avoids timers and gives people time to read. Images crossfade in
480 milliseconds, or switch immediately with reduced motion enabled. Loading the
three local images eagerly, with lower priority for the alternate slides, trades
some initial bandwidth for ready-to-view transitions in this small prototype.

Carousel semantics follow the
[W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
The active selection and destination changes are exposed to assistive technology,
inactive images are hidden, and button activation retains keyboard focus.

Destination highlights were checked against the official
[Tokyo Tower guide](https://www.gotokyo.org/en/destinations/southern-tokyo/tokyo-tower-and-around/index.html),
[Sensoji overview](https://www.gotokyo.org/en/spot/15/index.html),
[Shinjuku guide](https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html),
[Santorini overview](https://www.visitgreece.gr/en/islands/cyclades/santorini),
and [South Coast guide](https://www.south.is/en/destinations/travel-routes/the-south-coast).
Existing licensed imagery and photography credits are reused. The Iceland photo
illustrates the country; it does not identify a specific waterfall.

Files for this revision: `src/app/page.tsx`, `src/app/blue-hour.css`, the new
carousel component, `tests/e2e/visual-foundation.browser.spec.ts`, this review,
and `docs/design-system.md`.

Verification: `npm run verify` passes formatting, lint, strict type checking,
all 3 unit tests, the production build, and all 40 Playwright tests with no
retries. Coverage includes wrapping, direct selection, sample-trip destinations,
keyboard activation and focus, real Chromium touch input, vertical scrolling,
reduced motion, compact layout, and basic axe scans of all three slides.
The initial run exposed an ambiguous image locator shared with the lower
destination card; scoping the check to the hero fixes the test's target.

All six desktop/phone production captures were inspected for photo composition,
copy wrapping, control placement, and the bottom fade. The captures recorded no
browser errors, horizontal overflow, or external network hosts. Phone Tokyo and
desktop Iceland use separate crops to keep the tower and cliff edge visible.
The existing development server was reused for local preview and left running;
the temporary production inspection server was stopped.

Manual review: open `http://localhost:3000` with `npm run dev` if needed. Select
all three country labels, try both arrows, and follow each sample-trip link.
At a phone width, swipe the photo horizontally and scroll vertically; check the
bottom fade and image composition. Tab through the controls and activate them
with Enter or Space. Enable reduced motion to verify instant image changes.

This remains a sample-data prototype. The landing sections below the opening and
the wordmark await separate review; Phase 2 has not started. Real-device and
Safari/Firefox checks remain open. The next step is the owner's visual review.

Suggested commit for this revision: `feat: add fading destination hero carousel`.

## Transparent navigation revision

The landing header now overlays the destination photograph with a transparent
background. A dark gradient behind the header fades out below it to keep the
links readable across all three images without a separate opaque bar. The
wordmark and desktop links are grouped on the left, the active page has a
full-label underline, and the preview label remains on the right. Header height
is 80 pixels on desktop and 72 on phones. No dependencies were added.

The existing pathname hook selects the overlay on the landing route. Trip routes
keep the same transparent header in normal flow above their content. This avoids
overlapping practical information or adding scroll listeners. The Radix mobile
menu, current links, and wordmark are retained.

Changed files: `src/components/site-header.tsx`, `src/app/blue-hour.css`,
`tests/e2e/visual-foundation.browser.spec.ts`, `docs/design-system.md`, and this
review. The compact-opening test now verifies that the photo starts at the top
behind the header. A new regression check navigates between the landing and trip
routes to verify the header does not cover trip content. Touch checks begin
below the overlaid navigation, where the carousel receives the gesture.

`npm run verify` passes formatting, lint, strict type checking, 3 unit tests,
the production build, and all 42 Playwright tests with no retries. Basic axe
scans and keyboard/menu checks pass. Production screenshots were reviewed across
the three destination images, desktop, 390-pixel and 320-pixel phone widths, and
trip layouts. No browser errors or horizontal overflow were recorded.

Preview at `http://localhost:3000` (`npm run dev` if needed). Switch between all
three destinations, follow Your trips and return using the wordmark, then check
the mobile menu and Tab/Enter/Escape interactions. Real-device, Safari, Firefox,
and screen-reader checks remain open. This is still a sample-data preview; the
next step is visual review within Phase 1.

Suggested commit: `style: overlay transparent navigation on destination hero`.

## Brighter photography and cinematic proportions

Owner feedback replaces the compact desktop banner with proportions matching the
roughly 2:1 reference. Desktop height now follows viewport width at 2.05:1,
bounded between 680 and 960 pixels. At 1900 pixels wide the banner is about
927 pixels tall. The content width and lower-left placement follow the reference
more closely. Phone height remains 560 pixels.

The horizontal scrim and full-width header gradient are removed. The upper
38 percent of the desktop photo is unobscured; one vertical fade gradually blends
the lower image into the existing canvas. On phones the fade starts after the
upper 20 percent so the descriptions retain contrast over bright buildings.
The photos have no color filter or
brightness adjustment. Navigation ink is declared per photo: dark over Tokyo's
and Iceland's skies, light over Greece's sea. This small contrast treatment
avoids darkening the photography and does not introduce a theme engine. The
desktop preview label has a local backing where needed for readability.

Files changed: `src/components/destination-carousel.tsx`, `src/app/blue-hour.css`,
`tests/e2e/visual-foundation.browser.spec.ts`, `docs/design-system.md`, and this
review. No dependencies or source photography changed. The opening regression
check now verifies the approved cinematic proportions at 1440 and 1900 pixels,
as well as phone layouts, direct access to destinations, and transparent
navigation.

Verification: formatting, lint, strict TypeScript, 3 unit tests, production build,
and 42 Playwright tests pass. Following the final label-contrast adjustment, the
build and all 42 Playwright tests were rerun successfully. Basic axe checks pass
without disabled rules. Production captures at 1900, 1440, 390, and 320 pixels
recorded no browser errors or horizontal overflow. Sampled upper-image pixels
matched an unfiltered rendering of the original within one RGB level; sampled
bottom-edge pixels exactly matched the canvas's RGB value of 16, 24, 32.

Manual review: open `http://localhost:3000`, select Japan, Greece, and Iceland,
and compare the upper photograph, lower fade, and banner proportions with the
reference. Check navigation readability and sample-trip links at desktop and
phone widths. Run `npm run dev` if needed and `npm run verify` to repeat checks.
The existing photos retain their natural lighting; the portrait Iceland source
still needs a different crop on desktop and phone. Real-device and non-Chromium
review remain open. The next step is visual approval within Phase 1.

Suggested commit: `style: brighten destination banners and match cinematic scale`.

## Divider removal

Removed the footer rule, the trip collection's section rule and label separator,
and the mobile menu's item rules and panel-edge rule. Existing spacing now
separates those areas. `AGENTS.md` and the design-system notes record the owner's
preference for spacing instead of decorative dividers.

Changed files: `src/app/blue-hour.css`, `AGENTS.md`, `docs/design-system.md`, and
this review. No dependencies or behavior changed. Formatting and whitespace
checks pass, the production build passes, and all 42 Playwright browser/API
checks pass with no retries, including the existing axe and keyboard checks.
Desktop and phone inspection covered landing/trip footers, all collection
states, and the mobile menu. No horizontal overflow or browser errors were
recorded. Computed styles confirm the removed rules have zero border width.

Manual review: refresh `http://localhost:3000/trips`, check the space above
Upcoming trips and the footer, then open the phone menu and inspect its links.
The next step remains visual review within Phase 1; physical-device and
non-Chromium checks remain open.

## Navigation that follows scrolling

The header now uses sticky positioning on landing and trip routes. At the landing
opening it still overlays the photo transparently; after 16 pixels of scrolling
it gains a translucent mineral background, a small backdrop blur, and light text.
This keeps navigation readable while leaving the photography's brightness alone.
No dividers or dependencies were added.

A shared 80-pixel desktop / 72-pixel phone height controls header layout, the
landing overlap, and document scroll padding. Trip cards and destination sections
therefore clear the navbar when reached through links. React's external-store
hook subscribes to the scroll threshold with a passive listener and removes it
on unmount; it only changes the rendered state when the threshold changes.

Changed files: `src/components/site-header.tsx`, `src/app/globals.css`,
`src/app/blue-hour.css`, `tests/e2e/visual-foundation.browser.spec.ts`,
`docs/design-system.md`, and this review.

`npm run verify` passes formatting, lint, strict TypeScript, 3 unit tests, the
production build, and all 44 Playwright browser/API checks without retries.
Regression coverage checks navigation stays at the viewport top on both routes,
the transparent opening returns after scrolling up, mobile menu focus is restored
while scrolled, and linked trip cards clear the navbar. The scrolled header also
passes the basic axe scan. Desktop/phone screenshots were visually checked;
no browser errors or horizontal overflow were recorded.

Manual review: scroll down `http://localhost:3000/` and `/trips`, use the navbar
without scrolling back up, and return to the landing opening. On a phone width,
open and dismiss Menu after scrolling. Follow a destination to its sample trip
and check its heading appears below the navbar. Real-device and non-Chromium
review remain open; the next step remains Phase 1 visual review.

## Fully transparent sticky navigation

The navbar remains fully transparent while scrolling on both routes. The
previous background fill and backdrop blur are removed. Sticky positioning,
anchor clearance, and the existing navigation ink/shadow treatments remain.
This replaces the filled scrolling treatment described above.

Changed files: `src/app/blue-hour.css`,
`tests/e2e/visual-foundation.browser.spec.ts`, `docs/design-system.md`, and this
review. The scrolling regression now checks that both background alpha and
backdrop filtering stay transparent/absent after scrolling on landing and trips.
`npm run verify` passes formatting, lint, strict TypeScript, 3 unit tests, the
production build, and all 44 Playwright checks. Desktop and phone captures confirm
the header stays at the viewport top with no fill or blur; no browser errors were
recorded. Manual review: refresh `http://localhost:3000/`, scroll the page, and
repeat on `/trips` and at a phone width. The next step remains Phase 1 visual
review; physical-device and non-Chromium verification remain open.

## Infinite destination menu

Replaced the three staggered destination cards with the requested React Bits
Infinite Menu. The section now has one heading, Destinations. Its introductory
eyebrow, promotional sentences, and per-card slogans are removed. Tokyo,
Santorini, and Iceland remain the same three sample destinations, repeated around
the sphere; the tiles do not represent additional places or trips. The opening
carousel and lower closing section are unchanged.

The official TypeScript/CSS source matches the supplied JavaScript variant and
is pinned and attributed in `docs/assets.md`. Its license is included locally.
No package dependencies were added. The wrapper disables autoplay, introductory
spinning, grayscale, and dimming, and uses Wander's existing photography and
tokens. The selected destination, location, and sample-trip link remain visible
below the globe; native buttons provide direct access to all three places.

The globe supports dragging, arrow-key navigation, and Enter to open the selected
sample trip. Vertical touch scrolling stays available. Reduced motion or failed
WebGL initialization/context loss uses a still image picker, keeping selection
and sample links available. Rendering loads near the viewport, pauses offscreen,
and releases event listeners, observers, buffers, shaders, and textures on unmount.

Visual inspection caught a source shader defect: a floating-point tile ID was
interpolated across triangles, occasionally sampling the wrong atlas cell at a
row boundary and speckling the Iceland photo. Flat interpolation keeps the ID
constant, as defined by the
[GLSL ES specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf).
A pixel regression samples the textured center of that tile and detects repeated
edge-color pixels. The original version failed this check in desktop and
high-density phone captures; the corrected version passes.

Changed files: `src/app/page.tsx`, `src/app/blue-hour.css`,
`src/lib/demo-trips.ts`, `tests/e2e/visual-foundation.browser.spec.ts`, and these
design/asset/development notes. Added `src/components/destination-menu.tsx`,
`src/components/react-bits/infinite-menu.tsx` and its CSS, and
`public/licenses/react-bits.txt`. Removed `src/components/destination-card.tsx`
and the obsolete card styles and fixture slogans.

`npm run verify` passes formatting, lint, strict TypeScript, all 3 unit tests,
the production build, and all 52 Playwright browser/API checks with no retries.
Coverage includes globe initialization, direct selection, real keyboard motion,
pointer dragging, vertical touch scrolling without navigation, reduced-motion
fallback, unavailable WebGL, correct sample links, and the shader pixel regression.
Basic axe checks pass without disabled rules. Production screenshots were checked
at 1440, 768, 390, and 320 pixels, including the still picker. Enter on the globe
opens the selected trip at each width. No browser errors, external network hosts,
or horizontal overflow were recorded during those checks.

Preview `http://localhost:3000/#destinations` (`npm run dev` if needed). Drag the
photos, try the three destination buttons, then follow View sample trip. Tab to
the globe and use arrow keys and Enter; Tab leaves it normally. On a phone, try
a horizontal drag and a vertical page scroll. Enable reduced motion to inspect
the still picker. `npm run verify` repeats the automated checks.

The three photos intentionally repeat; this remains a sample-data prototype.
The interactive treatment needs the owner's visual approval and testing on a
physical phone, Safari, Firefox, and a screen reader. The next step remains
visual review within Phase 1.

## Infinite Menu border

Added the requested one-pixel border around the interactive photo viewport using
the existing border color and three-pixel radius. The same frame applies to its
still-image fallback. Updated `src/app/blue-hour.css` and the design-system notes.
Formatting and whitespace checks, production build, and all 8 focused Infinite
Menu browser checks pass. Desktop and phone screenshots were inspected, with no
horizontal overflow. Preview `http://localhost:3000/#destinations` to review the
frame; the next step remains visual review within Phase 1.

## Rounded Infinite Menu frame

Increased the outer menu frame's corner radius from 3 to 16 pixels. Its existing
overflow clipping keeps the globe and still-image fallback inside the curve.
The radius is local to the frame; the shared component radius remains 3 pixels.
Changed `src/app/blue-hour.css`, `docs/design-system.md`, and this report.

Formatting checks, the production build, and all 10 focused destination-menu
browser checks pass. Desktop and phone captures were visually inspected; both
use the 16-pixel frame without horizontal overflow. Existing checks cover globe
selection, keyboard operation, dragging, vertical touch scrolling, and reduced
motion / unavailable-WebGL fallbacks. No new tests or dependencies were needed
for this CSS adjustment.

Preview `http://localhost:3000/#destinations` at desktop and phone widths to review
the corners. The next step remains the owner's visual review within Phase 1;
physical-device and non-Chromium review remain open.

## Blue-to-sunset landing transition

Added the owner's reference-inspired transition behind Destinations: deep blue
flows through muted dusk pink into a warm peach horizon. The existing transparent
globe and its 16-pixel frame reveal the same full-width background. Warm colors
continue through the lower landing content and footer, with navy text and apricot
actions. The opening carousel and trip screens retain their Blue Hour palette.

The gradient follows the globe's responsive height. A local, licensed Mount Takao
sunset photograph supplies restrained landscape detail using a CSS mask and
soft-light blending; the color transition works without the photograph. It is
decorative and does not change when selecting a destination. The original source,
download URL, license, and photographer credit are recorded in `docs/assets.md`.
No dependencies or destination theme engine were added.

The sticky navbar stays transparent without blur and changes to dark ink over
the warm part of the page. A noninteractive marker within the globe anchors that
change to the responsive layout; scrolling back and changing routes restore the
normal ink. Keyboard focus uses a two-tone outline across the gradient. Selected
destination labels use dark ink and an underline rather than a pale accent that
would lose contrast on peach.

Changed files: `src/app/page.tsx`, `src/app/globals.css`, `src/app/blue-hour.css`,
`src/components/destination-menu.tsx`, `src/components/site-header.tsx`,
`src/components/site-footer.tsx`, and
`tests/e2e/visual-foundation.browser.spec.ts`. Added
`public/images/mount-takao-sunset.jpg` (1800 pixels wide, approximately 220 KB).
Updated `AGENTS.md`, `docs/assets.md`, `docs/design-system.md`, and this review.

Final `npm run verify` passed formatting, lint, strict TypeScript, all 3 unit
tests, the production build, and all 54 Playwright browser/API checks without
retries. The new regression covers navigation ink over the horizon, selected-label
contrast, transparent navigation without blur, basic axe checks, and restoring
normal colors on client navigation to trips. Production captures were checked at
1440, 768, 390, and 320 pixels, including the lower landing content, footer, and
reduced-motion still picker. No browser errors or horizontal overflow were
recorded. Photograph blending and label contrast were adjusted after visual
inspection, rather than relying solely on automated accessibility results.

Manual review: run `npm run dev`, then open
`http://localhost:3000/#destinations`. Scroll through the blue and peach areas,
select destinations, tab to the globe, and follow View sample trip. Check the
navbar while scrolling and after moving to `/trips`. Repeat at a phone width and
with reduced motion enabled. The next step is the owner's visual review within
Phase 1. This remains a sample-data preview; physical-device, Safari, Firefox,
and screen-reader review remain open.

## Independent Infinite Menu backdrop

Gave the menu's rounded frame its own opaque navy-to-dusty-rose-to-peach gradient,
with a soft warm glow near the bottom, following the owner's cropped reference.
The page's mountain backdrop now stays outside the frame. The canvas remains
transparent over the menu's local background, with soft shadows behind the
individual photos. The still-image fallback uses the same frame background and
a matching shadow. The navigation ink boundary follows the warm part of the
menu's new gradient.

Changed `src/app/blue-hour.css`, `AGENTS.md`, `docs/design-system.md`, and this
report. No dependencies, framework code, or new tests were needed for the CSS
change. The production build and all 16 focused Playwright checks passed without
retries, including globe selection, keyboard controls, dragging, vertical touch
scrolling, reduced motion, unavailable WebGL, navigation contrast, and basic
landing accessibility. Desktop (1440px), phone (390px), and narrow phone (320px)
captures showed the separate menu background without horizontal overflow or
browser errors. The globe and still-picker views were visually inspected.

Run `npm run dev` and open `http://localhost:3000/#destinations` to review the
background and photo depth. Repeat at a phone width and with reduced motion.
The next step remains visual approval within Phase 1; physical-device and
non-Chromium checks remain open.

## Reference-inspired sky and mountain detail

Replaced the faint Mount Takao backdrop with a decorative dusk illustration
inspired by the supplied design: textured blue clouds, rose and peach light,
layered ridges, and a small Fuji silhouette near the right horizon. Its absolute
background layer fills the surrounding Destinations scene. The Infinite Menu
keeps its independent opaque backdrop and shadows.

The existing frame dimensions, photo sizing, globe configuration, typography,
navigation sizing, and spacing are preserved. Desktop frame height remains
460–620 pixels and the phone frame remains 420 pixels tall. No dependencies or
runtime features were added. The new image is approximately 39 KB and loads
lazily through Next.js; provenance and the generation prompt are in
`docs/assets.md`. It is an illustration, not a documentary photograph.

Changed `src/app/page.tsx`, the decorative-background rules in
`src/app/blue-hour.css`, and the obsolete backdrop credit in
`src/components/site-footer.tsx`. Added
`public/images/fuji-dusk-illustration.webp`. Updated `AGENTS.md`,
`docs/assets.md`, `docs/design-system.md`, and this review.

Final `npm run verify` passed formatting, lint, strict TypeScript, all 3 unit
tests, the production build, and all 54 browser/API checks without retries.
Production captures confirmed the original desktop frame (1296 × 620 at a
1440-pixel viewport) and phone frame (342 × 420 at 390 pixels; 272 × 420 at
320 pixels). No browser errors or horizontal overflow were recorded. The globe
configuration, shared tokens, and existing tests match the preceding checkpoint.

Manual review: run `npm run dev` and open
`http://localhost:3000/#destinations`. Check the sky and mountain detail outside
the original-size menu, select destinations, and repeat at a phone width and
with reduced motion. The next step remains visual review within Phase 1;
physical-device and non-Chromium checks remain open.

## Removed closing filler

Removed the closing slogan, decorative arrow, repeated sample-trip button, footer
taglines, and duplicate footer wordmark. The landing page ends after Destinations
with a compact photography-credit disclosure. Removed the unused closing/footer
copy styles and their responsive overrides. Menu and photo scaling are unchanged.

Changed src/app/page.tsx, src/components/site-footer.tsx, src/app/blue-hour.css,
docs/design-system.md, and this review. The existing navigation-ink regression in
tests/e2e/visual-foundation.browser.spec.ts now uses a shorter viewport so it can
reach the warm navigation boundary on the shorter document; its assertions remain.
No new dependencies or tests were added.

The final npm run verify passed formatting, lint, strict TypeScript, all 3 unit
tests, the production build, and all 54 Playwright browser/API checks without
retries. Desktop and phone production views were inspected. The retained credits
open with the keyboard, and no browser errors or horizontal overflow were recorded.

Run npm run dev, open http://localhost:3000/, and scroll to the bottom. Confirm
the filler is gone and Photography expands to the source links. Repeat at a phone
width. The next step remains visual review within Phase 1; physical-device and
non-Chromium checks remain open.

## Blended hero-to-sky transition

The hero previously faded to charcoal while Destinations began in blue, creating
a visible dark band. Both now meet at the same navy transition token. The sky
illustration fades in gradually over its upper 24%, and the phone hero uses the
same transition color. Only the fade colors and sky mask changed; menu and photo
dimensions, spacing, typography, and navigation sizing remain intact.

Changed src/app/globals.css, src/app/blue-hour.css, docs/design-system.md, and
this review. No dependencies, framework code, or tests were added. Formatting
and the production build pass. All 10 focused Playwright checks pass, covering
hero proportions, carousel selection and keyboard controls, alternate-slide
accessibility, and landing accessibility on desktop and phone emulation.
Production captures of Japan, Greece, and Iceland were visually reviewed at
1900 pixels, along with phone captures at 390 pixels. No browser errors or
horizontal overflow were recorded.

Run npm run dev and open http://localhost:3000/. Select each destination and
scroll through the photograph's lower fade into Destinations. Repeat at a phone
width. The next step is visual review within Phase 1; physical-device and
non-Chromium review remain open.

## Softer Infinite Menu upper edge

Matched the menu's upper gradient to the surrounding sky-entry blue and muted
the top outline to a translucent blue. Reduced the pale border's opacity on the
remaining edges. The menu retains its separate opaque sunset backdrop, 16-pixel
corners, original dimensions, photo scale, and spacing.

Changed src/app/blue-hour.css, docs/design-system.md, and this review. Formatting
and the production build pass. All 16 focused Playwright checks passed without
retries, covering the globe, direct selection, keyboard controls, touch gestures,
fallbacks, navigation contrast, and landing accessibility. Desktop and phone
production views were inspected; no browser errors or horizontal overflow were
recorded. The frame is still 1296 × 620 at a 1440-pixel viewport and 342 × 420
at a 390-pixel viewport. No new dependencies or tests were needed.

Run npm run dev and open http://localhost:3000/#destinations to review the upper
edge at desktop and phone widths. The next step remains visual review within
Phase 1; physical-device and non-Chromium checks remain open.

## Removed peach line from the menu border

The gradient's default repeat tiled its peach bottom into the top border, so
changing border opacity alone did not remove the line. The menu background now
uses the border box as its origin and does not repeat. Every border edge uses
#667f8c, the muted blue-gray sampled from the owner's reference. Menu size,
rounded corners, photo scaling, spacing, and the gradient colors are preserved.

Changed src/app/blue-hour.css, docs/design-system.md, this report, and
tests/e2e/visual-foundation.browser.spec.ts. The new pixel regression failed on
the previous build in desktop and high-density phone emulation, detecting the
peach stripe; it passes after the fix. No dependencies were added.

Final npm run verify passed formatting, lint, strict TypeScript, all 3 unit tests,
the production build, and all 56 browser/API checks without retries. Desktop and
phone production captures were visually checked. The frame remains 1296 × 620
at 1440 pixels and 342 × 420 at 390 pixels, with no browser errors or horizontal
overflow in the capture run.

Run npm run dev and open http://localhost:3000/#destinations to inspect the
uniform border and confirm the peach line is gone. The next step remains visual
review within Phase 1; physical-device and non-Chromium review remain open.

## Infinite Menu focus zoom and destination details

Matched the behavior shown in the owner's 11.9-second video: the globe pulls back
while dragging, snaps toward a card on release, zooms into that centered photo,
and reveals concise details. Keyboard arrows and the native destination buttons
use the same movement-to-focus transition. The frame dimensions, border, backdrop,
photography, manual navigation, and lack of autoplay remain intact. The requested
focus zoom changes photo magnification inside the existing frame.

The focused state shows the place, location, factual highlights, and a working
View sample trip link. Details sit beside the photo on desktop and in a compact
bottom panel on narrow screens. Cream backings keep the navy text legible across
the existing gradient and photographs. Details fade out during movement and are
inert, preventing hidden links from receiving keyboard focus. The still picker
for reduced motion and unavailable/lost WebGL retains the same details and links
without camera animation.

Reused the existing React Bits camera, focus state, information renderer, and
responsive layout. Set focus zoom to 1.6 and pull-back strength to 1.2. The text
layout follows the actual camera distance, and keyboard/direct-selection movement
also contributes to camera pull-back. Factual destination highlights now live in
the shared fixtures and are reused by the opening carousel. No app dependencies,
backend resources, or future-phase features were added.

Changed src/components/destination-menu.tsx,
src/components/react-bits/infinite-menu.tsx, src/app/blue-hour.css,
src/lib/demo-trips.ts, src/components/destination-carousel.tsx, and
tests/e2e/visual-foundation.browser.spec.ts. Updated AGENTS.md and the design,
asset, development, and phase notes.

Final npm run verify passed formatting, lint, strict TypeScript, all 3 unit tests,
the production build, and all 58 Playwright browser/API checks without retries.
The new zoom regression measures the camera-driven tile size during a real drag,
checks hidden/inert details during movement, verifies zoom and matching highlights
after settling, and follows the correct sample-trip link. Existing tests continue
to cover keyboard movement, touch scrolling, WebGL and reduced-motion fallbacks,
border pixels, responsive widths, and basic axe checks. The navigation-ink test
now scrolls to the actual warm-color marker instead of the relocated text panel.

Production views were inspected at 1440, 768, 390, and 320 pixels in focused and
zoomed-out states, including all destinations and the still picker. The capture
run recorded no browser errors or horizontal overflow. The frame stays 1296 × 620
at 1440px, 342 × 420 at 390px, and 272 × 420 at 320px. Physical-device, Safari,
Firefox, and screen-reader review remain open.

To review, run npm run dev and open http://localhost:3000/#destinations. Drag the
globe, release it, and watch the centered photo zoom forward as its details appear.
Try the destination buttons, arrow keys on the focused globe, and View sample trip.
Repeat at a phone width and with reduced motion enabled. The next step remains
the owner's visual and interaction review within Phase 1.
