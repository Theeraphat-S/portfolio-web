import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  encryptedClassName = 'text-emerald-400 opacity-80',
  parentClassName = '',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const triggerAnimation = useCallback(() => {
    if (!isScrambling) {
      setRevealedIndices(new Set());
      setIsScrambling(true);
    }
  }, [isScrambling]);

  useEffect(() => {
    setRevealedIndices(new Set());
    setIsScrambling(true);
    setHasAnimated(true);
  }, [text]);

  useEffect(() => {
    if (!isScrambling) {
      setDisplayText(text);
      return;
    }

    let lastTime = performance.now();
    let currentIteration = 0;
    let localRevealed = new Set<number>(revealedIndices);

    const getNextChar = (originalChar: string) => {
      if (originalChar === ' ') return ' ';
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const loop = (time: number) => {
      if (time - lastTime >= speed) {
        lastTime = time;

        if (sequential) {
          if (localRevealed.size < text.length) {
            const unrevealed: number[] = [];
            for (let i = 0; i < text.length; i++) {
              if (!localRevealed.has(i)) unrevealed.push(i);
            }
            if (unrevealed.length > 0) {
              localRevealed.add(unrevealed[0]);
              setRevealedIndices(new Set(localRevealed));
            }
          } else {
            setIsScrambling(false);
            setDisplayText(text);
            return;
          }
        } else {
          currentIteration++;
          if (currentIteration >= maxIterations) {
            setIsScrambling(false);
            setDisplayText(text);
            return;
          }
        }

        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (localRevealed.has(index)) return text[index];
              return getNextChar(char);
            })
            .join('')
        );
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isScrambling, text, speed, maxIterations, sequential, characters]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') {
          triggerAnimation();
        }
      }}
      onViewportEnter={() => {
        if (animateOn === 'view' && !hasAnimated) {
          triggerAnimation();
          setHasAnimated(true);
        }
      }}
    >
      <span className={className}>
        {displayText.split('').map((char, index) => {
          const isDecrypted = revealedIndices.has(index) || !isScrambling || char === ' ';
          return (
            <span
              key={index}
              className={isDecrypted ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};
