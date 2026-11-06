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
    text: "text-m3-ok-text",
    container: "bg-m3-ok-container",
    chip: "bg-m3-ok-chip text-m3-ok-text",
    bar: "bg-m3-ok",
    icon: "text-m3-ok",
    headline: { th: "ความเสี่ยงต่ำ", en: "Low risk" },
    label: { th: "ปกติ", en: "Normal" },
  },
  moderate: {
    tier: "MODERATE",
    text: "text-m3-warn-text",
    container: "bg-m3-warn-container",
    chip: "bg-m3-warn-chip text-m3-warn-on-chip",
    bar: "bg-m3-warn",
    icon: "text-m3-warn",
    headline: { th: "ความเสี่ยงปานกลาง", en: "Moderate risk" },
    label: { th: "เฝ้าระวัง", en: "Watch" },
  },
  high: {
    tier: "HIGH RISK",
    text: "text-m3-error",
    container: "bg-m3-error-container",
    chip: "bg-m3-error-chip text-m3-error-on-chip",
    bar: "bg-m3-error",
    icon: "text-m3-error",
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

  // Beat 0 is intake (vitals entered, not yet evaluated), beat 1 shows
  // the evaluated risk tier, beat 2 the submitted record.
  const vitalsForBeat = (beat: number | undefined) =>
    beat === 0
      ? { glucose: 98, systolic: 118 }
      : { glucose: 108, systolic: 122 };

  const initial = vitalsForBeat(activeBeat);
  const [glucose, setGlucose] = useState<number>(initial.glucose); // mg/dL
  const [systolic, setSystolic] = useState<number>(initial.systolic); // mmHg
  const [isEvaluated, setIsEvaluated] = useState(activeBeat !== 0);
  const [isExported, flashExported, setIsExported] = useTransientFlag(2400);

  // Adjust state when activeBeat prop changes
  const [prevBeat, setPrevBeat] = useState(activeBeat);
  if (activeBeat !== prevBeat) {
    setPrevBeat(activeBeat);
    if (activeBeat === 0 || activeBeat === 1) {
      const next = vitalsForBeat(activeBeat);
      setGlucose(next.glucose);
      setSystolic(next.systolic);
      setIsEvaluated(activeBeat === 1);
      setIsExported(false);
    } else if (activeBeat === 2) {
      setIsEvaluated(true);
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
    setIsEvaluated(true);
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
    <div className="absolute inset-0 flex flex-col bg-m3-surface text-m3-on-surface font-sans select-none">
      {/* App bar */}
      <header className={`${SAFE_TOP} bg-white shadow-app-bar`}>
        <div className="flex h-12 items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full text-m3-on-surface-variant">
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[15px] font-semibold">
              {t("คัดกรองความเสี่ยง", "Risk screening")}
            </p>
            <p className="truncate text-[11px] text-m3-secondary">
              {tr(t, ncdsDemo.clientLabel)}
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full text-m3-on-surface-variant">
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
          className={`rounded-2xl p-4 transition-colors duration-300 ${
            isEvaluated ? style.container : "bg-white shadow-app-card"
          }`}
          aria-live="polite"
        >
          <p className="text-[11px] font-medium text-m3-on-surface-variant">
            {t("ผลประเมินรวม", "Overall result")}
          </p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p
              className={`text-[20px] font-bold leading-tight ${
                isEvaluated ? style.text : "text-m3-secondary"
              }`}
            >
              {isEvaluated
                ? tr(t, style.headline)
                : t("รอประเมินผล", "Awaiting evaluation")}
            </p>
            <p
              className={`shrink-0 whitespace-nowrap text-[13px] font-semibold tabular-nums ${
                isEvaluated ? style.text : "text-m3-secondary"
              }`}
            >
              {isEvaluated ? risk.score : "–"}
              <span className="font-normal opacity-70"> / 15</span>
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/70">
            <div
              className={`h-full w-full origin-left rounded-full transition-transform duration-500 ${style.bar}`}
              style={{
                transform: `scaleX(${isEvaluated ? risk.score / 15 : 0})`,
              }}
            />
          </div>
        </div>

        {/* Vitals */}
        <section className="rounded-2xl bg-white p-4 shadow-app-card">
          <h3 className="text-[13px] font-semibold tracking-normal">
            {t("สัญญาณชีพ", "Vital signs")}
          </h3>

          <label className="mt-3 block">
            <span className="flex items-baseline justify-between">
              <span className="text-[12px] text-m3-secondary">
                {t("น้ำตาลในเลือด (อดอาหาร)", "Fasting glucose")}
              </span>
              <span className="text-[15px] font-semibold tabular-nums">
                {glucose}
                <span className="ml-1 text-[11px] font-normal text-m3-secondary">
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
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-m3-secondary-container accent-m3-primary"
            />
          </label>

          <label className="mt-4 block">
            <span className="flex items-baseline justify-between">
              <span className="text-[12px] text-m3-secondary">
                {t("ความดันโลหิต", "Blood pressure")}
              </span>
              <span className="text-[15px] font-semibold tabular-nums">
                {systolic}/80
                <span className="ml-1 text-[11px] font-normal text-m3-secondary">
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
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-m3-secondary-container accent-m3-primary"
            />
          </label>
        </section>

        {/* Per-disease results */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-app-card">
          <h3 className="px-4 pt-3 pb-1 text-[13px] font-semibold tracking-normal">
            {t("ผลแยกรายโรค", "By condition")}
          </h3>
          <ul>
            {diseases.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-3 border-t border-m3-outline-variant px-4 py-2.5 first:border-t-0"
              >
                {!isEvaluated ? (
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border-2 border-m3-outline-variant"
                    aria-hidden="true"
                  />
                ) : d.level === "high" ? (
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
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    isEvaluated
                      ? LEVEL_STYLE[d.level].chip
                      : "bg-m3-secondary-container text-m3-secondary"
                  }`}
                >
                  {isEvaluated
                    ? tr(t, LEVEL_STYLE[d.level].label)
                    : t("รอผล", "Pending")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Primary action */}
      <div className="relative bg-m3-surface px-3 pb-2 pt-1">
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
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-m3-primary text-[14px] font-semibold text-white transition-colors hover:bg-m3-primary-hover"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          {t("บันทึกและออกรายงาน PDF", "Save & export PDF")}
        </m.button>
      </div>

      {/* Navigation bar */}
      <nav
        aria-label={t("เมนูแอป", "App navigation")}
        className={`${SAFE_BOTTOM} grid grid-cols-3 bg-m3-surface-container pt-2`}
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
                  active
                    ? "bg-m3-primary-container text-m3-on-primary-container"
                    : "text-m3-on-surface-variant"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span
                className={
                  active
                    ? "font-semibold text-m3-on-surface"
                    : "text-m3-on-surface-variant"
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
