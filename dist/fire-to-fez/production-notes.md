# Fire to Fez

Status: Runway generation submitted; output must be reviewed before delivery.
Task: e932df19-e2a5-4fd0-9bc8-fe7d56c18f6d
Target: 20 seconds, four adjacent landscape TVs, left-to-right action.
The generated source uses a central 64:9 composition inside a 21:9 frame. Verify framing before cropping. Cropped delivery is upscaled, not native 1080p per screen. Final logo overlay and screen exports remain pending.

## Generation prompt

Animate the supplied FIRE TO FEZ storyboard into ONE continuous 20 second premium photoreal 3D CGI food commercial for a four-TV horizontal video wall. Reference is a storyboard: its four ROWS represent successive TIMES, never show the storyboard itself, labels, panels, borders or repeated images. CRITICAL DELIVERY COMPOSITION: static very wide camera, ALL action confined to a central horizontal strip occupying the middle 32.8 percent of the 21:9 frame height (y=33.6% to 66.4%). Top and bottom outside that strip are PURE BLACK LETTERBOX. Active scene aspect is 64:9, seven times wider than tall. Keep whole objects inside this strip, scaled appropriately. This strip will be cropped and divided into four equal adjacent screens. Use all the strip's width with continuous LEFT TO RIGHT movement. No camera tracking, no cuts, no zooming to fill the outer frame.
0-3 seconds: from black, a hot narrow streak of fire travels from far left to far right across smoke, illuminating the full panoramic strip with gold light.
3-7 seconds: a vertical roasted chicken shawarma spit materializes at x=12% within left quarter, fully contained in strip height. A blade carves succulent golden chicken slices, which fly in slow motion rightward through x=30%-50% trailing sparks and steam. Spit fades as attention travels right.
7-12 seconds: thin toasted round saj bread unfurls in the air near x=48%, catching chicken and pickle slivers. A ribbon of white garlic sauce spirals into it near x=60%. Bread folds and rolls into an appetizing thin saj shawarma sandwich while moving toward x=75%. Complex physically convincing food transformation, no thick pita or burrito, no random vegetables.
12-17 seconds: finished toasted saj travels into rightmost quarter x=80%-94%, rotating and splitting diagonally to expose juicy roasted chicken, pickles, garlic sauce; lands on glossy black surface. Broad golden ember wave sweeps left to right across entire strip.
17-19 seconds: hold sandwich hero completely inside rightmost quarter. Keep space at x=94% for a separately composited brand badge; DO NOT GENERATE ANY TEXT OR LOGO. Other quarters retain cinematic smoke and falling embers, not duplicates.
19-20 seconds fade all to black. Rich amber, crimson flame accents, detailed food texture, dramatic studio rim lighting, realistic volumetric smoke. No sound. No typography, lettering, graphic frame or collage. One temporally animated ultra panoramic scene following successive storyboard rows.

## Reviewed source and first composite

The generation finished at 2206 × 946, 24 fps, about 20 seconds. It did not honor the requested central 64:9 framing and included some storyboard guides and a readable generated MR. FEZ badge. The first delivery therefore preserves the food's proportions in a feathered moving scene on a 3840 × 540 canvas, with the existing flame-band asset underneath. This is a composited adaptation, not a native 64:9 render or an exact realization of every storyboard beat. A late vertical guide is removed with FFmpeg delogo; upper/lower borders are cropped away. The generated final badge is retained rather than duplicated. Device-clock synchronization remains approximate when played through separate browsers.

The export script creates one 30 fps master and four 960 × 540 quarter-frame videos. Source footage is resampled, not native full HD per TV. No additional Runway jobs were submitted after the master.

## Logo study

Built-in image generation also produced logo-overlay.png, a cleaned interpretation of the supplied photo. It is saved for future use; it is not added over the badge already present in this first composite.

Prompt: Create a clean faithful flat logo asset from this Mr. Fez reference photograph. Isolate and straighten the round yellow badge; deep red fez hat with black tassel above exact bold black text 'MR. FEZ'. Preserve the recognizable reference hat shape and lettering. Remove wall, photograph perspective, textile texture, lighting, shadows. Crisp solid colors and smooth edges, true transparent background outside the circular yellow badge. Centered entire badge, generous transparent margin. This is a production overlay for a restaurant animation, no new slogan, no redesign, no 3D effects.
