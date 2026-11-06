import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/motion";
import {
  X,
  Copy,
  Check,
  Terminal,
  Code2,
  Activity,
  Trash2,
} from "lucide-react";
import { BLoCStreamEvent } from "../../types/stream";
import { DART_SNIPPETS } from "../../data/dartCodeSnippets";
import { useLanguage } from "../../context/LanguageContext";
import { useDialog } from "../../hooks/useDialog";
import { useTransientFlag } from "../../hooks/useTransientFlag";

interface DevToolsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "stream" | "code" | "telemetry";
  projectId: string;
  events: BLoCStreamEvent[];
  onClearEvents: () => void;
}

export const DevToolsDrawer: React.FC<DevToolsDrawerProps> = ({
  isOpen,
  onClose,
  initialTab = "stream",
  projectId,
  events,
  onClearEvents,
}) => {
  const { lang, t } = useLanguage();
  const [tabOverride, setTabOverride] = useState<
    "stream" | "code" | "telemetry" | null
  >(null);
  const activeTab = tabOverride ?? initialTab;
  const [isCopied, flashCopied] = useTransientFlag(2000);
  const [copyFailed, flashCopyFailed] = useTransientFlag(3000);

  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(isOpen, dialogRef, onClose);

  const snippet = DART_SNIPPETS[projectId] || DART_SNIPPETS["ncds-screening"];

  const handleCopyCode = async () => {
    if (!snippet) return;
    try {
      // Clipboard is unavailable on insecure origins and can be denied.
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(snippet.code);
      flashCopied();
    } catch {
      flashCopyFailed();
    }
  };

  // Portal to <body>: the case-study card uses backdrop-filter, which would
  // otherwise become the containing block for this fixed overlay.
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <m.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            role="dialog"
            aria-modal="true"
            aria-label="Flutter & BLoC DevTools Inspector"
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl bg-deck border border-white/[0.12] shadow-drawer overflow-hidden font-mono z-10 outline-none"
          >
            {/* Header Strip */}
            <div className="px-4 sm:px-5 py-4 border-b border-line flex items-center justify-between gap-3 bg-deck-head">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold block">
                    FLUTTER DEVTOOLS & ARCHITECTURE
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="break-all">{snippet.fileName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 font-normal">
                      {snippet.architectureLayer}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close DevTools"
                className="flex items-center justify-center p-1.5 min-w-11 min-h-11 lg:min-w-0 lg:min-h-0 pointer-coarse:min-w-11 pointer-coarse:min-h-11 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-line bg-deck-bar flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTabOverride("stream")}
                  className={`px-3 py-1.5 min-h-11 lg:min-h-0 pointer-coarse:min-h-11 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "stream"
                      ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t("BLoC Event Stream", "BLoC Stream")} ({events.length})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabOverride("code")}
                  className={`px-3 py-1.5 min-h-11 lg:min-h-0 pointer-coarse:min-h-11 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("Dart Source Code", "Dart Source")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabOverride("telemetry")}
                  className={`px-3 py-1.5 min-h-11 lg:min-h-0 pointer-coarse:min-h-11 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "telemetry"
                      ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("ประสิทธิภาพระบบ", "Engine Specs")}</span>
                </button>
              </div>

              {/* Auxiliary action */}
              {activeTab === "stream" && events.length > 0 && (
                <button
                  type="button"
                  onClick={onClearEvents}
                  className="px-2 py-1 min-h-11 lg:min-h-0 pointer-coarse:min-h-11 rounded text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t("ล้าง Log", "Clear Logs")}</span>
                </button>
              )}

              {activeTab === "code" && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-live="polite"
                  className="px-2.5 py-1 min-h-11 lg:min-h-0 pointer-coarse:min-h-11 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-line text-xs transition flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-primary" />
                      <span className="text-primary">COPIED</span>
                    </>
                  ) : copyFailed ? (
                    <span className="text-rose-300">
                      {t(
                        "คัดลอกไม่ได้ ให้เลือกโค้ดแล้วคัดลอกเอง",
                        "Couldn't copy. Select the code and copy it manually",
                      )}
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>COPY CODE</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs space-y-4">
              {/* TAB 1: BLoC Event Stream */}
              {activeTab === "stream" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-line text-xs text-zinc-400 flex items-center justify-between">
                    <span>
                      {lang === "th"
                        ? "Event Stream ที่เกิดจากการเลื่อนอ่านเรื่องและการแตะหน้าจอจำลอง"
                        : "Events from scrolling the story and tapping the device."}
                    </span>
                    <span className="text-primary font-bold">
                      Unidirectional BLoC
                    </span>
                  </div>

                  {events.length === 0 ? (
                    <div className="py-16 text-center text-zinc-500 space-y-2">
                      <Terminal className="w-8 h-8 mx-auto text-zinc-600 opacity-60" />
                      <p>
                        {t(
                          "ยังไม่มี Event ในเซสชันนี้ ให้ลองกดเลื่อน Slider หรือกดปุ่มบนโทรศัพท์",
                          "No events captured yet. Try adjusting sliders or tapping buttons on the phone mockup.",
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {events.map((evt, idx) => (
                        <div
                          key={evt.id}
                          className="p-3 rounded-xl bg-black/50 border border-line hover:border-white/[0.12] transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 text-xs">
                                #{String(events.length - idx).padStart(2, "0")}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold border border-primary/20 text-xs">
                                {evt.tag}
                              </span>
                              <span className="text-white font-bold">
                                {evt.name}
                              </span>
                            </div>
                            <span className="text-zinc-500 text-xs">
                              {evt.timestamp}
                            </span>
                          </div>

                          <p className="text-zinc-300 text-xs pl-6 font-mono">
                            {evt.details}
                          </p>

                          {evt.payload && (
                            <div className="mt-1.5 pl-6">
                              <div className="p-2 rounded-lg bg-zinc-950/80 border border-white/[0.04] text-xs text-zinc-400 overflow-x-auto">
                                <pre className="font-mono">
                                  {JSON.stringify(evt.payload, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Dart Source Code */}
              {activeTab === "code" && snippet && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-line text-zinc-300 text-xs">
                    <p className="font-sans font-light">
                      {lang === "th"
                        ? snippet.explanationTh
                        : snippet.explanationEn}
                    </p>
                    <span className="text-xs text-primary block mt-1">
                      File: {snippet.filePath}
                    </span>
                  </div>

                  {/* Code Block with line numbering */}
                  <div className="p-4 rounded-2xl bg-deck-well border border-line overflow-x-auto text-[11.5px] leading-relaxed font-mono text-zinc-300">
                    <pre>
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 3: Telemetry & Specs */}
              {activeTab === "telemetry" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-line space-y-1">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                        FRAME BUDGET
                      </span>
                      <span className="text-xl font-bold text-primary block font-mono">
                        16.6ms / 60 FPS
                      </span>
                      <span className="text-xs text-zinc-500 block">
                        Zero Jank & Isolated Rebuilds
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-line space-y-1">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                        STATE DISCIPLINE
                      </span>
                      <span className="text-xl font-bold text-primary block font-mono">
                        BLoC / Equatable
                      </span>
                      <span className="text-xs text-zinc-500 block">
                        Deterministic Event-to-State
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-line space-y-1">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                        DATA PERSISTENCE
                      </span>
                      <span className="text-xl font-bold text-primary block font-mono">
                        {snippet.persistence.label}
                      </span>
                      <span className="text-xs text-zinc-500 block">
                        {snippet.persistence.detail}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface border border-line space-y-2 text-xs">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span>
                        {t(
                          "หลักการควบคุม Rebuild Boundary ใน Flutter",
                          "Flutter Rebuild Boundary Strategy",
                        )}
                      </span>
                    </h4>
                    <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                      {lang === "th"
                        ? "เพื่อรักษาความเร็ว 60-120 FPS โมบายแอปพลิเคชันจะแยก BlocBuilder ให้ครอบคลุมเฉพาะ Widget ที่ต้องแสดงผลค่าใหม่เท่านั้น (เช่น เฉพาะตัวแสดงผลคะแนนหรือปุ่มตะกร้า) ป้องกันการ Rebuild ทั้งหน้าจอ และใช้ const constructor ตลอดทั้ง Widget Tree"
                        : "To sustain 60-120 FPS execution, BlocBuilders are strictly scoped around micro-widgets that genuinely depend on state mutations (e.g. Risk score badge or Cart counter), avoiding whole-tree redraws while enforcing const constructors everywhere."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default DevToolsDrawer;
