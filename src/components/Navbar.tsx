import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Globe, FileText } from "lucide-react";
import { useLanguage } from "../context";
import { portfolioData } from "../data/portfolioData";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("ผลงาน", "WORKS"), href: "#projects" },
    { name: t("แนวคิด", "APPROACH"), href: "#about" },
    { name: t("ทักษะ", "SKILLS"), href: "#skills" },
    { name: t("ประสบการณ์", "EXPERIENCE"), href: "#experience" },
    { name: t("ติดต่อ", "CONTACT"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-slate-200 dark:border-slate-800/80"
          : "bg-white/60 dark:bg-[#0b0f19]/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-800/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Identity */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500"
        >
          <div className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-[#111827] shrink-0">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                {lang === "th" ? portfolioData.personal.nameTh : "Theeraphat S."}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.2 rounded border border-sky-200 dark:border-sky-800/60 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse" />
                Available
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Mobile Dev &bull; Flutter
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-slate-100 hover:border-b-2 hover:border-sky-400 transition-all py-1 focus:outline-none"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Controls: Language, Resume & Contact CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span className={lang === "th" ? "text-sky-600 dark:text-sky-400 font-bold" : ""}>
                TH
              </span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className={lang === "en" ? "text-sky-600 dark:text-sky-400 font-bold" : ""}>
                EN
              </span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 hover:border-sky-400 rounded transition-colors"
              title="Download Resume"
            >
              <FileText className="w-3 h-3 text-sky-500 dark:text-sky-400" />
              <span>CV</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-mono text-slate-950 bg-sky-500 hover:bg-sky-400 rounded transition-colors font-bold shadow-xs cursor-pointer"
            >
              <span>{t("ติดต่อ", "Let’s talk")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-800 rounded cursor-pointer"
          >
            <span className={lang === "th" ? "text-sky-500 font-bold" : ""}>TH</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className={lang === "en" ? "text-sky-500 font-bold" : ""}>EN</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-800 rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-slate-100 dark:hover:bg-[#111827] rounded transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:underline"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Resume CV</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono bg-sky-500 text-slate-950 font-bold rounded"
            >
              {t("พูดคุย", "Let’s talk")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
