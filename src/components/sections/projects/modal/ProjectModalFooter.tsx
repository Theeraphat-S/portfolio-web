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
  const { lang, t } = useLanguage();

  return (
    <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4 shrink-0">
      <div className="text-xs text-zinc-400">
        {project.repositoryNoticeEn ? (
          <span>
            {lang === "th"
              ? project.repositoryNoticeTh
              : project.repositoryNoticeEn}
          </span>
        ) : (
          <span>
            {t(
              "ผลงานและบทบาทของธีรภัทร",
              "Project contributions by Theeraphat",
            )}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial btn-editorial-outline btn-sm cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            <span>{t("โปรไฟล์ GitHub", "GitHub profile")}</span>
          </a>
        )}
        <button
          type="button"
          onClick={onClose}
          className="btn-editorial btn-editorial-primary btn-sm px-6 cursor-pointer"
        >
          {t("ปิดหน้าต่าง", "Close")}
        </button>
      </div>
    </div>
  );
};
