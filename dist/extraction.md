# Mr. Fez menu extraction

Primary references: IMG_0490.HEIC, IMG_0491.HEIC, IMG_0492.HEIC, IMG_0493.HEIC supplied by the owner. Original files were read only. JPEG conversions are local inspection aids outside this repository; photographs are not site backgrounds or production assets.

24 products, 34 base/variant price entries and five combo surcharges were transcribed. No new products, guessed prices, inferred combo contents, or computed family bundles were added. Dollar amounts below are as photographed. CAD is inferred from the Ottawa project context; tax treatment is unknown.

## Physical mapping and original hierarchy

| Initial TV | Source | Original grouping and placement |
|---|---|---|
| 1 (left) | IMG_0490.HEIC | Five vertical columns, left to right: Classic Shawarma, Donair Wrap, Falafel Wrap, Istanbul Basha, Francesco Sub. Each has a heading, base price, food photo, COMBO! +5.99, then description. Donair carries a handwritten NOT AVAILABLE note. |
| 2 | IMG_0491.HEIC | Two columns, three rows. Top: Classic Platter / Mr Fez Platter. Middle: Arabic Platter / Shawarma Salad. Bottom: Falafel Platter / Power Bowl. Rounded horizontal red/white cards on charcoal; product photos overlap cards. |
| 3 | IMG_0492.HEIC | Five columns, two rows. Top: Dynamite Fries / Classic Poutine / Francesco Poutine / Shawarma Poutine / Cig Kofte. Bottom: Side Rice / Side Potatoes / Side Salad / Side Fries / Side Garlic. Food photo, heading, then two price rows separated by a rule. |
| 4 (right) | IMG_0493.HEIC | Arabic Family Meal at upper left; Rice Family Platter at lower left; Mr. Fez Family at middle right. OUR FEZ FAMILY MEALS at upper right with fez mark. ORDER FOR 4, 8 OR MORE! at middle left. Instagram handle at lower right. |

Order is supported by matching neighboring board fragments in successive photographs, rather than filenames alone. Hardware IDs are unknown. `screens[].physicalPosition` is configurable, while `screenId` identifies the logical content board. Product `sortOrder` uses row-major order on TVs 2–3. Category names are organizational labels inferred for the app, not transcribed category banners.

## TV 1 — Wraps & sandwiches

| Product | Price / size | Description as read |
|---|---|---|
| Classic Shawarma | $11.99; COMBO! +$5.99 | Juicy grilled chicken, pickles, and garlic sauce wrapped to perfection. |
| Donair Wrap | $10.99; COMBO! +$5.99; NOT AVAILABLE | Tender spiced beef, fresh veggies, and sweet garlic sauce in a grilled pita. |
| Falafel Wrap | $9.99; COMBO! +$5.99 | Crispy falafel, fresh veggies, and tahini in a warm pita. |
| Istanbul Basha | $14.99; COMBO! +$5.99 | Turkish style shawarma with doner ka bread |
| Francesco Sub | $14.99; COMBO! +$5.99 | Grilled chicken, melted cheese, and sautéed peppers in a toasted sub. |

## TV 2 — Platters & bowls

| Product | Price / size | Description as read |
|---|---|---|
| Classic Platter | $18.50 | Grilled chicken or beef, rice, salad, garlic potatoes & a drink. |
| Mr Fez Platter | $18.99 | Three stuffed pockets with chicken, beef & cheesy chicken. |
| Arabic Platter | $19.50 | XL wrap pieces with two sides & a drink. |
| Shawarma Salad | $13.99 | Fresh salad topped with chicken or beef shawarma. |
| Falafel Platter | $15.50 | Falafel, rice, salad, potatoes & a drink. |
| Power Bowl | $13.99 | Rice bowl with your choice of toppings & shawarma. |

## TV 3 — Poutines & sides

| Product | Price / size | Description as read |
|---|---|---|
| Dynamite Fries | Regular $11.99; Large $14.99 | No description shown. |
| Classic Poutine | Regular $8.99; Large $10.99 | No description shown. |
| Francesco Poutine | Regular $12.99; Large $16.99 | No description shown. |
| Shawarma Poutine | Regular $11.99; Large $15.99 | No description shown. |
| Cig Kofte | Regular $7.99; Combo $13.99 | No description shown. |
| Side Rice | Regular $5.50; Large $9.50 | No description shown. |
| Side Potatoes | Regular $5.50; Large $9.50 | No description shown. |
| Side Salad | Regular $5.50; Large $9.50 | No description shown. |
| Side Fries | Regular $5.50; Large $9.50 | No description shown. |
| Side Garlic | Regular $0.99; Large $4.50 | No description shown. |

## TV 4 — Family meals

| Product | Price / size | Description as read |
|---|---|---|
| Arabic Family Meal | $75.00 | 4 XL SAJ WRAPS CUT IN PIECES FOR YOUR PARTY OR FEAST. COMES WITH FRIES, SALAD, AND 4 DRINKS |
| Mr. Fez Family | $69.99 | 12 POCKETS (4 CHICKEN, 4 BEEF, 4 CHEESY CHICKEN) COMES WITH FRIES, SALAD AND 4 DRINKS |
| Rice Family Platter | $64.99 | RICE FAMILY PLATTER FOR 4, INCLUDE GARLIC POTATO, SALAD AND DRINKS |

## Promotional wording

- TV 4: OUR FEZ FAMILY MEALS
- TV 4: ORDER FOR 4, 8 OR MORE!
- TV 4: mr.fez__canada
- TV 1: COMBO! +5.99 appears separately on each of five product columns.

## Uncertainties and development notes

- **combo-contents**: TV 1 shows COMBO! +5.99 for all five products. Contents are not stated. Do not assume fries, a drink, or a size.
- **donair-status**: Donair Wrap has a handwritten NOT AVAILABLE note. Seed available=false; confirm before restoring availability.
- **istanbul-wording**: Istanbul Basha description appears to say “Turkish style shawarma with doner ka bread”. Retained literally; the bread wording needs confirmation rather than correction.
- **cig-kofte-combo**: Cig Kofte has Regular $7.99 and Combo $13.99. Combo is a total price, not a +$13.99 surcharge. Contents are not stated.
- **unknown-options**: No standalone priced add-ons are shown. Side Garlic is a side product. Protein choices are stated for Classic Platter and Shawarma Salad; modifiers and price differences are not specified. Power Bowl toppings, Arabic Platter side choices, and drink types/sizes are unspecified.
- **family-servings**: ORDER FOR 4, 8 OR MORE! is promotional copy, not evidence of an 8-person price. Rice Family Platter explicitly serves 4; no drink count is specified for it.
- **currency-tax**: Photos use $. CAD is an application assumption based on Ottawa. Tax inclusion is not stated; no tax claim or calculated tax is seeded.
- **mapping**: TV order is inferred with high confidence from neighboring board fragments: 0490 → 0491 → 0492 → 0493. Exact device identities and final physical numbering are unconfirmed.
- **brand-colour**: TV 1 has a strong blue cast in photographed pale panels and lettering. Use red/white/charcoal consistently based on TVs 2–4; exact brand colour values need source artwork.
- **social**: Instagram handle appears as mr.fez__canada (two underscores). Verify the separator against the official account before making it a link.
- **categories**: Category labels are inferred for admin organization; the original boards largely use individual product headings. Names preserve the source spelling Francesco and Cig Kofte.

## Branding and initial presentation

- Main palette: vivid red, white, near-black/charcoal. Exact colour values cannot be sampled reliably from photographed screens because of glare and white balance. The prototype values are approximations.
- Headings and prices: very bold, tall condensed uppercase sans serif, some with a distressed texture. Descriptions: rounded geometric sans serif. Exact font names are unknown. Prototype uses a system condensed heading stack and standard sans serif body, without claiming an official brand font.
- Original patterns: alternating red and pale columns on TV 1; rounded red/white cards on TV 2 and 4; dark textured field and repeated price rows on TV 3. Large isolated food cutouts anchor each product.
- Mr. Fez name is supplied by the project and appears in product titles. A fez symbol appears on TV 4 and within the TV 2 title. No clean reusable logo is available; the prototype uses a temporary text wordmark.
- Initial recreation preserves logical groupings, colour contrast, uppercase titles and prominent pricing. It regularizes spacing and aligns prices. Family items are presented as three cards, preserving co-location rather than the exact original irregular composition.
- No food photo crops from screenshots are used. Photo placeholders and an asset manifest identify replacements. No standalone drink products, add-on prices, volume/weight sizes, or unsupported promotional claims were introduced.

## Data and editing

`data/menu.json` is the single seed source. Text, pricing, variants, combo charges, availability, visibility, category, ordering, assets, promotional text and screen placement are separate from HTML/CSS. `null` means unknown or not applicable, never zero. `source` and `noteIds` retain provenance. `options` records explicit protein choices without inventing price differences. `addOns` is empty because none are explicitly priced in the photos.

The GitHub Pages prototype edits an in-memory menu. Export/import preserves a working copy. Publish a revised seed JSON through GitHub to change what fresh visitors/TVs load. There is no server, login, shared admin storage, or live menu-data synchronization in this prototype; decorative animations now follow a shared UTC schedule (see sync-setup.md). Do not treat browser-session edits as restaurant-wide updates.
