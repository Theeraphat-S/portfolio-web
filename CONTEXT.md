# Portfolio Context

Personal showcase and professional identity platform for Theeraphat Srimontha (Oven), specializing in high-performance Mobile Engineering (Flutter & Dart).

## Language

### Visual & Architecture Concepts

**Story Progress Tracker**:
A fixed vertical avionics chapter tracker (`StoryProgress.tsx`) located on the left flank on 2XL+ screens and as a top-right floating capsule on mobile/tablet devices, mapping out the 6 continuous story chapters (`INTRO`, `APPROACH`, `SELECTED WORK`, `CAPABILITIES`, `EXPERIENCE`, `CONTACT`).
_Avoid_: Generic fixed navbar dock that occupies persistent vertical reading space, unanchored floating menus.

**Sticky Scrollytelling Runway**:
An architectural case study presentation pattern (`EditorialCaseStudy.tsx`) where an interactive smartphone simulator remains pinned on the desktop viewport (`lg:sticky lg:top-24`) while recruiters scroll through sequential engineering beats, synchronizing the simulated mobile screen and live telemetry stream with the visible narrative beat.
_Avoid_: Static screenshot carousels, unlinked scroll sections without interactive state alignment.

**Architectural Story Beat**:
The standardized 3-stage engineering progression applied to each flagship case study (`BEATS_BY_PROJECT` in `src/data/scrollytellingBeats.ts`):

1. _Presentation & Intake_: Form validation, real-time input capture, and event dispatch.
2. _Deterministic Engine_: On-device clinical calculations, BLoC state machines, and gamification multipliers.
3. _Persistence & Infrastructure_: Encrypted local SQLite persistence, hybrid WebView platform channels, and ESC/POS hardware print dispatch.
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
- **[Legacy] ProjectCard Grid (`ProjectCard.tsx`)**:
  Retired in favor of full-width **Editorial Case Studies** (`EditorialCaseStudy.tsx`) supporting multi-beat runways.
