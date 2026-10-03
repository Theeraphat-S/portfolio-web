import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { EditorialCaseStudy } from "./EditorialCaseStudy";
import { ProjectModal } from "./modal/ProjectModal";

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "mobile" | "system">("all");
  const [selectedModalProject, setSelectedModalProject] =
    useState<ProjectItem | null>(null);

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

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
            {t("สถาปัตยกรรม & โปรเจกต์ใช้งานจริง", "ENGINEERED CASE STUDIES")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {lang === "th"
                ? "ผลงานเด่น & สถาปัตยกรรมระดับ Production"
                : "Flagship Systems & Production Architectures"}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              {lang === "th"
                ? "เจาะลึก 3 โปรเจกต์หลักที่ผ่านการพิสูจน์การใช้งานจริง ตั้งแต่ระบบคัดกรองโรคระดับชุมชน ไปจนถึงสถาปัตยกรรม Hybrid WebView และระบบแคชเชียร์ออฟไลน์"
                : "Three signature architectures built for real-world reliability: offline-first healthcare screening, hybrid WebView logistics, and fault-tolerant retail point-of-sale."}
            </p>
          </div>

          {/* Minimalist Segmented Filter */}
          <div
            role="toolbar"
            aria-label={t("ตัวกรองหมวดหมู่ผลงาน", "Project category filter")}
            className="flex items-center gap-1 p-1 bg-white/[0.02] border border-white/[0.08] rounded-full self-start md:self-auto font-mono text-xs"
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                filter === "all"
                  ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-medium"
                  : "text-zinc-400 hover:text-white border border-transparent"
              }`}
            >
              {t("ทั้งหมด (3)", "ALL (3)")}
            </button>
            <button
              type="button"
              onClick={() => setFilter("mobile")}
              aria-pressed={filter === "mobile"}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                filter === "mobile"
                  ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-medium"
                  : "text-zinc-400 hover:text-white border border-transparent"
              }`}
            >
              {t("โมบาย (2)", "MOBILE (2)")}
            </button>
            <button
              type="button"
              onClick={() => setFilter("system")}
              aria-pressed={filter === "system"}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                filter === "system"
                  ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-medium"
                  : "text-zinc-400 hover:text-white border border-transparent"
              }`}
            >
              {t("ระบบองค์กร (1)", "ENTERPRISE (1)")}
            </button>
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
