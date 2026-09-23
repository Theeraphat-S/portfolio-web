import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Github,
  CheckCircle2,
  Terminal,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { NcdsScreen, PintoScreen, PosScreen } from "../../mobile-mockup";

const SCREEN_MAP: Record<string, React.ReactNode> = {
  "ncds-screening": <NcdsScreen direction={1} />,
  "pinto-app": <PintoScreen direction={1} />,
  "pos-system": <PosScreen direction={1} />,
};

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "mobile" | "system">("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("ncds-screening");

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 border-b border-zinc-200 dark:border-[#243b30]">
      {/* Section Subtitle & Heading with Karolina's Counter Bracket */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="text-xs font-mono text-[#18231d] dark:text-[#bfdb39] uppercase tracking-widest font-semibold">
          02 // {t("ผลงานเด่น", "SELECTED WORKS")} [{String(portfolioData.projects.length).padStart(2, "0")}]
        </span>
        <div className="h-px bg-zinc-200 dark:bg-[#243b30] flex-1" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-4 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18231d] dark:text-[#fafafa]">
            {lang === "th"
              ? "ผลงานคัดสรรระดับ Production (Selected Works)"
              : "Selected Works & Production Systems"}
          </h2>
          <p className="text-zinc-600 dark:text-[#c2c2c2] text-sm sm:text-base leading-relaxed">
            {lang === "th"
              ? "งานพัฒนาแอปพลิเคชันที่สร้างขึ้นจากความต้องการจริง เน้นความเสถียรในสภาวะ Offline-First และสถาปัตยกรรมที่ดูแลรักษาง่าย"
              : "Custom mobile engineering designed from real requirements, focusing on zero-latency offline workflows and scalable state architecture."}
          </p>
        </motion.div>

        {/* Category Filter Tabs with Karolina-style Spring */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-[#121e17] border border-zinc-200 dark:border-[#243b30] rounded-xl text-xs font-mono">
          {(
            [
              { key: "all", label: `${t("ทั้งหมด", "All")} [0${portfolioData.projects.length}]` },
              { key: "mobile", label: "Mobile Apps" },
              { key: "system", label: "Systems" },
            ] as const
          ).map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`relative px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#18231d] font-bold"
                    : "text-zinc-500 dark:text-[#969696] hover:text-[#18231d] dark:hover:text-[#fafafa]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-tab"
                    className="absolute inset-0 bg-[#bfdb39] rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies List */}
      <div className="space-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: ProjectItem, index: number) => {
            const isExpanded = expandedProjectId === project.id;
            const projectNum = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="border-t border-zinc-200 dark:border-[#243b30] pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Case Study Details */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="text-2xl font-bold text-[#18231d] dark:text-[#bfdb39] font-mono">
                      [{projectNum}]
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">/</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-[#121e17] text-zinc-700 dark:text-[#e9e8e8] border border-zinc-200 dark:border-[#243b30] uppercase tracking-wider text-[11px] font-medium">
                      {project.tag}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">&bull;</span>
                    <span className="text-zinc-500 dark:text-[#969696]">{project.year}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#18231d] dark:text-[#fafafa] tracking-tight">
                      {lang === "th" ? project.titleTh : project.titleEn}
                    </h3>
                    <p className="text-[#bfdb39] text-xs sm:text-sm font-mono mt-1 font-medium">
                      {lang === "th" ? project.subtitleTh : project.subtitleEn}
                    </p>
                  </div>

                  {/* Executive Summary */}
                  <p className="text-zinc-700 dark:text-[#c2c2c2] text-sm sm:text-base leading-relaxed">
                    {lang === "th" ? project.descriptionTh : project.descriptionEn}
                  </p>

                  {/* Metrics Grid */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                      {project.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 rounded-lg border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] font-mono hover:border-[#bfdb39]/50 transition-colors"
                        >
                          <p className="text-[10px] text-zinc-500 dark:text-[#969696] uppercase tracking-wider">
                            {lang === "th" ? metric.labelTh : metric.labelEn}
                          </p>
                          <p className="text-base font-bold text-[#18231d] dark:text-[#fafafa] mt-1">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-[#e9e8e8] bg-zinc-100 dark:bg-[#121e17] border border-zinc-200 dark:border-[#243b30] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Expand Deep Dive & Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg border border-[#bfdb39] bg-[#bfdb39]/10 text-[#18231d] dark:text-[#bfdb39] hover:bg-[#bfdb39] hover:text-[#18231d] transition-all cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? t("ปิดบันทึกเชิงสถาปัตยกรรม", "Collapse Engineering Breakdown")
                          : t("อ่านบันทึกเชิงสถาปัตยกรรม", "Read Engineering Breakdown")}
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </motion.button>

                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-[#969696] hover:text-[#18231d] dark:hover:text-[#fafafa] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{t("ซอร์สโค้ด", "Source Code")}</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Animated Expandable Engineering Deep Dive */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-zinc-200 dark:border-[#243b30] space-y-6 text-xs sm:text-sm">
                          {/* Problem Statement */}
                          {project.problemTh && (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 font-mono font-semibold text-rose-600 dark:text-rose-400">
                                <AlertCircle className="w-4 h-4" />
                                <span>{t("ปัญหาหน้างานจริง (The Real-World Problem)", "The Real-World Problem")}</span>
                              </div>
                              <p className="text-zinc-700 dark:text-[#c2c2c2] leading-relaxed pl-5">
                                {lang === "th" ? project.problemTh : project.problemEn}
                              </p>
                            </div>
                          )}

                          {/* Architecture Decision Rationale */}
                          {project.decisionRationaleTh && (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 font-mono font-semibold text-[#18231d] dark:text-[#bfdb39]">
                                <Lightbulb className="w-4 h-4" />
                                <span>{t("การตัดสินใจเชิงสถาปัตยกรรม (Architecture Decision)", "Architecture Decision & Solution")}</span>
                              </div>
                              <p className="text-zinc-700 dark:text-[#c2c2c2] leading-relaxed pl-5">
                                {lang === "th" ? project.decisionRationaleTh : project.decisionRationaleEn}
                              </p>
                            </div>
                          )}

                          {/* Trade-Offs */}
                          {project.tradeOffsTh && (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 font-mono font-semibold text-amber-600 dark:text-amber-400">
                                <Terminal className="w-4 h-4" />
                                <span>{t("การชั่งน้ำหนักข้อดีข้อเสีย (Engineering Trade-offs)", "Engineering Trade-offs")}</span>
                              </div>
                              <p className="text-zinc-700 dark:text-[#c2c2c2] leading-relaxed pl-5">
                                {lang === "th" ? project.tradeOffsTh : project.tradeOffsEn}
                              </p>
                            </div>
                          )}

                          {/* Usability Testing & Evidence */}
                          {project.evidenceTh && (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{t("การทดสอบภาคสนาม (Field Testing Evidence)", "Usability Testing & Evidence")}</span>
                              </div>
                              <p className="text-zinc-700 dark:text-[#c2c2c2] leading-relaxed pl-5">
                                {lang === "th" ? project.evidenceTh : project.evidenceEn}
                              </p>
                            </div>
                          )}

                          {/* Key Highlights */}
                          {project.highlightsTh && (
                            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-[#243b30]/60">
                              <p className="font-mono text-zinc-600 dark:text-[#969696] font-semibold">
                                {t("สิ่งที่ส่งมอบ (Key Deliverables):", "Key Deliverables:")}
                              </p>
                              <ul className="space-y-1.5 pl-2">
                                {(lang === "th" ? project.highlightsTh : project.highlightsEn).map(
                                  (hl, hIdx) => (
                                    <li key={hIdx} className="flex items-start gap-2 text-zinc-700 dark:text-[#c2c2c2]">
                                      <span className="text-[#bfdb39] font-mono mt-0.5">&bull;</span>
                                      <span>{hl}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Column: Clean Device Screen Frame with Karolina Styling */}
                <div className="lg:col-span-5 flex justify-center">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[320px] rounded-2xl border border-zinc-300 dark:border-[#243b30] bg-white dark:bg-[#121e17] p-3 shadow-md dark:shadow-none hover:border-[#bfdb39]/50 transition-colors"
                  >
                    {/* Subtle Top Status Bar */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-[#969696] pb-2 mb-2 border-b border-zinc-200 dark:border-[#243b30]">
                      <span>{project.id.toUpperCase()}</span>
                      <span className="flex items-center gap-1 text-[#bfdb39] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bfdb39] animate-pulse" />
                        INTERACTIVE PREVIEW
                      </span>
                    </div>

                    {/* Render Screen Simulation via Map */}
                    <div className="min-h-[380px] flex flex-col justify-center">
                      {SCREEN_MAP[project.id] ?? null}
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
