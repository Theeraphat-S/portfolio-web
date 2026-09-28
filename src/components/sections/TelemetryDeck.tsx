import React, { useState, useEffect } from "react";
import { Radio, Activity } from "lucide-react";
import { KineticCounter } from "../reactbits/KineticCounter";

export const TelemetryDeck: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(12);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  useEffect(() => {
    const jitterInterval = setInterval(() => {
      const jitterValues = [11, 12, 13, 14, 12];
      const next =
        jitterValues[Math.floor(Math.random() * jitterValues.length)];
      setLatency(next);
    }, 4000);

    return () => clearInterval(jitterInterval);
  }, []);

  return (
    <section className="py-8 relative overflow-hidden border-b border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-3 px-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        {/* Left: Node Identity */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
            CHIANG MAI NODE (GMT+7)
          </span>
          <span className="text-zinc-600 font-mono text-xs">/</span>
          <span className="text-xs font-mono text-[#00f0ff] font-semibold">
            {localTime || "12:00:00"}
          </span>
        </div>

        {/* Center: System Telemetry metrics */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider">
              LATENCY:
            </span>
            <span className="text-white font-bold flex items-center gap-1">
              <KineticCounter
                value={latency}
                prefix="~"
                suffix="ms"
                duration={1.2}
              />
              <Activity className="w-3 h-3 text-[#00f0ff]" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider">
              ENGINE:
            </span>
            <span className="text-white font-bold">FLUTTER 3.x / DART 3.x</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider">
              TREE:
            </span>
            <span className="text-[#00f0ff] font-bold">
              STABLE &bull; PRODUCTION READY
            </span>
          </div>
        </div>

        {/* Right: Availability beacon */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[#00f0ff] text-[11px] font-mono font-medium">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>OPEN TO HIRE</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default TelemetryDeck;
