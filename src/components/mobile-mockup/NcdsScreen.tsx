import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Wifi,
  Battery,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface NcdsScreenProps {
  direction?: number;
}

export const NcdsScreen: React.FC<NcdsScreenProps> = () => {
  const { t } = useLanguage();
  const [isCalculated, setIsCalculated] = useState(true);

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#070b10] text-zinc-100 select-none">
      {/* 1. Realistic Mobile Status Bar */}
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

      {/* 2. App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06] bg-[#0b1017]/90 backdrop-blur-md">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">
            MAEJO UNIVERSITY &bull; CAPSTONE
          </span>
          <h4 className="text-xs font-bold text-white flex items-center gap-1">
            <span>NCDs Risk Screener</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
              OFFLINE READY
            </span>
          </h4>
        </div>
        <span className="text-[9px] font-mono bg-sky-950/60 text-sky-400 px-2 py-0.5 rounded border border-sky-800/40">
          VHV Mode
        </span>
      </div>

      {/* 3. Screen Body */}
      <div className="flex-1 p-3.5 flex flex-col justify-between space-y-3">
        {/* Vitals Summary Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0e1724] to-[#0a0f18] border border-white/[0.08] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              {t("ผลการประเมินความเสี่ยง", "Risk Score Engine")}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40">
              LOW RISK (3/15)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-black/40 rounded-lg p-2 border border-white/[0.06]">
              <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                {t("น้ำตาลในเลือด", "Blood Glucose")}
              </span>
              <span className="text-sm font-bold font-mono text-sky-400">
                108{" "}
                <span className="text-[9px] text-zinc-400 font-normal">
                  mg/dL
                </span>
              </span>
            </div>
            <div className="bg-black/40 rounded-lg p-2 border border-white/[0.06]">
              <span className="text-[9px] font-mono text-zinc-400 block uppercase">
                {t("ความดันโลหิต", "Blood Pressure")}
              </span>
              <span className="text-sm font-bold font-mono text-emerald-400">
                122/80{" "}
                <span className="text-[9px] text-zinc-400 font-normal">
                  mmHg
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Disease Module Checkers */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="tracking-wider uppercase">
              {t("ระบบคัดกรอง 4 กลุ่มโรค", "4 Targeted Disease Checks")}
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> All Evaluated
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              {
                title: t("เบาหวาน", "Diabetes"),
                status: "Normal",
                color: "emerald",
              },
              {
                title: t("ความดันโลหิต", "Hypertension"),
                status: "Optimal",
                color: "emerald",
              },
              {
                title: t("โรคหัวใจ", "Heart Disease"),
                status: "Low Risk",
                color: "sky",
              },
              {
                title: t("โรคอ้วน", "Obesity"),
                status: "BMI 22.4",
                color: "emerald",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/70 border border-white/[0.06]"
              >
                <div>
                  <p className="text-[11px] text-zinc-200 font-medium">
                    {item.title}
                  </p>
                  <p className="text-[9px] font-mono text-zinc-400">
                    {item.status}
                  </p>
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Field Telemetry */}
        <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/[0.04] space-y-1 text-[10px] font-mono">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Offline Local Storage</span>
            <span className="text-sky-400 font-bold">Encrypted SQLite</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Calculation Latency</span>
            <span className="text-emerald-400 font-bold">&lt; 1.2ms</span>
          </div>
        </div>

        {/* Generate Report Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsCalculated(true)}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          {isCalculated
            ? t("ออกรายงานผลตรวจ (Export PDF)", "Export Medical Report (PDF)")
            : t("ประมวลผลความเสี่ยง", "Calculate Risk Score")}
        </motion.button>
      </div>

      {/* 4. Simulated Bottom Bar */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-[#0b1017] flex flex-col items-center">
        <div className="w-24 h-1 bg-white/20 rounded-full my-0.5" />
      </div>
    </div>
  );
};

export default NcdsScreen;
