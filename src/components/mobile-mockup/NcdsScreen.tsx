import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { screenVariants } from "./types";

interface NcdsScreenProps {
  direction: number;
}

export const NcdsScreen: React.FC<NcdsScreenProps> = ({ direction }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      key="ncds"
      custom={direction}
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-3"
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
            MJU Senior Project
          </p>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            NCDs Health Screener
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          </h4>
        </div>
        <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          VHV Active
        </span>
      </div>

      {/* Vitals Summary Card with Animated Glow */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/90 border border-zinc-800 p-3 shadow-inner">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/70 to-transparent pointer-events-none"
        />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            {t("ผลการประเมินความเสี่ยง", "Risk Assessment")}
          </span>
          <span className="text-[11px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-700/50">
            {t("ความเสี่ยงต่ำ", "Low Risk")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-zinc-950/60 rounded-lg p-2 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block">
              {t("น้ำตาลในเลือด", "Blood Sugar")}
            </span>
            <span className="text-sm font-bold font-mono text-sky-400">
              108{" "}
              <span className="text-[9px] text-zinc-400 font-normal">
                mg/dL
              </span>
            </span>
          </div>
          <div className="bg-zinc-950/60 rounded-lg p-2 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block">
              {t("ความดันโลหิต", "Blood Pressure")}
            </span>
            <span className="text-sm font-bold font-mono text-cyan-400">
              122/80{" "}
              <span className="text-[9px] text-zinc-400 font-normal">mmHg</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Disease Module Checkers */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
          {t("ระบบคัดกรอง 4 กลุ่มโรค", "4 Targeted Diseases")}
        </span>

        <div className="grid grid-cols-2 gap-1.5">
          {[
            {
              title: t("เบาหวาน", "Diabetes"),
              status: "Normal",
              color: "sky",
            },
            {
              title: t("ความดันโลหิต", "Hypertension"),
              status: "Optimal",
              color: "cyan",
            },
            {
              title: t("โรคหัวใจ", "Heart Disease"),
              status: "Safe",
              color: "sky",
            },
            {
              title: t("โรคอ้วน", "Obesity"),
              status: "BMI 22.4",
              color: "cyan",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80"
            >
              <span className="text-[11px] text-zinc-300 font-medium">
                {item.title}
              </span>
              <span className="text-[10px] font-mono text-sky-400 flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-sky-400" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button with Spring Tap */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <TrendingUp className="w-3.5 h-3.5" />
        {t("ออกรายงานผลตรวจ (Medical PDF)", "Generate Medical Report")}
      </motion.button>
    </motion.div>
  );
};

export default NcdsScreen;
