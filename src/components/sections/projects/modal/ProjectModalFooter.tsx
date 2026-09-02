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
    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4 shrink-0">
      <div className="text-xs text-zinc-400 font-mono">
        Designed & Built by Theeraphat Srimontha
      </div>

      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
        >
          {t("ปิดหน้าต่าง", "Close")}
        </button>
      </div>
    </div>
  );
};
