---
name: Theeraphat Srimontha Portfolio
description: High-performance mobile systems engineering showcase
colors:
  primary: "#00f0ff"
  accent-sky: "#38bdf8"
  accent-deep: "#0284c7"
  status-emerald: "#10b981"
  bg-void: "#07080c"
  surface-obsidian: "#0d0f17"
  surface-elevated: "#141724"
  text-primary: "#f1f5f9"
  text-secondary: "#cbd5e1"
  text-muted: "#a1a1aa"
  border-hairline: "rgba(255, 255, 255, 0.07)"
typography:
  display:
    fontFamily: "Outfit, IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit, IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.65rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Outfit, IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Outfit, IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg-void}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent-sky}"
    textColor: "{colors.bg-void}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-outline-hover:
    backgroundColor: "rgba(0, 240, 255, 0.04)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  card-editorial:
    backgroundColor: "{colors.surface-obsidian}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
---

# Design System: Theeraphat Srimontha Portfolio

## Overview

**Creative North Star: "The Avionics Instrument Deck"**

The visual language of Theeraphat Srimontha's portfolio functions as an advanced flight deck for high-reliability mobile engineering, organized as a **scroll-led narrative journey**. Rather than treating software as abstract styling, the interface mirrors the precision, predictability, and tactile certainty of avionics instrumentation: deep void-black backgrounds (`#07080c`), layered obsidian glass surfaces (`#0d0f17`/80%), 1px laser-etched borders, and razor-sharp typographic telemetry. Every element conveys intentional control—deterministic states, measured frame budgets, and zero unnecessary visual noise.

Electric Cyan (`#00f0ff`) serves as the operational signal color across the dark expanse, highlighting system vitals, active state channels, and verified metrics. Typography balances geometric authority with technical clarity: bold, monumental display headlines (`Outfit`) paired seamlessly with Thai humanism (`IBM Plex Sans Thai`) and unyielding monospace data streams (`JetBrains Mono`). Micro-interactions—from Lenis smooth scrolling and magnetic buttons to sticky multi-beat mobile simulations with live DevTools—are engineered with custom cubic-bezier easing (`0.16, 1, 0.3, 1`) to deliver a true 60–120 FPS feel.

**Key Characteristics:**

- **Obsidian Dark Void**: Total immersion in deep slate-black surfaces (`#07080c` to `#141724`) that direct immediate focus to project artifacts.
- **Scroll-Led Story Progression**: Continuous narrative journey where technical depth unfolds naturally through scroll-linked sticky runways and live BLoC stream mutations.
- **Laser-Etched Precision**: Restrained 1px borders with subtle linear gradient transitions that outline containers without visual weight.
- **Instrument Telemetry**: Monospace timestamps, sub-millisecond ping metrics, and status pulse indicators that ground claims in living system truth.
- **Tactile Magnetic Interactions**: Fluid pill-shaped controls with subtle cyan glow and smooth hover transitions.

## Colors

The palette is anchored in deep dark-glass layers illuminated by high-voltage cyan accents and living telemetry emeralds.

### Primary

- **Electric Cyan** (`#00f0ff`): The primary operational accent. Used for key callouts, active navigation indicators, metric values, and primary button backgrounds. Signals interactive authority and live system state.

### Secondary

- **Aero Sky** (`#38bdf8`): Transition hover state for primary cyan triggers and gradient highlights.
- **Deep Oceanic** (`#0284c7`): Terminal end of the headline gradient; provides atmospheric depth.

### Tertiary

- **Telemetry Emerald** (`#10b981`): Status heartbeat for real-time telemetry, live system availability, and "Open for Roles" signaling.

### Neutral

- **Void Black** (`#07080c`): Base global canvas background.
- **Obsidian Surface** (`#0d0f17`): Primary card and container fill, rendered with 80% opacity and 20px backdrop blur.
- **Elevated Navy-Black** (`#141724`): Popover, modal, drawer, and nested element background.
- **Starlight White** (`#f1f5f9`): High-contrast primary reading text and active headlines.
- **Slate Gray** (`#cbd5e1`): Secondary narrative copy and supporting metadata.
- **Muted Zinc** (`#a1a1aa`): Unselected tab labels, subtle icons, and tertiary descriptors.
- **Hairline Border** (`rgba(255, 255, 255, 0.07)`): Universal divider and container stroke.

### Named Rules

**The 8% Cyan Rule.** Electric Cyan must never exceed 8% of the surface area on any viewport. Cyan is reserved for signals, active states, and quantified metrics; diluting it across large body backgrounds destroys its operational authority.  
**The Telemetry Heartbeat Rule.** Telemetry Emerald (`#10b981`) is strictly reserved for live, active, or verified real-world indicators (status pulses, online signals). It is never used as decorative text.  
**The Zero-Shift Bilingual Rule.** All text containers supporting dual languages (Thai and English) must apply balanced line-heights, flex alignments, and explicit min-height constraints to eliminate layout shifts when toggling languages.  
**The Sticky Viewport Budget Rule.** Pinned interactive demonstration viewports must never exceed `calc(100vh - 6rem)` to guarantee full visual accessibility across 13" laptop screens up to ultra-wide desktop monitors.

## Typography

**Display Font:** Outfit, with IBM Plex Sans Thai and sans-serif fallback  
**Body Font:** Outfit, with IBM Plex Sans Thai and sans-serif fallback  
**Label/Mono Font:** JetBrains Mono, monospace

**Character:** Technical elegance meets geometric structure. Clean Latin letterforms harmonize naturally with IBM Plex Sans Thai for bilingual recruiter readability, while JetBrains Mono provides surgical engineering accuracy.

### Hierarchy

- **Display** (800 Extrabold, `clamp(2.5rem, 7vw, 6.5rem)`, line-height `0.92`, letter-spacing `-0.035em`): Monumental hero statement and headline anchors.
- **Headline** (700 Bold, `clamp(1.5rem, 4vw, 2.65rem)`, line-height `1.15`, letter-spacing `-0.025em`): Section titles and philosophical declarations.
- **Title** (600 SemiBold, `1.125rem` / `18px`, line-height `1.3`, letter-spacing `-0.015em`): Card titles, project titles, and modal headers.
- **Body** (300 Light to 400 Regular, `1rem` / `16px`, line-height `1.6`, letter-spacing `normal`, max-width `65-75ch`): Narrative descriptions, case study explanations, and career history.
- **Label** (600 SemiBold, `0.75rem` / `12px`, letter-spacing `0.22em`, uppercase): Section eyebrows, system specs, telemetry labels, and code tokens.

### Named Rules

**The Technical Eyebrow Rule.** Every major section begins with an uppercase monospace eyebrow (`01 // SECTION NAME`) rendered in Electric Cyan or muted zinc with `0.22em` tracking.  
**The Dual-Script Baseline Rule.** Thai and Latin typefaces must share proportional leading and word-break rules (`overflow-wrap: break-word`, `word-break: break-word`) to prevent jagged layout shifts when switching languages.

## Layout & Spatial System

The spatial model employs an asymmetric 12-column responsive grid framed within centered containers:

- **Maximum Content Width:** `max-w-5xl` (1024px) for reading sections, navigation, and bento grids; `max-w-6xl` (1152px) for the main application shell; `max-w-7xl` (1280px) for wide telemetry decks and editorial hero headers.
- **Section Spacing Rhythm:** Standard vertical rhythm is `py-16` (64px) on mobile scaling to `py-24` (96px) on desktop viewports.
- **Dividing Boundaries:** Sections are demarcated by `border-b border-white/[0.08]` paired with fading gradient horizontal rules.
- **Grid Background:** Ultra-subtle 56px technical grid lines (`rgba(255, 255, 255, 0.025)`) provide depth behind transparent containers.

## Elevation & Depth

Surfaces rely on glassmorphism and edge reflection rather than deep opaque drop-shadows. Surfaces feel laser-machined from tinted dark quartz.

### Shadow Vocabulary

- **Ambient Cyan Glow** (`0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 30px -10px rgba(0, 240, 255, 0.08)`): Applied on card hover to create a diffused electromagnetic aura.
- **Button Energy Shadow** (`0 4px 20px -4px rgba(0, 240, 255, 0.28)`): Soft, directional glow beneath primary interactive buttons.
- **Dock Elevation** (`0 12px 32px rgba(0, 0, 0, 0.65)`): Deep shadow applied to floating telemetry and chapter indicators.

### Named Rules

**The Glass Before Blur Rule.** Transparent containers must always combine translucent dark backgrounds (`rgba(13, 15, 23, 0.8)` or `#07080c/85` for compact floating pills) with `backdrop-filter: blur(16px–20px)` and a `1px` white border at 6–8% opacity. Blur without border definition is prohibited.  
**The Restrained Luminescence Rule.** Glow effects are strictly reactive: they appear during hover or active states, never idling as high-intensity persistent backgrounds.

## Shapes

- **Interactive Controls:** Rounded pill silhouette (`rounded-full` / `9999px`) for action buttons, filter chips, badge containers, and status pills.
- **Structural Containers:** Smooth rounded rectangle (`rounded-xl` / `12px` to `rounded-2xl` / `16px`) for case study cards, telemetry decks, and modal sheets.
- **Micro Badges:** Subtle `rounded` (4px to 6px) for metric tags, architecture chips, and date markers.

## Components

### Buttons

- **Shape:** Pill silhouette (`rounded-full`, 9999px).
- **Primary:** Background `#00f0ff`, text `#07080c`, font `JetBrains Mono` 600 (`13px`), padding `13px 26px`, uppercase with `0.06em` letter spacing.
- **Hover / Focus:** Shifts background to `#38bdf8`, transforms `translateY(-1px)`, and deepens cyan shadow glow (`0 6px 24px -4px rgba(0, 240, 255, 0.4)`).
- **Outline / Ghost:** Background `transparent`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#f1f5f9`. On hover, border shifts to `rgba(0, 240, 255, 0.4)` and text shifts to `#00f0ff`.

### Cards & Containers

- **Corner Style:** Rounded 12px (`rounded-xl`) or 16px (`rounded-2xl`).
- **Background:** `rgba(13, 15, 23, 0.8)` with `backdrop-blur(20px)`.
- **Border:** `1px solid rgba(255, 255, 255, 0.07)`.
- **Hover Treatment:** Border shifts to `rgba(0, 240, 255, 0.35)` with ambient cyan shadow glow.
- **Internal Padding:** `p-5 sm:p-6` for bento cards; `p-6 sm:p-8` for flagship case study containers.

### Avionics Story Progress Indicator (`StoryProgress`)

- **Desktop (2XL+):** Fixed vertical tracking rail at `fixed left-8 top-1/2 -translate-y-1/2 z-30`. Features vertical connecting rail (`story-progress-line`) and 6 illuminated progress dots (`story-progress-dot`):
  - Inactive state: 6px muted zinc ring.
  - Passed state (`is-passed`): illuminated cyan core.
  - Active state (`is-active`): animated pulsing cyan beacon with halo glow.
  - Telemetry label readout: `01 / 06` chapter index and uppercase monospace title (`INTRO`, `APPROACH`, `SELECTED WORK`, `CAPABILITIES`, `EXPERIENCE`, `CONTACT`).
- **Mobile & Tablet (<2XL):** Minimalist top-right floating pill capsule at `fixed right-4 top-3 z-30` with `bg-[#07080c]/85`, `backdrop-blur-sm`, and border `white/10`, rendering the active chapter index (`02 / 06 / APPROACH`) without obstructing hero typography.

### Hero Eyebrow & Language Control Deck

- **Location:** Header eyebrow row within `Hero.tsx`.
- **Composition:** Combines the developer name badge (`THEERAPHAT SRIMONTHA • OVEN`), engineering pill (`FLUTTER & BLoC`), and instant language toggle button (`toggleLang`).
- **Language Button:** Pill badge with `bg-white/[0.04] hover:bg-white/[0.08]`, border `white/[0.08]`, displaying active language indicator with fixed widths to guarantee zero layout shifts.

### Signature Component: Sticky Scrollytelling Runway & DevTools Dock

- **Sticky Viewport:** High-fidelity smartphone shell pinned at `lg:sticky lg:top-24` on desktop displays.
- **Device Shell:** Laser-beveled smartphone frame with acoustic speaker, dynamic island pill, and simulated mobile OS status bar.
- **Interactive State Switcher:** Tabbed screen toggles swapping between simulated native Flutter screens (NCDs Screening, Pinto Logistics, POS System).
- **Live Event Dock (`LiveEventDock`):** Attached immediately beneath the phone frame, streaming live BLoC events (`tag`, `stateName`, `details`, `latencyMs`) reactively as beats trigger or user clicks buttons inside the simulated app.
- **DevTools Drawer (`DevToolsDrawer`):** Slide-out avionics drawer containing 3 interactive engineering tabs:
  1. _State Stream_: Living event history log with JSON payloads.
  2. _Code Viewer_: Real-world Dart BLoC and Clean Architecture code snippets.
  3. _Widget Tree_: Interactive tree visualization of the Flutter widget hierarchy.
- **The 3-Beat Visual Cadence:** Each case study unfolds across 3 scroll-triggered beat milestones mapped to simulated device screens:
  - **NCDs Risk Screening App**:
    - _Beat 1 (Presentation & Intake)_: `NcdsScreen` vitals validation sliders emit `UpdateVitalsEvent` with zero network latency.
    - _Beat 2 (Deterministic Engine)_: Automated risk calculation engine transitions to `RiskEvaluatedState` and highlights low/moderate/high tier cards.
    - _Beat 3 (Persistence & Infrastructure)_: Encrypted SQLite storage commit and PDF report export dispatch (`EncryptedStoreCommittedState`).
  - **Pinto Logistics Commercial App**:
    - _Beat 1 (Presentation & Intake)_: `PintoScreen` live courier GPS stream and dynamic ETA indicator dispatching `WS_SYNC` events.
    - _Beat 2 (Deterministic Engine)_: Gamified chat streaks interaction with daily flame counter and reward multiplier calculation (`StreakCountState`).
    - _Beat 3 (Persistence & Infrastructure)_: Bidirectional `JavaScriptChannel` bridge token handshake between embedded WebView and Flutter shell (`ProfileApiHandshakeState`).
  - **Enterprise POS & Store Management**:
    - _Beat 1 (Presentation & Intake)_: `PosScreen` sub-millisecond barcode scan, cart mutation, and tax/total calculation (`CartUpdatedState`).
    - _Beat 2 (Deterministic Engine)_: Network disconnection simulation activating local SQLite Write-Ahead Log queue with idempotency keys (`OfflineModeActiveState`).
    - _Beat 3 (Persistence & Infrastructure)_: Direct ESC/POS thermal printer byte stream dispatch and finalized audit trail commit (`ReceiptPrintedState`).

## Do's and Don'ts

### Do:

- **Do** anchor every claim with verified metrics (e.g. `100% Accuracy`, `60-120 FPS`, `3 Consecutive Terms`).
- **Do** wrap code terms, architecture patterns, and technical keywords in monospace styling (`font-mono`).
- **Do** respect `prefers-reduced-motion` across all spring physics, particle systems, and 3D tilts.
- **Do** maintain bilingual typography balance, ensuring line wraps and heights look natural in both Thai and English.
- **Do** synchronize sticky mobile device states with active scroll beats.

### Don't:

- **Don't** use solid high-contrast borders (e.g., solid `#ffffff` or solid `#00f0ff`); borders must remain translucent hairline strokes (`rgba(255, 255, 255, 0.07)`).
- **Don't** flood screen backgrounds with bright or neon fills; background canvas remains strictly obsidian void (`#07080c`).
- **Don't** apply cyan color to long body copy; reserve it exclusively for accents, active states, and key data.
- **Don't** introduce layout shifts when toggling languages or switching between scrollytelling beats.
- **Don't** resurrect obsolete navigation patterns (top floating navbar dock or preloader splash screen) in active components.
