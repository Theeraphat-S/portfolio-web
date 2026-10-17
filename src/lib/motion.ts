/**
 * Shared motion tokens. Entrances use one decelerating curve so every
 * section settles the same way; springs stay reserved for physical moves
 * (drawers, sheets, x/scale) as Motion recommends.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Section entrance used with `whileInView`; MotionConfig drops the travel
 * for reduced-motion users and keeps the fade. */
export const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};
