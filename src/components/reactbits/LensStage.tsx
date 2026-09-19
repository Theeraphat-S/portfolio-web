import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LensStageProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  radius?: number;
  label?: string;
  className?: string;
  containerClassName?: string;
  activeBorderColor?: string;
}

export const LensStage: React.FC<LensStageProps> = ({
  children,
  revealContent,
  radius = 90,
  label = "INSPECT ARCHITECTURE",
  className = "",
  containerClassName = "",
  activeBorderColor = "#06b6d4", // Flutter Cyan
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  });
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !prefersReducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords(null);
  };

  const showLens =
    isHovered && coords !== null && !isTouchDevice && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group select-none ${containerClassName}`}
    >
      {/* 1. Base Layer (Normal UI) */}
      <div className={`w-full h-full ${className}`}>{children}</div>

      {/* 2. Norrly-style Lens Reveal Layer with dynamic clip-path circle */}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: showLens ? 1 : 0,
            clipPath: coords
              ? `circle(${radius}px at ${coords.x}px ${coords.y}px)`
              : "circle(0px at 50% 50%)",
            WebkitClipPath: coords
              ? `circle(${radius}px at ${coords.x}px ${coords.y}px)`
              : "circle(0px at 50% 50%)",
          }}
        >
          {revealContent}
        </div>
      )}

      {/* 3. Norrly Precision Lens Ring & Telemetry Pill */}
      <AnimatePresence>
        {showLens && coords && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              marginLeft: `-${radius}px`,
              marginTop: `-${radius}px`,
              borderColor: activeBorderColor,
            }}
            className="absolute rounded-full pointer-events-none z-30 border-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] will-change-transform"
          >
            {/* Center Precision Crosshair */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/90 shadow-[0_0_8px_#06b6d4]" />
            <div className="absolute top-1/2 left-1/2 w-6 h-[1px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/50" />
            <div className="absolute top-1/2 left-1/2 h-6 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/50" />

            {/* Floating Metadata Pill below or above */}
            <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-zinc-950/95 border border-cyan-500/60 text-[9px] font-mono font-bold text-cyan-300 tracking-wider whitespace-nowrap shadow-xl flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <span>{label}</span>
              <span className="text-zinc-500 text-[8px]">
                {Math.round(coords.x)},{Math.round(coords.y)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
