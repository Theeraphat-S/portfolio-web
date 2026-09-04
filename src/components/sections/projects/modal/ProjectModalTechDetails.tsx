import React from "react";
import { Sparkles, CheckCircle2, Layers } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ProjectItem } from "../../../../types";

interface ProjectModalTechDetailsProps {
  project: ProjectItem;
}

export const ProjectModalTechDetails: React.FC<
  ProjectModalTechDetailsProps
> = ({ project }) => {
  const { lang, t } = useLanguage();

  return (
    <>
      {/* Overview Description */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t("ภาพรวมโครงการ", "Project Overview")}
        </h4>
        <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
          {lang === "th" ? project.descriptionTh : project.descriptionEn}
        </p>
      </div>

      {/* Key Technical Highlights */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t(
            "ฟีเจอร์หลักและการพัฒนาเชิงลึก",
            "Key Highlights & Implementation",
          )}
        </h4>
        <div className="space-y-2.5">
          {(lang === "th" ? project.highlightsTh : project.highlightsEn).map(
            (hl, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>{hl}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* System Architecture */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          {t("สถาปัตยกรรมระบบ (Architecture)", "System Architecture")}
        </h4>
        <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-indigo-300">
          {lang === "th" ? project.architectureTh : project.architectureEn}
        </div>
      </div>

      {/* Tech Stack Badges */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
          {t("เทคโนโลยีและเครื่องมือที่ใช้", "Technologies & Tools")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
