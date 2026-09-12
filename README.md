# Mr. Fez Ottawa · Menu boards

**[Open the live menu site](https://omar-khattab-01.github.io/mr-fez-menu-boards/)**

**[Preview the four-TV animation](https://omar-khattab-01.github.io/mr-fez-menu-boards/?wall=1)** — select a film and choose “Preview wall animation” to watch immediately.

[Watch or download the saj shawarma video](https://omar-khattab-01.github.io/mr-fez-menu-boards/assets/saj-shawarma.mp4)

## Four-film animation collection

[Watch all four films and download TV sections](https://omar-khattab-01.github.io/mr-fez-menu-boards/fire-to-fez/) — four 20-second films, moving left to right, with separate downloads for TVs 1–4 on the preview page. Each file contains a different quarter of one master (960 × 540, 30 fps, 600 frames). All four films are used by the live menu rotation. The generated scene was composited onto the panoramic canvas; it is not an exact shot-for-shot realization of the storyboard. [Production notes](dist/fire-to-fez/production-notes.md).

## Direct screen links

- [TV 1 — Wraps & sandwiches](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=1)
- [TV 2 — Platters & bowls](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=2)
- [TV 3 — Poutines & sides](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=3)
- [TV 4 — Family meals](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=4)

These links open the screen-only views. Each physical position plays its corresponding quarter of the current panorama, moving left to right. The labels above reflect the initial menu mapping.

Enable automatic date/time on all players. The rotation is 40 seconds of menu → 20 seconds of animation, with a different film each minute. The order is Fire to Fez → Ember Carving → Saj Orbit → Platter Cascade, repeating every four minutes. The three new films include moving fire along the bottom of the whole wall. Each TV receives a different synchronized video section. The flat background flames and repeated full-frame sandwich clip are no longer in the default rotation. Synchronization follows device clocks and is not frame locked. [Setup and timing adjustment](dist/sync-setup.md).

## About

Four-screen menu prototype populated from four owner-supplied menu photographs: 24 products, original prices, variants, descriptions, combo charges and family-meal wording. Donair Wrap starts unavailable because the photo carries a handwritten notice.

- [Full extraction, original screen hierarchy and uncertainties](dist/extraction.md)
- [Structured seed data](dist/data/menu.json)
- [Assets needed](dist/assets-needed.md)

## Run locally

Requires Python 3; no package installation or build step:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. The menu studio has board previews, per-screen add/edit/delete controls, unavailable-item overlays, configurable physical screen mapping, animation selection, source notes, and JSON import/export. A screen-only view is available at `?screen=1` through `?screen=4`, where the number represents the configured physical position. The Full screen button shows the current session's edited board.

## Editing and persistence

This is an initial static prototype hosted on GitHub Pages. Edits apply to memory in the current browser tab. Export to save, and Import to restore. There is no authenticated backend or live shared admin storage. Decorative effects use the same UTC schedule on each player, with accuracy depending on device clocks. The interface distinguishes animation timing from remote menu editing.

To update the hosted starting menu, replace `dist/data/menu.json` with a reviewed export, commit, and push to `main`. GitHub Actions publishes the `dist` folder. New loads receive the updated seed. Open TV pages must reload to receive a newly published version.

Common product fields have a form. Use **Add item** inside a TV section to create an item on that screen; open an existing item to edit, move, mark unavailable, hide, or delete it. The Animation tab lets you choose which films participate in the rotation. The complete structured-data editor also exposes sizes, options, add-ons, promotions, screen configuration and assets. Prices are numeric; unknown values are `null`. Source metadata and development notes should be retained when editing.

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

Confirm flagged wording, combo contents, Donair availability, official fonts/colours, and source images. Add shared persistent storage, authenticated administration and remote device control in a future production phase. Verify the animation on the physical TVs and use synchronized signage hardware if frame-level alignment is required. GitHub Pages currently supplies a reviewable static prototype, not a production restaurant control system.
