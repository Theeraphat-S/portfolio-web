# 0007. Midnight Circuit: Layered Neutrals

## Status

Accepted

## Context

The user collected five reference sites (Godly, Mobbin, 21st.dev, shadcn/ui, Coolors) as inspiration for a polish pass on the existing "Avionics Instrument Deck" look, and agreed up front to keep that identity, the 80 / 15 / 5 rule and the No Glow rule.

The references did not hand over ready palettes: Coolors' trending page was warm-toned, and the 21st.dev button and card previews were light-themed. So three candidates in the existing blue and cyan family were built and their contrast ratios computed:

1. **A, brighter accents**: raise primary and signal only. Smallest change, but the canvas steps stay 1.07 apart.
2. **B, layered neutrals (chosen)**: slightly lighter surfaces and a firmer line. The canvas steps open to 1.13 (void to surface) and 1.12 (surface to raised) without adding any glow.
3. **C, cooler steel**: lightest accents. Primary starts to wash out against the blue-black.

## Decision

1. **Palette B**: `void #060a12`, `surface #0f192c`, `surface-raised #17233b`, `line #2d3b57`, `muted #94a1b9`, `primary #5a86ff`, `signal #40dcff`. The `zinc`, `cyan`, `sky` and `blue` ramps that alias these tokens moved with them. Primary on void is 5.93:1, muted on surface 6.74:1, line on surface 1.57:1.
2. **Buttons share one system**: `.btn-editorial` gains a `tonal` variant, a `btn-sm` size (44px target kept) and a disabled state. The contact submit, copy-email and project modal footer buttons moved onto it from hand-written class strings.
3. **shadcn/ui is not installed.** Its patterns (variants, card anatomy, form fields with described errors) are written by hand with the existing `clsx` and `tailwind-merge`, so the bundle stays flat and `LazyMotion strict` is untouched. Reconsider Radix only if the modal or drawer shows a real accessibility gap.
4. **Out of scope, left as is**: the Selected Work runway (it is tied to the length budget), skill levels (the live Skills section leaves them out on purpose, in line with `PRODUCT.md`), and the contact form and About cards, which already follow the pattern.

## Consequences

- `Atmosphere` lifts toward `surface`, which is now a little lighter, so each chapter's backdrop ends slightly brighter than before. The order of the chapters is unchanged.
- Checked on the built page: 13.74 viewports at 1440×900 (the budget is 14.6) and equal page height in Thai and English; no horizontal overflow at 375 and 768.
