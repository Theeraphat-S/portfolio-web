import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Globe, FileText } from "lucide-react";
import { useLanguage } from "../context";
import { portfolioData } from "../data/portfolioData";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projects");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ["projects", "about", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "projects", name: t("ผลงาน", "Works"), href: "#projects" },
    { id: "about", name: t("แนวคิด", "Approach"), href: "#about" },
    { id: "skills", name: t("ทักษะ", "Skills"), href: "#skills" },
    {
      id: "experience",
      name: t("ประสบการณ์", "Experience"),
      href: "#experience",
    },
    { id: "contact", name: t("ติดต่อ", "Contact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Dynamic Island Container */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-500 ease-apple flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 ${
          scrolled
            ? "bg-white/80 dark:bg-[#070a12]/85 backdrop-blur-2xl ring-1 ring-slate-900/10 dark:ring-white/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_22px_50px_-12px_rgba(0,0,0,0.75)]"
            : "bg-white/65 dark:bg-[#070a12]/65 backdrop-blur-xl ring-1 ring-slate-900/5 dark:ring-white/[0.08] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.5)]"
        } shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]`}
      >
        {/* Left: Avatar & Identity Pill */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none rounded-full pr-1.5"
        >
          <div className="relative w-8 h-8 rounded-full ring-1 ring-cyan-500/40 p-0.5 bg-slate-100 dark:bg-[#0e1422] shrink-0 shadow-xs">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full rounded-full object-cover object-[55%_35%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                {lang === "th"
                  ? portfolioData.personal.nameTh
                  : "Theeraphat S."}
              </span>
              {/* Telemetry Emerald Beacon */}
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full ring-1 ring-emerald-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-none mt-0.5 hidden xs:inline">
              Flutter &bull; Mobile Dev
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Segmented Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-white/[0.04] p-1 rounded-full ring-1 ring-slate-200/60 dark:ring-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1 text-xs font-mono font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-slate-950 dark:text-white font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-xs ring-1 ring-slate-200 dark:ring-white/15"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Controls & Island CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.05] hover:bg-slate-200/80 dark:hover:bg-white/[0.1] ring-1 ring-slate-200/70 dark:ring-white/[0.08] rounded-full transition-all cursor-pointer"
          >
            <Globe className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
            <span
              className={
                lang === "th" ? "text-cyan-600 dark:text-cyan-400 font-bold" : ""
              }
            >
              TH
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span
              className={
                lang === "en" ? "text-cyan-600 dark:text-cyan-400 font-bold" : ""
              }
            >
              EN
            </span>
          </button>

          {/* Download CV (Desktop) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.05] hover:ring-cyan-400/50 ring-1 ring-slate-200/70 dark:ring-white/[0.08] rounded-full transition-all"
            title="Download Resume CV"
          >
            <FileText className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
            <span>CV</span>
          </a>

          {/* Island Primary CTA with Nested Trailing Icon */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="hidden xs:inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1 text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-full transition-all shadow-[0_4px_16px_rgba(6,182,212,0.3)] group cursor-pointer"
          >
            <span>{t("ติดต่อ", "Let’s talk")}</span>
            <span className="w-5 h-5 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-3 h-3 text-slate-950" />
            </span>
          </motion.a>

          {/* Mobile Menu Morph Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="relative w-8 h-8 md:hidden flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.06] ring-1 ring-slate-200 dark:ring-white/10 rounded-full transition-colors cursor-pointer"
          >
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-all duration-300 ease-apple ${
                mobileMenuOpen
                  ? "rotate-45 translate-y-[2.75px]"
                  : ""
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-all duration-300 ease-apple ${
                mobileMenuOpen
                  ? "-rotate-45 -translate-y-[2.75px]"
                  : ""
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu as Floating Glass Island with Staggered Mask Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="pointer-events-auto md:hidden w-full max-w-sm mt-3 rounded-3xl bg-white/95 dark:bg-[#070a12]/95 backdrop-blur-2xl ring-1 ring-slate-200 dark:ring-white/10 p-5 shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-1.5 text-xs font-mono tracking-wider text-slate-700 dark:text-slate-300">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-cyan-400 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{link.name}</span>
                  <span className="text-slate-400 dark:text-slate-600 text-[10px]">
                    #{link.id}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-cyan-400"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download CV</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold rounded-full shadow-md"
              >
                <span>{t("ติดต่อ", "Let’s talk")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
