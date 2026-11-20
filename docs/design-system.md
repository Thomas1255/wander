# Wander design system

Wander's Phase 1 pairs cinematic photography with readable planning surfaces and
Manrope typography. The owner approved a Paprika palette trial: peach and cream
surfaces, espresso text, and tomato actions. This replaces Blue Hour's dark mineral
colors for visual review while retaining the compositions and interactions.
The trips page keeps destination, dates, and people easy to find.

## Tokens

`src/app/globals.css` is the source of truth. Tailwind semantic utilities and
shadcn patterns share these values. Page compositions retain the existing
`blue-hour.css` filename to keep the palette change small and easy to revert.

| Role                          | Token                  | Value                    |
| ----------------------------- | ---------------------- | ------------------------ |
| Canvas                        | `--background`         | `#fff0df`                |
| Trip and empty-state surfaces | `--surface`            | `#fff8ee`                |
| Raised surface / skeleton     | `--surface-raised`     | `#f4d2b4`                |
| Main text                     | `--foreground`         | `#342117`                |
| Supporting text               | `--muted-foreground`   | `#79533f`                |
| Primary action                | `--primary`            | `#be4327`                |
| Primary hover                 | `--primary-hover`      | `#a63420`                |
| Text on primary               | `--primary-foreground` | `#fff7ed`                |
| Hover surface                 | `--accent`             | `#f8d9bf`                |
| Menu frame and subtle borders | `--border`             | `#cba187`                |
| Outlined control borders      | `--control-border`     | `#976c56`                |
| Keyboard focus                | `--focus-ring`         | `#ac3619`                |
| Hero text                     | `--hero-foreground`    | `#342117`                |
| Text on dark photos / avatars | `--on-dark`            | `#fff7ed`                |
| Destructive action            | `--destructive`        | `#a92c1c`                |
| Future destination accent     | `--destination-accent` | Defaults to `--primary`  |
| Core radius                   | `--radius`             | `3px`                    |
| Spacing unit                  | `--space-unit`         | `4px`                    |
| Page gutter                   | `--page-gutter`        | `clamp(24px, 5vw, 80px)` |
| Control transitions           | `--motion-quick`       | `160ms ease`             |
| Image/menu transitions        | `--motion-slow`        | `280ms ease`             |

Color alone never communicates selection. Active navigation also has an underline;
preview-state links expose `aria-current`; destination anchor targets get an outline.

## Typography and spacing

- Manrope Variable is self-hosted through Fontsource, with system fallbacks and
  `font-display: swap`. One family keeps the visual voice consistent and avoids
  fetching multiple typefaces. Font weights vary between supporting copy and
  expressive headings.
- The landing display scales from roughly 42 to 96 pixels. Page headings and
  section headings step down from that scale. Trip titles remain distinct from
  the dates below them.
- Functional body copy and dates use 14 pixels, with generous line height.
  Secondary metadata uses 12 pixels. Small tracked uppercase captions are reserved
  for short labels and never carry the primary trip information.
- Large headings use tight tracking; body text keeps normal tracking. Paragraph
  lengths are constrained instead of stretching across the desktop canvas.
- A 4-pixel spacing rhythm guides gutters, sections, and controls, with small
  optical adjustments around type. Desktop sections breathe; mobile layouts
  collapse into a single reading order. The opening carousel changes one
  destination at a time without introducing sideways page scrolling.

## Patterns and composition

- **Separation:** use whitespace and grouping instead of decorative divider lines.
  Section boundaries, footer, menu items, and collection labels do not use rules.
- **Navigation:** a transparent header overlays the landing photograph, with
  no full-width dimming layer. The night photograph of Greece uses cream navigation
  text and a subtle text shadow; Tokyo and Iceland use espresso. Only header ink
  changes, not the image or overall theme. The wordmark and desktop links
  share a left-aligned row, with a full-label underline for the active page and a
  small preview label on the right. Sticky positioning keeps the header at the
  top while scrolling. It stays fully transparent, without a backdrop blur,
  at every scroll position. Greece's navigation switches to espresso as the
  header reaches the peach fade; the switch accounts for the different phone
  and desktop fades and updates on resize. At the
  landing opening, a negative bottom margin preserves the photograph's overlap;
  trip routes keep the header's normal layout space. A shared responsive height
  also offsets anchor scrolling so linked destinations clear the header.
  A Radix Dialog menu on
  phones handles focus trapping,
  Escape, and returning focus to its trigger. There are no unfinished profile,
  authentication, or trip-creation controls.
- **Buttons:** the shadcn composition pattern supports native buttons or links via
  `asChild`. Primary, outline, and ghost treatments share tokens and focus rules.
  A Badge is used selectively for preview labels.
- **Landing:** a manual carousel featuring Japan, Greece, and Iceland. Each slide
  has a location, country, short factual description, and one direct link to its
  sample trip. Country labels double as segmented slide selectors; previous/next
  controls wrap, and horizontal touch swipes change slides. The upper photograph
  retains its original brightness, with no side scrim or color filter. A bottom
  desktop fade begins at 28% of the photograph and ends in peach; espresso text sits
  within that fade. Phone fades begin at 18% to keep descriptions
  readable within a narrower crop. Desktop photography fills the width at roughly 2:1, bounded to
  680–960 pixels in height. Phone height stays at 560 pixels.
  Responsive crops keep landmarks in view. There is no carousel dependency.
  There is no introductory filler block between those sections.
  The next section uses a simple Destinations heading and an interactive photo
  globe instead of three staggered cards and promotional copy.
- **Trips:** the nearest sample departure receives a large cover; two secondary
  trips use compact compositions. On phones, all three become readable vertical
  articles. Cards are read-only and have no misleading action affordances.
- **Destinations:** React Bits' Infinite Menu repeats the three sample photos
  around a draggable sphere. Autoplay, intro spinning, grayscale, and dimming are
  disabled. A thin one-pixel border marks the interactive photo area.
  The renderer uses its light setting to suit the peach canvas.
  Location, selected destination, and a sample-trip link sit below it
  on the canvas surface. Native destination buttons offer direct selection;
  the focused globe supports arrow keys and Enter. Only a short drag hint is
  shown. Reduced motion or unavailable/lost WebGL uses a still image picker with
  the same controls and links. The renderer loads near the viewport and stops
  rendering while offscreen. The selected trip's anchor highlight explains the
  transition to the sample collection.
- **Empty collection:** a real route state with a photograph, a short invitation,
  and working links to sample trips and destination inspiration. It does not
  pretend that creating a trip is implemented.
- **Loading:** reserved cover/text shapes, an accessible status, and a gentle
  opacity pulse. The same component serves the Next.js route fallback and the
  explicitly labeled loading preview. No artificial latency was added.

## Motion and accessibility

- Controls have immediate hover, pressed, selected, and focus feedback. Motion is
  short and tied to an interaction; there is no parallax, autoplay, or page-entry
  animation. Carousel images crossfade over 480 milliseconds after manual input.
  Reduced motion switches them immediately. Native buttons keep keyboard focus
  when activated, selected countries expose `aria-pressed`, and a polite live
  region announces the selected destination. Inactive images are hidden from
  assistive technology. Vertical touch gestures retain normal page scrolling.
- Hover image enlargement is limited to fine pointers. Essential information is
  always visible without hovering.
- `prefers-reduced-motion: reduce` removes animation, transitions, image movement,
  and smooth scrolling. Next.js is told about smooth scrolling so route changes
  can manage their scroll behavior correctly.
- Main navigation, menu controls, primary actions, and mobile preview controls
  provide targets of at least 44 pixels. Keyboard focus has a visible 2-pixel
  outline with separation from the control.
- The skip link targets the focusable main landmark. Headings preserve hierarchy;
  images have descriptions and decorative icons are hidden from assistive tech.
- Trip details sit on opaque surfaces. Normal and muted text retain strong
  contrast; hero descriptions sit within the bottom fade. Automated checks supplement
  visual review and keyboard tests, rather than proving full accessibility.

## Destination adaptation

The token boundary is prepared through semantic roles and a destination accent.
Photography already changes the atmosphere between the city, sea, and landscape
cards. Future curated destination themes can override a limited accent/cover
layer without changing navigation, text contrast, or interaction behavior.

There is no theme engine, automatic image-based palette extraction, or destination
theme switcher in Phase 1.
