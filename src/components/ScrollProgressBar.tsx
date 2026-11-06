import React from "react";
import { m, useScroll } from "motion/react";

interface ScrollProgressBarProps {
  className?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = "h-px bg-signal/70",
}) => {
  // Tracks the scroll directly, like the story rail and chapter pill:
  // Lenis already smooths the scroll, so a spring would only add lag.
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
      }}
      className={`fixed top-0 left-0 right-0 z-[999] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default ScrollProgressBar;
