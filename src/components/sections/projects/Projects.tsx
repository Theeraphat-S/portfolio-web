import React, { useState } from "react";
import { BilingualStack } from "../../BilingualStack";
import { m } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion";
import { CHAPTER_OFFSET, scrollToElement } from "../../../lib/lenis";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { EditorialCaseStudy } from "./EditorialCaseStudy";
import { ProjectModal } from "./modal/ProjectModal";

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedModalProject, setSelectedModalProject] =
    useState<ProjectItem | null>(null);

  return (
    <section id="work" className="relative py-16 sm:py-24 border-b border-line">
      {/* Anchor Alias for backwards compatibility */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow & Headline */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="space-y-6 mb-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
          <span className="editorial-eyebrow text-primary">
            02 // {t("ผลงานเด่น", "SELECTED WORK")}
          </span>
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
            <BilingualStack
              className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed"
              th={
                "โปรเจกต์จบ 1 ชิ้น และงานระหว่างฝึกงาน 2 ชิ้น แต่ละกรณีศึกษาเล่าว่าผมทำส่วนไหน ตัดสินใจอะไร และได้เรียนรู้อะไร"
              }
              en={
                "One capstone app and two internship projects. Each case study shows the part I built, the decisions involved, and what I learned."
              }
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
                className="inline-flex items-center px-3 min-h-9 rounded-full border border-transparent text-zinc-400 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
              >
                {project.shortName ?? project.titleEn}
              </a>
            ))}
          </nav>
        </div>
      </m.div>

      {/* Editorial Case Studies Stream */}
      <div className="space-y-16 sm:space-y-24">
        {portfolioData.projects.map((project: ProjectItem, index: number) => (
          <EditorialCaseStudy
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedModalProject}
          />
        ))}
      </div>

      {/* Deep Architectural Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </section>
  );
};

export default Projects;
