import React, { useState, useEffect } from "react";
import {
  Activity,
  Clock,
  Cpu,
  Radio,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const TelemetryDeck: React.FC = () => {
  const { t } = useLanguage();
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Bangkok (Chiang Mai timezone)
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden border-t border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-900 dark:text-zinc-100 uppercase">
                  {t(
                    "ข้อมูลสถานะระบบ & เทเลเมทรี",
                    "SYSTEM METRICS & TELEMETRY",
                  )}
                </h3>
              </div>
              <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                CHIANG MAI NODE &bull; REAL-TIME STATUS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono self-start sm:self-auto">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>STATUS: READY FOR OPPORTUNITIES</span>
          </div>
        </div>

        {/* Telemetry Metrics Deck Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Chiang Mai Local Time */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {t("เวลาท้องถิ่น", "LOCAL TIME (TH)")}
              </span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {localTime || "12:00:00"}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                GMT+7 (Asia/Bangkok)
              </span>
            </div>
          </div>

          {/* Card 2: Core Runtime Environment */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {t("สภาพแวดล้อม", "CORE STACK")}
              </span>
              <Cpu className="w-4 h-4 text-sky-500" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                FLUTTER &bull; DART
              </div>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                Bloc &bull; Clean Architecture
              </span>
            </div>
          </div>

          {/* Card 3: Network & Latency */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {t("ความเร็วเชื่อมต่อ", "SYSTEM LATENCY")}
              </span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                ~12ms
              </div>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                Optimized REST &bull; Fast I/O
              </span>
            </div>
          </div>

          {/* Card 4: Build & Deployment Telemetry */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {t("เวอร์ชัน & ระบบจัดการ", "BUILD & VCS")}
              </span>
              <ShieldCheck className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                MAIN: STABLE
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                Production Ready &bull; Clean Tree
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelemetryDeck;
