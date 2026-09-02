import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./modal/ProjectModal";

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "mobile" | "system">("all");

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              {t("ผลงานที่โดดเด่น", "Featured Work")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              {t(
                "ผลงานแอปพลิเคชันและระบบที่พัฒนาจริง",
                "Real-World Applications & Systems",
              )}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              {t(
                "ผลงานจริงตั้งแต่แอปพลิเคชันคัดกรองโรคระดับการแพทย์, แอปพลิเคชันเชิงพาณิชย์ และระบบ POS เชื่อมต่อ REST API",
                "Production-tested applications spanning medical risk screening, commercial logistics & chat loyalty, and point-of-sale platforms.",
              )}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
            {(["all", "mobile", "system"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all capitalize cursor-pointer ${
                  filter === tab
                    ? "bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {tab === "all"
                  ? t("ทั้งหมด", "All Projects")
                  : tab === "mobile"
                    ? t("Mobile Apps (Flutter)", "Mobile (Flutter)")
                    : t("ระบบหลังบ้าน & POS", "Systems & POS")}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: ProjectItem, idx: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
