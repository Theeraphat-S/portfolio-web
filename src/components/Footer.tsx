import React from "react";
import { ArrowUp, Smartphone, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-zinc-200 font-bold">
              {lang === "th"
                ? portfolioData.personal.nameTh
                : portfolioData.personal.nameEn}
            </p>
            <p className="text-zinc-500 font-mono text-[11px]">
              &copy; {new Date().getFullYear()} &bull; Mobile Application
              Developer
            </p>
          </div>
        </div>

        {/* Tech Stack Credits */}
        <div className="flex items-center gap-2 text-zinc-500 text-center sm:text-left">
          <span>{t("พัฒนาด้วย", "Built with")}</span>
          <span className="text-zinc-300 font-mono">React</span>
          <span>&bull;</span>
          <span className="text-zinc-300 font-mono">Tailwind CSS</span>
          <span>&bull;</span>
          <span className="text-cyan-400 font-mono font-medium">
            React Bits
          </span>
        </div>

        {/* Links & Scroll to Top */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[11px] font-mono">
              {t("ขึ้นบนสุด", "Top")}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
