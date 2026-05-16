# Design Notes — see.design
> Source: https://onepagelove.com/backups?file=2025-03-17-seedesign | Companion to DESIGN.md

## Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Outfit:wght@500;600;700;800&family=Pixelify+Sans:wght@700&display=swap" rel="stylesheet">
```
Use Outfit for display and premium section titles, Inter for UI/body copy, and Pixelify Sans only for short highlighted words inside a heading.

## Fluid Type & Spacing Scale
- Viewport range: **375px -> 1280px**.
- Type scale: `headline-lg 46px -> 65px`, `headline-md 34px -> 48px`, `headline-sm 22px -> 32px`, `body-lg 20px -> 24px`, `body-md 15px -> 16px`, `body-sm 13px -> 14px`, `label-lg 18px -> 20px`, `label-md 14px -> 15px`, `label-sm 12px -> 13px`, `caption 10px -> 11px`.
- Section spacing: `lg 32px -> 48px`, `xl 48px -> 80px`. Keep `xs/sm/md` fixed for component consistency.
- Mobile values were **estimated** from the preserved backup because explicit mobile font tokens were not reliably observable in the archived Framer output. Ratios used: large headings about `0.70x` desktop, body copy about `0.88x`, labels/captions about `0.90x`.

## Shadows & Elevation
- The design is mostly **flat/tonal** rather than shadow-driven.
- Primary depth cue: dark-on-dark layering with border contrast and occasional blur.
- Quote form panel: `background-color: #00000080`, `border: 1px solid rgba(255,255,255,0.1)`, `backdrop-filter: blur(2px)`, `border-radius: 24px`.
- Inputs rely on border and fill contrast, not shadow; use minimal or no drop shadow elsewhere.

## Borders
- Secondary CTA: `1px solid rgba(255,255,255,0.2)` with `24px` radius on a transparent background.
- Inputs: `1px solid rgba(255,255,255,0.1)` with `31px` radius, dark fill `rgba(255,255,255,0.03)`.
- Focus state on inputs: `1px solid #0099FF`; keep the shape unchanged and avoid thick glowing rings.
- For most other cards, prefer no visible border unless the panel needs separation from a black background.

## Motion & Transitions
- The archive exposes very little authored motion beyond Framer defaults; treat motion as subtle and utility-first.
- Recommended interaction recipe: `transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease`.
- Keep hover motion light: opacity lift, slight color brightening, or a very small translate/scale shift only.
- Avoid springy or playful motion; the page personality comes from typography and color, not animation.

## Dark Mode
- No alternate dark-mode token set was observed; the captured site already uses a dark-first visual system.
- A `prefers-color-scheme` hint only appeared around favicon handling, not UI token swapping.
- Treat this as **no separate dark mode observed**.

## Responsive Breakpoints
- Observed primary layout breakpoint: **809px / 810px**, likely the Framer mobile/desktop split.
- Additional library-level breakpoints were present at **31em (496px)**, **48em (768px)**, **64em (1024px)**, and **75em (1200px)**.
- The strongest visual shift is from stacked mobile content to multi-column desktop cards, logos, pricing, and work sections.
- Large headlines remain oversized on desktop; on mobile they should scale down but keep the same bold contrast and accent-word treatment.

## Gradient & Background Treatments
- Observed gradients include `linear-gradient(180deg, #00220D 0%, rgb(0,136,52) ...)`, `linear-gradient(119.9239deg, #1C8845 0%, rgba(0,0,0,1) ...)`, and decorative `radial-gradient(134.96% 884.49% at 119.29% 112.58%, #DC43BE 0%, #565ADD 70%)`.
- These gradients are used as supporting artwork and surface treatments, not as the main UI fill for buttons or forms.
- Background strategy is mostly black/near-black with occasional saturated green, yellow, violet, or magenta bursts.

## Interaction States
- Primary submit CTA: solid green `rgb(34,184,91)` with white text and `31px` radius.
- Recommended hover for primary CTA: darken toward `#1C8845` rather than adding extra effects.
- Secondary CTA: keep transparent fill, preserve the white border, and raise text/icon opacity on hover.
- Status text uses green on dark surfaces; disabled states were not clearly observed, so prefer lowered opacity over desaturation.

## Spacing Philosophy
- The page feels roomy at the section level but tidy inside components.
- Repeated working values: `12px`, `24px`, and `32px` inside cards/forms; larger gaps around `48px`, `80px`, and `120px` shape the page rhythm.
- Cards typically use `24px` internal padding, while form controls use `20px` padding and large rounded ends.
- Let big typography create drama; spacing should support that hierarchy without turning cramped.

## Claude Usage Notes
The load-bearing rules are the dark canvas, oversized Outfit headlines, restrained Inter support copy, and sparse Pixelify Sans accents. When generating new UI, keep green for primary action and status, use yellow/violet/magenta as occasional decorative accents, and preserve the soft 24px/31px radius language. The one rule that must never break: **do not turn this into a generic SaaS UI with small headings and default blue buttons**.
