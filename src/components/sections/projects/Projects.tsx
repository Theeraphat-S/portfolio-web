import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
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

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("ncds-screening");

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  const renderScreen = (id: string) => {
    switch (id) {
      case "ncds-screening":
        return <NcdsScreen direction={1} />;
      case "pinto-app":
        return <PintoScreen direction={1} />;
      case "pos-system":
        return <PosScreen direction={1} />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-zinc-900">
      {/* Section Subtitle & Heading */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
          02 // {t("ผลงานเชิงวิศวกรรม", "ENGINEERING PROJECTS")}
        </span>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      <div className="space-y-4 mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          {lang === "th"
            ? "ผลงานและกรณีศึกษาเชิงวิศวกรรม (Production Case Studies)"
            : "Production Case Studies & Architectural Systems"}
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "การออกแบบและพัฒนาซอฟต์แวร์ที่เน้นแก้ปัญหาหน้างานจริง ความเสถียรในสภาวะ Offline และการจัดวางสถาปัตยกรรมที่ดูแลรักษาง่าย"
            : "Real-world mobile engineering focused on zero-latency offline workflows, reactive state machines, and resilient API contracts."}
        </p>
      </div>

      {/* Case Studies List */}
      <div className="space-y-16">
        {portfolioData.projects.map((project: ProjectItem, index: number) => {
          const isExpanded = expandedProjectId === project.id;
          const projectNum = String(index + 1).padStart(2, "0");

          return (
            <article
              key={project.id}
              className="border-t border-zinc-800/80 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Case Study Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    {projectNum}
                  </span>
                  <span className="text-zinc-500">/</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase tracking-wider">
                    {project.tag}
                  </span>
                  <span className="text-zinc-500">&bull;</span>
                  <span className="text-zinc-400">{project.year}</span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                    {lang === "th" ? project.titleTh : project.titleEn}
                  </h3>
                  <p className="text-emerald-400 text-xs sm:text-sm font-mono mt-1">
                    {lang === "th" ? project.subtitleTh : project.subtitleEn}
                  </p>
                </div>

                {/* Executive Summary */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {lang === "th" ? project.descriptionTh : project.descriptionEn}
                </p>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded border border-zinc-800/80 bg-zinc-900/30 font-mono"
                      >
                        <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                          {lang === "th" ? metric.labelTh : metric.labelEn}
                        </p>
                        <p className="text-base font-bold text-zinc-100 mt-1">
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
                      className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions: Expand Deep Dive & Links */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded border border-emerald-800/70 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                  >
                    <span>
                      {isExpanded
                        ? t("ปิดบันทึกเชิงสถาปัตยกรรม", "Collapse Engineering Analysis")
                        : t("อ่านบันทึกเชิงสถาปัตยกรรม", "Read Engineering Analysis")}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{t("ซอร์สโค้ด", "Source Code")}</span>
                    </a>
                  )}
                </div>

                {/* Expandable Engineering Deep Dive */}
                {isExpanded && (
                  <div className="pt-6 border-t border-zinc-800/80 space-y-6 text-xs sm:text-sm animate-fadeIn">
                    {/* Problem Statement */}
                    {project.problemTh && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-rose-400">
                          <AlertCircle className="w-4 h-4" />
                          <span>{t("ปัญหาหน้างานจริง (The Real-World Problem)", "The Real-World Problem")}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-5">
                          {lang === "th" ? project.problemTh : project.problemEn}
                        </p>
                      </div>
                    )}

                    {/* Architecture Decision Rationale */}
                    {project.decisionRationaleTh && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-emerald-400">
                          <Lightbulb className="w-4 h-4" />
                          <span>{t("การตัดสินใจเชิงสถาปัตยกรรม (Architecture Decision)", "Architecture Decision & Solution")}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-5">
                          {lang === "th" ? project.decisionRationaleTh : project.decisionRationaleEn}
                        </p>
                      </div>
                    )}

                    {/* Trade-Offs */}
                    {project.tradeOffsTh && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-amber-400">
                          <Terminal className="w-4 h-4" />
                          <span>{t("การชั่งน้ำหนักข้อดีข้อเสีย (Engineering Trade-offs)", "Engineering Trade-offs")}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-5">
                          {lang === "th" ? project.tradeOffsTh : project.tradeOffsEn}
                        </p>
                      </div>
                    )}

                    {/* Usability Testing & Evidence */}
                    {project.evidenceTh && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-cyan-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t("การทดสอบภาคสนาม (Field Testing Evidence)", "Usability Testing & Evidence")}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-5">
                          {lang === "th" ? project.evidenceTh : project.evidenceEn}
                        </p>
                      </div>
                    )}

                    {/* Key Highlights */}
                    {project.highlightsTh && (
                      <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                        <p className="font-mono text-zinc-400 font-semibold">
                          {t("สิ่งที่ส่งมอบ (Key Deliverables):", "Key Deliverables:")}
                        </p>
                        <ul className="space-y-1.5 pl-2">
                          {(lang === "th" ? project.highlightsTh : project.highlightsEn).map(
                            (hl, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2 text-zinc-300">
                                <span className="text-emerald-500 font-mono mt-0.5">&bull;</span>
                                <span>{hl}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Clean Device Screen Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[320px] rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-lg">
                  {/* Subtle Top Status Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pb-2 mb-2 border-b border-zinc-900">
                    <span>{project.id.toUpperCase()}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      LIVE UI
                    </span>
                  </div>

                  {/* Render Screen Simulation */}
                  <div className="min-h-[380px] flex flex-col justify-center">
                    {renderScreen(project.id)}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
