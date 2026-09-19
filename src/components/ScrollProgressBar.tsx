import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

interface ScrollProgressBarProps {
  className?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = "h-[2px] bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className={`fixed top-0 left-0 right-0 z-[999] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default ScrollProgressBar;
