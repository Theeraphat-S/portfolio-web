import React, { useState } from "react";
import { Smartphone, Sparkles, Layers, Code2 } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./modal/ProjectModal";
import { MobileMockup } from "../../MobileMockup";

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "mobile" | "system">("all");

  const flagshipProject = portfolioData.projects[0]; // NCDs Screening / POLABDC

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 dark:border-emerald-800/60 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t(
                "ผลงานและสถาปัตยกรรมเด่น",
                "PORTFOLIO & FLAGSHIP ARCHITECTURE",
              )}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mt-4 tracking-tight">
              {t(
                "ผลงานแอปพลิเคชัน & สถาปัตยกรรมระดับ Production",
                "Proven Mobile Systems & Architecture",
              )}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
              {t(
                "ผสมผสานการออกแบบสถาปัตยกรรม BLoC, การทำงานแบบ Offline-First และการเชื่อมโยงระบบนิเวศภายนอกอย่างปลอดภัย",
                "Combining reactive BLoC state machines, offline-first data synchronization, and resilient enterprise RESTful API integrations.",
              )}
            </p>
          </div>
        </div>

        {/* 1. Flagship Centerpiece: Hybrid Interactive Mobile Showcase */}
        <div className="mb-20 rounded-3xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-100/70 dark:bg-zinc-950/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Interactive Briefing & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                    {t("ผลงานเด่นอันดับ 1", "FEATURED FLAGSHIP")}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    2568 &bull; HEALTHCARE CAPSTONE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {lang === "th"
                    ? flagshipProject.titleTh
                    : flagshipProject.titleEn}
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {lang === "th"
                    ? flagshipProject.descriptionTh
                    : flagshipProject.descriptionEn}
                </p>
              </div>

              {/* Key Architecture Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80">
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                    CLIENT-SIDE BLoC ENGINE
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {lang === "th"
                      ? "คำนวณคะแนนความเสี่ยงโรค NCDs บนเครื่องทันที Zero-Latency แม้ไม่มีอินเทอร์เน็ต"
                      : "Instant zero-latency risk score computation fully operating in offline environments."}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80">
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold block mb-1">
                    REAL-WORLD FIELD TESTING
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {lang === "th"
                      ? "ทดสอบร่วมกับบุคลากรทางการแพทย์และ อสม. จริง ลดเวลาตรวจลงกว่า 60%"
                      : "Validated by healthcare volunteers in field tests, reducing screening time by >60%."}
                  </p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-200 dark:border-zinc-800/70">
                {flagshipProject.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black font-mono text-zinc-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      {lang === "th" ? metric.labelTh : metric.labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Modal Trigger Action */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedProject(flagshipProject)}
                  data-cursor-text="Details"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>
                    {t(
                      "อ่านสถาปัตยกรรมเชิงลึก (Deep Dive)",
                      "Read Architecture Deep Dive",
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Live Interactive 3D Phone Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="text-center mb-3">
                <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                  {t(
                    "แตะแถบเมนูด้านล่างของมือถือเพื่อเล่นหน้าจอสด",
                    "Interactive simulation — tap bottom tabs inside device",
                  )}
                </span>
              </div>
              <div className="w-full max-w-[340px] sm:max-w-[360px]">
                <MobileMockup />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Secondary Projects Section Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              {t("ผลงานและโปรเจกต์อื่นๆ ทั้งหมด", "All Applications & Systems")}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 self-start md:self-auto">
            {(["all", "mobile", "system"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {tab === "all"
                  ? t("ทั้งหมด", "All")
                  : tab === "mobile"
                    ? t("Mobile Apps", "Mobile Apps")
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
