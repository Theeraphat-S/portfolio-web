import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeScale?: number;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = '',
  padding = 50,
  disabled = false,
  magnetStrength = 0.35,
  activeScale = 1.05,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 200, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    setIsHovered(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    if (!rectRef.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }

    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (
      Math.abs(distanceX) < width / 2 + padding &&
      Math.abs(distanceY) < height / 2 + padding
    ) {
      x.set(distanceX * magnetStrength);
      y.set(distanceY * magnetStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [disabled, padding, magnetStrength, x, y]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      animate={{ scale: isHovered ? activeScale : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-block transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

