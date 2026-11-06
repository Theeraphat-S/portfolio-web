/**
 * Shared motion tokens. Everything settles on one decelerating curve;
 * springs stay reserved for physical moves (drawers, sheets, x/scale) as
 * Motion recommends. The CSS side mirrors these in src/index.css
 * (`--ease-out-expo`, `--dur-fast`, `--dur-base`, `--dur-slow`).
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Seconds; mirrors --dur-fast / --dur-base / --dur-slow. */
export const DURATION = {
  /** Hover, press and other immediate feedback. */
  fast: 0.16,
  /** Routine state changes: screen swaps, snackbars, the dock row. */
  base: 0.25,
  /** Section entrances and the beat-commit moment. */
  slow: 0.5,
} as const;

/** Routine in-place change (a screen or toast swapping). */
export const TRANSITION_BASE = {
  duration: DURATION.base,
  ease: EASE_OUT_EXPO,
};

/** Exit for a swapped screen: faster than the entrance, so a queued swap
 * (AnimatePresence mode="wait") never feels like latency. */
export const EXIT_FADE = {
  opacity: 0,
  transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO },
};

/** Viewport options shared by every `whileInView` entrance. */
export const IN_VIEW = { once: true, margin: "-60px" } as const;

/** Section entrance used with `whileInView`. It starts from a dimmed,
 * already-legible state, so a fast jump never lands on a blank section;
 * MotionConfig drops the travel for reduced-motion users. */
export const FADE_UP = {
  hidden: { opacity: 0.2, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Parent for a list that enters as a list: children use FADE_UP. The
 * total delay stays under a third of a second. */
export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** The case-study beat commit: device sweep, frame edge light, beat rule
 * and dock row all run on this one clock. */
export const BEAT_COMMIT = {
  duration: 0.52,
  ease: EASE_OUT_EXPO,
} as const;
