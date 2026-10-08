import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface BilingualStackProps {
  th: React.ReactNode;
  en: React.ReactNode;
  as?: "p" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
}

/**
 * Renders both languages in the same grid cell and hides the inactive one,
 * so the block always reserves the taller height and toggling TH/EN can't
 * shift the layout below it.
 */
export const BilingualStack: React.FC<BilingualStackProps> = ({
  th,
  en,
  as: Tag = "p",
  className = "",
}) => {
  const { lang } = useLanguage();
  const layer = "col-start-1 row-start-1";
  return (
    <div className="grid">
      <Tag
        lang="th"
        aria-hidden={lang !== "th"}
        className={`${layer} ${className} ${lang === "th" ? "" : "invisible"}`}
      >
        {th}
      </Tag>
      <Tag
        lang="en"
        aria-hidden={lang !== "en"}
        className={`${layer} ${className} ${lang === "en" ? "" : "invisible"}`}
      >
        {en}
      </Tag>
    </div>
  );
};

export default BilingualStack;
