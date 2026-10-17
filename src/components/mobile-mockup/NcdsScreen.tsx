import React, { useState } from "react";
import { m } from "motion/react";
import {
  ArrowLeft,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  FileText,
  House,
  ClipboardList,
  History,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";
import { useTransientFlag } from "../../hooks/useTransientFlag";
import { SAFE_BOTTOM, SAFE_TOP } from "./DeviceFrame";
import { AppSnackbar } from "./AppSnackbar";
import { ncdsDemo } from "../../data/deviceDemos";
import { BilingualText } from "../../types/portfolio";

interface NcdsScreenProps {
  direction?: number;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
  activeBeat?: number;
}

type RiskLevel = "low" | "moderate" | "high";

// Light Material 3 theme (purple baseline) of the field app used by
// village health volunteers. Every risk-dependent style and label lives
// here so the screen never branches on the level itself.
const LEVEL_STYLE: Record<
  RiskLevel,
  {
    tier: string;
    text: string;
    container: string;
    chip: string;
    bar: string;
    icon: string;
    headline: BilingualText;
    label: BilingualText;
  }
> = {
  low: {
    tier: "LOW RISK",
    text: "text-[#1b6b3a]",
    container: "bg-[#e3f4e8]",
    chip: "bg-[#d3eedb] text-[#1b6b3a]",
    bar: "bg-[#2e8b57]",
    icon: "text-[#2e8b57]",
    headline: { th: "ความเสี่ยงต่ำ", en: "Low risk" },
    label: { th: "ปกติ", en: "Normal" },
  },
  moderate: {
    tier: "MODERATE",
    text: "text-[#8a5300]",
    container: "bg-[#fff1d6]",
    chip: "bg-[#ffe6b3] text-[#7a4900]",
    bar: "bg-[#c77800]",
    icon: "text-[#c77800]",
    headline: { th: "ความเสี่ยงปานกลาง", en: "Moderate risk" },
    label: { th: "เฝ้าระวัง", en: "Watch" },
  },
  high: {
    tier: "HIGH RISK",
    text: "text-[#b3261e]",
    container: "bg-[#fde7e5]",
    chip: "bg-[#f9d3cf] text-[#a1231b]",
    bar: "bg-[#b3261e]",
    icon: "text-[#b3261e]",
    headline: { th: "ความเสี่ยงสูง", en: "High risk" },
    label: { th: "เสี่ยงสูง", en: "High" },
  },
};

const tr = (t: (th: string, en: string) => string, text: BilingualText) =>
  t(text.th, text.en);

export const NcdsScreen: React.FC<NcdsScreenProps> = ({
  onDispatchEvent,
  activeBeat,
}) => {
  const { t } = useLanguage();

  const [glucose, setGlucose] = useState<number>(108); // mg/dL
  const [systolic, setSystolic] = useState<number>(122); // mmHg
  const [isExported, flashExported, setIsExported] = useTransientFlag(2400);

  // Adjust state when activeBeat prop changes
  const [prevBeat, setPrevBeat] = useState(activeBeat);
  if (activeBeat !== prevBeat) {
    setPrevBeat(activeBeat);
    if (activeBeat === 0) {
      setGlucose(98);
      setSystolic(118);
      setIsExported(false);
    } else if (activeBeat === 1) {
      setGlucose(108);
      setSystolic(122);
      setIsExported(false);
    } else if (activeBeat === 2) {
      setIsExported(true);
    }
  }

  // Client-side risk algorithm (same rules the BLoC evaluates on device)
  const calculateRisk = (gluc: number, sys: number) => {
    let score = 1; // base lifestyle score
    let diabetesRisk: RiskLevel = "low";
    let hypertensionRisk: RiskLevel = "low";
    let heartRisk: RiskLevel = "low";

    if (gluc >= 126) {
      score += 6;
      diabetesRisk = "high";
    } else if (gluc >= 100) {
      score += 3;
      diabetesRisk = "moderate";
    }

    if (sys >= 140) {
      score += 5;
      hypertensionRisk = "high";
      heartRisk = "moderate";
    } else if (sys >= 130) {
      score += 3;
      hypertensionRisk = "moderate";
    }

    const level: RiskLevel =
      score >= 8 ? "high" : score >= 4 ? "moderate" : "low";
    const tier = LEVEL_STYLE[level].tier;

    return { score, level, tier, diabetesRisk, hypertensionRisk, heartRisk };
  };

  const risk = calculateRisk(glucose, systolic);

  const handleVitalsChange = (newGlucose: number, newSystolic: number) => {
    setGlucose(newGlucose);
    setSystolic(newSystolic);
    const computed = calculateRisk(newGlucose, newSystolic);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "ncds-screening",
        source: "NcdsScreen",
        type: "bloc_event",
        tag: "BLoC::Event",
        name: "UpdateVitalsEvent",
        stateName: `RiskEvaluatedState(${computed.score}/15)`,
        details: `Glucose: ${newGlucose} mg/dL, BP: ${newSystolic}/80 mmHg ➔ ${computed.tier}`,
        payload: {
          glucose: newGlucose,
          bloodPressure: `${newSystolic}/80`,
          totalScore: computed.score,
          riskTier: computed.tier,
          flags: {
            diabetes: computed.diabetesRisk,
            hypertension: computed.hypertensionRisk,
            heart: computed.heartRisk,
          },
          evaluatedOn: "client (BLoC)",
        },
        latencyMs: 0.6,
      }),
    );
  };

  const handleExportPdf = () => {
    flashExported();

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "ncds-screening",
        source: "NcdsScreen",
        type: "bloc_event",
        tag: "PDF_GEN",
        name: "GenerateMedicalReportEvent",
        stateName: "ReportPdfExportedState",
        details: `Record submitted via REST API · PDF summary generated (Score ${risk.score}/15)`,
        payload: {
          patientRef: "VHV-PAT-0941",
          status: "Submitted",
        },
        latencyMs: 1.2,
      }),
    );
  };

  const diseases: { id: string; title: string; level: RiskLevel }[] = [
    { id: "dm", title: t("เบาหวาน", "Diabetes"), level: risk.diabetesRisk },
    {
      id: "ht",
      title: t("ความดันโลหิตสูง", "Hypertension"),
      level: risk.hypertensionRisk,
    },
    { id: "cvd", title: t("โรคหัวใจ", "Heart disease"), level: risk.heartRisk },
    {
      id: "bmi",
      title: t("โรคอ้วน (BMI 22.4)", "Obesity (BMI 22.4)"),
      level: "low",
    },
  ];

  const style = LEVEL_STYLE[risk.level];

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f7f2fa] text-[#1d1b20] font-sans select-none">
      {/* App bar */}
      <header
        className={`${SAFE_TOP} bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]`}
      >
        <div className="flex h-12 items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full text-[#49454f]">
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[15px] font-semibold">
              {t("คัดกรองความเสี่ยง", "Risk screening")}
            </p>
            <p className="truncate text-[11px] text-[#625b71]">
              {tr(t, ncdsDemo.clientLabel)}
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full text-[#49454f]">
            <MoreVertical className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        </div>
      </header>

      {/* Body */}
      <div
        data-lenis-prevent
        className="flex-1 space-y-3 overflow-y-auto px-3 py-3 scrollbar-none"
      >
        {/* Result */}
        <div
          className={`rounded-2xl p-4 transition-colors duration-300 ${style.container}`}
          aria-live="polite"
        >
          <p className="text-[11px] font-medium text-[#49454f]">
            {t("ผลประเมินรวม", "Overall result")}
          </p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p className={`text-[20px] font-bold leading-tight ${style.text}`}>
              {tr(t, style.headline)}
            </p>
            <p
              className={`shrink-0 whitespace-nowrap text-[13px] font-semibold tabular-nums ${style.text}`}
            >
              {risk.score}
              <span className="font-normal opacity-70"> / 15</span>
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/70">
            <div
              className={`h-full w-full origin-left rounded-full transition-transform duration-500 ${style.bar}`}
              style={{ transform: `scaleX(${risk.score / 15})` }}
            />
          </div>
        </div>

        {/* Vitals */}
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <h4 className="text-[13px] font-semibold tracking-normal">
            {t("สัญญาณชีพ", "Vital signs")}
          </h4>

          <label className="mt-3 block">
            <span className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#625b71]">
                {t("น้ำตาลในเลือด (อดอาหาร)", "Fasting glucose")}
              </span>
              <span className="text-[15px] font-semibold tabular-nums">
                {glucose}
                <span className="ml-1 text-[11px] font-normal text-[#625b71]">
                  mg/dL
                </span>
              </span>
            </span>
            <input
              type="range"
              min="70"
              max="260"
              step="1"
              value={glucose}
              onChange={(e) =>
                handleVitalsChange(Number(e.target.value), systolic)
              }
              aria-label="Fasting blood glucose level"
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-[#e8def8] accent-[#6750a4]"
            />
          </label>

          <label className="mt-4 block">
            <span className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#625b71]">
                {t("ความดันโลหิต", "Blood pressure")}
              </span>
              <span className="text-[15px] font-semibold tabular-nums">
                {systolic}/80
                <span className="ml-1 text-[11px] font-normal text-[#625b71]">
                  mmHg
                </span>
              </span>
            </span>
            <input
              type="range"
              min="90"
              max="185"
              step="1"
              value={systolic}
              onChange={(e) =>
                handleVitalsChange(glucose, Number(e.target.value))
              }
              aria-label="Systolic blood pressure level"
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-[#e8def8] accent-[#6750a4]"
            />
          </label>
        </section>

        {/* Per-disease results */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <h4 className="px-4 pt-3 pb-1 text-[13px] font-semibold tracking-normal">
            {t("ผลแยกรายโรค", "By condition")}
          </h4>
          <ul>
            {diseases.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-3 border-t border-[#f1ecf4] px-4 py-2.5 first:border-t-0"
              >
                {d.level === "high" ? (
                  <AlertTriangle
                    className={`h-4 w-4 shrink-0 ${LEVEL_STYLE.high.icon}`}
                    aria-hidden="true"
                  />
                ) : (
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${LEVEL_STYLE[d.level].icon}`}
                    aria-hidden="true"
                  />
                )}
                <span className="flex-1 text-[13px]">{d.title}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${LEVEL_STYLE[d.level].chip}`}
                >
                  {tr(t, LEVEL_STYLE[d.level].label)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Primary action */}
      <div className="relative bg-[#f7f2fa] px-3 pb-2 pt-1">
        <AppSnackbar
          message={
            isExported
              ? t("บันทึกผลแล้ว · สร้าง PDF สำเร็จ", "Saved · PDF report ready")
              : null
          }
        />
        <m.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleExportPdf}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#6750a4] text-[14px] font-semibold text-white transition-colors hover:bg-[#523d8f]"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          {t("บันทึกและออกรายงาน PDF", "Save & export PDF")}
        </m.button>
      </div>

      {/* Navigation bar */}
      <nav
        aria-label={t("เมนูแอป", "App navigation")}
        className={`${SAFE_BOTTOM} grid grid-cols-3 bg-[#f3edf7] pt-2`}
      >
        {[
          { id: "home", icon: House, label: t("หน้าหลัก", "Home") },
          { id: "screen", icon: ClipboardList, label: t("คัดกรอง", "Screen") },
          { id: "history", icon: History, label: t("ประวัติ", "History") },
        ].map(({ id, icon: Icon, label }) => {
          const active = id === "screen";
          return (
            <span
              key={id}
              className="flex flex-col items-center gap-1 text-[11px]"
            >
              <span
                className={`grid h-7 w-14 place-items-center rounded-full ${
                  active ? "bg-[#eaddff] text-[#21005d]" : "text-[#49454f]"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span
                className={
                  active ? "font-semibold text-[#1d1b20]" : "text-[#49454f]"
                }
              >
                {label}
              </span>
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default NcdsScreen;
