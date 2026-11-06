import React from "react";
import { ArrowUp, Github, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolioData";
import { scrollToTop } from "../lib/lenis";
import { BilingualStack } from "./BilingualStack";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line bg-void text-zinc-400 text-xs py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Author & Geographic status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
          {/* Both languages share one cell, so the footer keeps the
              taller height and toggling TH/EN never moves it. */}
          <BilingualStack
            as="span"
            className="font-mono font-bold text-white tracking-tight min-w-[170px]"
            th={
              <>
                &copy; {year} {portfolioData.personal.nameTh}
              </>
            }
            en={
              <>
                &copy; {year} {portfolioData.personal.nameEn}
              </>
            }
          />
          <BilingualStack
            as="span"
            className="font-mono text-xs text-zinc-400 min-w-[180px]"
            th={portfolioData.personal.locationTh}
            en={portfolioData.personal.locationEn}
          />
        </div>

        {/* Center: Engineering Stack */}
        <div className="font-mono text-xs text-zinc-400 text-center min-w-[220px]">
          <span>{t("สร้างด้วย ", "Built with ")}</span>
          <span className="text-zinc-300 font-medium">
            React, Vite & Tailwind CSS
          </span>
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="GITHUB"
            className="p-2.5 rounded-full bg-white/[0.03] text-zinc-400 hover:text-signal hover:bg-white/[0.06] transition-colors border border-line focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            aria-label="GitHub profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          <a
            href={`mailto:${portfolioData.personal.email}`}
            data-cursor-text="EMAIL"
            className="p-2.5 rounded-full bg-white/[0.03] text-zinc-400 hover:text-signal hover:bg-white/[0.06] transition-colors border border-line focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            aria-label="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor-text="TOP"
            className="inline-flex items-center gap-1.5 px-3.5 min-h-9 text-xs font-mono font-medium text-zinc-400 hover:text-signal bg-white/[0.03] hover:bg-signal/10 border border-line hover:border-signal/30 rounded-full transition cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            <span>TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
