import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  glareEffect?: boolean;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  containerClassName = '',
  rotateAmplitude = 12,
  scaleOnHover = 1.02,
  glareEffect = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    setIsHovered(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;

    const { width, height, left, top } = rectRef.current;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 transform-gpu ${containerClassName}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl will-change-transform ${className}`}
      >
        {children}
        {glareEffect && isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

