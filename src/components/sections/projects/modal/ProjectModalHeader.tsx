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
  const { lang } = useLanguage();

  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 shrink-0">
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
            {project.tag}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            Year: {project.year}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {lang === "th" ? project.titleTh : project.titleEn}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
          {lang === "th" ? project.subtitleTh : project.subtitleEn}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
