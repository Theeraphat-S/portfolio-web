import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Activity,
  Heart,
  TrendingUp,
  ShoppingBag,
  MessageSquare,
  Flame,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type ScreenKey = "ncds" | "pinto" | "pos";

const SCREEN_INDEX_MAP: Record<ScreenKey, number> = {
  ncds: 0,
  pinto: 1,
  pos: 2,
};

const SCREEN_THEME_MAP: Record<ScreenKey, { ping: string; dot: string }> = {
  ncds: { ping: "bg-emerald-400", dot: "bg-emerald-500" },
  pinto: { ping: "bg-amber-400", dot: "bg-amber-500" },
  pos: { ping: "bg-blue-400", dot: "bg-blue-500" },
};

const screenVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? 90 : -90,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export const MobileMockup: React.FC = () => {
  const { t } = useLanguage();
  const [[activeScreen, direction], setActiveScreen] = useState<
    [ScreenKey, number]
  >(["ncds", 0]);
  const [streakCount, setStreakCount] = useState(7);
  const [isStreaked, setIsStreaked] = useState(false);

  const changeScreen = (newScreen: ScreenKey) => {
    if (newScreen === activeScreen) return;
    const dir =
      SCREEN_INDEX_MAP[newScreen] > SCREEN_INDEX_MAP[activeScreen] ? 1 : -1;
    setActiveScreen([newScreen, dir]);
  };

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
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]">
      {/* Background Glow Orb */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-blue-600/20 blur-2xl -z-10 animate-pulse-subtle" />

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-2 rounded-xl bg-zinc-900/90 border border-cyan-500/40 px-3 py-2 shadow-xl backdrop-blur-md"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-semibold text-cyan-300 font-mono">
          Flutter 3.x + Bloc
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-2 rounded-xl bg-zinc-900/90 border border-blue-500/40 px-3 py-2 shadow-xl backdrop-blur-md"
      >
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <span className="text-xs font-semibold text-blue-300 font-mono">
          Clean Architecture
        </span>
      </motion.div>

      {/* Outer Phone Shell */}
      <div className="relative rounded-[44px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.18)] ring-1 ring-white/10">
        {/* Inner Bezel */}
        <div className="relative h-[660px] w-full overflow-hidden rounded-[41px] bg-zinc-950 flex flex-col justify-between border border-zinc-800/80">
          {/* Top Status Bar & Dynamic Island */}
          <div className="relative z-30 pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-medium text-zinc-400">
            <span>09:41</span>

            {/* Dynamic Island with Reactive State Pulse */}
            <motion.div
              key={`island-${activeScreen}`}
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="h-5 w-24 rounded-full bg-black border border-zinc-800 flex items-center justify-between px-2 gap-1.5 shadow-inner"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-ping ${SCREEN_THEME_MAP[activeScreen].ping}`}
              />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <div
                  className={`w-1 h-1 rounded-full ${SCREEN_THEME_MAP[activeScreen].dot}`}
                />
              </div>
            </motion.div>

            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-zinc-500 p-[0.5px] flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Switcher Tabs inside Phone Header */}
          <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800/80 backdrop-blur-md z-20">
            <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] font-medium">
              <button
                onClick={() => changeScreen("ncds")}
                className={`py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeScreen === "ncds"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Activity className="w-3 h-3" />
                NCDs
              </button>
              <button
                onClick={() => changeScreen("pinto")}
                className={`py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeScreen === "pinto"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                Pinto
              </button>
              <button
                onClick={() => changeScreen("pos")}
                className={`py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeScreen === "pos"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                POS
              </button>
            </div>
          </div>

          {/* Interactive Screen Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 text-zinc-100 relative">
            <AnimatePresence mode="wait" custom={direction}>
              {activeScreen === "ncds" && (
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
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      </h4>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      VHV Active
                    </span>
                  </div>

                  {/* Vitals Summary Card with Animated Heartbeat Glow */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/90 border border-zinc-800 p-3 shadow-inner">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent pointer-events-none"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        {t("ผลการประเมินความเสี่ยง", "Risk Assessment")}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-700/50">
                        {t("ความเสี่ยงต่ำ", "Low Risk")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-zinc-950/60 rounded-lg p-2 border border-zinc-800">
                        <span className="text-[10px] text-zinc-400 block">
                          {t("น้ำตาลในเลือด", "Blood Sugar")}
                        </span>
                        <span className="text-sm font-bold font-mono text-emerald-400">
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
                          <span className="text-[9px] text-zinc-400 font-normal">
                            mmHg
                          </span>
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
                          color: "emerald",
                        },
                        {
                          title: t("ความดันโลหิต", "Hypertension"),
                          status: "Optimal",
                          color: "cyan",
                        },
                        {
                          title: t("โรคหัวใจ", "Heart Disease"),
                          status: "Safe",
                          color: "emerald",
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
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
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
                    {t(
                      "ออกรายงานผลตรวจ (Medical PDF)",
                      "Generate Medical Report",
                    )}
                  </motion.button>
                </motion.div>
              )}

              {activeScreen === "pinto" && (
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
                        : t(
                            "กดรับแต้มประจำวัน (+50 Pts)",
                            "Claim Daily Streak (+50 Pts)",
                          )}
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
                      <span className="text-[9px] text-emerald-400">
                        Synced
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      {t(
                        "โครงสร้าง Flutter ผสาน WebView เมนูร้านค้าได้อย่างไร้รอยต่อ",
                        "Seamless native state sync with dynamic HTML5 merchant catalog",
                      )}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeScreen === "pos" && (
                <motion.div
                  key="pos"
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
                        Retail Module
                      </p>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        POS Express Checkout
                        <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                      </h4>
                    </div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                      API Online
                    </span>
                  </div>

                  {/* Cart Summary */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-zinc-300 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
                      <span>Premium Arabica Beans (250g)</span>
                      <span className="font-mono font-bold text-blue-300">
                        ฿250
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-zinc-300 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
                      <span>Ceramic Drip Cup x1</span>
                      <span className="font-mono font-bold text-blue-300">
                        ฿170
                      </span>
                    </div>
                  </div>

                  {/* Total & QR PromptPay */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-950/40 to-zinc-900 border border-blue-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-zinc-300">
                        {t("ยอดชำระสุทธิ", "Total Amount")}
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        ฿420.00
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px]">
                      <QrCode className="w-6 h-6 text-blue-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-zinc-200 block">
                          PromptPay QR Code
                        </span>
                        <span className="text-[9px] text-zinc-400 font-mono">
                          Ref: INV-256903-88
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-950/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t(
                      "ยืนยันการรับชำระเงิน (Sync API)",
                      "Complete Transaction (Sync API)",
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Home Indicator */}
          <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 flex justify-center">
            <div className="w-28 h-1 rounded-full bg-zinc-700/80" />
          </div>
        </div>
      </div>
    </div>
  );
};
