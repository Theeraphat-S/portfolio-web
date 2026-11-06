import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { chapterFor, chapterNumber } from "../data";

interface ChapterEyebrowProps {
  /** Section id from STORY_CHAPTERS. */
  id: string;
  className?: string;
}

/**
 * The `NN Label` line that opens a chapter. Number and label both come
 * from STORY_CHAPTERS, so the eyebrow always agrees with StoryProgress.
 */
export const ChapterEyebrow: React.FC<ChapterEyebrowProps> = ({
  id,
  className = "",
}) => {
  const { t } = useLanguage();
  const chapter = chapterFor(id);
  return (
    <span className={`editorial-eyebrow text-primary ${className}`}>
      <span className="text-muted tabular-nums">{chapterNumber(id)}</span>
      {t(chapter.labelTh, chapter.labelEn)}
    </span>
  );
};
