import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Globe,
  Smartphone,
  Code2,
  Briefcase,
  Mail,
  User,
  Github,
  Sun,
  Moon,
} from "lucide-react";
import { useLanguage, useTheme } from "../context";
import { portfolioData } from "../data/portfolioData";
import { Magnet } from "./reactbits/Magnet";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: t("เกี่ยวกับฉัน", "About"),
      href: "#about",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: t("ผลงานเด่น", "Projects"),
      href: "#projects",
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      name: t("ทักษะ", "Skills"),
      href: "#skills",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      name: t("ประสบการณ์", "Experience"),
      href: "#experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      name: t("ติดต่อ", "Contact"),
      href: "#contact",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/80 py-3 shadow-xl dark:shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand with Profile Avatar */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Theeraphat S.
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 -mt-0.5">
                Mobile Dev &bull; Flutter
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                data-cursor-text="Navigate"
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Utility Controls: Theme Toggle & Language & Direct CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Switcher */}
            <Magnet padding={16} magnetStrength={0.25}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                data-cursor-text="Theme"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/70 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-200 transition-all hover:scale-105 cursor-pointer"
                title={
                  theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            </Magnet>

            {/* Language Switcher */}
            <Magnet padding={16} magnetStrength={0.25}>
              <button
                onClick={toggleLang}
                aria-label="Language switch"
                data-cursor-text="Language"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/70 hover:border-cyan-500/50 text-xs font-mono text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-500" />
                <span
                  className={
                    lang === "th"
                      ? "text-cyan-600 dark:text-cyan-400 font-bold"
                      : "text-zinc-400"
                  }
                >
                  TH
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span
                  className={
                    lang === "en"
                      ? "text-cyan-600 dark:text-cyan-400 font-bold"
                      : "text-zinc-400"
                  }
                >
                  EN
                </span>
              </button>
            </Magnet>

            {/* Direct Contact / Resume CTA */}
            <Magnet padding={16} magnetStrength={0.3}>
              <a
                href="#contact"
                data-cursor-text="Hire Me"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t("ติดต่อฉัน", "Hire Me")}</span>
              </a>
            </Magnet>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-2xl p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-sm font-medium text-zinc-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                >
                  <span className="text-cyan-400">{link.icon}</span>
                  {link.name}
                </a>
              ))}

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80 mt-2">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-zinc-300"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  github.com/Theeraphat-S
                </a>

                <button
                  onClick={toggleLang}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-cyan-400"
                >
                  {lang === "th" ? "สลับเป็น EN" : "Switch to TH"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
