# Mr. Fez Ottawa · Menu boards

**[Open the live menu site](https://omar-khattab-01.github.io/mr-fez-menu-boards/)**

Four-screen menu prototype populated from four owner-supplied menu photographs: 24 products, original prices, variants, descriptions, combo charges and family-meal wording. Donair Wrap starts unavailable because the photo carries a handwritten notice.

- [Full extraction, original screen hierarchy and uncertainties](dist/extraction.md)
- [Structured seed data](dist/data/menu.json)
- [Assets needed](dist/assets-needed.md)

## Run locally

Requires Python 3; no package installation or build step:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. The menu studio has board previews, an editor, configurable physical screen mapping, source notes, and JSON import/export. A screen-only view is available at `?screen=1` through `?screen=4`, where the number represents the configured physical position. The Full screen button shows the current session's edited board.

## Editing and persistence

This is an initial static prototype hosted on GitHub Pages. Edits apply to memory in the current browser tab. Export to save, and Import to restore. There is no authenticated backend or live multi-device synchronization. The interface states this explicitly.

To update the hosted starting menu, replace `dist/data/menu.json` with a reviewed export, commit, and push to `main`. GitHub Actions publishes the `dist` folder. New loads receive the updated seed. Open TV pages must reload to receive a newly published version.

Common product fields have a form. The complete structured-data editor also exposes sizes, options, add-ons, promotions, screen configuration and assets. Prices are numeric; unknown values are `null`. Source metadata and development notes should be retained when editing.

## Initial screen mapping

| TV | Reference | Content |
|---|---|---|
| 1, left | IMG_0490.HEIC | Wraps and sandwiches |
| 2 | IMG_0491.HEIC | Platters, salad and bowl |
| 3 | IMG_0492.HEIC | Poutines, Cig Kofte and sides |
| 4, right | IMG_0493.HEIC | Family meals |

Sequence is inferred from visible neighboring boards. Exact device identities remain unconfirmed. Each logical board has a stable ID and independently configurable physical position.

## Assets needed

See [the production asset checklist](dist/assets-needed.md). The site uses temporary text branding and photo spaces. It does not serve the restaurant photographs as backgrounds or reuse poor screenshot crops. The original HEICs and local inspection JPEGs are not committed.

## Scope and production follow-up

Confirm flagged wording, combo contents, Donair availability, official fonts/colours, and source images. Add shared persistent storage, authenticated administration and device synchronization in a future functional production phase. GitHub Pages currently supplies a reviewable static prototype, not a production restaurant control system.
