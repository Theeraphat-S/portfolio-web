# 0004. Decoupled Visual Theme and System Color Mode Architecture

## Status

Accepted (Builds upon [ADR 0003](0003-automatic-system-theme-detection.md))

## Context

In [ADR 0003](0003-automatic-system-theme-detection.md), the portfolio committed to automatic system color preference detection (`prefers-color-scheme`) and retired manual Light/Dark toggling.

A requirement emerged to introduce an alternate, high-concept visual identity—a cinematic **Space Theme** featuring orbital Earth horizon imagery, starfield particles, and translucent glass surfaces—while maintaining the established **Original Theme** and full content/navigation parity.

This created a potential architectural tension: would introducing a Space Theme re-introduce manual theme toggling and compromise the automatic OS light/dark mode behavior?

## Decision

1. **Orthogonal 2-Dimensional Theme Matrix**:
   - Decouple **Visual Theme** (`original` | `space`) from **Color Mode** (`light` | `dark`).
   - The presentation resolves to a 2×2 matrix:
     - `Original Light`: Established editorial showcase on light paper backdrop.
     - `Original Dark`: Established cyber/neon brutalist showcase on deep slate backdrop.
     - `Space Light`: Blue-tinted white backdrop, softly illuminated atmosphere, pale frosted-glass surfaces, and dark typography.
     - `Space Dark`: Deep-black outer space backdrop, vibrant planetary atmospheric lighting, and translucent cyan-accented glass cards.

2. **Distinct Persistence & State Ownership**:
   - **Color Mode**: Strictly governed by OS preference (`window.matchMedia("(prefers-color-scheme: light)")`) with zero `localStorage` writes, honoring ADR 0003.
   - **Visual Theme**: Governed by explicit visitor intent via the Navbar selector (`Orbit` control) and persisted under `localStorage.getItem("portfolio-visual-theme")`.
   - **Safe Storage Fallback**: When `localStorage` is blocked or corrupted, default to `original` while keeping in-memory selection usable without throwing exceptions.

3. **Motion Safety and Accessibility**:
   - Both visual themes honor `prefers-reduced-motion: reduce`. In Space Theme, orbital drift, parallax translation, and star shimmer animations are suppressed, keeping text stable and legible.
   - Switching visual themes maintains scroll position and in-flight form input data without component remounting or page reload.

4. **Scoping via Data Attributes**:
   - Visual theme is attached to `document.documentElement.dataset.visualTheme`.
   - Space-specific CSS variables, glassmorphism filters, and section overrides are scoped under `[data-visual-theme="space"]`, leaving core Tailwind styling intact for the default theme.

## Consequences

- Visitors enjoy a rich, cinematic Space experience without breaking OS-level light/dark ambient schedules.
- Architecture cleanly separates presentation identity from accessibility/ambient preference.
- All 5 Playwright end-to-end acceptance criteria pass with 100% test reliability.
