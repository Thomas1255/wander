# Visual asset sources

The three destination photographs are stored locally in `public/images/`, so the
application and automated tests do not depend on a remote image host at runtime.
These are manually selected assets, not a live places or image API integration.

| Asset           | Photographer    | Original source                                                                                                          |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `santorini.jpg` | Jonas (@jonasw) | [Oia at night](https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-Y4Tn1J25qVA)                                |
| `tokyo.jpg`     | Louie Martinez  | [Tokyo Tower at dusk](https://unsplash.com/photos/tokyo-tower-illuminated-at-dusk-with-city-skyline-IocJwyqRv3M)         |
| `iceland.jpg`   | Ben Eaton       | [Moody waterfall in Iceland](https://unsplash.com/photos/waterfalls-under-white-and-gray-sky-during-daytime-BGiBzTZVewM) |

Each source page identifies the image as free to use under the
[Unsplash License](https://unsplash.com/license), checked during Phase 1. The
application footer links to each photographer's source image. Photos were
downloaded as resized JPEGs and are cropped/scrimmed in the interface; Next.js
serves responsive optimized versions. Do not treat the photos as project-owned
work or redistribute them as a competing photo collection.

Manrope Variable is supplied by `@fontsource-variable/manrope` under the SIL Open
Font License 1.1. Its license and copyright notice are included at
`public/licenses/manrope-OFL.txt`. The upstream font project is
[Manrope](https://github.com/sharanda/manrope).

Lucide icons are supplied by the installed `lucide-react` package under its ISC
license. The small Wander favicon is an original SVG letterform in this repo.

## Reproducible photo sources

- Santorini: `https://images.unsplash.com/photo-1683836145612-c5f827737bca?fm=jpg&fit=crop&q=85&w=2000`
- Tokyo: `https://images.unsplash.com/photo-1513407030348-c983a97b98d8?fm=jpg&fit=crop&q=85&w=1400`
- Iceland: `https://images.unsplash.com/photo-1570290887796-27624be22a60?fm=jpg&fit=crop&q=85&w=1400`
