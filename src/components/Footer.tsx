import React from "react";
import { ArrowUp, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-900 bg-[#09090b] text-zinc-500 text-xs py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Author & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
          <span className="font-semibold text-zinc-300">
            {lang === "th"
              ? portfolioData.personal.nameTh
              : portfolioData.personal.nameEn}
          </span>
          <span className="hidden sm:inline text-zinc-700">&bull;</span>
          <span className="font-mono text-[11px] text-zinc-500">
            &copy; {new Date().getFullYear()} Mobile Application Developer
          </span>
        </div>

        {/* Center: Built info */}
        <div className="font-mono text-[11px] text-zinc-500 text-center">
          <span>{t("สร้างด้วย", "Engineered with")} </span>
          <span className="text-zinc-400">React, TypeScript & Tailwind CSS</span>
        </div>

        {/* Right: GitHub & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3 h-3" />
            <span>{t("ขึ้นบนสุด", "Top")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
