import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Globe, FileText } from "lucide-react";
import { useLanguage } from "../context";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projects");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["projects", "about", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 220;

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
    { id: "projects", name: t("01 / ผลงาน", "01 / WORK"), href: "#projects" },
    { id: "about", name: t("02 / ตัวตน", "02 / ABOUT"), href: "#about" },
    {
      id: "skills",
      name: t("03 / ทักษะ", "03 / CAPABILITIES"),
      href: "#skills",
    },
    {
      id: "experience",
      name: t("04 / เส้นทาง", "04 / TIMELINE"),
      href: "#experience",
    },
    { id: "contact", name: t("05 / ติดต่อ", "05 / CONTACT"), href: "#contact" },
  ];

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-5 py-2 ${
          scrolled
            ? "bg-[#07080c]/90 dark:bg-[#07080c]/90 backdrop-blur-md border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
            : "bg-[#07080c]/60 dark:bg-[#07080c]/60 backdrop-blur-sm border border-white/[0.08]"
        }`}
      >
        {/* Left: Identity Mark */}
        <a
          href="#"
          data-cursor-text="HOME"
          className="flex items-center gap-2.5 group focus:outline-none rounded-full pr-2"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full object-cover object-[55%_35%] transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-xs sm:text-sm text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                THEERAPHAT S.
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
            </div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
              MOBILE ENGINEER
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                data-cursor-text="GOTO"
                className={`relative px-3 py-1 text-[11px] font-mono tracking-wider transition-colors ${
                  isActive
                    ? "text-[#07080c] font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#00f0ff] rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Controls & CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switch */}
          <button
            onClick={toggleLang}
            data-cursor-text="LANG"
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-full transition-all cursor-pointer"
          >
            <Globe className="w-3 h-3 text-[#00f0ff]" />
            <span className={lang === "th" ? "text-[#00f0ff] font-bold" : ""}>
              TH
            </span>
            <span className="text-zinc-600">/</span>
            <span className={lang === "en" ? "text-[#00f0ff] font-bold" : ""}>
              EN
            </span>
          </button>

          {/* CV Link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="RESUME"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-white/[0.05] hover:border-[#00f0ff]/40 border border-white/[0.08] rounded-full transition-all"
          >
            <FileText className="w-3 h-3 text-[#00f0ff]" />
            <span>CV</span>
          </a>

          {/* Direct CTA */}
          <a
            href="#contact"
            data-cursor-text="CONTACT"
            className="hidden xs:inline-flex items-center gap-1.5 pl-3 pr-2 py-1 text-[11px] font-mono font-bold text-[#07080c] bg-[#00f0ff] hover:bg-[#38bdf8] rounded-full transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] group cursor-pointer"
          >
            <span>{t("ติดต่อ", "LET'S TALK")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#07080c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-7 h-7 md:hidden flex flex-col items-center justify-center gap-1 text-zinc-300 bg-white/[0.06] border border-white/10 rounded-full transition-colors cursor-pointer"
          >
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[2.75px]" : ""
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[2.75px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden w-full max-w-sm mt-3 rounded-2xl bg-[#0c0e14]/95 backdrop-blur-xl border border-white/10 p-5 shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-1 text-xs font-mono tracking-wider text-zinc-300">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/[0.05] hover:text-[#00f0ff] transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold">{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-[#00f0ff]"
              >
                <FileText className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>DOWNLOAD CV</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold bg-[#00f0ff] text-[#07080c] rounded-full"
              >
                <span>{t("ติดต่อ", "LET'S TALK")}</span>
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
