# Portfolio Context

Personal showcase and professional identity platform for Theeraphat Srimontha (Oven), specializing in high-performance Mobile Engineering (Flutter & Dart).

## Language

### Visual & Architecture Concepts

**Story Progress Tracker**:
A fixed vertical avionics chapter tracker (`StoryProgress.tsx`) located on the left flank on 2XL+ screens and as a bottom-right floating capsule on mobile/tablet devices, mapping out the 6 continuous story chapters (`INTRO`, `APPROACH`, `SELECTED WORK`, `CAPABILITIES`, `EXPERIENCE`, `CONTACT`). The rail fills one segment per chapter and the capsule shows the current chapter's progress; whole-page progress belongs to the top bar.
_Avoid_: Generic fixed navbar dock that occupies persistent vertical reading space, unanchored floating menus, a second whole-page progress bar.

**Story Position**:
The continuous place of the reader in the story, from `StoryScrollProvider`: the integer part is the chapter under the **Reading Line**, the fraction is how far through it the reader is (2.5 = halfway through `SELECTED WORK`). It drives the **Chapter Atmosphere** and the **Story Progress Tracker**, and the active chapter is mirrored into the URL hash with `replaceState`.
_Avoid_: Per-component `IntersectionObserver`s that each decide the active chapter.

**Reading Line**:
The horizontal line in the viewport where content counts as being read: 40% down for chapters, 50% for the pinned runway, 60% for the stacked runway.

**Chapter Atmosphere**:
Fixed lighting behind the page (`Atmosphere.tsx`): a Primary Blue glow, an Electric Cyan glow and a lift toward the `surface` tone, with one look per chapter blended across chapter boundaries by **Story Position**. Transform and opacity only; reduced motion holds the intro look.
_Avoid_: Animating gradients or colours directly, per-chapter accent hues outside the palette.

**Chapter Bridge**:
The lead line under a chapter heading (`ChapterBridge.tsx`, copy in `src/data/chapters.ts`) that picks up from the chapter before it, lit word by word as it scrolls in. Thai is segmented with `Intl.Segmenter`. A chapter jump always lands on a fully lit bridge.
_Avoid_: Extra transition bands between chapters, which add page length.

**Sticky Scrollytelling Runway**:
An architectural case study presentation pattern (`EditorialCaseStudy.tsx`) where an interactive smartphone simulator stays pinned on desktop (`sticky top-16`) while the beat list scrolls past. `useBeatScrub` drives it: the HUD rail, beat opacity and a slight device drift follow the scroll continuously, while the device screen changes only when the **Reading Line** clears a beat boundary by 32px, emitting one `BLoCStreamEvent` per change in either direction. Below `lg`, and with reduced motion, the runway is stacked (stepper above the device) and nothing is pinned.
_Avoid_: Static screenshot carousels, unlinked scroll sections without interactive state alignment, filters that change the page length under a pinned runway.

**Architectural Story Beat**:
The standardized 3-stage engineering progression applied to each flagship case study (`BEATS_BY_PROJECT` in `src/data/scrollytellingBeats.ts`):

1. _Presentation & Intake_: Form validation, real-time input capture, and event dispatch.
2. _Deterministic Engine_: On-device clinical calculations, BLoC state machines, and gamification multipliers.
3. _Persistence & Infrastructure_: REST API record submission (NCDs), Profile API sync (Pinto), and an idempotent SQLite retry queue (POS).
   _Avoid_: Unstructured paragraph blobs, purely marketing-oriented feature descriptions without architectural details.

**Live BLoC Stream Event & DevTools Dock**:
A reactive developer interface (`LiveEventDock.tsx` and `DevToolsDrawer.tsx`) integrated beneath the smartphone mockup, capturing typed state mutations (`BLoCStreamEvent`), measuring execution latency (e.g. `0.4ms`), and exposing BLoC event streams, Dart code snippets, and Flutter widget hierarchy trees in-browser.
_Avoid_: Static mock code images, non-interactive log widgets.

**Editorial Display**:
A brutalist-inspired typography system using fluid clamp font scaling, high-contrast headings, and embedded inline micro-badges representing engineering domains (`MOBILE & APP`, `FLUT [📱] TER`, `DEV [⚡] ELOPER`).
_Avoid_: Generic hero banner, template heading.

**Interactive Showcase Frame**:
An interactive 3D/2.5D device viewport simulating live mobile application interfaces with interactive screen switching and gesture preview, serving as the flagship project centerpiece.
_Avoid_: Static screenshot carousel, plain image mockup.

**Zero-Shift Bilingual Flow**:
A dual-language architecture (`useLanguage` hook and `LanguageContext`) equipped with typography constraints and min-height containment, guaranteeing zero cumulative layout shift (CLS = 0) when switching between Thai and English across all headings and technical metrics.
_Avoid_: Unconstrained text containers that jump or wrap unpredictably on language toggle.

**Resume Pill**:
A compact magnetic/expandable action element that smoothly expands on hover and directs recruiters directly to the PDF resume.
_Avoid_: Plain text download link.

**Tactile Motion Dynamics**:
A physics-driven animation framework utilizing Motion spring physics, 3D card tilt gestures, and hardware-accelerated transforms, balancing visceral tactile feedback with high-performance 60–120 FPS responsiveness.
_Avoid_: Jarring linear ease, heavy 3D canvas libraries, distracting continuous wiggle loops.

**Kinetic Telemetry Counters**:
Numerical readouts that animate smoothly from zero to target values upon entering the viewport with simulated real-time telemetry jitter, reinforcing the engineering persona.
_Avoid_: Static frozen metric numbers, abrupt value swaps.

**Mobile Gesture Simulation**:
Micro-interaction behaviors within the Interactive Showcase Frame that mimic native mobile OS experiences (spring-tab transitions, simulated haptics/burst on streak click, dynamic island active pulse).
_Avoid_: Plain web tab switching without transitional motion.

**Fluid Ambient Mesh & Specular Border Beams**:
Multi-layered breathing gradient lighting and dynamic conic border rays, producing organic cyan-to-electric-blue atmospheric illumination and specular card edge glints on hover while preserving 60–120 FPS hardware acceleration.
_Avoid_: Flat borders, heavy WebGL canvas instances that cause mobile frame drops.

**Kinetic UI Suite**:
A triad of micro-interaction components comprising metallic shimmer gradient sweeps on key editorial headings (`ShinyText`), flip-rotating engineering role pills (`RotatingRoleBadge`), and luminous interactive action cards (`SpotlightCard`).
_Avoid_: Static monotone text, generic flat button hover states.

**Telemetry Deck**:
A persistent or section-level engineering metrics display reflecting live local time (Chiang Mai, Thailand), system pulse, tech stack ribbons, and availability status.
_Avoid_: Generic stats counter, random progress bars.

**Atmospheric Backdrop**:
A layered visual canvas combining a geometric dot-matrix grid, angled directional light beams (dual Cyan/Sky sheen gradients), and theme-aware styling while strictly preserving 60–120 FPS hardware acceleration.
_Avoid_: Flat solid background, loud video loop.

**Brand Identity Palette (Cyan to Electric Blue Dual Gradient)**:
A high-impact signature color system reflecting Flutter & Dart engineering mastery (`#00f0ff`, `#38bdf8`, `#0284c7`, `#2563eb`), applied across buttons, glassmorphic hover borders, custom context cursor, and typography glows, while preserving standard Emerald indicators for live system availability/telemetry heartbeat.
_Avoid_: Monochromatic green defaults, generic purple gradients.

---

### Retired / Legacy Concepts

The following concepts and components from earlier iterations are formally deprecated in the active architecture:

- **[Legacy] Floating Navigation Dock (`Navbar.tsx`)**:
  Retired in favor of the **Story Progress Tracker** (`StoryProgress.tsx`) and the integrated Hero eyebrow control deck, providing an unobstructed scroll-led reading flow.
- **[Legacy] Preloader Sequence (`Preloader.tsx`)**:
  Retired in favor of immediate, zero-delay main interface mounting, prioritizing the recruiter fast-path and sub-second First Contentful Paint (FCP).
- **[Legacy] The Lens Stage (`LensStage.tsx` / `MobileMockup.tsx`)**:
  Retired in favor of the **Sticky Scrollytelling Runway** and **DevTools Drawer**, replacing circular cursor spotlight masks with direct, continuous scrollytelling and developer drawer inspection.
- **[Legacy] Project Origin Filter (`Projects.tsx`)**:
  Retired in favor of the project jump nav (`#case-<id>` links), because filtering changed the page length under the pinned runways (ADR 0006).
- **[Legacy] ProjectCard Grid (`ProjectCard.tsx`)**:
  Retired in favor of full-width **Editorial Case Studies** (`EditorialCaseStudy.tsx`) supporting multi-beat runways.
