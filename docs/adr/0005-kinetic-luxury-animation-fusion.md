# 0005. Kinetic Luxury Animation Fusion (Norrly, GetLayers AI, AnimMaster Lib)

## Status

Accepted

## Context

Following an architecture and motion review referencing three industry-leading design platforms:
1. **AnimMaster Lib** (`animmasterlib.dev`): Kinetic typography, rotating role badges, and luminous CTA buttons with conic border beams (`btn--shine`).
2. **GetLayers AI** (`getlayers.ai`): Organic cyan/electric-blue ambient mesh glow backdrops, 3D card elevation cascades, and specular glare bevels.
3. **Norrly** (`norrly.io`): Interactive cursor-bound lens unmasking (`clip-path: circle()`) and telemetry ring indicators.

Alternatives considered:
1. **Full 3D WebGL / Three.js / Shader Canvas**: Highly cinematic, but introduces >600KB bundle overhead, degrades mobile responsiveness, and incurs significant GPU battery drain.
2. **Selective Static Polish**: Minimal CSS tweaks without interactive tactile depth.
3. **Tactile Luxury & Micro-Interactions Hybrid (Chosen)**: Hardware-accelerated CSS GPU transforms (`transform-gpu`, `will-change`, CSS `clip-path`) and Framer Motion spring physics, maintaining a strict 60–120fps budget while providing responsive mobile touch fallbacks.

## Decision

Integrate a unified animation layer across the portfolio:

1. **The Lens Stage (`LensStage.tsx`)**:
   - Deployed on the **Interactive Showcase Frame** (`MobileMockup.tsx`) and **Project Cards** (`ProjectCard.tsx`).
   - Tracks desktop cursor position smoothly, projecting a circular reveal mask that renders the underlying Flutter BLoC state stream, widget hierarchy blueprint, and engineering telemetry.
   - Includes a high-precision lens ring crosshair and active telemetry metadata pill.
   - Automatically disabled on touch screens in favor of standard tactile scroll reveals.

2. **Fluid Ambient Mesh & Specular Border Beams**:
   - Replaces flat card backdrops with multi-layer breathing cyan/sky/blue ambient gradients.
   - Integrates dynamic conic border beams (`btn--shine` / `border-beam`) on key interactive cards and CTAs.

3. **Kinetic UI Suite**:
   - **Shimmer Text**: Metallic light sweep across editorial headings (`MOBILE & APP`, `FLUTTER DEV`).
   - **Rotating Role Badge**: Dynamic flip-word pill in the Hero section (`Mobile Systems Architect` ➔ `Flutter Engineer` ➔ `Dart Specialist`).
   - **Luminous Action Buttons**: Conic border beam glow and magnetic spring physics on primary CTAs.

4. **Intelligent Touch & Accessibility Fallbacks**:
   - Fully honors `prefers-reduced-motion` media queries.
   - Desktop viewports receive interactive cursor lens & 3D tilt. Touch/mobile viewports switch seamlessly to scroll-triggered ambient glows without obstructing fingers.
