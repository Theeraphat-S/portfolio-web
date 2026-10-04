import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Terminal,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
import { BEATS_BY_PROJECT } from "../../../data";
import { PintoScreen, PintoState } from "../../mobile-mockup/PintoScreen";
import { NcdsScreen } from "../../mobile-mockup/NcdsScreen";
import { PosScreen } from "../../mobile-mockup/PosScreen";
import { LiveEventDock } from "../../mobile-mockup/LiveEventDock";
import { DevToolsDrawer } from "../../mobile-mockup/DevToolsDrawer";
import { BLoCStreamEvent } from "../../../types/stream";

interface EditorialCaseStudyProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

// Architecture Pipeline definitions for each case study
const ARCHITECTURE_FLOWS: Record<string, { label: string; steps: string[] }> = {
  "pinto-app": {
    label: "ARCHITECTURE",
    steps: [
      "Flutter Native",
      "WebView Bridge",
      "Profile API",
      "Gamified Chat Streaks",
    ],
  },
  "ncds-screening": {
    label: "ARCHITECTURE",
    steps: [
      "Flutter (BLoC)",
      "Offline Form State",
      "Risk Score Engine",
      "Encrypted SQLite",
    ],
  },
  "pos-system": {
    label: "ARCHITECTURE",
    steps: [
      "Cart & Order Client",
      "Optimistic State Engine",
      "Idempotent Retry Queue",
      "Payment & REST API",
    ],
  },
};

const getInitialEvent = (id: string): BLoCStreamEvent => {
  if (id === "ncds-screening") {
    return {
      id: "init-ncds",
      timestamp: "09:41:00.012",
      projectId: "ncds-screening",
      source: "NcdsScreen",
      type: "bloc_state",
      tag: "BLoC::State",
      name: "RiskEvaluatedState",
      details: "Glucose 108 mg/dL, BP 122/80 ➔ Score: 3/15 (LOW RISK)",
      payload: {
        glucose: 108,
        systolic: 122,
        totalScore: 3,
        tier: "LOW RISK",
        persistedOffline: true,
      },
    };
  }
  if (id === "pinto-app") {
    return {
      id: "init-pinto",
      timestamp: "09:41:00.045",
      projectId: "pinto-app",
      source: "PintoScreen",
      type: "bloc_state",
      tag: "WS_SYNC",
      name: "OrderTrackingState",
      details: "Live WS active ➔ Courier Somchai K. (1.4km away, ETA 12:45)",
      payload: {
        orderId: "#FD-8942",
        status: "InTransit",
        courier: "Somchai K.",
        distanceKm: 1.4,
      },
    };
  }
  return {
    id: "init-pos",
    timestamp: "09:41:00.088",
    projectId: "pos-system",
    source: "PosScreen",
    type: "bloc_state",
    tag: "CART_INIT",
    name: "CartInitializedState",
    details: "Register #04 Ready ➔ 2 SKUs in Cart, Net: ฿420.00, Sync: Online",
    payload: {
      register: "#04",
      itemCount: 2,
      totalAmount: 420.0,
      offlineQueueReady: true,
    },
  };
};

export const EditorialCaseStudy: React.FC<EditorialCaseStudyProps> = ({
  project,
  index,
  onSelect,
}) => {
  const { lang, t } = useLanguage();
  const [activeBeat, setActiveBeat] = useState<number>(0);
  const [pintoActiveTab, setPintoActiveTab] = useState<PintoState>("tracking");

  // Alternating Layout Rhythm (Project 1 Left, Project 2 Right, Project 3 Left)
  const isReversed = index % 2 === 1;

  // Live BLoC Stream Events and DevTools Drawer
  const [streamEvents, setStreamEvents] = useState<BLoCStreamEvent[]>([
    getInitialEvent(project.id),
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"stream" | "code" | "telemetry">(
    "stream",
  );

  const beats = useMemo(() => BEATS_BY_PROJECT[project.id] || [], [project.id]);

  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDispatchEvent = (event: BLoCStreamEvent) => {
    setStreamEvents((prev) => [event, ...prev.slice(0, 24)]);
  };

  // Synchronize Active Beat State & Dispatch Realtime Telemetry
  const applyBeat = useCallback(
    (bIdx: number) => {
      setActiveBeat(bIdx);
      const beat = beats[bIdx];
      if (!beat) return;

      if (project.id === "pinto-app") {
        const tabs: PintoState[] = ["tracking", "streak", "webview"];
        setPintoActiveTab(tabs[bIdx] || "tracking");
      }

      const now = new Date();
      const timeStr =
        now.toTimeString().split(" ")[0] +
        "." +
        String(now.getMilliseconds()).padStart(3, "0");

      handleDispatchEvent({
        id: `beat-${project.id}-${bIdx}-${Date.now()}`,
        timestamp: timeStr,
        projectId: project.id,
        source: "ScrollytellingEngine",
        type:
          bIdx === 0 ? "bloc_event" : bIdx === 1 ? "bloc_state" : "telemetry",
        tag: beat.streamTag,
        name: beat.streamState,
        details: beat.streamDetails,
        payload: {
          beatIndex: bIdx + 1,
          totalBeats: beats.length,
          beatId: beat.id,
          specs: beat.highlightSpecs,
        },
        latencyMs: 0.4,
      });
    },
    [beats, project.id],
  );

  // IntersectionObserver for Multi-beat Scrollytelling on Desktop & Tablet
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    beatRefs.current.forEach((el, bIdx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              applyBeat(bIdx);
            }
          });
        },
        {
          rootMargin: "-22% 0px -38% 0px",
          threshold: 0.25,
        },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [applyBeat]);

  const handleTabClick = (tab: PintoState) => {
    setPintoActiveTab(tab);
    const tabIdx = tab === "tracking" ? 0 : tab === "streak" ? 1 : 2;
    setActiveBeat(tabIdx);
  };

  const projectNum = String(index + 1).padStart(2, "0");
  const displayYear =
    lang === "th"
      ? project.yearTh || project.year
      : project.yearEn || project.year;

  // Split title if it contains a dash/hyphen
  const rawTitle = lang === "th" ? project.titleTh : project.titleEn;
  let primaryTitle = rawTitle;
  let featureSubtitle = "";

  if (rawTitle.includes(" — ")) {
    const parts = rawTitle.split(" — ");
    primaryTitle = parts[0];
    featureSubtitle = parts[1];
  } else if (rawTitle.includes(" - ")) {
    const parts = rawTitle.split(" - ");
    primaryTitle = parts[0];
    featureSubtitle = parts[1];
  }

  const affiliationSubtitle =
    lang === "th" ? project.subtitleTh : project.subtitleEn;
  const descriptionText =
    lang === "th" ? project.descriptionTh : project.descriptionEn;

  // Technical terms to highlight subtly
  const highlightedDescription = useMemo(() => {
    const technicalKeywords = [
      "WebView",
      "State Management",
      "Profile API",
      "Gamification",
      "Chat Streaks",
      "BLoC",
      "Clean Architecture",
      "REST API",
      "Offline-first",
      "Drift SQLite",
      "Idempotency",
    ];

    const regex = new RegExp(`(${technicalKeywords.join("|")})`, "gi");
    const parts = descriptionText.split(regex);

    return parts.map((part, pIdx) => {
      const isMatch = technicalKeywords.some(
        (kw) => kw.toLowerCase() === part.toLowerCase(),
      );
      if (isMatch) {
        return (
          <span
            key={pIdx}
            className="text-white font-medium border-b border-[#00f0ff]/40 pb-[0.5px]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }, [descriptionText]);

  const architecture = ARCHITECTURE_FLOWS[project.id] ?? {
    label: "ARCHITECTURE",
    steps: ["Client UI", "State Layer", "Service Bridge", "Data Engine"],
  };

  // Render Phone Simulator Device (Sticky Pin Anchor)
  const renderDeviceMockup = () => {
    return (
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] flex flex-col items-center gap-3.5">
        {/* Scrollytelling Beat Active Indicator HUD */}
        <div className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#0a0d14]/90 border border-[#00f0ff]/25 backdrop-blur-md shadow-sm font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
            </span>
            <span className="text-[#00f0ff] font-semibold tracking-wider">
              SCROLLYTELLING
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-[#00f0ff] font-bold">
              BEAT 0{activeBeat + 1}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">03</span>
          </div>
        </div>

        {/* State Switcher Pills for Pinto Application */}
        {project.id === "pinto-app" && (
          <div className="w-full flex flex-col gap-1.5 p-1 rounded-lg bg-[#0a0d14] border border-white/[0.08] shadow-sm font-mono text-xs">
            <div
              role="tablist"
              aria-label="Pinto feature screens"
              className="grid grid-cols-3 gap-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "tracking"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 01: Order tracking"
                onClick={() => handleTabClick("tracking")}
                className={`min-h-11 px-1 py-2 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "tracking"
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] font-bold border border-[#00f0ff]/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t("ติดตาม", "Tracking")}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "streak"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 02: Chat streak gamification"
                onClick={() => handleTabClick("streak")}
                className={`min-h-11 px-1 py-2 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "streak"
                    ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t("สะสมแต้ม", "Streaks")}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "webview"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 03: Hybrid WebView menu"
                onClick={() => handleTabClick("webview")}
                className={`min-h-11 px-1 py-2 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "webview"
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] font-bold border border-[#00f0ff]/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                WebView
              </button>
            </div>
          </div>
        )}

        {/* Smartphone Chassis with Subtle Ambient Blue Lighting */}
        <div className="relative w-full rounded-[38px] bg-[#0c1017] p-2 sm:p-2.5 border border-white/[0.12] hover:border-[#00f0ff]/35 transition-all duration-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_-12px_rgba(0,240,255,0.12)] group/chassis will-change-transform">
          {/* Outer Rim Glow Line */}
          <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none opacity-40 group-hover/chassis:opacity-80 transition-opacity" />

          {/* Screen Shell */}
          <div
            id={`screen-panel-${project.id}`}
            role="region"
            aria-label={`${primaryTitle} interactive demonstration`}
            className="relative rounded-[28px] overflow-hidden bg-[#07090e] border border-white/[0.08] shadow-inner min-h-[500px] sm:min-h-[520px] flex flex-col"
          >
            {project.id === "pinto-app" ? (
              <PintoScreen
                activeState={pintoActiveTab}
                onStateChange={handleTabClick}
                onDispatchEvent={handleDispatchEvent}
              />
            ) : project.id === "ncds-screening" ? (
              <NcdsScreen
                activeBeat={activeBeat}
                onDispatchEvent={handleDispatchEvent}
              />
            ) : (
              <PosScreen
                activeBeat={activeBeat}
                onDispatchEvent={handleDispatchEvent}
              />
            )}
          </div>

          {/* Device Footer Micro-bar */}
          <div className="pt-2.5 px-3 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              {t("โหมดสตรีม BLoC สด", "Live BLoC Stream Active")}
            </span>
            <span className="text-zinc-400 tracking-wider">
              React Simulation
            </span>
          </div>
        </div>

        {/* Live Reactive BLoC Event Dock directly under Chassis */}
        <LiveEventDock
          latestEvent={streamEvents[0] || null}
          eventsCount={streamEvents.length}
          onOpenDrawer={(tab) => {
            setDrawerTab(tab);
            setIsDrawerOpen(true);
          }}
        />
      </div>
    );
  };

  // Render Story Beat Step Cards (Desktop & Mobile)
  const renderStoryBeats = () => {
    return (
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
          <span className="flex items-center gap-2 font-mono text-xs text-[#00f0ff] tracking-wider uppercase font-semibold">
            <Layers className="w-3.5 h-3.5" />
            {t("ขั้นตอนสถาปัตยกรรม (SCROLL RUNWAY)", "ARCHITECTURE RUNWAY")}
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {t("เลื่อนจอเพื่อเปลี่ยนฉาก", "Scroll down to advance beats")}
          </span>
        </div>

        <div className="space-y-4">
          {beats.map((beat, bIdx) => {
            const isActive = activeBeat === bIdx;
            return (
              <div
                key={beat.id}
                ref={(el) => {
                  beatRefs.current[bIdx] = el;
                }}
                onClick={() => applyBeat(bIdx)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    applyBeat(bIdx);
                  }
                }}
                aria-current={isActive ? "step" : undefined}
                className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border text-left cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                  isActive
                    ? "bg-white/[0.04] border-[#00f0ff]/50 shadow-[0_0_28px_rgba(0,240,255,0.09)] ring-1 ring-[#00f0ff]/30"
                    : "bg-white/[0.015] border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.025] opacity-75 hover:opacity-100"
                }`}
              >
                {/* Active Indicator Bar on Left Edge */}
                <div
                  className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#00f0ff] opacity-100"
                      : "bg-transparent opacity-0"
                  }`}
                />

                {/* Top Badge & Stream Tag */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-[#00f0ff] animate-pulse" : "bg-zinc-600"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs tracking-wider font-semibold transition-colors ${
                        isActive ? "text-[#00f0ff]" : "text-zinc-400"
                      }`}
                    >
                      {lang === "th" ? beat.badgeTh : beat.badgeEn}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 border border-white/[0.08] text-zinc-400 group-hover:border-white/20 transition-colors">
                    {beat.streamTag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight min-h-[1.75rem]">
                  {lang === "th" ? beat.titleTh : beat.titleEn}
                </h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5 min-h-[1.1rem]">
                  {lang === "th" ? beat.subtitleTh : beat.subtitleEn}
                </p>

                {/* Narrative Description */}
                <p className="text-sm text-zinc-300/90 font-light leading-relaxed mt-2.5 min-h-[4rem] sm:min-h-[3rem]">
                  {lang === "th" ? beat.descriptionTh : beat.descriptionEn}
                </p>

                {/* Telemetry Snapshot Row */}
                <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="text-[#00f0ff]">➔</span>
                    <span className="font-medium">{beat.streamState}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {beat.highlightSpecs.map((spec) => (
                      <span
                        key={spec}
                        className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-zinc-400"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Project Narrative Header Block
  const renderProjectHeader = () => {
    return (
      <div className="space-y-6">
        {/* 1. Case Study Eyebrow - Strictly Canonical Index without decorative noise */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
          <span className="editorial-eyebrow text-[#00f0ff]">
            CASE STUDY // {projectNum}
          </span>
          <span className="text-zinc-400 uppercase tracking-wider text-xs">
            {project.tag} &bull; {displayYear}
          </span>
        </div>

        {/* 2. Project Title & Subtitle Hierarchy */}
        <div className="space-y-1.5">
          <h3 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight min-h-[2.5rem]">
            {primaryTitle}
          </h3>
          {featureSubtitle && (
            <p className="text-base font-sans font-medium text-zinc-300">
              {featureSubtitle}
            </p>
          )}
          <p className="text-xs font-mono text-zinc-400 tracking-wide min-h-[1rem]">
            {affiliationSubtitle}
          </p>
        </div>

        {/* 3. Description */}
        <p className="text-sm xl:text-[15px] text-zinc-300/90 font-light leading-relaxed max-w-xl min-h-[4.5rem]">
          {highlightedDescription}
        </p>

        {/* 4. Minimal Editorial Metadata */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 border-y border-white/[0.08] py-3.5 divide-x divide-white/[0.06]">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className={`space-y-1 min-w-0 ${
                  mIdx === 0 ? "pr-4" : mIdx === 1 ? "px-4" : "pl-4"
                }`}
              >
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block break-words min-h-[1.25rem]">
                  {lang === "th" ? metric.labelTh : metric.labelEn}
                </span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-200 block break-words">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 5. Tech Stack Specifications */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400 pt-1">
          <span className="text-xs tracking-widest text-zinc-400 uppercase mr-1 font-semibold">
            SPECS:
          </span>
          {project.technologies.map((tech, tIdx) => (
            <React.Fragment key={tech}>
              {tIdx > 0 && (
                <span className="text-zinc-600 select-none">&bull;</span>
              )}
              <span className="text-zinc-300 hover:text-white transition-colors">
                {tech.toUpperCase()}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* 6. Technical Story / Architecture Flow Pipeline */}
        <div className="pt-2">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-2 font-semibold">
            {architecture.label}
          </span>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs text-zinc-300">
            {architecture.steps.map((step, sIdx) => (
              <React.Fragment key={step}>
                {sIdx > 0 && (
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: sIdx * 0.12, duration: 0.3 }}
                    className="text-[#00f0ff] flex items-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                )}
                <span className="px-2 py-1 rounded bg-[#0f1420] text-zinc-200 border border-white/[0.06]">
                  {step}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 7. Action Triggers / CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => onSelect(project)}
            aria-haspopup="dialog"
            data-cursor-text="ANALYZE"
            className="group/cta relative inline-flex items-center justify-center gap-2.5 min-w-[170px] px-5 py-2.5 rounded-full bg-[#0c1017] border border-white/[0.12] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/[0.05] text-zinc-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff] transition-colors" />
            <span className="font-semibold tracking-wider">
              {t("อ่าน case study", "VIEW CASE STUDY")}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="GITHUB"
              className="group/src relative inline-flex items-center justify-center gap-2 min-w-[145px] px-4 py-2.5 rounded-full bg-transparent border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
            >
              <Github className="w-3.5 h-3.5 text-zinc-500 group-hover/src:text-zinc-300 transition-colors" />
              <span>{t("โปรไฟล์ GitHub", "GitHub profile")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover/src:text-zinc-300 group-hover/src:translate-x-0.5 group-hover/src:-translate-y-0.5 transition-all duration-300" />
            </a>
          )}

          {project.repositoryNoticeEn && (
            <span className="text-[11px] font-mono text-zinc-400 ml-1">
              {lang === "th"
                ? project.repositoryNoticeTh
                : project.repositoryNoticeEn}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl bg-[#090c13]/90 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all duration-500 p-6 sm:p-10 lg:p-12 backdrop-blur-md"
    >
      {/* Editorial Watermark Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none" />

      {/* ========================================================
          DESKTOP SCROLLYTELLING RUNWAY (>= lg):
          Two-column composition with Sticky Device Mockup.
          CSS ordering handles Alternating Layout without code duplication:
          - Default (Index 0, 2): Device col-span-5 (order 1) / Story col-span-7 (order 2)
          - Reversed (Index 1): Story col-span-7 (order 1) / Device col-span-5 (order 2)
          ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* Sticky Device Showcase Column */}
        <div
          className={`lg:col-span-5 sticky top-24 self-start space-y-4 ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            {t(
              "จำลองสภาพแวดล้อมสตรีม BLoC สดผูกกับการเลื่อนอ่าน",
              "Live BLoC stream simulation synchronized with scroll progression.",
            )}
          </p>
          {renderDeviceMockup()}
        </div>

        {/* Scrolling Narrative Story Runway Column */}
        <div
          className={`lg:col-span-7 space-y-10 ${
            isReversed ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {renderProjectHeader()}
          {renderStoryBeats()}
        </div>
      </div>

      {/* ========================================================
          MOBILE & TABLET ADAPTIVE CLEAN STACK (< lg):
          Reuses canonical project header and stacked story beats
          without duplicating layout code.
          ======================================================== */}
      <div className="lg:hidden flex flex-col space-y-8">
        {renderProjectHeader()}
        {renderStoryBeats()}
        <div className="py-2 flex justify-center">{renderDeviceMockup()}</div>
      </div>

      {/* Flutter & BLoC DevTools Drawer */}
      <DevToolsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialTab={drawerTab}
        projectId={project.id}
        events={streamEvents}
        onClearEvents={() => setStreamEvents([])}
      />
    </motion.article>
  );
};

export default EditorialCaseStudy;
