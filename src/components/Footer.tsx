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
    <footer className="border-t border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-[#05070d] text-slate-500 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Author & Geographic status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            &copy; {new Date().getFullYear()}{" "}
            {lang === "th"
              ? portfolioData.personal.nameTh
              : portfolioData.personal.nameEn}
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-white/20">
            &bull;
          </span>
          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
            Based in Chiang Mai, Thailand &bull; Working Worldwide
          </span>
        </div>

        {/* Center: Handcrafted credit */}
        <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 text-center">
          <span>{t("พัฒนาด้วย", "Handcrafted with")} </span>
          <span className="text-slate-900 dark:text-cyan-400 font-medium">
            React, Vite & Tailwind CSS
          </span>
        </div>

        {/* Right: GitHub & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" strokeWidth={1.5} />
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-950 bg-white dark:bg-white/[0.05] hover:bg-cyan-400 dark:hover:bg-cyan-400 ring-1 ring-slate-200 dark:ring-white/10 rounded-full transition-all cursor-pointer group"
            aria-label="Scroll back to top"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-3 h-3" strokeWidth={2} />
            </span>
            <span>{t("ขึ้นบนสุด", "TOP")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
