import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Flame,
  ShoppingBag,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

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
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case "pinto-app":
        return <Flame className="w-5 h-5 text-cyan-400" />;
      case "pos-system":
        return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getSpotlightColor = (color: string) => {
    if (color === "#10b981") return "rgba(16, 185, 129, 0.18)";
    if (color === "#06b6d4") return "rgba(6, 182, 212, 0.18)";
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
      <SpotlightCard
        spotlightColor={getSpotlightColor(project.color)}
        className="h-full flex flex-col justify-between group cursor-pointer border-zinc-800 hover:border-zinc-700"
        onClick={() => onSelect(project)}
        data-cursor-text="Explore"
      >
        <div>
          {/* Top Bar: Icon + Badge + Year */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              {getProjectIcon(project.id)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700">
                {project.tag}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {project.year}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between gap-2">
            <span>{lang === "th" ? project.titleTh : project.titleEn}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-400 shrink-0" />
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{hl}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Tech Badges & Action */}
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-300 border border-zinc-800"
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
            className="w-full py-2.5 rounded-xl bg-zinc-800/80 group-hover:bg-emerald-500 group-hover:text-zinc-950 text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
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
      </SpotlightCard>
    </motion.div>
  );
};
