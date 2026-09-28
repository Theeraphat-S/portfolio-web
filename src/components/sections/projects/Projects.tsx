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
      id="projects"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      {/* Section Eyebrow & Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 mb-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <span className="editorial-eyebrow text-[#64b5f6]">
            01 // SELECTED PRODUCTION SYSTEMS
          </span>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
            ENGINEERED CASE STUDIES
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
          <div className="flex items-center gap-1 p-1 bg-[#0a0d14] border border-white/[0.08] rounded-full self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setFilter("all")}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#2196f3]/20 text-[#64b5f6] border border-[#2196f3]/40 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("ทั้งหมด", "ALL (3)")}
            </button>
            <button
              onClick={() => setFilter("mobile")}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "mobile"
                  ? "bg-[#2196f3]/20 text-[#64b5f6] border border-[#2196f3]/40 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("โมบาย", "MOBILE (2)")}
            </button>
            <button
              onClick={() => setFilter("system")}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filter === "system"
                  ? "bg-[#2196f3]/20 text-[#64b5f6] border border-[#2196f3]/40 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("ระบบองค์กร", "ENTERPRISE (1)")}
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
