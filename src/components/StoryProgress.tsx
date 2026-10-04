import React, { useEffect, useState } from "react";
const chapters = [
  { id: "intro", label: "INTRO" },
  { id: "about", label: "APPROACH" },
  { id: "work", label: "SELECTED WORK" },
  { id: "capabilities", label: "CAPABILITIES" },
  { id: "timeline", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export const StoryProgress: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

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

  const activeIndex = chapters.findIndex(({ id }) => id === activeChapter);
  const chapter = chapters[Math.max(activeIndex, 0)];

  return (
    <>
      <aside
        className="story-progress fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
        aria-label="Story progress"
      >
        <div className="flex items-center gap-3">
          <div
            className="relative flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="story-progress-line" />
            {chapters.map(({ id }, index) => (
              <span
                key={id}
                className={`story-progress-dot ${index <= activeIndex ? "is-passed" : ""} ${id === activeChapter ? "is-active" : ""}`}
              />
            ))}
          </div>
          <div className="min-w-28">
            <p className="font-mono text-[10px] tracking-[0.18em] text-zinc-500">
              {String(Math.max(activeIndex + 1, 1)).padStart(2, "0")} / 06
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-zinc-300">
              {chapter.label}
            </p>
          </div>
        </div>
      </aside>

      {activeIndex > 0 && (
        <aside
          className="fixed right-4 top-3 z-30 rounded-full border border-white/10 bg-[#07080c]/85 px-3 py-1.5 font-mono text-[10px] tracking-wider text-zinc-300 backdrop-blur-sm xl:hidden"
          aria-label="Story progress"
        >
          <span className="text-zinc-500">
            {String(activeIndex + 1).padStart(2, "0")} / 06
          </span>
          <span className="mx-2 text-zinc-600">/</span>
          <span>{chapter.label}</span>
        </aside>
      )}
    </>
  );
};

export default StoryProgress;
