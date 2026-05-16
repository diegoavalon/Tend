---
version: alpha
name: see.design
description: A bold dark-mode design partner brand that mixes oversized editorial typography with playful pixel accents and bright green/yellow highlights.
colors:
  primary: "#23B85B"
  secondary: "#FFC800"
  tertiary: "#565ADD"
  neutral: "#0B0B09"
  surface: "#010101"
  on-surface: "#FFFFFF"
  accent: "#DC43BE"
typography:
  headline-lg:
    fontFamily: Outfit
    fontSize: 65px
    fontWeight: 800
    lineHeight: 1.35
  headline-md:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.04em
  headline-sm:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.03em
  body-lg:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.02em
  label-lg:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: -0.01em
  label-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.4
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.62
    letterSpacing: 0.03em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: 0.02em
rounded:
  sm: 10px
  md: 24px
  lg: 31px
  full: 9999px
spacing:
  xs: 8px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 20px
  button-primary-hover:
    backgroundColor: "#1C8845"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 20px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 24px
  status-badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 12px
---

## Overview
see.design presents itself as a premium, fast-moving design partner with a dark, high-contrast interface and confident editorial scale. The visual system leans on oversized Outfit headlines, a restrained Inter support layer, and selective Pixelify Sans accents that make highlighted words feel playful rather than nostalgic. The brand tone is polished, direct, and conversion-oriented, with pricing, proof, and booking flows treated as first-class visual moments.

## Colors
The palette is anchored by near-black neutrals for the canvas, with white text carrying most of the interface contrast. Bright green acts as the primary action and success color, most visibly in highlighted hero words, status text, and the solid submit CTA. Yellow is used as a secondary callout accent, while violet and magenta appear in decorative gradients and illustrated background moments rather than core UI chrome.

## Typography
Outfit carries the brand voice: bold, wide, and slightly condensed in feeling once paired with negative tracking on major headlines. Inter is reserved for navigation, labels, bullets, form text, and utility copy where clarity matters more than personality. Pixelify Sans appears as a sparing emphasis font for a single word or syllable inside a headline, so the system should treat it as an accent device rather than a full body or heading family. Font sizes above represent desktop maximums; the implementation theme uses fluid values between mobile and desktop.

## Layout
The page uses generous vertical rhythm, alternating between tight component spacing and roomy section spacing. Cards and panels mostly sit in stacked or multi-column groups with 24px internal padding, while larger sections open up with noticeably larger gaps that give the work and pricing content space to breathe. The preserved Framer snapshot shows a primary responsive split around 809px/810px, with major layout changes happening between compact stacked mobile arrangements and wider multi-column desktop compositions.

## Elevation & Depth
The interface mostly avoids heavy drop shadows and instead creates depth through tonal layering, subtle borders, blur, and saturated illustration backgrounds. The quote form is the clearest elevated surface: a semi-transparent dark panel with a thin white border and light backdrop blur. Other cards feel flatter and rely on contrast, rounded containers, and gradient/image treatments instead of traditional shadow stacks.

## Shapes
The shape language is soft but not bubbly. Repeated 24px and 31px radii give cards, pills, and form controls a friendly premium feel, while a few tighter 10px corners keep smaller utility treatments crisp. Fully rounded pills are used for status and compact emphasis elements.

## Components
Primary actions use a solid green fill with white text and large pill-like corners, reinforcing speed and decisiveness. Secondary actions use transparent dark backgrounds with thin white borders and the same softened corners, especially in the navigation CTA. Inputs are dark, lightly outlined, and spacious, with large radii and white text; cards follow a similar recipe with dark surfaces, roomy padding, and bold headline-led content blocks.

## Do's and Don'ts
- Do use near-black backgrounds with high-contrast white type as the default canvas.
- Do reserve bright green for high-value actions, status cues, and highlighted words.
- Do keep major headlines in Outfit with aggressive scale and occasional negative tracking.
- Do use Pixelify Sans only as a short accent inside a larger headline.
- Do keep cards and controls generously rounded, especially at 24px and above.
- Don't introduce dense shadow systems; use borders, blur, and tonal contrast instead.
- Don't use multiple accent colors at equal weight in the same UI region.
- Don't shrink the typography into a conventional SaaS scale; the brand depends on bold oversized headings.
