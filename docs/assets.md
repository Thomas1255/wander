# Visual asset sources

The destination photographs and sunset backdrop are stored in `public/images/`, so the
application and automated tests do not depend on a remote image host at runtime.
These are manually selected assets, not a live places or image API integration.

| Asset                    | Photographer    | Original source                                                                                                                |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `santorini.jpg`          | Jonas (@jonasw) | [Oia at night](https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-Y4Tn1J25qVA)                                      |
| `tokyo.jpg`              | Louie Martinez  | [Tokyo Tower at dusk](https://unsplash.com/photos/tokyo-tower-illuminated-at-dusk-with-city-skyline-IocJwyqRv3M)               |
| `iceland.jpg`            | Ben Eaton       | [Moody waterfall in Iceland](https://unsplash.com/photos/waterfalls-under-white-and-gray-sky-during-daytime-BGiBzTZVewM)       |
| `mount-takao-sunset.jpg` | Luke Lawreszuk  | [Sunset over layered mountains with clouds](https://unsplash.com/photos/sunset-over-layered-mountains-with-clouds-_B1RsEPiBKI) |

Each source page identifies the image as free to use under the
[Unsplash License](https://unsplash.com/license), checked during Phase 1. The
application footer links to each photographer's source image. Photos were
downloaded as resized JPEGs and are cropped/scrimmed in the interface; Next.js
serves responsive optimized versions. Do not treat the photos as project-owned
work or redistribute them as a competing photo collection.

The Mount Takao image's source and free Unsplash license were checked on November
20, 2026. Its resized 1800-pixel JPEG is a decorative backdrop in the landing
page's sunset transition, softened with a CSS mask and soft-light blending. It is not an
additional destination or a photo that changes with the selected globe tile.
Next.js loads the decorative image lazily and serves responsive optimized sizes;
the CSS color transition remains when images are unavailable.

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
