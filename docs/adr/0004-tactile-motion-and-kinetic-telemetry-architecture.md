# 0004. Tactile Motion and Kinetic Telemetry Architecture

## Status

Accepted

## Context

To make the portfolio website more engaging and distinctly communicate the engineer's specialization in mobile engineering (Flutter & Dart), enhanced motion and interactivity were requested.

Alternatives considered:

1. **Full 3D WebGL (Three.js / React Three Fiber)**: Allows interactive 3D model rotation, but adds ~500KB+ to bundle size, increases GPU memory overhead on mobile devices, and risks dropping frame rates below 60fps.
2. **Pure Framer Motion (v12) + CSS GPU Acceleration**: Leverages existing dependencies (`framer-motion`, `lenis`, `canvas-confetti`), achieves 60–120fps via hardware-accelerated transforms (`transform-gpu`, `will-change`), respects accessibility (`prefers-reduced-motion`), and preserves Lighthouse performance score 95+.

## Decision

Adopt **Tactile Motion Dynamics & Kinetic Telemetry** built on pure Framer Motion and CSS hardware acceleration:

1. **Global Scroll Progress Indicator**: A top-pinned 2px spring-smoothed progress indicator reflecting page scroll depth.
2. **Mobile Gesture Simulation (`MobileMockup.tsx`)**: Directional spring-based horizontal slide transitions between simulated screens (mimicking Flutter `PageView`), dynamic island status pulse, vital heartbeat rhythm, and micro-confetti burst on daily streak claim.
3. **Flagship Border Beam (`Projects.tsx`)**: An ambient dual cyan-to-electric-blue border beam highlighting the flagship project centerpiece.
4. **Tactile 3D Cards (`ProjectCard.tsx`)**: Subtle 3D perspective tilt (±8°) and glare sheen powered by `TiltedCard` for desktop viewports, automatically inactive on touch devices.
5. **Kinetic Telemetry Counters (`TelemetryDeck.tsx`)**: Viewport-triggered count-up animations for key metrics and gentle real-time latency jitter (11ms–14ms) reflecting an active Chiang Mai node.
6. **Scroll-Linked Timeline (`ExperienceTimeline.tsx`)**: Scroll-driven expansion of the central milestone line using `useScroll` and `scaleY`.
