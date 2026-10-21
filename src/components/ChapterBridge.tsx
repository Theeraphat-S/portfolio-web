import React, { useMemo, useRef } from "react";
import {
  m,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { BilingualText } from "../types";

/** Opacity of words the reader has not scrolled to yet. */
const UNLIT_OPACITY = 0.28;

/**
 * Splits text into words, each carrying the spaces and punctuation after
 * it. Intl.Segmenter knows Thai, which has no spaces between words;
 * without it the whole text lights as one piece.
 */
const splitWords = (text: string, locale: string): string[] => {
  if (typeof Intl === "undefined" || !("Segmenter" in Intl)) return [text];
  const words: string[] = [];
  const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    if (isWordLike || words.length === 0) words.push(segment);
    else words[words.length - 1] += segment;
  }
  return words;
};

const Word: React.FC<{
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}> = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [UNLIT_OPACITY, 1]);
  return <m.span style={{ opacity }}>{children}</m.span>;
};

interface ChapterBridgeProps {
  bridge: BilingualText;
  className?: string;
}

/**
 * A chapter's lead line, lit word by word as it scrolls into place. Both
 * languages share one grid cell, as in BilingualStack, so the language
 * toggle cannot shift the layout; only the visible one is split.
 */
export const ChapterBridge: React.FC<ChapterBridgeProps> = ({
  bridge,
  className = "",
}) => {
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Fully lit by the time the line's end is 80% down the viewport, so a
  // chapter jump, which puts the heading near the top, lands on readable text.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 80%"],
  });
  const words = useMemo(() => splitWords(bridge[lang], lang), [bridge, lang]);

  return (
    <div ref={ref} className="grid">
      {(["th", "en"] as const).map((code) => {
        const isActive = code === lang;
        return (
          <p
            key={code}
            lang={code}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 ${className} ${isActive ? "" : "invisible"}`}
          >
            {isActive && !shouldReduceMotion
              ? words.map((word, i) => (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                  >
                    {word}
                  </Word>
                ))
              : bridge[code]}
          </p>
        );
      })}
    </div>
  );
};

export default ChapterBridge;
