# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary User**: Tech recruiters, engineering hiring managers, and mobile team leads evaluating candidate profiles for junior-to-mid Mobile Developer roles.
- **User Situation**: Reviewing dozens of candidate portfolios, looking for verifiable technical competence, architectural maturity, and real shipping experience within 60–90 seconds.
- **User Job**: Rapidly verify whether Theeraphat has production-level Flutter/Dart engineering ability, understands real-world constraints (offline operation, state management, API integration), and fits active team hiring requirements.

## Product Purpose

The product is the professional portfolio and interactive engineering showcase for Theeraphat Srimontha (Oven). Its purpose is to demonstrate concrete, production-grade cross-platform mobile engineering competence and convert recruiter attention into technical interviews, job offers, or high-value professional engineering connections. Success means immediate credibility, frictionless contact/resume access, and undeniable proof of engineering craftsmanship through a scroll-led interactive narrative.

## Positioning

Unlike generic entry-level portfolios filled with static screenshots or tutorial clones, this platform demonstrates production-proven Flutter engineering through a **scroll-led interactive case study story**:

- **NCDs Risk Screening App**: Client-side offline-first architecture for medical screening (reducing screening time by >60% and human error to 0%) through deterministic BLoC calculation.
- **Pinto Logistics App**: Commercial mobile features with hybrid WebView bridges, live WebSocket tracking, and gamification streaks.
- **Enterprise POS System**: Fault-tolerant retail POS system featuring local SQLite Write-Ahead Logging (WAL), idempotent retry queues, and direct ESC/POS thermal printer integration.

It highlights architectural reasoning (BLoC state machines, clean architecture, real usability field testing) backed by academic mentorship (TA for 3 semesters) and community tech leadership.

## Operating Context

- **Recruiter Evaluation Flow**: Evaluated on desktop laptops (wide displays) during initial screening and on mobile phones (via shared links, LinkedIn, or resume QR codes) on the go.
- **Language Requirements**: Bilingual audience (Thai domestic market and English international tech hubs/remote teams), requiring fluid zero-layout-shift language switching across all technical copy.
- **Recruiter Fast Path**: Immediate access in the Hero section to direct email, phone, GitHub profile, LinkedIn, and PDF Resume download, followed by an avionics chapter tracker keeping orientation across the 6 story chapters (`Intro`, `Approach`, `Selected Work`, `Capabilities`, `Experience`, `Contact`).

## Capabilities and Constraints

- **Dual Language**: Seamless Thai and English localization covering all personal facts, metrics, project case studies, and career history with zero layout shift.
- **3-Beat Sticky Scrollytelling Runway**: Pinned interactive mobile simulator synchronized with sticky architectural beat cards as the recruiter scrolls, exposing concrete engineering decisions step-by-step.
- **In-Browser BLoC DevTools & Telemetry Dock**: Integrated developer drawer streaming live BLoC state events, widget hierarchy trees, and FPS telemetry in response to user gestures.
- **Avionics Story Progress**: Vertical chapter progress tracker on 2XL+ viewports and responsive pill capsule on mobile/tablet providing continuous reading orientation.
- **Technical Constraints**: 60–120 FPS fluid momentum scrolling (Lenis), lightweight bundle size, responsive across all viewports, and strict adherence to `prefers-reduced-motion`.

## Brand Commitments

- **Subject**: Theeraphat Srimontha (Nickname: Oven).
- **Target Role**: Mobile Developer (Flutter & Dart Specialist).
- **Tone & Voice**: Authoritative, precise, engineering-driven, humble yet confident; speaks in terms of architectural decisions, trade-offs, and quantified user outcomes rather than buzzwords.
- **Factual Honesty**: Transparent representation of degree completion (2022–2026, Maejo University), internship role at Fakduay Logistics, and verified academic references.

## Evidence on Hand (The 3-Beat Architectural Model)

Every flagship project is structured around 3 canonical architectural beats that recruiters can inspect and interact with:

### 1. NCDs Risk Screening Mobile App (Senior Capstone Project, 2025)

- **Beat 1 — Presentation & Intake**: Zero-latency client-side vitals validation (glucose, blood pressure) via BLoC Presentation Layer without network dependency.
- **Beat 2 — Deterministic Engine**: Deterministic on-device clinical risk algorithm evaluating Diabetes, Hypertension, Cardiac, and Obesity risk tiers, eliminating human calculation error by 100%.
- **Beat 3 — Persistence & Infrastructure**: Resilient local SQLite persistence with one-touch PDF report generation for remote village health volunteers (VHVs) in off-grid field clinics.
- **Verified Outcome**: Screening time reduced from 10–15 min down to < 3–5 min per patient; 100% calculation accuracy; 4 disease groups supported.

### 2. Pinto Logistics Commercial App (Internship at Fakduay Logistics, 2026)

- **Beat 1 — Presentation & Intake**: Low-latency courier GPS coordinates streamed over WebSockets, updating dynamic ETA and milestone status reactively.
- **Beat 2 — Deterministic Engine**: Daily chat streaks engine with dynamic reward tier multipliers driving Daily Active Users (DAU) and retention.
- **Beat 3 — Persistence & Infrastructure**: Bidirectional `JavaScriptChannel` bridge synchronizing auth tokens and cart payloads between legacy WebViews and native Flutter widgets.
- **Verified Outcome**: Seamless hybrid navigation without frame drops; measurable retention boost via daily reward loop; shipped to production.

### 3. Enterprise POS & Store Management (Commercial Retail System)

- **Beat 1 — Presentation & Intake**: High-speed barcode scanning with sub-millisecond local SKU cache hits and reactive cart state calculation.
- **Beat 2 — Deterministic Engine**: Retail continuity during network blackouts via local SQLite Write-Ahead Logging (WAL) and idempotent background retry queues.
- **Beat 3 — Persistence & Infrastructure**: Direct byte dispatch to thermal receipt printers upon checkout confirmation, creating tamper-evident audit trails.
- **Verified Outcome**: 99.9% transaction consistency; zero stock desync during peak hours; instant PromptPay QR verification.

### Work & Leadership History

- **Mobile Developer Intern** at Fakduay Logistics & Digital Platform Co., Ltd.
- **Undergraduate Teaching Assistant (TA)** for 3 consecutive semesters (Client-side Web, Database Systems, Logic & Programming).
- **Keynote Instructor** for "Smart AI for Education & Ethical Programming" workshop at Jakkhumkhanathorn School.
- **Verified Academic Reference**: Dr. Jakkrit Techo (`src/data/personal.ts`).

## Product Principles

1. **Proof Over Claims**: Every technical assertion is anchored in a concrete project, a specific architectural choice (e.g., client-side BLoC state evaluation for offline reliability), and measurable outcomes.
2. **Interactive Determinism**: The web application does not rely on static screenshot carousels; it simulates live mobile state mutations, BLoC event streams, and offline resilience directly in the browser.
3. **Frictionless Discovery**: A recruiter can assess core qualifications, tech stack, and flagship accomplishments in under 60 seconds, or dive deep into architectural trade-offs through the sticky runway and DevTools drawer.
4. **Engineered Reliability**: High-fidelity interactions, zero layout shifts, smooth 60–120 FPS transitions, and flawless dual-language support mirror the standards of production-grade mobile engineering.
5. **Context-Rich Authenticity**: Highlight actual collaboration—field testing with village health volunteers, mentoring university students, and shipping commercial features with Agile teams.

## Accessibility & Inclusion

- Keyboard navigability across all interactive modal views, screen toggles, and language selectors.
- Skip to content link (`#main-content`) for screen readers and keyboard users.
- High visual contrast ratios for text and indicators against dark surfaces (WCAG AAA for primary text).
- Respect for user motion preferences (`prefers-reduced-motion`) without breaking functional navigation or content readability.
- Semantic HTML tags and ARIA labels across navigation, story progress tracking, editorial case study cards, and external contact links.
