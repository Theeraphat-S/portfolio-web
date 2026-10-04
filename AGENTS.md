# AGENTS.md

Welcome to the **Portfolio-Web** repository!

This document provides instructions, operational standards, and context for AI coding agents working on this project.

---

## 🧭 Agent Skills & Governance

### Issue Tracker

GitHub Issues is used for tracking issues, enhancements, and specifications. See [`docs/agents/issue-tracker.md`](file:///c:/Work/portfolio-Web/docs/agents/issue-tracker.md).

### Triage Labels

Canonical 5-role triage label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See [`docs/agents/triage-labels.md`](file:///c:/Work/portfolio-Web/docs/agents/triage-labels.md).

### Domain Docs

Single-context repository layout using [`CONTEXT.md`](file:///c:/Work/portfolio-Web/CONTEXT.md), [`DESIGN.md`](file:///c:/Work/portfolio-Web/DESIGN.md), [`PRODUCT.md`](file:///c:/Work/portfolio-Web/PRODUCT.md), and [`docs/adr/`](file:///c:/Work/portfolio-Web/docs/adr/). See [`docs/agents/domain.md`](file:///c:/Work/portfolio-Web/docs/agents/domain.md).

---

## 🛠️ Stack & Tooling

- **Core Framework**: React 19, TypeScript 5.8+, Vite 6
- **Styling**: Tailwind CSS v4, CSS Variables, JetBrains Mono & Outfit / IBM Plex Sans Thai
- **Animation & Motion**: Motion (for React) with spring physics and reduced motion fallbacks
- **Smooth Scroll**: Lenis 1.1+ integrated via custom provider (`src/lib/lenis.ts`)
- **Icons**: Lucide React & custom Iconsax component sets

---

## 📂 Architecture & Directory Map

```
src/
├── components/
│   ├── mobile-mockup/            # In-browser mobile device shell & devtools
│   │   ├── DevToolsDrawer.tsx    # Live BLoC state stream, code viewer, widget tree
│   │   ├── LiveEventDock.tsx     # Reactive event telemetry dock below device frame
│   │   ├── NcdsScreen.tsx        # Simulated NCDs medical screening interface
│   │   ├── PintoScreen.tsx       # Simulated Pinto logistics & chat streak interface
│   │   └── PosScreen.tsx         # Simulated retail POS checkout interface
│   ├── sections/
│   │   ├── hero/                 # Editorial hero display, badges, & language control
│   │   ├── about/                # Glassmorphic bento grid & live Chiang Mai clock
│   │   ├── projects/             # Selected work section
│   │   │   ├── EditorialCaseStudy.tsx # Sticky scrollytelling runway & devtools sync
│   │   │   ├── Projects.tsx           # Category filter & modal manager
│   │   │   └── modal/                 # Deep architectural case study modal dialogs
│   │   ├── skills/               # Interactive competency matrix
│   │   ├── experience/           # Work history, internships, and TA credentials
│   │   └── contact/              # Direct contact reach-out with canvas confetti
│   ├── StoryProgress.tsx         # Fixed vertical avionics chapter tracker
│   ├── ScrollProgressBar.tsx     # Top reading progress indicator
│   ├── SmoothScroll.tsx          # Lenis smooth scroll provider
│   └── Footer.tsx                # Minimalist editorial footer
├── context/
│   └── LanguageContext.tsx       # Centralized bilingual state (TH / EN)
├── data/                         # SINGLE SOURCE OF TRUTH (Never hardcode in components)
│   ├── dartCodeSnippets.ts       # Production Dart/BLoC code samples for DevTools
│   ├── experiences.ts            # Career history, internships, and academic roles
│   ├── personal.ts               # Contact info, bio, academic reference, and degree
│   ├── projects.ts               # Flagship project metrics and case study content
│   ├── scrollytellingBeats.ts    # 3-beat architectural milestones (BEATS_BY_PROJECT)
│   └── skills.ts                 # Categorized technical skills & proficiency levels
├── types/
│   ├── portfolio.ts              # Core data model interfaces (ProjectItem, StoryBeat)
│   └── stream.ts                 # Telemetry interfaces (BLoCStreamEvent)
├── App.tsx                       # Main application shell with story flow
└── main.tsx                      # Application mount point
```

---

## 📜 Core Operational Rules for AI Agents

### 1. Data-First Single Source of Truth

- **Never** hardcode project descriptions, personal details, contact addresses, or metric numbers directly within JSX/TSX presentation components.
- All copy, stats, and achievements must originate from the centralized datasets in [`src/data/`](file:///c:/Work/portfolio-Web/src/data/).
- When adding or modifying project content, update both [`src/data/projects.ts`](file:///c:/Work/portfolio-Web/src/data/projects.ts) and [`src/data/scrollytellingBeats.ts`](file:///c:/Work/portfolio-Web/src/data/scrollytellingBeats.ts).

### 2. The Zero-Shift Bilingual Rule

- The portfolio serves a dual Thai/English audience. Switching languages with `toggleLang` must **never** cause cumulative layout shift (CLS).
- Text containers subject to language switching must define appropriate `min-h-[...]`, flex alignment, and proportional line heights (`leading-normal` or `leading-relaxed`).

### 3. The 3-Beat Scrollytelling Pattern

- Flagship projects in [`EditorialCaseStudy.tsx`](file:///c:/Work/portfolio-Web/src/components/sections/projects/EditorialCaseStudy.tsx) rely on a standardized 3-beat progression:
  1. `Presentation & Intake`: UI form validation, live scanner, or tracking initialization.
  2. `Deterministic Engine`: Clinical risk calculation, gamification multiplier, or cart state machine.
  3. `Persistence & Infrastructure`: SQLite offline commit, WebView platform bridge, or ESC/POS printer stream.
- Each beat must emit a typed `BLoCStreamEvent` to [`LiveEventDock.tsx`](file:///c:/Work/portfolio-Web/src/components/mobile-mockup/LiveEventDock.tsx) upon intersecting the viewport.

### 4. Component Hygiene & Legacy Policy

- Several components from earlier iterations (`Navbar.tsx`, `Preloader.tsx`, `MobileMockup.tsx`, `ProjectCard.tsx`) remain in the codebase for historical reference.
- **Do not** re-import or reintroduce these legacy components into [`src/App.tsx`](file:///c:/Work/portfolio-Web/src/App.tsx) without explicit user instruction. The active interface is governed by [`StoryProgress.tsx`](file:///c:/Work/portfolio-Web/src/components/StoryProgress.tsx) and the Hero eyebrow control deck.

### 5. Accessibility & Motion Guidelines

- Wrap interactive motion in `useReducedMotion()` from `motion/react` where appropriate.
- Always provide accessible ARIA labels for buttons and state indicators.
- Preserve keyboard navigation and the `#main-content` skip link.

---

## 🧪 Verification Protocol (Mandatory Before Completion)

Whenever you edit or refactor code in this repository, you **MUST** run and pass all of the following verification commands before declaring a task complete:

```bash
# 1. Typecheck the TypeScript codebase
npx tsc --noEmit

# 2. Analyze code quality with ESLint
npm run lint

# 3. Verify code formatting with Prettier
npm run format:check

# 4. Verify production bundle compilation
npm run build
```

If formatting issues are flagged, run `npm run format` to automatically apply Prettier rules.
