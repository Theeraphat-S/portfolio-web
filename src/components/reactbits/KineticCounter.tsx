import React, { useState, useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";

export interface KineticCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  ease?:
    | [number, number, number, number]
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut";
  className?: string;
}

export const KineticCounter: React.FC<KineticCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1.0,
  ease = [0.16, 1, 0.3, 1],
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevTargetRef = useRef<number>(0);
  const hasAnimatedInitialRef = useRef<boolean>(false);
  const isInView = useInView(spanRef, { once: true });

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!isInView) return;

    const from = prevTargetRef.current;
    const animDuration = hasAnimatedInitialRef.current ? 0.5 : duration;
    hasAnimatedInitialRef.current = true;

    const controls = animate(from, value, {
      duration: animDuration,
      ease,
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        prevTargetRef.current = rounded;
        setDisplayValue(rounded);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, ease, shouldReduceMotion]);

  const renderedValue = shouldReduceMotion ? value : displayValue;

  return (
    <span ref={spanRef} className={className}>
      {prefix}
      {renderedValue}
      {suffix}
    </span>
  );
};

export default KineticCounter;
