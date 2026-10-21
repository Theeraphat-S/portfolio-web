import type { MotionValue } from "motion/react";

export type Language = "th" | "en";

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (thText: string, enText: string) => string;
}

export interface StoryScrollContextType {
  /** Index into STORY_CHAPTERS of the chapter under the reading line. */
  activeIndex: number;
  /** Continuous story position: 2.5 is halfway through the third chapter. */
  position: MotionValue<number>;
}
