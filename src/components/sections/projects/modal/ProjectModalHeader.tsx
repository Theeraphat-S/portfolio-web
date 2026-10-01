import React from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ProjectItem } from "../../../../types";

interface ProjectModalHeaderProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectModalHeader: React.FC<ProjectModalHeaderProps> = ({
  project,
  onClose,
}) => {
  const { lang, t } = useLanguage();
  const displayYear =
    lang === "th"
      ? project.yearTh || project.year
      : project.yearEn || project.year;

  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08] shrink-0">
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/25">
            {project.tag}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            {lang === "th" ? `ปี: ${displayYear}` : `Year: ${displayYear}`}
          </span>
        </div>
        <h3
          id="project-modal-title"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight"
        >
          {lang === "th" ? project.titleTh : project.titleEn}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
          {lang === "th" ? project.subtitleTh : project.subtitleEn}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#00f0ff]/40 text-zinc-400 hover:text-white transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
        aria-label={t("ปิดหน้าต่าง", "Close modal")}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
