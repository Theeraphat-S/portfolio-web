import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Menu, X } from "lucide-react";
import { useLanguage } from "../context";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Reordered navigation items: ABOUT is 01, WORK is 02
  const navLinks = [
    {
      id: "about",
      num: "01",
      label: t("ตัวตน", "ABOUT"),
      href: "#about",
    },
    {
      id: "projects",
      num: "02",
      label: t("ผลงาน", "WORK"),
      href: "#projects",
    },
    {
      id: "skills",
      num: "03",
      label: t("ทักษะ", "CAPABILITIES"),
      href: "#skills",
    },
    {
      id: "experience",
      num: "04",
      label: t("เส้นทาง", "TIMELINE"),
      href: "#experience",
    },
    {
      id: "contact",
      num: "05",
      label: t("ติดต่อ", "CONTACT"),
      href: "#contact",
    },
  ];

  // Dynamic scroll offset calculation
  const getNavOffset = () => {
    const navHeight = navContainerRef.current?.offsetHeight || 64;
    return navHeight + 24; // navbar height + comfortable editorial spacing
  };

  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;

    const offset = getNavOffset();
    const targetPosition =
      el.getBoundingClientRect().top + window.pageYOffset - offset;

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (target: number, opts: { duration?: number }) => void;
        };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(targetPosition, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    }

    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    // Update URL hash without causing an instant browser jump
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sectionIds = [
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
      ];
      const offset = getNavOffset() + 40;
      const scrollPos = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      <motion.div
        ref={navContainerRef}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-[#07080c]/90 backdrop-blur-xl border border-[#00f0ff]/20 shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_20px_rgba(0,240,255,0.03)] py-1.5 px-3 sm:px-4"
            : "bg-[#07080c]/60 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.35)] py-2 px-3 sm:px-5"
        }`}
      >
        {/* Left: Brand Lockup */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const lenis = (
              window as unknown as {
                __lenis?: {
                  scrollTo: (
                    target: number,
                    opts: { duration?: number },
                  ) => void;
                };
              }
            ).__lenis;
            if (lenis) {
              lenis.scrollTo(0, { duration: 1.1 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          data-cursor-text="TOP"
          aria-label="Theeraphat Srimontha - Back to top"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] rounded-full pr-1 shrink-0"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/15 shrink-0 bg-white/[0.04]">
            <img
              src="/profile.jpg"
              alt="Theeraphat Srimontha"
              className="w-full h-full object-cover object-[55%_35%] transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-mono font-bold text-xs sm:text-[13px] text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                THEERAPHAT S.
              </span>
              <span
                aria-label="Online status indicator"
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_#10b981] shrink-0"
              />
            </div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline-block leading-tight mt-1">
              MOBILE ENGINEER
            </span>
          </div>
        </a>

        {/* Center: Desktop Technical Navigation Menu */}
        <nav
          role="navigation"
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.06]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(link.id, e)}
                data-cursor-text="GOTO"
                aria-current={isActive ? "page" : undefined}
                className={`relative px-2.5 lg:px-3 py-1 text-[11px] font-mono tracking-wider transition-colors duration-200 inline-flex items-center gap-1 group rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                  isActive
                    ? "text-[#00f0ff] font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#00f0ff]/[0.09] border border-[#00f0ff]/30 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.12)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-[1px]">
                  <span className="text-zinc-500 font-mono group-hover:text-zinc-400 transition-colors">
                    {link.num}
                  </span>
                  <span className="mx-0.5 text-zinc-600">/</span>
                  <span>{link.label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right: Secondary Utility Controls ([ LANGUAGE ] [ CV ]) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switch: ◉ TH / EN */}
          <button
            onClick={toggleLang}
            data-cursor-text="LANG"
            aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
            className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/80 shadow-[0_0_4px_rgba(0,240,255,0.5)] shrink-0" />
            <span
              className={
                lang === "th" ? "text-white font-semibold" : "text-zinc-500"
              }
            >
              TH
            </span>
            <span className="text-zinc-600 text-[10px]">/</span>
            <span
              className={
                lang === "en" ? "text-white font-semibold" : "text-zinc-500"
              }
            >
              EN
            </span>
          </button>

          {/* CV Button: [ ↓ CV ] */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="RESUME"
            aria-label="View Curriculum Vitae (PDF)"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-[#00f0ff]/[0.08] border border-white/[0.08] hover:border-[#00f0ff]/40 rounded-full transition-all group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <ArrowDown className="w-3 h-3 text-[#00f0ff] group-hover:translate-y-0.5 transition-transform duration-200" />
            <span className="tracking-wider">CV</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <span>MENU</span>
            {mobileMenuOpen ? (
              <X className="w-3.5 h-3.5 text-[#00f0ff]" />
            ) : (
              <Menu className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden w-full max-w-sm mt-2 rounded-2xl bg-[#07080c]/95 backdrop-blur-xl border border-white/10 p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] space-y-3"
          >
            {/* Nav list 01-05 */}
            <div className="flex flex-col space-y-0.5 text-xs font-mono tracking-wider">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#00f0ff]/10 text-[#00f0ff] font-semibold border border-[#00f0ff]/20"
                        : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-mono text-[11px]">
                        {link.num} /
                      </span>
                      <span>{link.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Utility Footer (Language switch & CV) */}
            <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
              {/* Language Switch */}
              <button
                onClick={toggleLang}
                aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 rounded-full cursor-pointer hover:bg-white/[0.08]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                <span
                  className={
                    lang === "th" ? "text-white font-bold" : "text-zinc-500"
                  }
                >
                  TH
                </span>
                <span className="text-zinc-600">/</span>
                <span
                  className={
                    lang === "en" ? "text-white font-bold" : "text-zinc-500"
                  }
                >
                  EN
                </span>
              </button>

              {/* CV Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-[#00f0ff]/10 border border-white/10 hover:border-[#00f0ff]/30 rounded-full transition-colors"
              >
                <ArrowDown className="w-3 h-3 text-[#00f0ff]" />
                <span>CV (RESUME)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
