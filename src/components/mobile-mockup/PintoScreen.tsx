import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Flame,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Plus,
  RefreshCw,
  Gift,
  ExternalLink,
  Wifi,
  Battery,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export type PintoState = "rewards" | "streak" | "webview";

interface PintoScreenProps {
  direction?: number;
  activeState?: PintoState;
  onStateChange?: (state: PintoState) => void;
}

export const PintoScreen: React.FC<PintoScreenProps> = ({
  activeState: controlledState,
  onStateChange,
}) => {
  const { t } = useLanguage();
  const [internalState, setInternalState] = useState<PintoState>("streak");
  const currentState = controlledState ?? internalState;

  const handleStateSelect = (state: PintoState) => {
    if (onStateChange) {
      onStateChange(state);
    } else {
      setInternalState(state);
    }
  };

  // State 2: Streak State
  const [streakCount, setStreakCount] = useState(7);
  const [isStreaked, setIsStreaked] = useState(false);

  // State 3: WebView State
  const [cartCount, setCartCount] = useState(2);
  const [isSyncing, setIsSyncing] = useState(false);

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
        colors: ["#f59e0b", "#38bdf8", "#06b6d4", "#2196f3"],
        disableForReducedMotion: true,
        zIndex: 2000,
        scalar: 0.85,
      });
    }
  };

  const handleRefreshSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 700);
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#080b11] text-zinc-100 select-none">
      {/* 1. Realistic Mobile Status Bar */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/[0.04]">
        <span className="font-semibold text-zinc-200">09:41</span>
        {/* Dynamic Island Notch */}
        <div className="w-16 h-3.5 bg-black rounded-full border border-white/[0.08] flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="w-1 h-1 rounded-full bg-cyan-500/80 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Wifi className="w-3 h-3 text-zinc-300" />
          <Battery className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* 2. App Bar with Active State Pill */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06] bg-[#0b0f17]/90 backdrop-blur-md">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">
            FAKDUAY LOGISTICS
          </span>
          <h4 className="text-xs font-bold text-white flex items-center gap-1">
            <span>Pinto Mobile App</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
              PROD
            </span>
          </h4>
        </div>

        {/* State Quick Switcher Pills */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/[0.06] text-[9px] font-mono">
          <button
            type="button"
            onClick={() => handleStateSelect("rewards")}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              currentState === "rewards"
                ? "bg-[#2196f3]/20 text-[#64b5f6] font-bold border border-[#2196f3]/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            REWARDS
          </button>
          <button
            type="button"
            onClick={() => handleStateSelect("streak")}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              currentState === "streak"
                ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            STREAK
          </button>
          <button
            type="button"
            onClick={() => handleStateSelect("webview")}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              currentState === "webview"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            WEBVIEW
          </button>
        </div>
      </div>

      {/* 3. Screen Body with Smooth Animated Transition */}
      <div className="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          {currentState === "rewards" && (
            <motion.div
              key="state-rewards"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 flex-1"
            >
              {/* Profile & Loyalty Tier Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#121927] to-[#0c1017] border border-white/[0.08] shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#2196f3]/20 border border-[#2196f3]/40 flex items-center justify-center text-[10px] font-bold text-sky-400 font-mono">
                      TS
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-400">
                        {t("สมาชิกพินโต", "Loyalty Tier")}
                      </p>
                      <p className="text-xs font-bold text-white flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" />
                        Gold Member
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    ID #82914
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">
                      {t("คะแนน Profile API", "Synced Profile Balance")}
                    </span>
                    <span className="text-lg font-bold font-mono text-[#64b5f6]">
                      1,450{" "}
                      <span className="text-[10px] text-zinc-400 font-normal">
                        PTS
                      </span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-amber-400/90 block">
                      550 pts to Platinum
                    </span>
                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                      <div className="w-[72%] h-full bg-gradient-to-r from-[#2196f3] to-amber-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Merchant Vouchers */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="uppercase tracking-wider">
                    {t("คูปองพร้อมใช้", "Available Vouchers (2)")}
                  </span>
                  <span className="text-[#64b5f6] flex items-center gap-0.5 cursor-pointer">
                    All <ChevronRight className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-zinc-200">
                        {t("ส่วนลดจัดส่ง ฿50", "฿50 Logistics Discount")}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-500">
                        Expires in 5 days &bull; Fakduay Delivery
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#2196f3]/15 text-[#64b5f6] border border-[#2196f3]/30">
                    USE
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-zinc-200">
                        {t("รับเครื่องดื่มฟรี", "Free Matcha Drink")}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-500">
                        Min. spend ฿200 &bull; Pinto Merchant
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                    CLAIMED
                  </span>
                </div>
              </div>

              {/* Point Ledger Activity */}
              <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/[0.04] space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {t("ประวัติคะแนนล่าสุด (Profile API)", "Recent Point Events")}
                </span>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <span className="truncate">Daily Chat Streak Check-in</span>
                  <span className="text-emerald-400 font-bold">+50 PTS</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="truncate">Merchant Bento Order #7712</span>
                  <span className="text-emerald-400 font-bold">+120 PTS</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentState === "streak" && (
            <motion.div
              key="state-streak"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 flex-1"
            >
              {/* Gamified Streak Hero Card */}
              <div className="rounded-xl bg-gradient-to-br from-amber-950/30 via-zinc-900/90 to-zinc-900 border border-amber-500/25 p-3.5 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                      <Flame className="w-4 h-4 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-amber-300/80 uppercase block tracking-wider">
                        {t("สถิติแชทต่อเนื่อง", "Streak Engine")}
                      </span>
                      <h5 className="text-xs font-bold text-white">
                        {t("Chat Streaks สะสมแต้ม", "Daily Chat Streaks")}
                      </h5>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-amber-400">
                      {streakCount}{" "}
                      <span className="text-[10px] font-normal text-zinc-400">
                        {t("วัน", "Days")}
                      </span>
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-300 mb-3 leading-relaxed">
                  {t(
                    "แชทสั่งสินค้าหรือส่งข้อความต่อเนื่องเพื่อปลดล็อก Voucher และเพิ่มอันดับโปรไฟล์",
                    "Keep messaging daily to preserve streak and unlock exclusive VIP vouchers.",
                  )}
                </p>

                {/* Claim Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStreakClick}
                  className={`w-full py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                    isStreaked
                      ? "bg-zinc-800 text-sky-400 border border-sky-500/30"
                      : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 shadow-amber-950/40"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isStreaked
                    ? t("เช็คอินสำเร็จ (+50 PTS)", "Claimed! 8 Days Active")
                    : t("กดรับแต้มวันนี้ (+50 PTS)", "Claim Daily Streak (+50 Pts)")}
                </motion.button>
              </div>

              {/* 7-Day Streak Timeline Tracker */}
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  {t("บันทึก 7 วันล่าสุด", "7-Day Streak Timeline")}
                </span>
                <div className="grid grid-cols-7 gap-1 text-center font-mono">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, dIdx) => {
                    const isPassed = dIdx < 6;
                    const isToday = dIdx === 6;
                    return (
                      <div
                        key={dIdx}
                        className={`py-1.5 px-0.5 rounded-md border flex flex-col items-center gap-1 ${
                          isToday
                            ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                            : isPassed
                              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
                              : "bg-zinc-900 border-zinc-800 text-zinc-600"
                        }`}
                      >
                        <span className="text-[9px]">{day}</span>
                        {isPassed ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        ) : isToday ? (
                          <Flame className="w-2.5 h-2.5 text-amber-400" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestones */}
              <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.04] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">Next Milestone: 14 Days</span>
                  <span className="text-amber-400 font-bold">50%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-amber-400 rounded-full" />
                </div>
                <p className="text-[9px] font-mono text-zinc-500">
                  Unlocks 20% off all merchant delivery fees
                </p>
              </div>
            </motion.div>
          )}

          {currentState === "webview" && (
            <motion.div
              key="state-webview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 flex-1"
            >
              {/* Hybrid WebView Bridge Browser Bar */}
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-zinc-300 font-medium truncate">
                    bridge://merchant.fakduay.com/catalog
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRefreshSync}
                  className="p-1 hover:text-white text-zinc-400 transition-colors"
                  title="Resync Bridge"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${isSyncing ? "animate-spin text-cyan-400" : ""}`}
                  />
                </button>
              </div>

              {/* Bridge Status Indicator */}
              <div className="px-2.5 py-1.5 rounded-md bg-[#2196f3]/10 border border-[#2196f3]/25 flex items-center justify-between text-[9px] font-mono">
                <span className="text-[#64b5f6] flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#2196f3]" />
                  JS &lt;-&gt; Flutter Bridge: Active
                </span>
                <span className="text-emerald-400 font-bold">0.4ms Latency</span>
              </div>

              {/* Dynamic Merchant Catalog Menu */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                  {t("เมนูร้านค้าแบบไดนามิก (HTML5 Web)", "HTML5 Merchant Items")}
                </span>

                {/* Item 1 */}
                <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-zinc-200">
                      Bento Salmon Teriyaki
                    </p>
                    <p className="text-[9px] font-mono text-zinc-400">
                      ฿189 &bull; Synced with Native Cart
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                      x1
                    </span>
                    <button
                      type="button"
                      onClick={() => setCartCount((prev) => prev + 1)}
                      className="p-1 rounded bg-[#2196f3]/20 text-[#64b5f6] hover:bg-[#2196f3]/30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-zinc-200">
                      Cold Brew Arabica
                    </p>
                    <p className="text-[9px] font-mono text-zinc-400">
                      ฿85 &bull; Synced with Native Cart
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                      x1
                    </span>
                    <button
                      type="button"
                      onClick={() => setCartCount((prev) => prev + 1)}
                      className="p-1 rounded bg-[#2196f3]/20 text-[#64b5f6] hover:bg-[#2196f3]/30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Native Checkout Bar */}
              <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-white/[0.08] flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="relative p-1.5 rounded-md bg-[#2196f3]/15 text-[#64b5f6]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#2196f3] text-[8px] font-bold text-black flex items-center justify-center font-mono">
                      {cartCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-400 block">
                      Bridge Subtotal
                    </span>
                    <span className="text-xs font-bold font-mono text-white">
                      ฿274.00
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-sky-400 bg-[#2196f3]/10 px-2 py-1 rounded border border-[#2196f3]/30">
                  <span>SYNC STATE</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Simulated Bottom Bar & Home Indicator */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-[#0b0f17] flex flex-col items-center">
        <div className="w-full flex items-center justify-around text-[9px] font-mono text-zinc-500 py-1">
          <span
            onClick={() => handleStateSelect("rewards")}
            className={`cursor-pointer transition-colors ${currentState === "rewards" ? "text-[#64b5f6] font-bold" : "hover:text-zinc-300"}`}
          >
            REWARDS
          </span>
          <span className="text-zinc-700">&bull;</span>
          <span
            onClick={() => handleStateSelect("streak")}
            className={`cursor-pointer transition-colors ${currentState === "streak" ? "text-amber-400 font-bold" : "hover:text-zinc-300"}`}
          >
            STREAKS
          </span>
          <span className="text-zinc-700">&bull;</span>
          <span
            onClick={() => handleStateSelect("webview")}
            className={`cursor-pointer transition-colors ${currentState === "webview" ? "text-cyan-300 font-bold" : "hover:text-zinc-300"}`}
          >
            WEBVIEW
          </span>
        </div>
        {/* iOS / Android Home Swipe Bar */}
        <div className="w-24 h-1 bg-white/20 rounded-full mt-1.5 mb-0.5" />
      </div>
    </div>
  );
};

export default PintoScreen;
