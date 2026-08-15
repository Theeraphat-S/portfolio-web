import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
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

  useEffect(() => {
    let interval: any;
    let currentIteration = 0;

    const getNextChar = (originalChar: string) => {
      if (originalChar === ' ') return ' ';
      return characters[Math.floor(Math.random() * characters.length)];
    };

    if (isScrambling) {
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (revealedIndices.has(index)) return text[index];
              return getNextChar(char);
            })
            .join('');
        });

        currentIteration++;

        if (sequential) {
          if (revealedIndices.size < text.length) {
            const unrevealed = text
              .split('')
              .map((_, i) => i)
              .filter((i) => !revealedIndices.has(i));
            if (unrevealed.length > 0) {
              const nextIndex = unrevealed[0];
              setRevealedIndices((prev) => new Set([...prev, nextIndex]));
            }
          } else {
            setIsScrambling(false);
            setDisplayText(text);
            clearInterval(interval);
          }
        } else {
          if (currentIteration >= maxIterations) {
            setIsScrambling(false);
            setDisplayText(text);
            clearInterval(interval);
          }
        }
      }, speed);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isScrambling, text, speed, maxIterations, sequential, characters, revealedIndices]);

  useEffect(() => {
    setRevealedIndices(new Set());
    setIsScrambling(true);
    setHasAnimated(true);
  }, [text]);

  const triggerAnimation = () => {
    if (!isScrambling) {
      setRevealedIndices(new Set());
      setIsScrambling(true);
    }
  };

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
