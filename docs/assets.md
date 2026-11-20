# Visual asset sources

The destination photographs and sunset backdrop are stored in `public/images/`, so the
application and automated tests do not depend on a remote image host at runtime.
The destination photos are manually selected, not a live places or image API
integration. The current decorative sky illustration is documented below.

| Asset                    | Photographer    | Original source                                                                                                                |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `santorini.jpg`          | Jonas (@jonasw) | [Oia at night](https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-Y4Tn1J25qVA)                                      |
| `tokyo.jpg`              | Louie Martinez  | [Tokyo Tower at dusk](https://unsplash.com/photos/tokyo-tower-illuminated-at-dusk-with-city-skyline-IocJwyqRv3M)               |
| `iceland.jpg`            | Ben Eaton       | [Moody waterfall in Iceland](https://unsplash.com/photos/waterfalls-under-white-and-gray-sky-during-daytime-BGiBzTZVewM)       |
| `mount-takao-sunset.jpg` | Luke Lawreszuk  | [Sunset over layered mountains with clouds](https://unsplash.com/photos/sunset-over-layered-mountains-with-clouds-_B1RsEPiBKI) |

Each source page identifies the image as free to use under the
[Unsplash License](https://unsplash.com/license), checked during Phase 1. The
application footer links to each active destination photographer's source image. Photos were
downloaded as resized JPEGs and are cropped/scrimmed in the interface; Next.js
serves responsive optimized versions. Do not treat the photos as project-owned
work or redistribute them as a competing photo collection.

The Mount Takao image was an earlier sunset-background prototype. Its source and
free Unsplash license were checked on November 20, 2026. It remains in the asset
inventory for that checkpoint's history; the current page uses the illustration
below and no longer credits Mount Takao as its visible backdrop.

Manrope Variable is supplied by `@fontsource-variable/manrope` under the SIL Open
Font License 1.1. Its license and copyright notice are included at
`public/licenses/manrope-OFL.txt`. The upstream font project is
[Manrope](https://github.com/sharanda/manrope).

Lucide icons are supplied by the installed `lucide-react` package under its ISC
license. The small Wander favicon is an original SVG letterform in this repo.

## React Bits Infinite Menu

The destination sphere adapts the official TypeScript/CSS
[Infinite Menu](https://reactbits.dev/components/infinite-menu) source, matching
the JavaScript source supplied by the owner. It is pinned to React Bits revision
[`d01aa914dcbe76da8b2923ebf872b5c8b1066e4c`](https://github.com/DavidHDev/react-bits/tree/d01aa914dcbe76da8b2923ebf872b5c8b1066e4c/src/ts-default/Components/InfiniteMenu).
The source is kept under `src/components/react-bits/`. David Haz's copyright
notice and the full MIT + Commons Clause license are preserved in
`public/licenses/react-bits.txt`. This is a component integrated into Wander,
not a separate component product. No runtime package was added.

Local changes strengthen tuple/index types for strict TypeScript, add direct
selection and renderer lifecycle callbacks, preserve vertical touch scrolling,
handle lost WebGL, and prevent interpolation of the tile's atlas ID. Wander's
wrapper supplies reduced-motion/no-WebGL fallback, sample links, and controls.

## Reproducible photo sources

- Santorini: `https://images.unsplash.com/photo-1683836145612-c5f827737bca?fm=jpg&fit=crop&q=85&w=2000`
- Tokyo: `https://images.unsplash.com/photo-1513407030348-c983a97b98d8?fm=jpg&fit=crop&q=85&w=1400`
- Iceland: `https://images.unsplash.com/photo-1570290887796-27624be22a60?fm=jpg&fit=crop&q=85&w=1400`
- Mount Takao: `https://images.unsplash.com/photo-1764702435754-f221f6bfbbb2?fm=jpg&fit=crop&q=80&w=1800`

## Decorative dusk illustration

`public/images/fuji-dusk-illustration.webp` is an AI-generated decorative
illustration created on November 20, 2026 with the built-in image generation tool.
The owner's attached design supplied the color, atmosphere, and background
composition reference. It is not a documentary photograph or another destination.
The WebP is 1754 × 897 pixels, approximately 39 KB, converted from the selected
generated output with Sharp. Next.js loads responsive optimized versions lazily.
The illustration stays outside the Infinite Menu's opaque backdrop. No generation
service, credentials, or user-facing AI feature was added to the app.

Generation prompt:

```text
Use case: photorealistic-natural.
Asset type: original decorative background illustration for a travel website, not a UI mockup.
Reference: the owner's supplied Wander design, for background composition and atmosphere only.
Create only its sky and mountain backdrop: deep midnight mineral blue at the top, softly textured blue clouds transitioning through dusty lavender and rose, a glowing pale peach horizon, low hazy layered pink mountain ridges along the bottom edge, and a small snow-capped Mount Fuji silhouette near the far right at the bottom. Most of the image is quiet sky. Keep the mountains within the bottom 15%, with the peak around 86% down. Preserve the photographic editorial atmosphere. Wide landscape, approximately 2:1, high resolution.
Remove all interface, rounded frames, floating travel photographs, Tokyo labels, and buttons; fill those areas naturally with sky. No text, logos, people, buildings, border, or watermark. This is an original decorative illustration based on the reference, not a screenshot or an authentic destination photograph.
```
