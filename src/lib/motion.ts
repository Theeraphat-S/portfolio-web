/**
 * Shared motion tokens. Entrances use one decelerating curve so every
 * section settles the same way; springs stay reserved for physical moves
 * (drawers, sheets, x/scale) as Motion recommends.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
