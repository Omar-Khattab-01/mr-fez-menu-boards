# Four-TV flame animation

The menus remain fixed. A decorative flaming shawarma rotisserie travels from TV 4 on the far right through TV 3 and TV 2 to TV 1 on the far left. Flame bands appear along the top and bottom of the wall, fade out, and leave a quiet reading period. There is no sound or rapid strobe.

## Open the screens

- [Four-TV preview and animation settings](https://omar-khattab-01.github.io/mr-fez-menu-boards/?wall=1)
- [TV 1 — far left](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=1)
- [TV 2](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=2)
- [TV 3](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=3)
- [TV 4 — far right](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=4)

Open each link on the corresponding device. Enable automatic date/time on every player, use full-screen mode, disable overscan, and keep the page visible. Use matching 16:9 display areas. The page preserves aspect ratio with letterboxing on other shapes. No player registration or pairing is required.

## Timing

Default schedule: 40 seconds of unobstructed menu, then a 16-second effect. All players calculate the effect from the same UTC epoch and the current device clock; the schedule does not begin when the page loads. Reloading, joining late, or waking a suspended tab returns to the shared phase on the next frame.

This is **clock-aligned, best-effort synchronization**, not network clock synchronization or frame-locked output. GitHub Pages hosts static files; there is no server coordinating device clocks, device status, or frame presentation. Device clock errors, browser throttling, refresh rates and display latency can produce visible differences. The app cannot verify that your physical TVs are synchronized. For precise alignment across panel seams, a single computer with four display outputs or a synchronized signage system is the next step. Physical bezel compensation is not implemented.

For a small fixed timing difference, add `&offsetMs=100` to advance a player by 100 ms, or `&offsetMs=-100` to delay it. The supported range is -5000 to 5000 ms. Adjust against the adjacent physical TV. Correct an inaccurate system clock before using this trim.

## Controls

The Animation view lets you enable/disable the effect and change the quiet interval (10–600 seconds), travel duration (8–40 seconds), and intensity (10–100%). The complete configuration is stored in `animation` within `data/menu.json`. Export a reviewed menu and publish it to GitHub to update the shared configuration. Reload all four players after the GitHub Pages deployment completes so they use the same version.

“Preview effect now” starts a demonstration only in the current studio tab. It does not send a command to the remote TVs, and returns to the normal shared schedule after the effect finishes. If animation is disabled, enable it before previewing.

`?screen=1&motion=off` shows a static menu on that device. Reduced-motion preferences also suppress effects. Set the same motion preference on all players. `&motion=on` explicitly overrides the device's reduced-motion preference when an operator intentionally wants animation.

## Artwork and scope

The transparent rotisserie and flame band are AI-generated decorative artwork, separate from menu item photos. They do not represent a confirmed Mr. Fez portion or recipe. Original menu food photography is still needed. See `assets/README.md` for generation prompts and file provenance.

No live shared menu editing, remote restart, device-health monitoring or authenticated admin service is added by this change. Those capabilities require shared infrastructure beyond GitHub Pages.

## Verification

Automated checks cover quiet intervals, fade boundaries, TV 4→1 traversal, shared coordinates at adjacent screen edges, cycle wrap, late joins, disabled motion, invalid settings and menu-data integrity. A browser preview was attempted but blocked by the browser security-policy check. Physical-TV and visual browser verification remain outstanding.
