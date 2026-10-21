---
name: Theeraphat Srimontha Portfolio
description: High-performance mobile systems engineering showcase
colors:
  primary: "#4d7cfe"
  signal: "#38d9ff"
  status-emerald: "#10b981"
  bg-void: "#070b14"
  surface: "#0d1424"
  surface-raised: "#131c30"
  text-primary: "#f3f6fc"
  text-secondary: "#b9c3d4"
  text-muted: "#8b97ad"
  border-line: "#26324a"
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
    backgroundColor: "{colors.signal}"
    textColor: "{colors.bg-void}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-outline-hover:
    backgroundColor: "rgba(56, 217, 255, 0.05)"
    textColor: "{colors.signal}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  card-editorial:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
---

# Design System: Theeraphat Srimontha Portfolio

## Overview

**Creative North Star: "The Avionics Instrument Deck"**

The visual language of Theeraphat Srimontha's portfolio functions as an advanced flight deck for high-reliability mobile engineering, organized as a **scroll-led narrative journey**. Rather than treating software as abstract styling, the interface mirrors the precision, predictability, and tactile certainty of avionics instrumentation: deep blue-black backgrounds (`#070b14`), layered midnight surfaces (`#0d1424`/80%), 1px laser-etched borders, and razor-sharp typographic telemetry. Every element conveys intentional control—deterministic states, measured frame budgets, and zero unnecessary visual noise.

Primary Blue (`#4d7cfe`) carries actions and key text, while Electric Cyan (`#38d9ff`) is the signal color for motion and live state across the dark expanse, highlighting system vitals, active state channels, and verified metrics. Typography balances geometric authority with technical clarity: bold, monumental display headlines (`Outfit`) paired seamlessly with Thai humanism (`IBM Plex Sans Thai`) and unyielding monospace data streams (`JetBrains Mono`). Micro-interactions—from Lenis smooth scrolling and magnetic buttons to sticky multi-beat mobile simulations with live DevTools—are engineered with custom cubic-bezier easing (`0.16, 1, 0.3, 1`) to deliver a true 60–120 FPS feel.

**Key Characteristics:**

- **Obsidian Dark Void**: Total immersion in deep slate-black surfaces (`#070b14` to `#131c30`) that direct immediate focus to project artifacts.
- **Scroll-Led Story Progression**: Continuous narrative journey where technical depth unfolds naturally through scroll-linked sticky runways and live BLoC stream mutations.
- **Laser-Etched Precision**: Restrained 1px borders with subtle linear gradient transitions that outline containers without visual weight.
- **Instrument Telemetry**: Monospace timestamps, sub-millisecond ping metrics, and status pulse indicators that ground claims in living system truth.
- **Tactile Magnetic Interactions**: Fluid pill-shaped controls with subtle cyan glow and smooth hover transitions.

## Colors

**Theme: Midnight Circuit.** A blue-black canvas cut with Primary Blue and Electric Cyan. Tokens live in the `@theme` block of `src/index.css` (`void`, `surface`, `surface-raised`, `primary`, `signal`, `ink`, `muted`, `line`); the Tailwind `zinc`, `cyan`, `sky` and `blue` ramps and `white` are re-tuned to the same blue-slate family, so stock utilities inherit the theme.

### Primary

- **Primary Blue** (`#4d7cfe`, `primary`): Primary buttons, links, section eyebrows, key metric values and the hero accent line. Buttons use `void` text on blue (≈5:1).

### Secondary

- **Electric Cyan** (`#38d9ff`, `signal`): Motion and live state only — hover and focus states, pulsing indicators, the active chapter dot, the scroll progress bar and the section-transition trace.

### Tertiary

- **Telemetry Emerald** (`#10b981`): Status heartbeat for live availability and "Open for Roles" signaling.

### Neutral

- **Void** (`#070b14`, `void`): Global canvas.
- **Surface** (`#0d1424`, `surface`): Sections and cards; glass cards use it at 80% with 20px blur.
- **Surface Raised** (`#131c30`): Popovers, modals, drawers, nested elements.
- **Ink** (`#f3f6fc`, `ink`): Headlines and primary text.
- **Secondary Text** (`#b9c3d4`, `zinc-300`): Supporting narrative copy.
- **Muted** (`#8b97ad`, `muted` / `zinc-400`): Descriptions and secondary data.
- **Line** (`#26324a`, `line`): Card borders and section dividers.

### Named Rules

**The 80 / 15 / 5 Rule.** Roughly 80% dark canvas and space, 15% surfaces and gray text, 5% blue and cyan. Accent color that spreads past that loses its pull.
**The Blue Acts, Cyan Moves Rule.** Blue marks what is important or clickable at rest; cyan appears only when something moves, is hovered, or is live. Never set long body copy in either.
**The Reserved Glow Rule.** Glow and gradient belong to the hero accent line, key numbers, and section transitions. Cards and buttons at rest carry no glow.
**The Telemetry Heartbeat Rule.** Emerald (`#10b981`) is reserved for live, active, or verified real-world indicators, never decorative text.
**The Zero-Shift Bilingual Rule.** All text containers supporting Thai and English apply balanced line-heights, flex alignment, and explicit min-heights so toggling languages causes no layout shift.
**The Sticky Viewport Budget Rule.** Pinned demonstration viewports never exceed `calc(100vh - 6rem)`.

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
- **Dividing Boundaries:** Sections are demarcated by `border-b border-line`. As each chapter scrolls out, a single cyan trace runs along its bottom rule (CSS scroll-driven `circuit-trace`, hidden under reduced motion).
- **Grid Background:** Ultra-subtle 56px technical grid lines (`rgba(77, 124, 254, 0.05)`) provide depth behind transparent containers.

## Elevation & Depth

Surfaces rely on glassmorphism and edge reflection rather than deep opaque drop-shadows. Surfaces feel laser-machined from tinted dark quartz.

### Shadow Vocabulary

- **Ambient Cyan Glow** (`0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 12px 30px -12px rgba(56, 217, 255, 0.1)`): Applied on card hover to create a diffused electromagnetic aura.
- **Button Energy Shadow** (`0 4px 20px -4px rgba(77, 124, 254, 0.35)`): Soft, directional glow beneath primary interactive buttons.
- **Dock Elevation** (`0 12px 32px rgba(0, 0, 0, 0.65)`): Deep shadow applied to floating telemetry and chapter indicators.

### Named Rules

**The Glass Before Blur Rule.** Transparent containers must always combine translucent dark backgrounds (`rgba(13, 20, 36, 0.8)` or `void/85` for compact floating pills) with `backdrop-filter: blur(16px–20px)` and a `1px` `line` (`#26324a`) border. Blur without border definition is prohibited.  
**The Restrained Luminescence Rule.** Glow effects are strictly reactive: they appear during hover or active states, never idling as high-intensity persistent backgrounds.

## Shapes

- **Interactive Controls:** Rounded pill silhouette (`rounded-full` / `9999px`) for action buttons, filter chips, badge containers, and status pills.
- **Structural Containers:** Smooth rounded rectangle (`rounded-xl` / `12px` to `rounded-2xl` / `16px`) for case study cards, telemetry decks, and modal sheets.
- **Micro Badges:** Subtle `rounded` (4px to 6px) for metric tags, architecture chips, and date markers.

## Components

### Buttons

- **Shape:** Pill silhouette (`rounded-full`, 9999px).
- **Primary:** Background `#4d7cfe`, text `#070b14`, font `JetBrains Mono` 600 (`13px`), padding `13px 26px`, uppercase with `0.06em` letter spacing.
- **Hover / Focus:** Shifts background to Electric Cyan `#38d9ff`, transforms `translateY(-1px)`, with a cyan shadow (`0 6px 24px -4px rgba(56, 217, 255, 0.4)`).
- **Outline / Ghost:** Background `transparent`, border `1px solid #26324a`, text `#f3f6fc`. On hover, border shifts to `rgba(56, 217, 255, 0.45)` and text shifts to `#38d9ff`.

### Cards & Containers

- **Corner Style:** Rounded 12px (`rounded-xl`) or 16px (`rounded-2xl`).
- **Background:** `rgba(13, 20, 36, 0.8)` with `backdrop-blur(20px)`.
- **Border:** `1px solid #26324a`.
- **Hover Treatment:** Border shifts to `rgba(56, 217, 255, 0.35)` with a soft offset cyan shadow.
- **Internal Padding:** `p-5 sm:p-6` for bento cards; `p-6 sm:p-8` for flagship case study containers.

### Avionics Story Progress Indicator (`StoryProgress`)

- **Desktop (2XL+):** Fixed vertical tracking rail at `fixed left-8 top-1/2 -translate-y-1/2 z-30`. Features vertical connecting rail (`story-progress-line`) and 6 illuminated progress dots (`story-progress-dot`):
  - Inactive state: 6px muted zinc ring.
  - Passed state (`is-passed`): illuminated cyan core.
  - Active state (`is-active`): animated pulsing cyan beacon with halo glow.
  - Telemetry label readout: `01 / 06` chapter index and uppercase monospace title (`INTRO`, `APPROACH`, `SELECTED WORK`, `CAPABILITIES`, `EXPERIENCE`, `CONTACT`).
- **Rail fill:** A `story-progress-fill` line over the rail fills one segment per chapter (dot to dot, with an end cap after the last), so it reads as chapter progress rather than a second whole-page bar.
- **Mobile & Tablet (<2XL):** Floating pill capsule at `fixed bottom-4 right-4 z-30` with `bg-void/90`, `backdrop-blur`, and border `line`, hidden on the intro. It opens the chapter menu and carries a 1px signal line along its bottom that fills with the current chapter's progress.

### Chapter Atmosphere (`Atmosphere`)

- **Layers:** Fixed behind the content: a `surface`-tone lift layer and two 80vmax radial glows (`atmosphere-glow-blue` at 26% Primary Blue, `atmosphere-glow-cyan` at 18% Electric Cyan). The gradients are painted once; only transform and opacity change.
- **Per-chapter looks:** Intro lit from the top right; Approach swings left and lifts the void; Selected Work raises cyan beside the device; Capabilities lights low from the right; Experience dims under the timeline; Contact gathers both lights low and centred. Each look holds through its chapter and blends across the boundary (±0.2 chapter).
- **Restraint:** The lift tops out near `surface` (`#0d1424`), and the glows stay faint enough to keep the 80 / 15 / 5 rule. Reduced motion holds the intro look.

### Chapter Bridge (`ChapterBridge`)

- **Role:** The lead line under each chapter heading after the intro, written to pick up from the chapter before it (copy in `src/data/chapters.ts`).
- **Motion:** Words light from 28% to full opacity as the line scrolls from 95% to its end at 80% of the viewport, so a chapter jump always lands on fully lit text. Thai is segmented with `Intl.Segmenter`; without it the line lights as one piece.
- **Layout:** Both languages share one grid cell like `BilingualStack`; only the visible language is split into word spans.

### Hero Eyebrow & Language Control Deck

- **Location:** Header eyebrow row within `Hero.tsx`.
- **Composition:** Combines the developer name badge (`THEERAPHAT SRIMONTHA • OVEN`), engineering pill (`FLUTTER & BLoC`), and instant language toggle button (`toggleLang`).
- **Language Button:** Pill badge with `bg-white/[0.04] hover:bg-white/[0.08]`, border `white/[0.08]`, displaying active language indicator with fixed widths to guarantee zero layout shifts.

### Signature Component: Sticky Scrollytelling Runway & DevTools Dock

- **Sticky Viewport:** High-fidelity smartphone shell pinned at `sticky top-16` on desktop (`lg+`, motion allowed), scaled down to fit short viewports and drifting ±12px across the runway.
- **Scrub:** `useBeatScrub` maps the beat list to scroll. The HUD above the device carries a three-segment rail that fills continuously; beat cards ease from 55% to full opacity under the reading line (50% of the viewport); the device screen changes only after the reading line clears a beat boundary by 32px. Clicking a beat scrolls to it.
- **Stacked Runway:** Below `lg`, and with reduced motion, nothing pins: the stage text and a 3-step stepper sit above the device. Each step carries a bottom fill that tracks the scroll (reading line at 60%), and the steps advance as the device scrolls past unless motion is reduced.
- **Jump Nav:** The Selected Work header links to each case study (`NCDs Screening`, `Pinto App`, `Retail POS`) in place of a filter, so the page length under the runways never changes.
- **Device Shell:** Laser-beveled smartphone frame with acoustic speaker, dynamic island pill, and simulated mobile OS status bar.
- **Interactive State Switcher:** Tabbed screen toggles swapping between simulated native Flutter screens (NCDs Screening, Pinto Logistics, POS System).
- **Live Event Dock (`LiveEventDock`):** Attached immediately beneath the phone frame, streaming live BLoC events (`tag`, `stateName`, `details`, `latencyMs`) reactively as beats trigger or user clicks buttons inside the simulated app.
- **DevTools Drawer (`DevToolsDrawer`):** Slide-out avionics drawer containing 3 interactive engineering tabs:
  1. _State Stream_: Living event history log with JSON payloads.
  2. _Code Viewer_: Real-world Dart BLoC and Clean Architecture code snippets.
  3. _Widget Tree_: Interactive tree visualization of the Flutter widget hierarchy.
- **The 3-Beat Visual Cadence:** Each case study unfolds across 3 scroll-scrubbed beat milestones mapped to simulated device screens, emitting one stream event per beat change:
  - **NCDs Risk Screening App**:
    - _Beat 1 (Presentation & Intake)_: `NcdsScreen` vitals validation sliders emit `UpdateVitalsEvent` with zero network latency.
    - _Beat 2 (Deterministic Engine)_: Automated risk calculation engine transitions to `RiskEvaluatedState` and highlights low/moderate/high tier cards.
    - _Beat 3 (Persistence & Infrastructure)_: REST API record submission to MySQL and PDF report export dispatch (`RecordSubmittedState`).
  - **Pinto Logistics Commercial App**:
    - _Beat 1 (Presentation & Intake)_: `PintoScreen` hybrid WebView menu inside the native shell (`WebViewMenuLoadedState`).
    - _Beat 2 (Deterministic Engine)_: Gamified chat streaks interaction with daily flame counter and reward multiplier calculation (`StreakCountState`).
    - _Beat 3 (Persistence & Infrastructure)_: Profile API sync of streak points shared across native and WebView screens (`ProfileSyncedState`).
  - **Retail POS Module**:
    - _Beat 1 (Presentation & Intake)_: `PosScreen` cart mutation and tax/total calculation (`CartUpdatedState`).
    - _Beat 2 (Deterministic Engine)_: Network disconnection simulation writing transactions to a local SQLite queue (`OfflineModeActiveState`).
    - _Beat 3 (Persistence & Infrastructure)_: Reconnect replays the queue with idempotency keys (`TransactionsSyncedState`).

## Do's and Don'ts

### Do:

- **Do** anchor every claim with verified metrics (e.g. `100% Accuracy`, `60-120 FPS`, `3 Consecutive Terms`).
- **Do** wrap code terms, architecture patterns, and technical keywords in monospace styling (`font-mono`).
- **Do** respect `prefers-reduced-motion` across all spring physics, particle systems, and 3D tilts.
- **Do** maintain bilingual typography balance, ensuring line wraps and heights look natural in both Thai and English.
- **Do** synchronize sticky mobile device states with active scroll beats.

### Don't:

- **Don't** use solid high-contrast borders (e.g., solid `#ffffff` or solid `#38d9ff`); borders use the `line` token (`#26324a`).
- **Don't** flood screen backgrounds with bright or neon fills; background canvas remains Midnight void (`#070b14`).
- **Don't** apply cyan color to long body copy; reserve it exclusively for accents, active states, and key data.
- **Don't** introduce layout shifts when toggling languages or switching between scrollytelling beats.
- **Don't** resurrect obsolete navigation patterns (top floating navbar dock or preloader splash screen) in active components.
