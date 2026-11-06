import React from "react";
import { m } from "motion/react";
import { BEAT_COMMIT } from "../../lib/motion";
import { TerminalBoxIcon } from "../icons/Iconsax";
import { BLoCStreamEvent } from "../../types/stream";
import { useLanguage } from "../../context/LanguageContext";
import { Terminal, Code2 } from "lucide-react";

interface LiveEventDockProps {
  latestEvent: BLoCStreamEvent | null;
  eventsCount: number;
  onOpenDrawer: (initialTab: "stream" | "code" | "telemetry") => void;
  /** Starts loading the DevTools drawer on hover or focus. */
  onPrefetchDrawer?: () => void;
  /** False under reduced motion: a new event replaces the row instantly. */
  animateEntry?: boolean;
}

export const LiveEventDock: React.FC<LiveEventDockProps> = ({
  latestEvent,
  eventsCount,
  onOpenDrawer,
  onPrefetchDrawer,
  animateEntry = true,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full mt-3 rounded-2xl bg-dock/95 border border-line hover:border-signal/30 p-2.5 sm:p-3 shadow-lg backdrop-blur-md transition font-mono">
      {/* Top Header: Live Status + Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pb-2 border-b border-line text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal " />
          </span>
          <span className="text-zinc-300 font-semibold flex items-center gap-1.5 whitespace-nowrap">
            <TerminalBoxIcon className="w-3.5 h-3.5 text-primary" />
            <span>BLoC DevTools</span>
          </span>
        </div>

        {/* Action Triggers to open DevTools Drawer */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenDrawer("stream")}
            onPointerEnter={onPrefetchDrawer}
            onFocus={onPrefetchDrawer}
            data-cursor-text="LOGS"
            aria-label={t("เปิดดูประวัติ Event Log", "Open Live Stream Logs")}
            className="min-h-11 lg:min-h-7 pointer-coarse:min-h-11 px-2.5 lg:px-2 rounded-md whitespace-nowrap bg-white/[0.04] hover:bg-signal/10 text-zinc-300 hover:text-signal border border-line hover:border-signal/30 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-2.5 h-2.5 text-primary" />
            <span>Logs ({eventsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDrawer("code")}
            onPointerEnter={onPrefetchDrawer}
            onFocus={onPrefetchDrawer}
            data-cursor-text="DART"
            aria-label={t("ดูโค้ด Flutter/Dart", "View Dart Source Code")}
            className="min-h-11 lg:min-h-7 pointer-coarse:min-h-11 px-2.5 lg:px-2 rounded-md whitespace-nowrap bg-primary/10 hover:bg-signal/10 text-primary hover:text-signal border border-primary/30 hover:border-signal/30 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
          >
            <Code2 className="w-2.5 h-2.5" />
            <span>Dart code</span>
          </button>
        </div>
      </div>

      {/* Live Event Ticker Strip */}
      <div className="pt-2">
        {latestEvent ? (
          // Beat commit, part 4: the new row streams in left to right on
          // the same clock as the device sweep, with a cyan edge that cools
          // off. No exit: the old row is replaced, so the two never queue.
          <m.button
            type="button"
            key={latestEvent.id}
            initial={
              animateEntry
                ? { opacity: 0, clipPath: "inset(0% 100% 0% 0% round 8px)" }
                : false
            }
            animate={{
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0% round 8px)",
              // Unclipped at rest, so the focus ring is never cut off.
              transitionEnd: { clipPath: "none" },
            }}
            transition={BEAT_COMMIT}
            onClick={() => onOpenDrawer("stream")}
            onPointerEnter={onPrefetchDrawer}
            onFocus={onPrefetchDrawer}
            title={latestEvent.details}
            aria-label={t(
              `เปิด Event Log: ${latestEvent.name}`,
              `Open event log: ${latestEvent.name}`,
            )}
            className="w-full min-h-11 lg:min-h-0 text-left group cursor-pointer rounded-lg bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 relative border border-white/[0.04] hover:border-white/[0.12] transition-colors flex items-center justify-between gap-2 text-xs"
          >
            {animateEntry && (
              <m.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border border-signal/45"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: BEAT_COMMIT.ease }}
              />
            )}
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <span className="px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 text-xs font-semibold border border-sky-800/40 shrink-0">
                {latestEvent.tag}
              </span>
              <span className="text-white font-medium truncate min-w-0">
                {latestEvent.name}
              </span>
              {latestEvent.stateName && (
                <>
                  <span className="text-zinc-500 shrink-0">➔</span>
                  <span className="text-primary font-medium text-xs truncate min-w-0 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                    {latestEvent.stateName}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-zinc-500">
              <span className="hidden sm:inline">
                {latestEvent.timestamp.split(" ")[0]}
              </span>
            </div>
          </m.button>
        ) : (
          <div className="py-1 px-2 text-zinc-500 text-xs text-center italic">
            {t(
              "กำลังรอ Event จากการกดเล่นบนหน้าจอด้านบน...",
              "Ready. Interact with the phone screen above to stream live events.",
            )}
          </div>
        )}
      </div>
    </div>
  );
};
