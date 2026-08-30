import React, { useRef, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.15)',
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const setOpacity = useCallback((val: string) => {
    if (divRef.current) {
      divRef.current.style.setProperty('--spotlight-opacity', val);
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
    setOpacity('1');
    onMouseEnter?.(e);
  }, [onMouseEnter, setOpacity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
    if (rectRef.current && divRef.current) {
      const rect = rectRef.current;
      divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  }, [onMouseMove]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = null;
    setOpacity('0');
    onMouseLeave?.(e);
  }, [onMouseLeave, setOpacity]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
    setOpacity('1');
    onFocus?.(e);
  }, [onFocus, setOpacity]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    rectRef.current = null;
    setOpacity('0');
    onBlur?.(e);
  }, [onBlur, setOpacity]);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700/80 transform-gpu ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: `radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};


