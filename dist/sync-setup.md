# Four-TV panoramic animation

Fire to Fez travels left to right across four adjacent TVs. Each player selects its quarter by physical position, independently of which menu board is mapped there. The animation includes the generated fire, food assembly, sandwich, and Mr. Fez reveal, with no separate flat flame background.

## Open the screens

- [Four-TV preview and animation settings](https://omar-khattab-01.github.io/mr-fez-menu-boards/?wall=1)
- [TV 1 — far left](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=1)
- [TV 2](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=2)
- [TV 3](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=3)
- [TV 4 — far right](https://omar-khattab-01.github.io/mr-fez-menu-boards/?screen=4)

Open each link on the corresponding device. Enable automatic date/time on every player, use full-screen mode, disable overscan, and keep the page visible. Use matching 16:9 display areas. The page preserves aspect ratio with letterboxing on other shapes. No player registration or pairing is required.

## Timing

Default schedule: 40 seconds of menu → 20 seconds of panoramic video, repeating every 60 seconds. All four files have 600 frames at 30 fps. Players use the same UTC epoch; late joins and resumed tabs seek to the current shared video time. Each video section is 960 × 540, scaled to fit its TV.

This is **clock-aligned, best-effort synchronization**, not network clock synchronization or frame-locked output. GitHub Pages hosts static files; there is no server coordinating device clocks, device status, or frame presentation. Device clock errors, browser throttling, refresh rates and display latency can produce visible differences. The app cannot verify that your physical TVs are synchronized. For precise alignment across panel seams, a single computer with four display outputs or a synchronized signage system is the next step. Physical bezel compensation is not implemented.

For a small fixed timing difference, add `&offsetMs=100` to advance a player by 100 ms, or `&offsetMs=-100` to delay it. The supported range is -5000 to 5000 ms. Adjust against the adjacent physical TV. Correct an inaccurate system clock before using this trim.

## Controls

The Animation view lets you enable or disable the rotation and set the quiet interval (10–600 seconds). The 20-second video duration matches the exported files. Configuration lives in `animation` in `data/menu.json`; `video.screenSources` lists the four files from left to right. Export and publish to share changes, then refresh all four TVs.

“Preview wall animation” starts a local demonstration. Remote TVs continue following the shared schedule.
`?screen=1&motion=off` shows a static menu on that device. Reduced-motion preferences also suppress effects. Set the same motion preference on all players. `&motion=on` explicitly overrides the device's reduced-motion preference when an operator intentionally wants animation.

## Artwork and scope

The old decorative flame pass is excluded from the published rotation. The new footage is a CGI concept and does not substitute for original menu photography. [Production notes](fire-to-fez/production-notes.md).

Video playback is muted, preloaded, and corrected to the shared timeline when drift exceeds 0.4 seconds. If video playback is blocked, fails, or buffers, the underlying menu remains visible. Browsers and hardware still determine actual decode and display timing.

No live shared menu editing, remote restart, device-health monitoring or authenticated admin service is added by this change. Those capabilities require shared infrastructure beyond GitHub Pages.

## Verification

Automated checks cover quiet intervals, fade boundaries, TV 4→1 traversal, shared coordinates at adjacent screen edges, cycle wrap, late joins, disabled motion, invalid settings and menu-data integrity. A browser preview was attempted but blocked by the browser security-policy check. Physical-TV and visual browser verification remain outstanding.
