import React, { Suspense, useState } from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { m } from "motion/react";
import { FADE_UP, IN_VIEW } from "../../../lib/motion";
import { CHAPTER_OFFSET, scrollToElement } from "../../../lib/lenis";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData, bridgeFor } from "../../../data";
import { ProjectItem } from "../../../types";
import { EditorialCaseStudy } from "./EditorialCaseStudy";
import { ChapterEyebrow } from "../../ChapterEyebrow";
import { ChunkBoundary } from "../../ChunkBoundary";
import { createChunk } from "../../../lib/lazyChunk";

// The modal is only needed after a "View case study" click, so it ships in
// its own chunk; hovering or focusing the button starts the download.
const modalChunk = createChunk(() => import("./modal/ProjectModal"));

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedModalProject, setSelectedModalProject] =
    useState<ProjectItem | null>(null);
  // Stays mounted after the first open so the exit animation can run.
  const [modalLoaded, setModalLoaded] = useState(false);
  // A failed chunk unmounts the modal; the next click retries with a
  // fresh lazy component.
  const [ProjectModal, setProjectModal] = useState(modalChunk.create);
  const handleModalError = () => {
    setModalLoaded(false);
    setSelectedModalProject(null);
    setProjectModal(modalChunk.create);
  };
  const openModal = (project: ProjectItem) => {
    setModalLoaded(true);
    setSelectedModalProject(project);
  };

  return (
    <section id="work" className="relative py-12 sm:py-24 border-b border-line">
      {/* Anchor Alias for backwards compatibility */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow & Headline */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW}
        variants={FADE_UP}
        className="space-y-6 mb-10 sm:mb-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
          <ChapterEyebrow id="work" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
            {t("กรณีศึกษา", "CASE STUDIES")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <BilingualStack
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
              th={"3 โปรเจกต์ที่ได้ลงมือพัฒนา"}
              en={"Three Projects I Built and Worked On"}
            />
            <ChapterBridge
              bridge={bridgeFor("work")}
              className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed"
            />
          </div>

          {/* Jump straight to one case study. Filtering would change the
              page length under the pinned runways, so every project stays
              on the page. Product names read the same in TH and EN. */}
          <nav
            aria-label={t("ข้ามไปยังโปรเจกต์", "Jump to a project")}
            className="flex flex-wrap items-center gap-1 p-1 bg-white/[0.02] border border-line rounded-full self-start md:self-auto font-mono text-xs shrink-0"
          >
            {portfolioData.projects.map((project: ProjectItem) => (
              <a
                key={project.id}
                href={`#case-${project.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement(`case-${project.id}`, CHAPTER_OFFSET);
                }}
                data-cursor-text="JUMP"
                className="inline-flex items-center px-3 min-h-9 rounded-full border border-transparent text-zinc-400 hover:text-signal hover:border-signal/30 hover:bg-signal/[0.06] transition focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
              >
                {project.shortName ?? project.titleEn}
              </a>
            ))}
          </nav>
        </div>
      </m.div>

      {/* Editorial Case Studies Stream */}
      <div className="space-y-12 sm:space-y-24">
        {portfolioData.projects.map((project: ProjectItem, index: number) => (
          <EditorialCaseStudy
            key={project.id}
            project={project}
            index={index}
            onSelect={openModal}
            onPrefetch={modalChunk.prefetch}
          />
        ))}
      </div>

      {/* Deep Architectural Modal */}
      {modalLoaded && (
        <ChunkBoundary onError={handleModalError}>
          <Suspense fallback={null}>
            <ProjectModal
              project={selectedModalProject}
              onClose={() => setSelectedModalProject(null)}
            />
          </Suspense>
        </ChunkBoundary>
      )}
    </section>
  );
};

export default Projects;
