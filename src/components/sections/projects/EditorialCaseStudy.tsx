import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Terminal,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
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
  const [pintoActiveTab, setPintoActiveTab] = useState<PintoState>("tracking");
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Live BLoC Stream Events and DevTools Drawer
  const [streamEvents, setStreamEvents] = useState<BLoCStreamEvent[]>([
    getInitialEvent(project.id),
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"stream" | "code" | "telemetry">(
    "stream",
  );

  const handleDispatchEvent = (event: BLoCStreamEvent) => {
    setStreamEvents((prev) => [event, ...prev.slice(0, 24)]);
  };

  // Auto-switch Pinto state every 5 seconds unless explicitly paused by user or hovered
  React.useEffect(() => {
    if (project.id !== "pinto-app" || isManualPaused || isHovered) return;

    const tabs: PintoState[] = ["tracking", "streak", "webview"];
    const interval = setInterval(() => {
      setPintoActiveTab((current) => {
        const nextIndex = (tabs.indexOf(current) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [project.id, isManualPaused, isHovered]);

  const handleTabClick = (tab: PintoState) => {
    setPintoActiveTab(tab);
    setIsManualPaused(true);
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

  // Technical terms to highlight subtly (non-jarring, editorial underline/contrast)
  const highlightedDescription = React.useMemo(() => {
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

  // Render Phone Simulator Device
  const renderDeviceMockup = () => {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] flex flex-col items-center"
      >
        {/* State Switcher Pills for Pinto Application */}
        {project.id === "pinto-app" && (
          <div className="mb-3.5 flex items-center gap-1.5 p-1 rounded-lg bg-[#0a0d14] border border-white/[0.08] shadow-sm font-mono text-[10px]">
            <div
              role="tablist"
              aria-label="Pinto feature screens"
              className="flex items-center gap-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "tracking"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 01: Order tracking"
                onClick={() => handleTabClick("tracking")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "tracking"
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] font-bold border border-[#00f0ff]/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                01 TRACKING
              </button>
              <span className="text-zinc-700" aria-hidden="true">
                &bull;
              </span>
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "streak"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 02: Chat streak gamification"
                onClick={() => handleTabClick("streak")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "streak"
                    ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                02 CHAT STREAK
              </button>
              <span className="text-zinc-700" aria-hidden="true">
                &bull;
              </span>
              <button
                type="button"
                role="tab"
                aria-selected={pintoActiveTab === "webview"}
                aria-controls={`screen-panel-${project.id}`}
                aria-label="Screen 03: Hybrid WebView menu"
                onClick={() => handleTabClick("webview")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  pintoActiveTab === "webview"
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] font-bold border border-[#00f0ff]/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                03 WEBVIEW
              </button>
            </div>
            <span className="text-zinc-700" aria-hidden="true">
              &bull;
            </span>
            <button
              type="button"
              onClick={() => setIsManualPaused((prev) => !prev)}
              aria-label={
                isManualPaused ? "Resume auto rotation" : "Pause auto rotation"
              }
              title={
                isManualPaused ? "Resume auto rotation" : "Pause auto rotation"
              }
              className={`px-1.5 py-1 rounded transition-all cursor-pointer text-[9px] ${
                !isManualPaused
                  ? "text-[#00f0ff] bg-[#00f0ff]/10"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {!isManualPaused ? "AUTO ⟳" : "PAUSED"}
            </button>
          </div>
        )}

        {/* Smartphone Chassis with Subtle Ambient Blue Lighting */}
        <div className="relative w-full rounded-[38px] bg-[#0c1017] p-2 sm:p-2.5 border border-white/[0.12] hover:border-[#00f0ff]/35 transition-all duration-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_-12px_rgba(0,240,255,0.12)] group/chassis will-change-transform">
          {/* Subtle Outer Rim Glow Line */}
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
              <NcdsScreen onDispatchEvent={handleDispatchEvent} />
            ) : (
              <PosScreen onDispatchEvent={handleDispatchEvent} />
            )}
          </div>

          {/* Device Footer Micro-bar */}
          <div className="pt-2.5 px-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              FLUTTER ENGINE
            </span>
            <span className="text-zinc-400 tracking-wider">
              60 FPS &bull; V2.4
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl bg-[#090c13]/90 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all duration-500 p-6 sm:p-10 lg:p-12 overflow-hidden backdrop-blur-md"
    >
      {/* Editorial Watermark Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none" />

      {/* ========================================================
          DESKTOP LAYOUT (>= lg):
          Two-column composition: Left 42% (Device) / Right 58% (Info)
          ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">
        {/* Left Column (42%): Device Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          {renderDeviceMockup()}
        </div>

        {/* Right Column (58%): Technical Case Study Narrative */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Case Study Eyebrow */}
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
            <span className="text-[#00f0ff] font-bold tracking-widest uppercase">
              CASE STUDY // {projectNum}
            </span>
            <span className="text-zinc-400 uppercase tracking-wider text-[11px]">
              {project.tag} &bull; {displayYear}
            </span>
          </div>

          {/* 2. Project Title & Subtitle Hierarchy */}
          <div className="space-y-1.5">
            <h3 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
              {primaryTitle}
            </h3>
            {featureSubtitle && (
              <p className="text-base font-sans font-medium text-zinc-300">
                {featureSubtitle}
              </p>
            )}
            <p className="text-xs font-mono text-zinc-400 tracking-wide">
              {affiliationSubtitle}
            </p>
          </div>

          {/* 3. Description (Optimal 2-4 lines, subtle technical highlights) */}
          <p className="text-sm xl:text-[15px] text-zinc-300/90 font-light leading-relaxed max-w-xl">
            {highlightedDescription}
          </p>

          {/* 4. Minimal Editorial Metadata (Role, Process, Status) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 border-y border-white/[0.08] py-3.5 divide-x divide-white/[0.06]">
              {project.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className={`space-y-1 min-w-0 ${mIdx === 0 ? "pr-4" : mIdx === 1 ? "px-4" : "pl-4"}`}
                >
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block truncate">
                    {lang === "th" ? metric.labelTh : metric.labelEn}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-200 block truncate">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 5. Tech Stack Specifications */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400 pt-1">
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase mr-1 font-semibold">
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
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-2 font-semibold">
              {architecture.label}
            </span>
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300">
              {architecture.steps.map((step, sIdx) => (
                <React.Fragment key={step}>
                  {sIdx > 0 && (
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: sIdx * 0.15, duration: 0.4 }}
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
            {/* Primary CTA: Dark Surface, Subtle Electric-Cyan Hover */}
            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-haspopup="dialog"
              data-cursor-text="ANALYZE"
              className="group/cta relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0c1017] border border-white/[0.12] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/[0.05] text-zinc-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff] transition-colors" />
              <span className="font-semibold tracking-wider">
                {t("เจาะลึกสถาปัตยกรรม", "VIEW CASE STUDY")}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </button>

            {/* Secondary CTA: Source */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="GITHUB"
                className="group/src relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
              >
                <Github className="w-3.5 h-3.5 text-zinc-500 group-hover/src:text-zinc-300 transition-colors" />
                <span>SOURCE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover/src:text-zinc-300 group-hover/src:translate-x-0.5 group-hover/src:-translate-y-0.5 transition-all duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE & TABLET STACK (< lg):
          Exact sequence requested:
          CASE STUDY -> Title -> Description -> Phone showcase ->
          Metadata -> Architecture -> CTA
          ======================================================== */}
      <div className="lg:hidden flex flex-col space-y-6">
        {/* 1. CASE STUDY Eyebrow */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
          <span className="text-[#00f0ff] font-bold tracking-widest uppercase">
            CASE STUDY // {projectNum}
          </span>
          <span className="text-zinc-400 uppercase tracking-wider text-[11px]">
            {project.tag} &bull; {displayYear}
          </span>
        </div>

        {/* 2. Project Title & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            {primaryTitle}
          </h3>
          {featureSubtitle && (
            <p className="text-sm font-sans font-medium text-zinc-300">
              {featureSubtitle}
            </p>
          )}
          <p className="text-xs font-mono text-zinc-400">
            {affiliationSubtitle}
          </p>
        </div>

        {/* 3. Description */}
        <p className="text-sm text-zinc-300/90 font-light leading-relaxed">
          {highlightedDescription}
        </p>

        {/* 4. Phone Showcase */}
        <div className="py-2 flex justify-center">{renderDeviceMockup()}</div>

        {/* 5. Minimal Editorial Metadata */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 border-y border-white/[0.08] py-3 divide-x divide-white/[0.06]">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className={`space-y-1 min-w-0 ${mIdx === 0 ? "pr-2" : mIdx === 1 ? "px-2" : "pl-2"}`}
              >
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase block truncate">
                  {lang === "th" ? metric.labelTh : metric.labelEn}
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-200 block truncate">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Specs */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-400">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 mr-1 font-semibold">
            SPECS:
          </span>
          {project.technologies.map((tech, tIdx) => (
            <React.Fragment key={tech}>
              {tIdx > 0 && (
                <span className="text-zinc-600 select-none">&bull;</span>
              )}
              <span className="text-zinc-300">{tech.toUpperCase()}</span>
            </React.Fragment>
          ))}
        </div>

        {/* 6. Architecture Flow */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block font-semibold">
            {architecture.label}
          </span>
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300">
            {architecture.steps.map((step, sIdx) => (
              <React.Fragment key={step}>
                {sIdx > 0 && (
                  <div className="flex justify-center text-[#00f0ff] py-0.5">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                )}
                <div className="px-2.5 py-1.5 rounded bg-[#0f1420] text-zinc-200 border border-white/[0.06] text-center">
                  {step}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 7. CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => onSelect(project)}
            aria-haspopup="dialog"
            data-cursor-text="ANALYZE"
            className="group/cta relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0c1017] border border-white/[0.12] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/[0.05] text-zinc-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer flex-1 justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff]" />
            <span className="font-semibold">
              {t("เจาะลึกสถาปัตยกรรม", "VIEW CASE STUDY")}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-[#00f0ff]" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="GITHUB"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03] text-zinc-400 hover:text-white text-xs font-mono uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>SOURCE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
            </a>
          )}
        </div>
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
