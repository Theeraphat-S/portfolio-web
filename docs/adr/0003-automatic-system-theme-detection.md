# 0003. Automatic System Preference Theme Detection

## Status

Accepted (Supersedes Decision #4 in [ADR 0001](0001-editorial-portfolio-redesign.md))

## Context

Previously, the portfolio provided a manual Dark/Light mode toggle switch in the Navigation bar alongside LocalStorage persistence. While functional, the manual toggle introduced unnecessary UI friction, extra bundle weight, and state desynchronization with modern operating systems that automatically adjust light and dark modes based on ambient light or scheduled day/night transitions.

The user requested removing manual Dark/Light toggling and transitioning to pure, automatic system preference detection (`prefers-color-scheme`).

## Decision

1. **Retire Manual Toggle UI**:
   - Remove the theme switcher button (Sun/Moon icons) from the primary Navigation bar, streamlining navbar utilities to focus on language switching and direct contact CTA.
2. **OS-Level Preference Detection**:
   - Automatically detect whether the user's OS or browser prefers light or dark appearance via `window.matchMedia("(prefers-color-scheme: light)")`.
   - Actively listen for runtime OS changes using a media query listener so theme transitions occur immediately without page reload.
3. **Dark Mode Fallback**:
   - In environments where color-scheme preferences are unsupported or indeterminate (`no-preference`), default strictly to **Dark Mode** to preserve the portfolio's neon cyber/flutter visual atmosphere.
4. **LocalStorage Clearance**:
   - Stop reading and writing the `portfolio-theme` key in `localStorage`, purging any stale stored user values to ensure OS preferences are strictly respected.

## Consequences

- Streamlined Navigation bar visual hierarchy with reduced cognitive load.
- Seamless, zero-touch theme adaptation for users with OS-level dark/light schedules.
- Complete alignment with accessibility guidelines regarding respect for user system-level appearance preferences.
