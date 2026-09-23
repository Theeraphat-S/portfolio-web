import React from "react";
import { Cpu, Database, GitBranch, Layers, Zap } from "lucide-react";
import { type ScreenKey, SCREEN_BLUEPRINT_MAP } from "./types";

interface BlueprintScreenProps {
  activeScreen: ScreenKey;
}

export const BlueprintScreen: React.FC<BlueprintScreenProps> = ({
  activeScreen,
}) => {
  const details = SCREEN_BLUEPRINT_MAP[activeScreen] ?? {
    cubit: "AppLifecycleCubit",
    state: "RunningState",
    repository: "CoreRepository",
    engineFps: "120.0 FPS",
    frameTime: "1.0 ms",
    layer: "Flutter Engine",
  };

  return (
    <div className="w-full h-full bg-zinc-950/98 text-cyan-400 p-5 flex flex-col justify-between font-mono select-none relative overflow-hidden border border-cyan-500/30">
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Blueprint Header */}
      <div className="relative z-10 border-b border-cyan-500/40 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>FLUTTER ENGINE INSPECTOR</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/40">
            DART VM
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 mt-1">
          Target:{" "}
          <span className="text-white font-bold">
            {activeScreen.toUpperCase()} MODULE
          </span>
        </p>
      </div>

      {/* Architecture AST Tree */}
      <div className="relative z-10 my-auto space-y-3">
        <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] space-y-2">
          <div className="flex items-center gap-2 text-cyan-300">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold">BLoC State Machine:</span>
          </div>
          <div className="pl-4 text-[10px] space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-bold">&gt; {details.cubit}</p>
            <p className="text-sky-400">&bull; {details.state}</p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] space-y-2">
          <div className="flex items-center gap-2 text-zinc-200">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">Offline Sync Repository:</span>
          </div>
          <p className="text-[10px] text-zinc-400 pl-4">{details.repository}</p>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-sky-400" />
            Clean Architecture
          </span>
          <span className="text-cyan-300 text-[9px] font-semibold">
            {details.layer}
          </span>
        </div>
      </div>

      {/* Frame Telemetry Bar */}
      <div className="relative z-10 border-t border-cyan-500/40 pt-3 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1 text-sky-400 font-bold">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>{details.engineFps}</span>
        </div>
        <div className="text-zinc-400">
          Raster: <span className="text-cyan-300">{details.frameTime}</span>
        </div>
        <div className="text-zinc-500 text-[9px]">Zero Leaks</div>
      </div>
    </div>
  );
};
