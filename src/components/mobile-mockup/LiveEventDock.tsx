import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TerminalBoxIcon } from "../icons/Iconsax";
import { BLoCStreamEvent } from "../../types/stream";
import { useLanguage } from "../../context/LanguageContext";
import { Terminal, Code2 } from "lucide-react";

interface LiveEventDockProps {
  latestEvent: BLoCStreamEvent | null;
  eventsCount: number;
  onOpenDrawer: (initialTab: "stream" | "code" | "telemetry") => void;
}

export const LiveEventDock: React.FC<LiveEventDockProps> = ({
  latestEvent,
  eventsCount,
  onOpenDrawer,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full mt-3 rounded-2xl bg-[#090d15]/95 border border-white/[0.08] hover:border-[#00f0ff]/30 p-2.5 sm:p-3 shadow-lg backdrop-blur-md transition-all font-mono">
      {/* Top Header: Live Status + Action Buttons */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06] text-[10px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          </span>
          <span className="text-zinc-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <TerminalBoxIcon className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>BLoC DEVTOOLS</span>
          </span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="text-zinc-400 text-[9px] hidden sm:inline">
            REACTIVE LOGS
          </span>
        </div>

        {/* Action Triggers to open DevTools Drawer */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenDrawer("stream")}
            data-cursor-text="LOGS"
            aria-label={t("เปิดดูประวัติ Event Log", "Open Live Stream Logs")}
            className="px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-[#00f0ff]/10 text-zinc-300 hover:text-[#00f0ff] border border-white/[0.08] hover:border-[#00f0ff]/30 text-[9px] font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-2.5 h-2.5 text-[#00f0ff]" />
            <span>LOGS ({eventsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDrawer("code")}
            data-cursor-text="DART"
            aria-label={t("ดูโค้ด Flutter/Dart", "View Dart Source Code")}
            className="px-2 py-0.5 rounded-md bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 text-[9px] font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer"
          >
            <Code2 className="w-2.5 h-2.5" />
            <span>DART CODE</span>
          </button>
        </div>
      </div>

      {/* Live Event Ticker Strip */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          {latestEvent ? (
            <motion.div
              key={latestEvent.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOpenDrawer("stream")}
              title="Click to view full stream details"
              className="group cursor-pointer rounded-lg bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 border border-white/[0.04] hover:border-white/[0.12] transition-all flex items-center justify-between gap-2 text-[10px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 text-[8px] font-bold border border-sky-800/40 shrink-0">
                  {latestEvent.tag}
                </span>
                <span className="text-white font-medium truncate">
                  {latestEvent.name}
                </span>
                {latestEvent.stateName && (
                  <>
                    <span className="text-zinc-500 shrink-0">➔</span>
                    <span className="text-[#00f0ff] font-medium text-[9px] truncate bg-[#00f0ff]/10 px-1.5 py-0.5 rounded border border-[#00f0ff]/20 shrink-0">
                      {latestEvent.stateName}
                    </span>
                  </>
                )}
                <span className="text-zinc-500 hidden md:inline shrink-0">
                  &bull;
                </span>
                <span className="text-zinc-400 text-[9px] truncate hidden md:inline">
                  {latestEvent.details}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-[9px] font-mono text-zinc-500">
                <span className="hidden sm:inline">
                  {latestEvent.timestamp.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="py-1 px-2 text-zinc-500 text-[10px] text-center italic">
              {t(
                "กำลังรอ Event จากการกดเล่นบนหน้าจอด้านบน...",
                "Ready. Interact with the phone screen above to stream live events.",
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
