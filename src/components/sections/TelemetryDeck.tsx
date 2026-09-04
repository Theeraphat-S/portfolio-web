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

interface TelemetryMetric {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  valueClass?: string;
}

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

  const metrics: TelemetryMetric[] = [
    {
      label: t("เวลาท้องถิ่น", "LOCAL TIME (TH)"),
      value: localTime || "12:00:00",
      subtext: "GMT+7 (Asia/Bangkok)",
      icon: <Clock className="w-4 h-4 text-emerald-500" />,
      valueClass:
        "text-2xl sm:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight",
    },
    {
      label: t("สภาพแวดล้อม", "CORE STACK"),
      value: "FLUTTER • DART",
      subtext: "Bloc • Clean Architecture",
      icon: <Cpu className="w-4 h-4 text-sky-500" />,
      valueClass:
        "text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight",
    },
    {
      label: t("ความเร็วเชื่อมต่อ", "SYSTEM LATENCY"),
      value: "~12ms",
      subtext: "Optimized REST • Fast I/O",
      icon: <Activity className="w-4 h-4 text-amber-500" />,
      valueClass:
        "text-2xl sm:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-tight",
    },
    {
      label: t("เวอร์ชัน & ระบบจัดการ", "BUILD & VCS"),
      value: "MAIN: STABLE",
      subtext: "Production Ready • Clean Tree",
      icon: <ShieldCheck className="w-4 h-4 text-purple-500" />,
      valueClass:
        "text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight",
    },
  ];

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
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider">
                  {m.label}
                </span>
                {m.icon}
              </div>
              <div>
                <div className={m.valueClass}>{m.value}</div>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {m.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelemetryDeck;
