import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Flame, Sparkles, Layers } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { screenVariants } from "./types";

interface PintoScreenProps {
  direction: number;
}

export const PintoScreen: React.FC<PintoScreenProps> = ({ direction }) => {
  const { t } = useLanguage();
  const [streakCount, setStreakCount] = useState(7);
  const [isStreaked, setIsStreaked] = useState(false);

  const handleStreakClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isStreaked) {
      setStreakCount((prev) => prev + 1);
      setIsStreaked(true);

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 36,
        spread: 60,
        origin: { x, y },
        colors: ["#f59e0b", "#38bdf8", "#06b6d4", "#10b981"],
        disableForReducedMotion: true,
        zIndex: 2000,
        scalar: 0.85,
      });
    }
  };

  return (
    <motion.div
      key="pinto"
      custom={direction}
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
            Fakduay Logistics
          </p>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            Pinto Rewards & Chat
            <Flame className="w-3.5 h-3.5 text-amber-500" />
          </h4>
        </div>
        <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
          v2.4 Live
        </span>
      </div>

      {/* Gamification Chat Streaks Card */}
      <div className="rounded-xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 p-3 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            {t("Chat Streaks สะสมแต้ม", "Daily Chat Streaks")}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {streakCount} {t("วันติด", "Days")}
          </span>
        </div>

        <p className="text-[11px] text-zinc-300 mb-2">
          {t(
            "แชทและสั่งออเดอร์ต่อเนื่องเพื่อรับส่วนลดพิเศษ",
            "Keep messaging & ordering to unlock VIP vouchers!",
          )}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleStreakClick}
          className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isStreaked
              ? "bg-zinc-800 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-950/50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isStreaked
            ? t("เช็คอินแต้มวันนี้แล้ว!", "Claimed Today!")
            : t("กดรับแต้มประจำวัน (+50 Pts)", "Claim Daily Streak (+50 Pts)")}
        </motion.button>
      </div>

      {/* Profile API Points */}
      <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400">
            {t("คะแนน Profile API", "Profile Loyalty Points")}
          </span>
          <span className="text-sm font-bold font-mono text-cyan-400 block">
            1,450 PTS
          </span>
        </div>
        <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded-md border border-zinc-700 font-mono">
          Tier: Gold Member
        </span>
      </div>

      {/* Hybrid WebView Menu Showcase */}
      <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[11px]">
        <div className="flex items-center justify-between text-zinc-300 mb-1">
          <span className="font-semibold flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            WebView Bridge Menu
          </span>
          <span className="text-[9px] text-emerald-400">Synced</span>
        </div>
        <p className="text-[10px] text-zinc-400">
          {t(
            "โครงสร้าง Flutter ผสาน WebView เมนูร้านค้าได้อย่างไร้รอยต่อ",
            "Seamless native state sync with dynamic HTML5 merchant catalog",
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default PintoScreen;
