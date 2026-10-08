import React, { useEffect, useId, useRef, useState } from "react";
import { FileText, Languages, Mail, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { scrollToElement } from "../lib/lenis";
import { personalData } from "../data";

const chapters = [
  { id: "intro", labelEn: "INTRO", labelTh: "แนะนำตัว" },
  { id: "about", labelEn: "APPROACH", labelTh: "แนวคิด" },
  { id: "work", labelEn: "SELECTED WORK", labelTh: "ผลงานเด่น" },
  { id: "capabilities", labelEn: "CAPABILITIES", labelTh: "ความสามารถ" },
  { id: "timeline", labelEn: "EXPERIENCE", labelTh: "ประสบการณ์" },
  { id: "contact", labelEn: "CONTACT", labelTh: "ติดต่อ" },
];

export const StoryProgress: React.FC = () => {
  const { lang, t, toggleLang } = useLanguage();
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) setActiveChapter(visibleSections[0].target.id);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the jump menu on Escape or a click outside it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const activeIndex = chapters.findIndex(({ id }) => id === activeChapter);
  const chapter = chapters[Math.max(activeIndex, 0)];
  const labelOf = (c: (typeof chapters)[number]) =>
    lang === "th" ? c.labelTh : c.labelEn;

  const jumpTo = (id: string) => {
    setIsMenuOpen(false);
    scrollToElement(id, 76);
  };

  return (
    <>
      <nav
        className="story-progress hide-when-dialog fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
        aria-label={t("บทของหน้า", "Page chapters")}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex flex-col items-center">
            <span className="story-progress-line" aria-hidden="true" />
            <ol className="relative flex flex-col items-center">
              {chapters.map((c, index) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(c.id)}
                    aria-label={labelOf(c)}
                    aria-current={
                      c.id === activeChapter ? "location" : undefined
                    }
                    className="group flex h-6 w-6 items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
                  >
                    <span
                      className={`story-progress-dot group-hover:border-[#00f0ff] ${index <= activeIndex ? "is-passed" : ""} ${c.id === activeChapter ? "is-active" : ""}`}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <p
            className="min-w-28 font-mono text-[11px] tracking-[0.12em] text-zinc-300"
            aria-hidden="true"
          >
            {labelOf(chapter)}
          </p>
        </div>
      </nav>

      {activeIndex > 0 && (
        <div className="hide-when-dialog fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)] 2xl:hidden">
          {isMenuOpen && (
            <div
              id={menuId}
              ref={menuRef}
              className="w-56 rounded-2xl border border-white/[0.07] bg-[#0d0f17]/90 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-[20px]"
            >
              <nav aria-label={t("บทของหน้า", "Page chapters")}>
                <ul className="flex flex-col">
                  {chapters.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(c.id)}
                        aria-current={
                          c.id === activeChapter ? "location" : undefined
                        }
                        className={`flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                          c.id === activeChapter
                            ? "bg-[#00f0ff]/10 text-[#00f0ff]"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {labelOf(c)}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-2 flex flex-col border-t border-white/[0.08] pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
                >
                  <FileText className="h-4 w-4 text-zinc-400" aria-hidden />
                  {t("เปิด CV", "Resume / CV")}
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
                >
                  <Mail className="h-4 w-4 text-zinc-400" aria-hidden />
                  {t("ส่งอีเมล", "Email me")}
                </a>
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
                >
                  <Languages className="h-4 w-4 text-zinc-400" aria-hidden />
                  <span className={lang === "th" ? "text-[#00f0ff]" : ""}>
                    TH
                  </span>
                  <span className="text-zinc-600" aria-hidden="true">
                    /
                  </span>
                  <span className={lang === "en" ? "text-[#00f0ff]" : ""}>
                    EN
                  </span>
                </button>
              </div>
            </div>
          )}

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={t(
              `เมนูนำทาง (ตอนนี้: ${chapter.labelTh})`,
              `Navigation menu (current: ${chapter.labelEn})`,
            )}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/[0.07] bg-[#07080c]/90 px-3 sm:pr-4 font-mono text-[11px] tracking-wider text-zinc-200 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.9)] backdrop-blur-[20px] cursor-pointer hover:border-white/[0.16] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-zinc-400" aria-hidden />
            ) : (
              <Menu className="h-4 w-4 text-zinc-400" aria-hidden />
            )}
            <span aria-hidden="true" className="hidden sm:inline">
              {labelOf(chapter)}
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default StoryProgress;
