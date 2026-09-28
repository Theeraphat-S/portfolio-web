import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const [isDisabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return isTouch || prefersReducedMotion;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High performance spring physics
  const springConfig = { damping: 28, stiffness: 320, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotConfig = { damping: 45, stiffness: 800, mass: 0.03 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  const lastTargetRef = useRef<EventTarget | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const target = e.target;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        mouseX.set(clientX);
        mouseY.set(clientY);

        if (!isVisible) setIsVisible(true);

        if (target !== lastTargetRef.current && target instanceof HTMLElement) {
          lastTargetRef.current = target;
          const interactiveEl = target.closest(
            'a, button, [role="button"], input, textarea, [data-cursor-text], [data-cursor="pointer"], .interactive',
          ) as HTMLElement | null;

          if (interactiveEl) {
            const text = interactiveEl.getAttribute("data-cursor-text");
            setIsHovered(true);
            setCursorText(text || null);
          } else {
            setIsHovered(false);
            setCursorText(null);
          }
        }
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, isDisabled]);

  if (isDisabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden transform-gpu select-none">
      {/* Outer Follower / Context Badge */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorText ? 1 : isHovered ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        {cursorText ? (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="px-3 py-1 rounded-full bg-[#00f0ff] text-[#07080c] font-mono font-bold text-[10px] tracking-widest shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 whitespace-nowrap uppercase border border-cyan-300"
          >
            <span>{cursorText}</span>
          </motion.div>
        ) : (
          <div
            className={`rounded-full transition-all duration-300 border ${
              isHovered
                ? "w-10 h-10 border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                : "w-7 h-7 border-white/20 dark:border-white/15 bg-white/5"
            }`}
          />
        )}
      </motion.div>

      {/* Center Pinpoint Dot (Hidden when text label is present) */}
      {!cursorText && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed top-0 left-0 pointer-events-none will-change-transform"
        >
          <div
            className={`rounded-full transition-all duration-200 ${
              isHovered
                ? "w-1.5 h-1.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
                : "w-1.5 h-1.5 bg-white dark:bg-white"
            }`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
