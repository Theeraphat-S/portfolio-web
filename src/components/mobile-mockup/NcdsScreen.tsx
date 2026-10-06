import React, { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Battery,
  FileCheck2,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  HeartPulseIcon,
  BloodGlucoseIcon,
  BloodPressureIcon,
} from "../icons/Iconsax";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";

interface NcdsScreenProps {
  direction?: number;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
  activeBeat?: number;
}

export const NcdsScreen: React.FC<NcdsScreenProps> = ({
  onDispatchEvent,
  activeBeat,
}) => {
  const { t } = useLanguage();

  // Interactive Clinical Input Values
  const [glucose, setGlucose] = useState<number>(108); // mg/dL
  const [systolic, setSystolic] = useState<number>(122); // mmHg
  const [isExported, setIsExported] = useState<boolean>(false);

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

  // Real-time Client-side Clinical Risk Algorithm
  const calculateRisk = (gluc: number, sys: number) => {
    let score = 1; // base lifestyle score
    const flags = {
      diabetes: "Normal",
      diabetesRisk: "low",
      hypertension: "Optimal",
      hypertensionRisk: "low",
      heart: "Low Risk",
      obesity: "BMI 22.4 (Normal)",
    };

    // Glucose Evaluation
    if (gluc >= 126) {
      score += 6;
      flags.diabetes = "High Risk (Diabetes)";
      flags.diabetesRisk = "high";
    } else if (gluc >= 100) {
      score += 3;
      flags.diabetes = "Pre-Diabetes";
      flags.diabetesRisk = "moderate";
    }

    // Blood Pressure Evaluation
    if (sys >= 140) {
      score += 5;
      flags.hypertension = "Stage 2 Hypertension";
      flags.hypertensionRisk = "high";
      flags.heart = "Elevated Cardiac Load";
    } else if (sys >= 130) {
      score += 3;
      flags.hypertension = "Pre-Hypertension";
      flags.hypertensionRisk = "moderate";
    }

    const tier =
      score >= 8 ? "HIGH RISK" : score >= 4 ? "MODERATE" : "LOW RISK";
    const color = score >= 8 ? "rose" : score >= 4 ? "amber" : "emerald";

    return { score, tier, color, flags };
  };

  const riskData = calculateRisk(glucose, systolic);

  // Dispatch BLoC stream event on adjustment
  const handleVitalsChange = (newGlucose: number, newSystolic: number) => {
    setGlucose(newGlucose);
    setSystolic(newSystolic);
    const computed = calculateRisk(newGlucose, newSystolic);

    if (onDispatchEvent) {
      onDispatchEvent(
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
            flags: computed.flags,
            evaluatedOn: "client (BLoC)",
          },
          latencyMs: 0.6,
        }),
      );
    }
  };

  const applyPreset = (
    presetGlucose: number,
    presetSystolic: number,
    presetName: string,
  ) => {
    handleVitalsChange(presetGlucose, presetSystolic);
    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "ncds-screening",
          source: "NcdsScreen",
          type: "bloc_state",
          tag: "SCENARIO",
          name: `ApplyPreset: ${presetName}`,
          stateName: "VitalsPresetLoadedState",
          details: `Simulated patient vitals loaded into BLoC form state`,
          latencyMs: 0.4,
        }),
      );
    }
  };

  const handleExportPdf = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2400);

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "ncds-screening",
          source: "NcdsScreen",
          type: "bloc_event",
          tag: "PDF_GEN",
          name: "GenerateMedicalReportEvent",
          stateName: "ReportPdfExportedState",
          details: `Generated clinical PDF summary (Score ${riskData.score}/15)`,
          payload: {
            patientRef: "VHV-PAT-0941",
            status: "Draft Exported",
          },
          latencyMs: 1.2,
        }),
      );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#070b10] text-zinc-100 select-none">
      {/* 1. Status Bar */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/[0.04]">
        <span className="font-semibold text-zinc-200">09:41</span>
        <div className="w-16 h-3.5 bg-black rounded-full border border-white/[0.08] flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Wifi className="w-3 h-3 text-zinc-300" />
          <Battery className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* 2. App Bar with VHV Mode & Backend State */}
      <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/[0.06] bg-[#0b1017]/90 backdrop-blur-md">
        <div>
          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase block">
            MJU CAPSTONE &bull; CLIENT-SIDE ENGINE
          </span>
          <p className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>NCDs Risk Screener</span>
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
              REST · MYSQL
            </span>
          </p>
        </div>
        <span className="text-[9px] font-mono bg-sky-950/60 text-sky-400 px-2 py-0.5 rounded border border-sky-800/40">
          VHV Field Mode
        </span>
      </div>

      {/* 3. Screen Body with Interactive Sliders */}
      <div className="flex-1 p-3 flex flex-col justify-between space-y-2.5 overflow-y-auto">
        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.06] text-[9px] font-mono overflow-x-auto">
          <span className="text-zinc-500 uppercase px-1 shrink-0">
            PRESETS:
          </span>
          <button
            type="button"
            onClick={() => applyPreset(92, 115, "Normal")}
            className="px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🟢 Normal
          </button>
          <button
            type="button"
            onClick={() => applyPreset(118, 134, "Pre-Diabetes")}
            className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🟡 Moderate
          </button>
          <button
            type="button"
            onClick={() => applyPreset(235, 172, "Critical High")}
            className="px-2 py-0.5 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🔴 Critical
          </button>
        </div>

        {/* Dynamic Vitals Summary & Real-time Risk Score */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#0d1624] to-[#0a0f19] border border-white/[0.08] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <HeartPulseIcon
                size={16}
                animated={riskData.score >= 8}
                color={
                  riskData.color === "rose"
                    ? "#f43f5e"
                    : riskData.color === "amber"
                      ? "#f59e0b"
                      : "#10b981"
                }
              />
              <span>
                {t("ผลการคำนวณความเสี่ยง BLoC", "BLoC Risk Score Engine")}
              </span>
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                riskData.color === "rose"
                  ? "text-rose-400 bg-rose-950/60 border-rose-600/40"
                  : riskData.color === "amber"
                    ? "text-amber-400 bg-amber-950/60 border-amber-600/40"
                    : "text-emerald-400 bg-emerald-950/60 border-emerald-600/40"
              }`}
            >
              {riskData.tier} ({riskData.score}/15)
            </span>
          </div>

          {/* Interactive Range Sliders */}
          <div className="space-y-2 mt-2 pt-1 border-t border-white/[0.06]">
            {/* 1. Fasting Glucose Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <BloodGlucoseIcon size={12} color="#38bdf8" />
                  <span>{t("น้ำตาลในเลือด (Glucose)", "Blood Glucose")}</span>
                </span>
                <span className="font-bold text-[#00f0ff]">
                  {glucose} mg/dL
                </span>
              </div>
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
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
            </div>

            {/* 2. Systolic Blood Pressure Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <BloodPressureIcon size={12} color="#10b981" />
                  <span>{t("ความดันโลหิต (Systolic)", "Blood Pressure")}</span>
                </span>
                <span className="font-bold text-emerald-400">
                  {systolic}/80 mmHg
                </span>
              </div>
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
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* 4 Disease Module Checkers */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="tracking-wider uppercase">
              {t(
                "สถานะกลุ่มโรค (Clinical States)",
                "Clinical State Diagnostics",
              )}
            </span>
            <span className="text-emerald-400 text-[9px]">Reactive Flow</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              {
                id: "diabetes",
                title: t("โรคเบาหวาน", "Diabetes"),
                value: riskData.flags.diabetes,
                risk: riskData.flags.diabetesRisk,
              },
              {
                id: "hypertension",
                title: t("ความดันโลหิต", "Hypertension"),
                value: riskData.flags.hypertension,
                risk: riskData.flags.hypertensionRisk,
              },
              {
                id: "heart",
                title: t("โรคหัวใจ", "Heart Risk"),
                value: riskData.flags.heart,
                risk: "normal",
              },
              {
                id: "obesity",
                title: t("ดัชนีมวลกาย", "Obesity / BMI"),
                value: riskData.flags.obesity,
                risk: "normal",
              },
            ].map((card) => {
              const isHigh = card.risk === "high";
              const isModerate = card.risk === "moderate";
              return (
                <div
                  key={card.id}
                  className="p-2 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] text-zinc-300 font-medium">
                      {card.title}
                    </p>
                    <p
                      className={`text-[9px] font-mono font-semibold ${
                        isHigh
                          ? "text-rose-400"
                          : isModerate
                            ? "text-amber-400"
                            : card.id === "heart"
                              ? "text-zinc-400"
                              : "text-emerald-400"
                      }`}
                    >
                      {card.value}
                    </p>
                  </div>
                  {isHigh ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  ) : (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        card.id === "heart"
                          ? "text-sky-400"
                          : "text-emerald-400"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Field Telemetry */}
        <div className="p-2 rounded-lg bg-zinc-900/50 border border-white/[0.04] space-y-1 text-[9px] font-mono">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Record Storage</span>
            <span className="text-sky-400 font-bold">REST API → MySQL</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Client Eval Latency</span>
            <span className="text-emerald-400 font-bold">
              &lt; 0.8ms (Zero Error)
            </span>
          </div>
        </div>

        {/* Generate Report Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={handleExportPdf}
          aria-label="Export medical report"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          {isExported ? (
            <>
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t("ออกรายงาน PDF สำเร็จ", "PDF Report Generated!")}</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>
                {t("ออกรายงานผลตรวจ (Export PDF)", "Export Medical Report")}
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* 4. Bottom Home Indicator */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-[#0b1017] flex flex-col items-center">
        <div className="w-24 h-1 bg-white/20 rounded-full my-0.5" />
      </div>
    </div>
  );
};

export default NcdsScreen;
