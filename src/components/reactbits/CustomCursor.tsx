import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics optimized for high refresh rates
  const springConfig = { damping: 28, stiffness: 300, mass: 0.12 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotConfig = { damping: 45, stiffness: 700, mass: 0.04 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  const lastTargetRef = useRef<EventTarget | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch / mobile screen
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

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

        // Only query DOM if target element actually changed
        if (target !== lastTargetRef.current && target instanceof HTMLElement) {
          lastTargetRef.current = target;
          const interactiveEl = target.closest(
            'a, button, [role="button"], input, textarea, [data-cursor-text], [data-cursor="pointer"], .interactive'
          ) as HTMLElement | null;

          if (interactiveEl) {
            const text = interactiveEl.getAttribute('data-cursor-text');
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden transform-gpu">
      {/* Outer Follower / Context Badge */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorText ? 1 : isHovered ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        {cursorText ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="px-3.5 py-1.5 rounded-full bg-emerald-500/95 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/30 backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap tracking-wide border border-emerald-300/40 select-none"
          >
            <span>{cursorText}</span>
          </motion.div>
        ) : (
          <div
            className={`rounded-full transition-all duration-300 border ${
              isHovered
                ? 'w-11 h-11 border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur-[1px]'
                : 'w-8 h-8 border-emerald-500/30 bg-emerald-500/5'
            }`}
          />
        )}
      </motion.div>

      {/* Center Pinpoint Glowing Dot (Hidden when text is displayed) */}
      {!cursorText && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed top-0 left-0 pointer-events-none will-change-transform"
        >
          <div
            className={`rounded-full transition-all duration-200 ${
              isHovered
                ? 'w-2 h-2 bg-emerald-300 shadow-[0_0_8px_#34d399]'
                : 'w-1.5 h-1.5 bg-emerald-400 shadow-[0_0_6px_#10b981]'
            }`}
          />
        </motion.div>
      )}
    </div>
  );
};

