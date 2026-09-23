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
          ? "bg-[#f7f7f6]/90 dark:bg-[#18231d]/90 backdrop-blur-md border-zinc-200 dark:border-[#243b30]"
          : "bg-[#f7f7f6]/60 dark:bg-[#18231d]/60 backdrop-blur-sm border-zinc-200/50 dark:border-[#243b30]/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Identity */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#bfdb39]"
        >
          <div className="w-8 h-8 rounded border border-zinc-300 dark:border-[#243b30] overflow-hidden bg-zinc-200 dark:bg-[#121e17] shrink-0">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#18231d] dark:text-[#fafafa] tracking-tight">
                {lang === "th" ? portfolioData.personal.nameTh : "Theeraphat S."}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#18231d] dark:text-[#bfdb39] bg-[#bfdb39]/20 dark:bg-[#bfdb39]/15 px-1.5 py-0.2 rounded border border-[#bfdb39]/40 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bfdb39] animate-pulse" />
                Available
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-[#969696]">
              Mobile Dev &bull; Flutter
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-[#969696]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#18231d] dark:hover:text-[#fafafa] hover:border-b-2 hover:border-[#bfdb39] transition-all py-1 focus:outline-none"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-[#243b30]" />

          {/* Controls: Language, Resume & Contact CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-zinc-600 dark:text-[#969696] hover:text-[#18231d] dark:hover:text-[#fafafa] border border-zinc-200 dark:border-[#243b30] hover:border-zinc-300 dark:hover:border-[#355243] rounded transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3 text-zinc-400 dark:text-[#969696]" />
              <span className={lang === "th" ? "text-[#18231d] dark:text-[#bfdb39] font-bold" : ""}>
                TH
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span className={lang === "en" ? "text-[#18231d] dark:text-[#bfdb39] font-bold" : ""}>
                EN
              </span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-[#e9e8e8] hover:text-[#18231d] dark:hover:text-white border border-zinc-300 dark:border-[#243b30] hover:border-[#bfdb39] rounded transition-colors"
              title="Download Resume"
            >
              <FileText className="w-3 h-3 text-[#bfdb39]" />
              <span>CV</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-mono text-[#18231d] bg-[#bfdb39] hover:bg-[#aebd33] rounded transition-colors font-bold shadow-xs"
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
            className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-zinc-700 dark:text-[#969696] border border-zinc-300 dark:border-[#243b30] rounded cursor-pointer"
          >
            <span className={lang === "th" ? "text-[#bfdb39] font-bold" : ""}>TH</span>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span className={lang === "en" ? "text-[#bfdb39] font-bold" : ""}>EN</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-1.5 text-zinc-700 dark:text-[#969696] hover:text-[#18231d] dark:hover:text-[#fafafa] border border-zinc-300 dark:border-[#243b30] rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-[#243b30] bg-[#f7f7f6] dark:bg-[#18231d] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-mono uppercase tracking-wider text-zinc-700 dark:text-[#e9e8e8]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-zinc-100 dark:hover:bg-[#121e17] rounded transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-[#243b30] flex items-center justify-between">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 dark:text-[#969696] hover:underline"
            >
              <FileText className="w-3.5 h-3.5 text-[#bfdb39]" />
              <span>Resume CV</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono bg-[#bfdb39] text-[#18231d] font-bold rounded"
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
