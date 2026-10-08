import React, { useState } from "react";
import { BilingualStack } from "../../BilingualStack";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { EditorialCaseStudy } from "./EditorialCaseStudy";
import { ProjectModal } from "./modal/ProjectModal";

type FilterKey = "all" | "capstone" | "internship";

// Widths fit the longer of the TH/EN label so switching language never
// resizes the filter.
const FILTERS: {
  key: FilterKey;
  th: string;
  en: string;
  width: string;
}[] = [
  { key: "all", th: "ทั้งหมด", en: "ALL", width: "min-w-[86px]" },
  { key: "capstone", th: "โปรเจกต์จบ", en: "CAPSTONE", width: "min-w-[124px]" },
  {
    key: "internship",
    th: "ฝึกงาน",
    en: "INTERNSHIP",
    width: "min-w-[128px]",
  },
];

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedModalProject, setSelectedModalProject] =
    useState<ProjectItem | null>(null);

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.origin === filter;
  });

  const countFor = (key: FilterKey) =>
    key === "all"
      ? portfolioData.projects.length
      : portfolioData.projects.filter((p: ProjectItem) => p.origin === key)
          .length;

  return (
    <section
      id="work"
      className="relative py-16 sm:py-24 border-b border-white/[0.08]"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow & Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 mb-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <span className="editorial-eyebrow text-[#00f0ff]">
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

          {/* Minimalist Segmented Filter */}
          <div
            role="toolbar"
            aria-label={t("กรองผลงานตามที่มา", "Filter projects by origin")}
            className="flex items-center gap-1 p-1 bg-white/[0.02] border border-white/[0.08] rounded-full self-start md:self-auto font-mono text-xs shrink-0"
          >
            {FILTERS.map(({ key, th, en, width }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                data-cursor-text="FILTER"
                className={`${width} text-center px-3 min-h-9 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                  filter === key
                    ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-medium"
                    : "text-zinc-400 hover:text-white border border-transparent"
                }`}
              >
                {t(`${th} (${countFor(key)})`, `${en} (${countFor(key)})`)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Editorial Case Studies Stream */}
      <div className="space-y-16 sm:space-y-24">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: ProjectItem, index: number) => (
            <EditorialCaseStudy
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedModalProject}
            />
          ))}
        </AnimatePresence>
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
