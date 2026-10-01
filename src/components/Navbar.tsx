import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Menu, X } from "lucide-react";
import { useLanguage } from "../context";
import { getLenis, scrollToTop } from "../lib/lenis";

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
      id: "work",
      num: "02",
      label: t("ผลงาน", "WORK"),
      href: "#work",
    },
    {
      id: "capabilities",
      num: "03",
      label: t("ทักษะ", "CAPABILITIES"),
      href: "#capabilities",
    },
    {
      id: "timeline",
      num: "04",
      label: t("เส้นทาง", "TIMELINE"),
      href: "#timeline",
    },
    {
      id: "contact",
      num: "05",
      label: t("ติดต่อ", "CONTACT"),
      href: "#contact",
    },
  ];

  // Dynamic scroll offset calculation
  const getNavOffset = useCallback(() => {
    const navHeight = navContainerRef.current?.offsetHeight || 56;
    return navHeight + 20; // navbar height + comfortable editorial spacing
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string, e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      // Support aliases: work <-> projects, capabilities <-> skills, timeline <-> experience
      const targetElement =
        document.getElementById(sectionId) ||
        (sectionId === "work" ? document.getElementById("projects") : null) ||
        (sectionId === "capabilities"
          ? document.getElementById("skills")
          : null) ||
        (sectionId === "timeline"
          ? document.getElementById("experience")
          : null);

      if (!targetElement) return;

      const offset = getNavOffset();
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetPosition, { duration: 1.0 });
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
    },
    [getNavOffset],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Bottom of page threshold: activate contact immediately if scrolled to the end
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection("contact");
        return;
      }

      const sectionMappings: [string, string[]][] = [
        ["about", ["about"]],
        ["work", ["work", "projects"]],
        ["capabilities", ["capabilities", "skills"]],
        ["timeline", ["timeline", "experience"]],
        ["contact", ["contact"]],
      ];
      const offset = getNavOffset() + 32;
      const scrollPos = window.scrollY + offset;

      for (let i = sectionMappings.length - 1; i >= 0; i--) {
        const [canonicalId, candidateIds] = sectionMappings[i];
        let el: HTMLElement | null = null;
        for (const cid of candidateIds) {
          el = document.getElementById(cid);
          if (el) break;
        }
        if (el) {
          // Use absolute document position instead of offsetTop to be robust against relative parents
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(canonicalId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Initial hash scroll resolution on page load/mount
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        scrollToSection(hashId);
      }, 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollToSection, getNavOffset]);

  const mobileMenuRef = useRef<HTMLElement>(null);

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

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      <motion.div
        ref={navContainerRef}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-[#07080c]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.65)] py-1.5 px-3 sm:px-4"
            : "bg-[#07080c]/60 backdrop-blur-md border border-white/[0.06] shadow-[0_6px_24px_rgba(0,0,0,0.25)] py-1.5 px-3 sm:px-4"
        }`}
      >
        {/* Left: Brand Lockup */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
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
                    ? "text-[#00f0ff] font-medium bg-white/[0.03]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00f0ff]/90 rounded-full"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 transition-transform duration-200">
                  <span
                    className={`font-mono transition-colors ${
                      isActive
                        ? "text-[#00f0ff]/70"
                        : "text-zinc-500 group-hover:text-zinc-400"
                    }`}
                  >
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
            type="button"
            onClick={toggleLang}
            data-cursor-text="LANG"
            aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.7)] shrink-0" />
            <span
              className={
                lang === "th"
                  ? "text-[#00f0ff] font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }
            >
              TH
            </span>
            <span className="text-zinc-600 text-[10px]">/</span>
            <span
              className={
                lang === "en"
                  ? "text-[#00f0ff] font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
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
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
          <motion.nav
            ref={mobileMenuRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
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
                        ? "bg-white/[0.04] text-[#00f0ff] font-medium border-l-2 border-[#00f0ff]"
                        : "text-zinc-300 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[11px] ${isActive ? "text-[#00f0ff]/70" : "text-zinc-400"}`}
                      >
                        {link.num} /
                      </span>
                      <span>{link.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Utility Footer (Language switch & CV) */}
            <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
              {/* Language Switch */}
              <button
                type="button"
                onClick={toggleLang}
                aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 rounded-full cursor-pointer hover:bg-white/[0.08]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                <span
                  className={
                    lang === "th" ? "text-white font-bold" : "text-zinc-400"
                  }
                >
                  TH
                </span>
                <span className="text-zinc-600">/</span>
                <span
                  className={
                    lang === "en" ? "text-white font-bold" : "text-zinc-400"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
