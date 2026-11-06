import React from "react";
import { useLanguage } from "../context/LanguageContext";

type StackTag = "p" | "h2" | "h3" | "h4" | "span" | "div";

interface BilingualStackProps {
  th: React.ReactNode;
  en: React.ReactNode;
  as?: StackTag;
  className?: string;
}

const HEADINGS = new Set<StackTag>(["h2", "h3", "h4"]);

/**
 * Renders both languages in the same grid cell and hides the inactive one,
 * so the block always reserves the taller height and toggling TH/EN can't
 * shift the layout below it. The hidden copy of a heading renders as a
 * div with the same classes, so the outline has one heading per title.
 */
export const BilingualStack: React.FC<BilingualStackProps> = ({
  th,
  en,
  as: Tag = "p",
  className = "",
}) => {
  const { lang } = useLanguage();
  const layer = "col-start-1 row-start-1";
  const HiddenTag: StackTag = HEADINGS.has(Tag) ? "div" : Tag;
  const ThTag = lang === "th" ? Tag : HiddenTag;
  const EnTag = lang === "en" ? Tag : HiddenTag;
  return (
    <div className="grid">
      <ThTag
        lang="th"
        aria-hidden={lang !== "th"}
        className={`${layer} ${className} ${lang === "th" ? "" : "invisible"}`}
      >
        {th}
      </ThTag>
      <EnTag
        lang="en"
        aria-hidden={lang !== "en"}
        className={`${layer} ${className} ${lang === "en" ? "" : "invisible"}`}
      >
        {en}
      </EnTag>
    </div>
  );
};

export default BilingualStack;
