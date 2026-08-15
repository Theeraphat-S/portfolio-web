import React, { useRef, useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (
      Math.abs(distanceX) < width / 2 + padding &&
      Math.abs(distanceY) < height / 2 + padding
    ) {
      x.set(distanceX * magnetStrength);
      y.set(distanceY * magnetStrength);
      setIsHovered(true);
    } else {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      animate={{ scale: isHovered ? activeScale : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
