import React from "react";
import { AlertCircle, Cpu, Scale, Search, TrendingUp } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ProjectItem } from "../../../../types";

interface ProjectEngineeringAnalysisProps {
  project: ProjectItem;
}

export const ProjectEngineeringAnalysis: React.FC<
  ProjectEngineeringAnalysisProps
> = ({ project }) => {
  const { lang, t } = useLanguage();

  const analysisCards = [
    {
      id: "problem",
      labelTh: "1. ปัญหาตั้งต้นหน้างาน (The Real Problem)",
      labelEn: "1. The Real Problem",
      content: lang === "th" ? project.problemTh : project.problemEn,
      icon: AlertCircle,
      borderColor: "border-rose-900/40",
      textColor: "text-rose-400",
    },
    {
      id: "decision",
      labelTh: "2. การตัดสินใจเชิงเทคนิค (Architectural Decision)",
      labelEn: "2. Key Decision & Rationale",
      content:
        lang === "th"
          ? project.decisionRationaleTh
          : project.decisionRationaleEn,
      icon: Cpu,
      borderColor: "border-sky-900/40",
      textColor: "text-sky-400",
    },
    {
      id: "tradeoffs",
      labelTh: "3. การยอมแลก (Key Trade-offs)",
      labelEn: "3. Key Trade-offs",
      content: lang === "th" ? project.tradeOffsTh : project.tradeOffsEn,
      icon: Scale,
      borderColor: "border-amber-900/40",
      textColor: "text-amber-400",
    },
    {
      id: "evidence",
      labelTh: "4. สิ่งที่ค้นพบจากการทดสอบ (Field Evidence)",
      labelEn: "4. Evidence & Usability Insight",
      content: lang === "th" ? project.evidenceTh : project.evidenceEn,
      icon: Search,
      borderColor: "border-purple-900/40",
      textColor: "text-purple-400",
    },
  ].filter((card): card is typeof card & { content: string } =>
    Boolean(card.content),
  );

  const outcomeText = lang === "th" ? project.outcomeTh : project.outcomeEn;
  const hasCaseStudy = analysisCards.length > 0 || Boolean(outcomeText);

  if (!hasCaseStudy) return null;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          {t(
            "การตัดสินใจเชิงวิศวกรรม & ผลกระทบ",
            "Engineering Decisions & Impact Analysis",
          )}
        </h4>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Product Sense
        </span>
      </div>

      {analysisCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysisCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`p-3.5 rounded-2xl bg-zinc-950/70 border ${card.borderColor} space-y-1.5`}
              >
                <div
                  className={`flex items-center gap-1.5 text-xs font-mono font-semibold ${card.textColor}`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === "th" ? card.labelTh : card.labelEn}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Measured Outcome & Business Impact */}
      {outcomeText && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>
              {t(
                "5. ผลลัพธ์ที่พิสูจน์ได้จริง (Measured Outcome & Impact)",
                "5. Proven Outcome & Impact",
              )}
            </span>
          </div>
          <p className="text-xs text-emerald-200/90 leading-relaxed">
            {outcomeText}
          </p>
        </div>
      )}
    </div>
  );
};
