import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Github,
  CheckCircle2,
  Terminal,
  AlertCircle,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProjectItem } from "../../../types";
import { NcdsScreen, PintoScreen, PosScreen } from "../../mobile-mockup";
import { LensStage } from "../../reactbits/LensStage";
import { BlueprintScreen } from "../../mobile-mockup/BlueprintScreen";
import { ScreenKey } from "../../mobile-mockup/types";

const SCREEN_MAP: Record<string, React.ReactNode> = {
  "ncds-screening": <NcdsScreen direction={1} />,
  "pinto-app": <PintoScreen direction={1} />,
  "pos-system": <PosScreen direction={1} />,
};

interface BreakdownBlockProps {
  icon: React.ReactNode;
  title: string;
  content?: string;
  themeColor: "rose" | "cyan" | "amber" | "emerald";
}

const BreakdownBlock: React.FC<BreakdownBlockProps> = ({
  icon,
  title,
  content,
  themeColor,
}) => {
  if (!content) return null;

  const colorStyles = {
    rose: "bg-rose-500/5 ring-1 ring-rose-500/20 text-rose-600 dark:text-rose-400",
    cyan: "bg-cyan-500/5 ring-1 ring-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    amber:
      "bg-amber-500/5 ring-1 ring-amber-500/20 text-amber-600 dark:text-amber-400",
    emerald:
      "bg-emerald-500/5 ring-1 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  }[themeColor];

  return (
    <div className={`p-4 rounded-2xl space-y-1.5 ${colorStyles}`}>
      <div className="flex items-center gap-2 font-mono font-bold text-xs">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-6 text-xs sm:text-sm">
        {content}
      </p>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "mobile" | "system">("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null,
  );

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/[0.07]"
    >
      {/* Section Eyebrow & Rule */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="eyebrow-pill text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/25">
          <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          <span>{t("ผลงานเด่น", "SELECTED PRODUCTION SYSTEMS")}</span>
        </span>
        <div className="h-px bg-slate-200 dark:bg-white/[0.08] flex-1" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="space-y-4 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {lang === "th"
              ? "ผลงานคัดสรรระดับ Production (Selected Works)"
              : "Selected Works & Production Systems"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === "th"
              ? "งานพัฒนาแอปพลิเคชันที่สร้างขึ้นจากโจทย์จริง เน้นความเสถียรในสภาวะ Offline-First และสถาปัตยกรรม BLoC ที่ดูแลรักษาง่าย"
              : "Cross-platform mobile applications designed from real-world requirements, focusing on zero-latency offline workflows and scalable state architecture."}
          </p>
        </motion.div>

        {/* Category Filter Tabs with Spring Pill */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/[0.04] ring-1 ring-slate-200 dark:ring-white/[0.08] rounded-full text-xs font-mono">
          {(
            [
              {
                key: "all",
                label: `${t("ทั้งหมด", "All")} [0${portfolioData.projects.length}]`,
              },
              { key: "mobile", label: "Mobile Apps" },
              { key: "system", label: "Systems" },
            ] as const
          ).map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`relative px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-tab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* High-Impact Featured Showcase Cards with Doppelrand Architecture */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: ProjectItem, index: number) => {
            const isExpanded = expandedProjectId === project.id;
            const projectNum = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
                className="doppelrand-shell group"
              >
                <div className="doppelrand-core p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Case Study Details */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Meta Header */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="text-xl font-bold text-cyan-400 font-mono">
                          [{projectNum}]
                        </span>
                        <span className="text-slate-300 dark:text-white/20">
                          /
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-white/[0.08] uppercase tracking-wider text-[11px] font-semibold">
                          {project.tag}
                        </span>
                        <span className="text-slate-300 dark:text-white/20">
                          &bull;
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {project.year}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                          {lang === "th" ? project.titleTh : project.titleEn}
                        </h3>
                        <p className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-mono mt-1 font-semibold">
                          {lang === "th"
                            ? project.subtitleTh
                            : project.subtitleEn}
                        </p>
                      </div>

                      {/* Executive Summary */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {lang === "th"
                          ? project.descriptionTh
                          : project.descriptionEn}
                      </p>

                      {/* Problem & Architecture Breakdown */}
                      <div className="space-y-3 pt-1">
                        {project.problemTh && (
                          <BreakdownBlock
                            icon={<AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />}
                            title={t(
                              "ปัญหาหน้างานจริง (The Real-World Problem)",
                              "The Real-World Problem",
                            )}
                            content={
                              lang === "th"
                                ? project.problemTh
                                : project.problemEn
                            }
                            themeColor="rose"
                          />
                        )}

                        {project.decisionRationaleTh && (
                          <BreakdownBlock
                            icon={<Lightbulb className="w-4 h-4 shrink-0" strokeWidth={1.5} />}
                            title={t(
                              "การตัดสินใจเชิงสถาปัตยกรรม (Architecture Decision)",
                              "Architecture Decision & Solution",
                            )}
                            content={
                              lang === "th"
                                ? project.decisionRationaleTh
                                : project.decisionRationaleEn
                            }
                            themeColor="cyan"
                          />
                        )}
                      </div>

                      {/* Metrics Grid */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                          {project.metrics.map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3.5 rounded-2xl ring-1 ring-slate-200/80 dark:ring-white/[0.07] bg-slate-50 dark:bg-[#05070d] font-mono hover:ring-cyan-400/40 transition-colors"
                            >
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                                {lang === "th" ? metric.labelTh : metric.labelEn}
                              </p>
                              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] ring-1 ring-slate-200 dark:ring-white/[0.08] rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions: Expand Trade-offs & GitHub Link with Island Button Architecture */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleExpand(project.id)}
                          className="inline-flex items-center gap-2.5 px-4 py-2 text-xs font-mono font-bold rounded-full ring-1 ring-cyan-400/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all cursor-pointer shadow-xs"
                        >
                          <span>
                            {isExpanded
                              ? t(
                                  "ย่อข้อดีข้อเสียและการทดสอบภาคสนาม",
                                  "Collapse Deep Trade-offs & Evidence",
                                )
                              : t(
                                  "ดูข้อดีข้อเสียและการทดสอบภาคสนาม",
                                  "View Deep Trade-offs & Field Evidence",
                                )}
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                          >
                            <Github className="w-3.5 h-3.5" strokeWidth={1.5} />
                            <span>{t("ซอร์สโค้ด", "Source Code")}</span>
                            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                              <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </motion.a>
                        )}
                      </div>

                      {/* Expandable Engineering Deep Dive */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08] space-y-4 text-xs sm:text-sm">
                              {/* Trade-Offs */}
                              {project.tradeOffsTh && (
                                <BreakdownBlock
                                  icon={<Terminal className="w-4 h-4 shrink-0" strokeWidth={1.5} />}
                                  title={t(
                                    "การชั่งน้ำหนักข้อดีข้อเสีย (Engineering Trade-offs)",
                                    "Engineering Trade-offs",
                                  )}
                                  content={
                                    lang === "th"
                                      ? project.tradeOffsTh
                                      : project.tradeOffsEn
                                  }
                                  themeColor="amber"
                                />
                              )}

                              {/* Usability Testing & Evidence */}
                              {project.evidenceTh && (
                                <BreakdownBlock
                                  icon={
                                    <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                                  }
                                  title={t(
                                    "การทดสอบภาคสนาม (Field Testing Evidence)",
                                    "Usability Testing & Evidence",
                                  )}
                                  content={
                                    lang === "th"
                                      ? project.evidenceTh
                                      : project.evidenceEn
                                  }
                                  themeColor="emerald"
                                />
                              )}

                              {/* Key Highlights */}
                              {project.highlightsTh && (
                                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                                  <p className="font-mono text-slate-500 dark:text-slate-400 font-semibold text-xs flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                                    <span>
                                      {t(
                                        "สิ่งที่ส่งมอบ (Key Deliverables):",
                                        "Key Deliverables:",
                                      )}
                                    </span>
                                  </p>
                                  <ul className="space-y-1.5 pl-2">
                                    {(lang === "th"
                                      ? project.highlightsTh
                                      : project.highlightsEn
                                    ).map((hl, hIdx) => (
                                      <li
                                        key={hIdx}
                                        className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                                      >
                                        <span className="text-cyan-400 font-mono mt-0.5">
                                          &bull;
                                        </span>
                                        <span>{hl}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Column: Clean Premium Device Screen Frame with LensStage Spotlight (CONTEXT.md #50) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-[340px] p-1.5 rounded-[2.25rem] bg-slate-200/60 dark:bg-white/[0.04] ring-1 ring-slate-300/60 dark:ring-white/10 shadow-2xl"
                      >
                        <div className="rounded-[calc(2.25rem-0.375rem)] p-3 bg-white dark:bg-[#07090e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                          {/* Subtle Top Status Bar */}
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pb-2 mb-2 border-b border-slate-200 dark:border-white/[0.06]">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {project.id.toUpperCase()}
                            </span>
                            <span className="flex items-center gap-1.5 text-cyan-500 dark:text-cyan-400 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              LENS INSPECTOR
                            </span>
                          </div>

                          {/* Screen Simulation with LensStage Spotlight Reveal (CONTEXT.md #50) */}
                          <div className="min-h-[400px] flex flex-col justify-center rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0b0f19]">
                            <LensStage
                              radius={100}
                              label={t("ส่องโครงสร้าง BLoC", "INSPECT BLoC BLUEPRINT")}
                              activeBorderColor="#06b6d4"
                              revealContent={
                                <BlueprintScreen
                                  activeScreen={
                                    (project.id === "ncds-screening"
                                      ? "ncds"
                                      : project.id === "pinto-app"
                                        ? "pinto"
                                        : "pos") as ScreenKey
                                  }
                                />
                              }
                            >
                              {SCREEN_MAP[project.id] ?? null}
                            </LensStage>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
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
