import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, MessageSquare, ShoppingBag, ShieldCheck } from "lucide-react";
import {
  NcdsScreen,
  PintoScreen,
  PosScreen,
  BlueprintScreen,
  type ScreenKey,
  SCREEN_INDEX_MAP,
  SCREEN_THEME_MAP,
} from "./mobile-mockup";
import { LensStage } from "./reactbits/LensStage";

export const MobileMockup: React.FC = () => {
  const [[activeScreen, direction], setActiveScreen] = useState<[ScreenKey, number]>(["ncds", 0]);

  const changeScreen = (newScreen: ScreenKey) => {
    if (newScreen === activeScreen) return;
    const dir =
      SCREEN_INDEX_MAP[newScreen] > SCREEN_INDEX_MAP[activeScreen] ? 1 : -1;
    setActiveScreen([newScreen, dir]);
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

          {/* Interactive Screen Content with Norrly-style Lens Reveal */}
          <LensStage
            radius={85}
            label="FLUTTER ARCHITECTURE"
            activeBorderColor="rgba(6, 182, 212, 0.9)"
            containerClassName="flex-1 overflow-hidden"
            className="h-full overflow-y-auto px-4 py-3 text-zinc-100 relative"
            revealContent={<BlueprintScreen activeScreen={activeScreen} />}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {activeScreen === "ncds" && (
                <NcdsScreen key="ncds" direction={direction} />
              )}
              {activeScreen === "pinto" && (
                <PintoScreen key="pinto" direction={direction} />
              )}
              {activeScreen === "pos" && (
                <PosScreen key="pos" direction={direction} />
              )}
            </AnimatePresence>
          </LensStage>

          {/* Bottom Home Indicator */}
          <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 flex justify-center">
            <div className="w-28 h-1 rounded-full bg-zinc-700/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;
