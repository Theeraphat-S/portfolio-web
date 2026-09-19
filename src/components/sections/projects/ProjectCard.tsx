import React from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Flame,
  ShoppingBag,
  Cpu,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
import { SpotlightCard } from "../../reactbits/SpotlightCard";
import { TiltedCard } from "../../reactbits/TiltedCard";
import { LensStage } from "../../reactbits/LensStage";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const { lang, t } = useLanguage();

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "ncds-screening":
        return <Activity className="w-5 h-5 text-cyan-400" />;
      case "pinto-app":
        return <Flame className="w-5 h-5 text-sky-400" />;
      case "pos-system":
        return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getSpotlightColor = (color: string) => {
    if (color === "#10b981" || color === "emerald")
      return "rgba(6, 182, 212, 0.18)";
    if (color === "#06b6d4" || color === "cyan")
      return "rgba(6, 182, 212, 0.18)";
    return "rgba(59, 130, 246, 0.18)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      <TiltedCard
        rotateAmplitude={8}
        scaleOnHover={1.015}
        glareEffect={true}
        className="h-full"
        containerClassName="h-full perspective-container"
      >
        <SpotlightCard
          spotlightColor={getSpotlightColor(project.color)}
          className="h-full flex flex-col justify-between group cursor-pointer border-zinc-800 hover:border-cyan-500/50 preserve-3d transition-all duration-300"
          onClick={() => onSelect(project)}
          data-cursor-text="Explore"
        >
          <LensStage
            radius={75}
            label="ARCHITECTURE SPEC"
            containerClassName="h-full w-full flex flex-col justify-between"
            className="h-full flex flex-col justify-between"
            revealContent={
              <div className="w-full h-full bg-zinc-950/98 text-cyan-300 p-5 font-mono text-[11px] flex flex-col justify-between border border-cyan-500/40 select-none shadow-2xl">
                <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    {t("สถาปัตยกรรมระบบ", "SYSTEM ARCHITECTURE")}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {project.tag}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed my-auto line-clamp-4">
                  {lang === "th"
                    ? project.architectureTh
                    : project.architectureEn}
                </p>
                <div className="border-t border-cyan-500/30 pt-2 flex items-center justify-between text-[10px] text-zinc-400">
                  <span>{project.technologies.slice(0, 3).join(" • ")}</span>
                  <span className="text-cyan-400 font-bold">
                    {project.metrics[0]?.value ?? "100%"}
                  </span>
                </div>
              </div>
            }
          >
            <div className="layer-depth-1 transition-transform duration-300">
              {/* Top Bar: Icon + Badge + Year */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-cyan-500/40 transition-transform">
                  {getProjectIcon(project.id)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700 group-hover:border-cyan-500/30">
                    {project.tag}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between gap-2">
                <span>{lang === "th" ? project.titleTh : project.titleEn}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400 shrink-0" />
              </h3>

              <p className="text-xs text-zinc-400 font-mono mt-1">
                {lang === "th" ? project.subtitleTh : project.subtitleEn}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                {lang === "th" ? project.descriptionTh : project.descriptionEn}
              </p>

              {/* Highlights preview */}
              <div className="mt-4 space-y-1.5 border-t border-zinc-800/80 pt-3">
                {(lang === "th" ? project.highlightsTh : project.highlightsEn)
                  .slice(0, 2)
                  .map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-zinc-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Bottom Tech Badges & Action */}
            <div className="mt-6 pt-4 border-t border-zinc-800 layer-depth-2 transition-transform duration-300">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-300 border border-zinc-800 group-hover:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                data-cursor-text="Open"
                className="w-full py-2.5 rounded-xl bg-zinc-800/80 group-hover:bg-cyan-500 group-hover:text-zinc-950 text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer btn--shine"
              >
                <span>
                  {t(
                    "ดูรายละเอียดสถาปัตยกรรม & ฟีเจอร์",
                    "View Architecture & Specs",
                  )}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </LensStage>
        </SpotlightCard>
      </TiltedCard>
    </motion.div>
  );
};
