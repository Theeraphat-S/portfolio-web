import React from "react";
import { Github } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ProjectItem } from "../../../../types";

interface ProjectModalFooterProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectModalFooter: React.FC<ProjectModalFooterProps> = ({
  project,
  onClose,
}) => {
  const { t } = useLanguage();

  return (
    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
      <div className="text-xs text-zinc-400 font-mono">
        Designed & Built by Theeraphat Srimontha
      </div>

      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all border border-white/[0.08] hover:border-white/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-full bg-[#00f0ff] hover:bg-[#38bdf8] text-[#07080c] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,240,255,0.28)] hover:shadow-[0_6px_24px_-4px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00f0ff]"
        >
          {t("ปิดหน้าต่าง", "Close")}
        </button>
      </div>
    </div>
  );
};
