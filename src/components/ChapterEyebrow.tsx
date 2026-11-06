import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { chapterFor, chapterNumber } from "../data";

interface ChapterEyebrowProps {
  /** Section id from STORY_CHAPTERS. */
  id: string;
  className?: string;
}

/**
 * The `NN // LABEL` line that opens a chapter. Number and label both come
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
      {chapterNumber(id)} // {t(chapter.labelTh, chapter.labelEn)}
    </span>
  );
};
