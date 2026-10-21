import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { StoryScrollContext } from "./StoryScrollContextInstance";
import { STORY_CHAPTERS } from "../data/chapters";
import { CHAPTER_OFFSET, scrollToElement } from "../lib/lenis";

/** Share of the viewport height where a chapter counts as being read. */
const READING_LINE = 0.4;

/**
 * Tracks which chapter sits under the reading line and how far through it
 * the reader is, and mirrors the chapter into the URL hash.
 */
export const StoryScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { scrollY } = useScroll();
  const position = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // Scroll offsets where each chapter starts, followed by the page's end.
  const stopsRef = useRef<number[]>([]);
  // Hash writes wait until a deep link has landed, or they would clear it.
  const hashReadyRef = useRef(false);

  const update = useCallback(
    (y: number) => {
      const stops = stopsRef.current;
      const last = stops.length - 2;
      if (last < 0) return;
      let index = 0;
      while (index < last && y >= stops[index + 1]) index++;
      const span = stops[index + 1] - stops[index];
      const progress =
        span > 0 ? Math.min(1, Math.max(0, (y - stops[index]) / span)) : 1;
      position.set(index + progress);
      setActiveIndex(index);
    },
    [position],
  );

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const measure = () => {
      const lead = window.innerHeight * READING_LINE;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      const starts = STORY_CHAPTERS.map(({ id }) => {
        const el = document.getElementById(id);
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
        // The last chapter may never reach the reading line; clamping keeps
        // a span for it to fill before the page ends.
        return Math.min(Math.max(top - lead, 0), end);
      });
      stopsRef.current = [...starts, end];
      update(window.scrollY);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [update]);

  // Deep links land after the load event and web fonts, so the offset
  // matches the final layout and the browser's own fragment jump, which it
  // retries at load, does not move the page afterwards.
  useEffect(() => {
    const target = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1)),
    );
    if (!target) {
      hashReadyRef.current = true;
      return;
    }
    let cancelled = false;
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true }),
          );
    Promise.all([loaded, document.fonts.ready]).then(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        scrollToElement(target, CHAPTER_OFFSET, { immediate: true });
        hashReadyRef.current = true;
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // replaceState keeps Back from stepping through every chapter passed.
  useEffect(() => {
    if (!hashReadyRef.current) return;
    const hash = activeIndex === 0 ? "" : `#${STORY_CHAPTERS[activeIndex].id}`;
    if (window.location.hash === hash) return;
    const { pathname, search } = window.location;
    window.history.replaceState(
      window.history.state,
      "",
      pathname + search + hash,
    );
  }, [activeIndex]);

  return (
    <StoryScrollContext.Provider value={{ activeIndex, position }}>
      {children}
    </StoryScrollContext.Provider>
  );
};
