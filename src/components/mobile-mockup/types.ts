import type { Variants } from "framer-motion";

export type ScreenKey = "ncds" | "pinto" | "pos";

export const SCREEN_INDEX_MAP: Record<ScreenKey, number> = {
  ncds: 0,
  pinto: 1,
  pos: 2,
};

export const SCREEN_THEME_MAP: Record<ScreenKey, { ping: string; dot: string; label: string }> = {
  ncds: {
    ping: "bg-emerald-400",
    dot: "bg-emerald-500",
    label: "NCDs Screener",
  },
  pinto: {
    ping: "bg-amber-400",
    dot: "bg-amber-500",
    label: "Pinto Logistics",
  },
  pos: {
    ping: "bg-blue-400",
    dot: "bg-blue-500",
    label: "POS Checkout",
  },
};

export const screenVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? 90 : -90,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};
