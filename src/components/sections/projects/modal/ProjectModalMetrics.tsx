import React from "react";
import { getMetricValue } from "../../../../lib/utils";
import { useLanguage } from "../../../../context/LanguageContext";
import { ProjectMetric } from "../../../../types";

interface ProjectModalMetricsProps {
  metrics: ProjectMetric[];
}

export const ProjectModalMetrics: React.FC<ProjectModalMetricsProps> = ({
  metrics,
}) => {
  const { lang } = useLanguage();

  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
        >
          <span className="text-[11px] text-zinc-400 block mb-0.5 font-medium">
            {lang === "th" ? m.labelTh : m.labelEn}
          </span>
          <span className="text-sm sm:text-base font-bold font-mono text-[#00f0ff]">
            {getMetricValue(m, lang)}
          </span>
        </div>
      ))}
    </div>
  );
};
