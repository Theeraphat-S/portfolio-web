import React from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useStoryScroll } from "../context/useStoryScroll";

// How far each STORY_CHAPTERS entry raises the void toward the surface
// tone. A neutral tone shift only: no colored light behind the content.
const LIFTS = [0, 0.45, 0.2, 0.5, 0.22, 0.75];

// Each lift holds through the middle of its chapter and blends into the
// next across the boundary, BLEND chapters either side of it.
const BLEND = 0.2;
const INPUT = LIFTS.flatMap((_, i) => [i + BLEND, i + 1 - BLEND]);
const OUTPUT = LIFTS.flatMap((lift) => [lift, lift]);

/**
 * Fixed backdrop behind the page whose tone steps between void and surface
 * as the story moves from chapter to chapter. Only opacity animates.
 */
export const Atmosphere: React.FC = () => {
  const { position } = useStoryScroll();
  const shouldReduceMotion = useReducedMotion();
  const still = useMotionValue(0);
  const lift = useTransform(
    shouldReduceMotion ? still : position,
    INPUT,
    OUTPUT,
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <m.div
        className="absolute inset-0 bg-surface"
        style={{ opacity: lift }}
      />
    </div>
  );
};

export default Atmosphere;
