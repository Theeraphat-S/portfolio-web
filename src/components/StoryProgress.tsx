import React, { useEffect, useId, useRef, useState } from "react";
import { m, useTransform } from "motion/react";
import { FileText, Languages, Mail, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useStoryScroll } from "../context/useStoryScroll";
import { CHAPTER_OFFSET, scrollToElement } from "../lib/lenis";
import { personalData, STORY_CHAPTERS as chapters } from "../data";

export const StoryProgress: React.FC = () => {
  const { lang, t, toggleLang } = useLanguage();
  const { activeIndex, position } = useStoryScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // The capsule floats over the reading column on phones and tablets, so
  // it steps aside while the reader scrolls down and returns on any scroll
  // up (or keyboard focus): it never sits on top of text being read.
  const [isTucked, setIsTucked] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The rail fills one segment per chapter; the capsule shows only the
  // current chapter, since the top bar already tracks the whole page.
  const railFill = useTransform(position, [0, chapters.length], [0, 1]);
  const chapterFill = useTransform(position, (p) => {
    const index = Math.min(Math.floor(p), chapters.length - 1);
    return p - index;
  });

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

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      setIsTucked(delta > 0);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPillHidden = isTucked && !isMenuOpen;

  const chapter = chapters[activeIndex];
  const activeChapter = chapter.id;
  const labelOf = (c: (typeof chapters)[number]) =>
    lang === "th" ? c.labelTh : c.labelEn;

  const jumpTo = (id: string) => {
    setIsMenuOpen(false);
    scrollToElement(id, CHAPTER_OFFSET);
    // Move focus with the scroll, so the next Tab continues inside the
    // chapter instead of from the menu item that just unmounted.
    const target = document.getElementById(id);
    if (target) {
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
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
            <m.span
              className="story-progress-fill"
              style={{ scaleY: railFill }}
              aria-hidden="true"
            />
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
                    className="group flex h-6 w-6 items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                  >
                    <span
                      className={`story-progress-dot group-hover:border-signal ${index <= activeIndex ? "is-passed" : ""} ${c.id === activeChapter ? "is-active" : ""}`}
                    />
                  </button>
                </li>
              ))}
            </ol>
            <span
              className="relative flex h-6 w-6 items-center justify-center"
              aria-hidden="true"
            >
              <span className="h-px w-1.5 bg-muted" />
            </span>
          </div>
          <p
            className="min-w-28 font-mono text-xs tracking-[0.12em] text-zinc-300"
            aria-hidden="true"
          >
            {labelOf(chapter)}
          </p>
        </div>
      </nav>

      {activeIndex > 0 && (
        <div
          onFocus={() => setIsTucked(false)}
          className={`hide-when-dialog fixed bottom-4 right-4 z-30 flex flex-col-reverse items-end gap-2 pb-[env(safe-area-inset-bottom)] transition-[opacity,translate] duration-(--dur-base) ease-(--ease-out-expo) 2xl:hidden ${
            isPillHidden
              ? "pointer-events-none translate-y-[calc(100%+1rem)] opacity-0 motion-reduce:translate-y-0"
              : ""
          }`}
        >
          {/* The toggle comes first in the DOM so Tab moves from it into
              the open menu; column-reverse keeps the menu drawn above. */}
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
            className="btn-press relative flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-void/90 px-3 sm:pr-4 font-mono text-xs tracking-wider text-zinc-200 shadow-pill backdrop-blur-[20px] transition cursor-pointer hover:border-white/[0.16] focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-zinc-400" aria-hidden />
            ) : (
              <Menu className="h-4 w-4 text-zinc-400" aria-hidden />
            )}
            <span aria-hidden="true" className="hidden sm:inline">
              {labelOf(chapter)}
            </span>
            <m.span
              aria-hidden="true"
              className="absolute inset-x-4 bottom-1.5 h-px origin-left bg-signal/70"
              style={{ scaleX: chapterFill }}
            />
          </button>
          {isMenuOpen && (
            <div
              id={menuId}
              ref={menuRef}
              className="w-56 rounded-2xl border border-line bg-surface/90 p-2 shadow-pop backdrop-blur-[20px]"
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
                        className={`flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal ${
                          c.id === activeChapter
                            ? "bg-primary/10 text-primary"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {labelOf(c)}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-2 flex flex-col border-t border-line pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  <FileText className="h-4 w-4 text-zinc-400" aria-hidden />
                  {t("เปิด CV", "Resume / CV")}
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  <Mail className="h-4 w-4 text-zinc-400" aria-hidden />
                  {t("ส่งอีเมล", "Email me")}
                </a>
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-white cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  <Languages className="h-4 w-4 text-zinc-400" aria-hidden />
                  <span className={lang === "th" ? "text-primary" : ""}>
                    TH
                  </span>
                  <span className="text-zinc-600" aria-hidden="true">
                    /
                  </span>
                  <span className={lang === "en" ? "text-primary" : ""}>
                    EN
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StoryProgress;
