# Assets needed

Temporary placeholders are used deliberately. Supply original files; do not promote crops from the photographed menu boards to permanent production assets.

| Asset | Required source |
|---|---|
| Mr. Fez logo and fez mark | Official SVG preferred, or large transparent PNG; approved light and dark versions |
| Brand fonts | Font names and licensed WOFF2 files, including condensed headings and rounded body face |
| Brand colours | Official RGB/hex palette |
| Promotional artwork | Original family-meal artwork, if still desired as standalone imagery; all menu text remains editable |
| Drink images | High-resolution images and confirmed drink brands, sizes and combo inclusion before adding |

## Food photography

Supply clean high-resolution photos, ideally with transparent backgrounds, for each asset ID below. Preserve real portion sizes and presentation. Use at least 1200 px on the longest edge, preferably 2000 px for featured family plates. These dimensions are implementation recommendations, not source facts.

- `classic-shawarma` — Classic Shawarma
- `donair-wrap` — Donair Wrap
- `falafel-wrap` — Falafel Wrap
- `istanbul-basha` — Istanbul Basha
- `francesco-sub` — Francesco Sub
- `classic-platter` — Classic Platter
- `mr-fez-platter` — Mr Fez Platter
- `arabic-platter` — Arabic Platter
- `shawarma-salad` — Shawarma Salad
- `falafel-platter` — Falafel Platter
- `power-bowl` — Power Bowl
- `dynamite-fries` — Dynamite Fries
- `classic-poutine` — Classic Poutine
- `francesco-poutine` — Francesco Poutine
- `shawarma-poutine` — Shawarma Poutine
- `cig-kofte` — Cig Kofte
- `side-rice` — Side Rice
- `side-potatoes` — Side Potatoes
- `side-salad` — Side Salad
- `side-fries` — Side Fries
- `side-garlic` — Side Garlic
- `arabic-family-meal` — Arabic Family Meal
- `mr-fez-family` — Mr. Fez Family
- `rice-family-platter` — Rice Family Platter

## Integration

Place licensed production images in `dist/assets/`. Set the matching `assets[].src` in `dist/data/menu.json` to `assets/<filename>` (or an approved HTTPS URL), and set `status` to `ready`. Product records reference assets by `imageAssetId`. The official logo needs integration into the shared board header after it is supplied; current branding is a text placeholder. Avoid embedding prices or product text inside asset images.

## Decorative animation assets now included

`assets/shawarma-fire.png` and `assets/flame-band.png` are generated transparent artwork used only in the cross-screen flame effect. They do not replace any of the menu product photographs listed above. Generation provenance and prompts are in `assets/README.md`.
