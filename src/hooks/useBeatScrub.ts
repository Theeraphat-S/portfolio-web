import { RefObject, useMemo, useRef } from "react";
import {
  MotionValue,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

/** Pixels the reading line must travel past a boundary before the beat
 * changes, so resting on a boundary never flickers between two beats. */
const HYSTERESIS_PX = 32;

/** Opacity of beats away from the reading line, as the runway used before. */
const DIMMED_OPACITY = 0.55;

interface BeatScrubOptions {
  /** Element the beats are laid out in; progress runs across its height. */
  targetRef: RefObject<HTMLElement | null>;
  beatCount: number;
  /** Progress values (0–1) where beats 2, 3… begin; defaults to even
   * splits. Called each frame with the target's bounding rect. */
  getBoundaries?: (rect: DOMRect) => number[];
  /** Share of the viewport height where the reading line sits. */
  readingLine?: number;
  enabled: boolean;
  /** Called once each time the beat under the reading line changes. */
  onBeat: (index: number) => void;
}

interface BeatScrub {
  /** 0 when the target's top meets the reading line, 1 at its bottom. */
  progress: MotionValue<number>;
  /** How much of each beat's span the reading line has covered, 0–1. */
  segments: MotionValue<number>[];
  /** Opacity per beat: full under the reading line, easing to
   * DIMMED_OPACITY a quarter of a beat away from it. */
  beatOpacity: MotionValue<number>[];
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Drives a multi-beat story from scroll: continuous values for progress
 * rails and emphasis, and a discrete beat that changes only on a real
 * boundary crossing, in either direction.
 */
export function useBeatScrub({
  targetRef,
  beatCount,
  getBoundaries,
  readingLine = 0.5,
  enabled,
  onBeat,
}: BeatScrubOptions): BeatScrub {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  // Fixed per project, so building them once per count is enough.
  const segments = useMemo(
    () => Array.from({ length: beatCount }, () => motionValue(0)),
    [beatCount],
  );
  const beatOpacity = useMemo(
    () =>
      Array.from({ length: beatCount }, (_, i) =>
        motionValue(i === 0 ? 1 : DIMMED_OPACITY),
      ),
    [beatCount],
  );
  const committedRef = useRef<number | null>(null);

  // Reads the target on every frame instead of using useScroll's target,
  // so the hook survives the layout branch remounting the element.
  useMotionValueEvent(scrollY, "change", () => {
    const el = targetRef.current;
    if (!enabled || !el || beatCount === 0) return;

    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return;
    const p = clamp01(
      (window.innerHeight * readingLine - rect.top) / rect.height,
    );
    progress.set(p);

    const inner =
      getBoundaries?.(rect) ??
      Array.from({ length: beatCount - 1 }, (_, i) => (i + 1) / beatCount);
    const edges = [0, ...inner, 1];

    // Continuous beat position: 1.5 is halfway through the second beat.
    let beat = 0;
    while (beat < beatCount - 1 && p >= edges[beat + 1]) beat++;
    const span = edges[beat + 1] - edges[beat];
    const position = beat + (span > 0 ? clamp01((p - edges[beat]) / span) : 1);

    segments.forEach((segment, i) => segment.set(clamp01(position - i)));
    beatOpacity.forEach((value, i) => {
      const distance = Math.max(0, i - position, position - (i + 1));
      value.set(1 - (1 - DIMMED_OPACITY) * clamp01(distance / 0.25));
    });

    // Only report beats while the reading line is inside the target.
    if (p <= 0 || p >= 1) return;
    const margin = HYSTERESIS_PX / rect.height;
    const indexAt = (shift: number) =>
      inner.filter((boundary) => p >= boundary + shift).length;
    const current = committedRef.current;
    const next =
      current === null
        ? indexAt(0)
        : Math.min(Math.max(current, indexAt(margin)), indexAt(-margin));
    if (next === current) return;
    committedRef.current = next;
    onBeat(next);
  });

  return { progress, segments, beatOpacity };
}
