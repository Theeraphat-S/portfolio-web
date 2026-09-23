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
    <footer className="border-t border-zinc-200 dark:border-[#243b30] bg-[#f7f7f6] dark:bg-[#18231d] text-zinc-500 dark:text-[#969696] text-xs py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Author & Geographic status (Karolina Style) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
          <span className="font-bold text-[#18231d] dark:text-[#fafafa]">
            &copy; {new Date().getFullYear()}{" "}
            {lang === "th"
              ? portfolioData.personal.nameTh
              : portfolioData.personal.nameEn}
          </span>
          <span className="hidden sm:inline text-zinc-400 dark:text-[#243b30]">&bull;</span>
          <span className="font-mono text-[11px] text-zinc-600 dark:text-[#969696]">
            Based in Chiang Mai, Thailand &bull; Working Worldwide
          </span>
        </div>

        {/* Center: Handcrafted credit */}
        <div className="font-mono text-[11px] text-zinc-500 dark:text-[#969696] text-center">
          <span>{t("พัฒนาด้วย", "Handcrafted with")} </span>
          <span className="text-[#18231d] dark:text-[#bfdb39] font-medium">React & Tailwind CSS</span>
        </div>

        {/* Right: GitHub & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-[#18231d] dark:text-[#969696] dark:hover:text-[#bfdb39] transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-mono text-[#18231d] dark:text-[#e9e8e8] hover:text-[#18231d] dark:hover:text-[#fafafa] bg-white dark:bg-[#121e17] hover:bg-[#bfdb39] dark:hover:bg-[#bfdb39] dark:hover:text-[#18231d] border border-zinc-200 dark:border-[#243b30] rounded-lg transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3 h-3" />
            <span>{t("ขึ้นบนสุด", "TOP")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
