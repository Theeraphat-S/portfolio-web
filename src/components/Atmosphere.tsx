import React from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useStoryScroll } from "../context/useStoryScroll";

/** How one chapter is lit: glow offsets are percentages of the glow's own
 * size, and `lift` raises the void toward the surface tone. */
interface ChapterLook {
  blueX: number;
  blueY: number;
  blueOpacity: number;
  cyanX: number;
  cyanY: number;
  cyanOpacity: number;
  lift: number;
}

// One look per STORY_CHAPTERS entry. Blue carries most of the light and
// cyan stays faint, so the canvas keeps to the 80 / 15 / 5 rule.
const LOOKS: ChapterLook[] = [
  // Intro: key light from the top right, behind the headline.
  {
    blueX: 34,
    blueY: -30,
    blueOpacity: 0.55,
    cyanX: -40,
    cyanY: -38,
    cyanOpacity: 0.16,
    lift: 0,
  },
  // Approach: light swings to the left, the void lifts.
  {
    blueX: -36,
    blueY: -8,
    blueOpacity: 0.36,
    cyanX: -6,
    cyanY: -40,
    cyanOpacity: 0.12,
    lift: 0.45,
  },
  // Selected work: cyan rises beside the pinned device.
  {
    blueX: 6,
    blueY: -36,
    blueOpacity: 0.3,
    cyanX: 30,
    cyanY: 6,
    cyanOpacity: 0.24,
    lift: 0.2,
  },
  // Capabilities: low light from the right.
  {
    blueX: 34,
    blueY: 22,
    blueOpacity: 0.32,
    cyanX: -30,
    cyanY: 30,
    cyanOpacity: 0.1,
    lift: 0.55,
  },
  // Experience: dimmer, from the left, under the timeline.
  {
    blueX: -34,
    blueY: 14,
    blueOpacity: 0.24,
    cyanX: 10,
    cyanY: -30,
    cyanOpacity: 0.12,
    lift: 0.3,
  },
  // Contact: both lights gather low and centred.
  {
    blueX: 0,
    blueY: 34,
    blueOpacity: 0.5,
    cyanX: -8,
    cyanY: 28,
    cyanOpacity: 0.26,
    lift: 0.75,
  },
];

// Each look holds through the middle of its chapter and blends into the
// next across the boundary, BLEND chapters either side of it.
const BLEND = 0.2;
const INPUT = LOOKS.flatMap((_, i) => [i + BLEND, i + 1 - BLEND]);
const track = (pick: (look: ChapterLook) => number) =>
  LOOKS.flatMap((look) => [pick(look), pick(look)]);
const trackPercent = (pick: (look: ChapterLook) => number) =>
  track(pick).map((value) => `${value}%`);

const TRACKS = {
  blueX: trackPercent((l) => l.blueX),
  blueY: trackPercent((l) => l.blueY),
  blueOpacity: track((l) => l.blueOpacity),
  cyanX: trackPercent((l) => l.cyanX),
  cyanY: trackPercent((l) => l.cyanY),
  cyanOpacity: track((l) => l.cyanOpacity),
  lift: track((l) => l.lift),
};

/**
 * Fixed light layers behind the page that shift as the story moves from
 * chapter to chapter. Only transform and opacity animate.
 */
export const Atmosphere: React.FC = () => {
  const { position } = useStoryScroll();
  const shouldReduceMotion = useReducedMotion();
  const still = useMotionValue(0);
  const source = shouldReduceMotion ? still : position;

  const blueX = useTransform(source, INPUT, TRACKS.blueX);
  const blueY = useTransform(source, INPUT, TRACKS.blueY);
  const blueOpacity = useTransform(source, INPUT, TRACKS.blueOpacity);
  const cyanX = useTransform(source, INPUT, TRACKS.cyanX);
  const cyanY = useTransform(source, INPUT, TRACKS.cyanY);
  const cyanOpacity = useTransform(source, INPUT, TRACKS.cyanOpacity);
  const lift = useTransform(source, INPUT, TRACKS.lift);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <m.div
        className="absolute inset-0 bg-surface"
        style={{ opacity: lift }}
      />
      <m.div
        className="atmosphere-glow atmosphere-glow-blue"
        style={{ x: blueX, y: blueY, opacity: blueOpacity }}
      />
      <m.div
        className="atmosphere-glow atmosphere-glow-cyan"
        style={{ x: cyanX, y: cyanY, opacity: cyanOpacity }}
      />
    </div>
  );
};

export default Atmosphere;
