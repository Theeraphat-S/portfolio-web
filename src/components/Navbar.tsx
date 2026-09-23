import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
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
    { name: t("เกี่ยวกับ", "About"), href: "#about" },
    { name: t("ผลงาน", "Projects"), href: "#projects" },
    { name: t("ทักษะ", "Skills"), href: "#skills" },
    { name: t("ประสบการณ์", "Experience"), href: "#experience" },
    { name: t("ติดต่อ", "Contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-[#09090b]/90 backdrop-blur-md border-zinc-800"
          : "bg-[#09090b]/60 backdrop-blur-sm border-zinc-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Identity */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
        >
          <div className="w-8 h-8 rounded border border-zinc-700 overflow-hidden bg-zinc-900 shrink-0">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-zinc-100 tracking-tight">
                {lang === "th" ? portfolioData.personal.nameTh : "Theeraphat S."}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              Mobile Developer &bull; Flutter
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-zinc-100 transition-colors py-1 focus:outline-none focus-visible:text-emerald-400"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-800" />

          {/* Controls: Language & Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 rounded transition-colors"
            >
              <Globe className="w-3 h-3 text-zinc-500" />
              <span className={lang === "th" ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                TH
              </span>
              <span className="text-zinc-600">/</span>
              <span className={lang === "en" ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                EN
              </span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-zinc-950 bg-zinc-100 hover:bg-emerald-400 rounded transition-colors font-medium"
            >
              <span>{t("ติดต่อ", "Contact")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-zinc-400 border border-zinc-800 rounded"
          >
            <span className={lang === "th" ? "text-emerald-400 font-bold" : ""}>TH</span>
            <span className="text-zinc-600">/</span>
            <span className={lang === "en" ? "text-emerald-400 font-bold" : ""}>EN</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-1.5 text-zinc-400 hover:text-zinc-100 border border-zinc-800 rounded"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-mono uppercase tracking-wider text-zinc-300">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-zinc-900 rounded transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              theeraphat.sm@gmail.com
            </span>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono bg-emerald-500 text-zinc-950 font-bold rounded"
            >
              {t("พูดคุย", "Get in touch")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
