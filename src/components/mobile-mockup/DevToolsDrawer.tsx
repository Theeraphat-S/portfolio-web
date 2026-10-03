import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [isCopied, setIsCopied] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const snippet = DART_SNIPPETS[projectId] || DART_SNIPPETS["ncds-screening"];

  const handleCopyCode = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Flutter & BLoC DevTools Inspector"
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl bg-[#090d16] border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.12)] overflow-hidden font-mono z-10"
          >
            {/* Header Strip */}
            <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0c121e]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold block">
                    FLUTTER DEVTOOLS & ARCHITECTURE
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{snippet.fileName}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 font-normal">
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
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 pt-3 pb-2 border-b border-white/[0.06] bg-[#080b12] flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTabOverride("stream")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "stream"
                      ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>
                    {t("BLoC Event Stream", "BLoC Stream")} ({events.length})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabOverride("code")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{t("Dart Source Code", "Dart Source")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabOverride("telemetry")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "telemetry"
                      ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{t("ประสิทธิภาพระบบ", "Engine Specs")}</span>
                </button>
              </div>

              {/* Auxiliary action */}
              {activeTab === "stream" && events.length > 0 && (
                <button
                  type="button"
                  onClick={onClearEvents}
                  className="px-2 py-1 rounded text-[10px] text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t("ล้าง Log", "Clear Logs")}</span>
                </button>
              )}

              {activeTab === "code" && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] text-[10px] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
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
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>
                      {lang === "th"
                        ? "บันทึก Real-time Event Stream จากการตอบสนองบนหน้าจอด้านนอก"
                        : "Real-time reactive event stream recorded directly from user interactions."}
                    </span>
                    <span className="text-[#00f0ff] font-bold">
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
                          className="p-3 rounded-xl bg-black/50 border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 text-[9px]">
                                #{String(events.length - idx).padStart(2, "0")}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] font-bold border border-[#00f0ff]/20 text-[9px]">
                                {evt.tag}
                              </span>
                              <span className="text-white font-bold">
                                {evt.name}
                              </span>
                            </div>
                            <span className="text-zinc-500 text-[10px]">
                              {evt.timestamp}
                            </span>
                          </div>

                          <p className="text-zinc-300 text-[11px] pl-6 font-mono">
                            {evt.details}
                          </p>

                          {evt.payload && (
                            <div className="mt-1.5 pl-6">
                              <div className="p-2 rounded-lg bg-zinc-950/80 border border-white/[0.04] text-[10px] text-zinc-400 overflow-x-auto">
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
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-zinc-300 text-xs">
                    <p className="font-sans font-light">
                      {lang === "th"
                        ? snippet.explanationTh
                        : snippet.explanationEn}
                    </p>
                    <span className="text-[10px] text-[#00f0ff] block mt-1">
                      File: {snippet.filePath}
                    </span>
                  </div>

                  {/* Code Block with line numbering */}
                  <div className="p-4 rounded-2xl bg-[#06080e] border border-white/[0.08] overflow-x-auto text-[11.5px] leading-relaxed font-mono text-zinc-300">
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
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        FRAME BUDGET
                      </span>
                      <span className="text-xl font-bold text-emerald-400 block font-mono">
                        16.6ms / 60 FPS
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        Zero Jank & Isolated Rebuilds
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        STATE DISCIPLINE
                      </span>
                      <span className="text-xl font-bold text-[#00f0ff] block font-mono">
                        BLoC / Equatable
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        Deterministic Event-to-State
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        DATA PERSISTENCE
                      </span>
                      <span className="text-xl font-bold text-sky-400 block font-mono">
                        Encrypted SQLite
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        Write-Ahead Logging (WAL)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a0f19] border border-white/[0.08] space-y-2 text-xs">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#00f0ff]" />
                      <span>
                        {t(
                          "หลักการควบคุม Rebuild Boundary ใน Flutter",
                          "Flutter Rebuild Boundary Strategy",
                        )}
                      </span>
                    </h4>
                    <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
                      {lang === "th"
                        ? "เพื่อรักษาความเร็ว 60-120 FPS โมบายแอปพลิเคชันจะแยก BlocBuilder ให้ครอบคลุมเฉพาะ Widget ที่ต้องแสดงผลค่าใหม่เท่านั้น (เช่น เฉพาะตัวแสดงผลคะแนนหรือปุ่มตะกร้า) ป้องกันการ Rebuild ทั้งหน้าจอ และใช้ const constructor ตลอดทั้ง Widget Tree"
                        : "To sustain 60-120 FPS execution, BlocBuilders are strictly scoped around micro-widgets that genuinely depend on state mutations (e.g. Risk score badge or Cart counter), avoiding whole-tree redraws while enforcing const constructors everywhere."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
