import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { getMetricValue } from "../../../lib/utils";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
import { BEATS_BY_PROJECT } from "../../../data";
import { PintoScreen, PintoState } from "../../mobile-mockup/PintoScreen";
import { NcdsScreen } from "../../mobile-mockup/NcdsScreen";
import { PosScreen } from "../../mobile-mockup/PosScreen";
import { LiveEventDock } from "../../mobile-mockup/LiveEventDock";
import { DevToolsDrawer } from "../../mobile-mockup/DevToolsDrawer";
import { BLoCStreamEvent } from "../../../types/stream";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

interface EditorialCaseStudyProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

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
      details: "Glucose 108 mg/dL, BP 122/80 ➔ Score: 4/15 (MODERATE)",
      payload: {
        glucose: 108,
        systolic: 122,
        totalScore: 4,
        tier: "MODERATE",
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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

  const beatRefs = useRef<(HTMLElement | null)[]>([]);

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
    // Re-bind when the layout branch swaps, since beat nodes are remounted.
  }, [applyBeat, isDesktop]);

  const handleTabClick = (tab: PintoState) => {
    setPintoActiveTab(tab);
    const tabIdx = tab === "tracking" ? 0 : tab === "streak" ? 1 : 2;
    setActiveBeat(tabIdx);
  };

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

  const activeBeatData = beats[activeBeat];
  const activeBeatLabel = activeBeatData
    ? (lang === "th" ? activeBeatData.badgeTh : activeBeatData.badgeEn).replace(
        /^\d+\s*\/\/\s*/,
        "",
      )
    : "";

  // Render Phone Simulator Device (Sticky Pin Anchor)
  const renderDeviceMockup = () => {
    return (
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] flex flex-col items-center gap-3">
        {/* Active stage HUD (desktop only; mobile uses the stepper above) */}
        {isDesktop && (
          <div className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#0a0d14]/90 border border-[#00f0ff]/25 backdrop-blur-md shadow-sm font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#00f0ff]" />
              <span className="text-[#00f0ff] font-semibold tracking-wider truncate">
                {activeBeatLabel}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 text-zinc-300 shrink-0"
              aria-live="polite"
            >
              <span className="sr-only">{t("ขั้นตอน", "Step")}</span>
              <span className="text-[#00f0ff] font-bold">
                {String(activeBeat + 1).padStart(2, "0")}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">
                {String(beats.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}

        {/* State Switcher Pills for Pinto Application */}
        {project.id === "pinto-app" && isDesktop && (
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

  // Desktop runway: flat beat list, advanced by scroll or click.
  const renderStoryBeats = () => {
    return (
      <div className="pt-2">
        <p className="pb-3 font-mono text-[11px] text-zinc-400">
          {t(
            "เลื่อนลงเพื่อดูแต่ละขั้นบนหน้าจอจำลอง",
            "Scroll to step through each stage on the device",
          )}
        </p>

        <ol>
          {beats.map((beat, bIdx) => {
            const isActive = activeBeat === bIdx;
            return (
              <li
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
                className={`min-h-[50vh] border-t py-7 text-left cursor-pointer outline-none transition-[opacity,border-color] duration-300 focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                  isActive
                    ? "border-[#00f0ff]/60 opacity-100"
                    : "border-white/[0.08] opacity-55 hover:opacity-90"
                }`}
              >
                <p
                  className={`font-mono text-xs tracking-wider font-semibold ${
                    isActive ? "text-[#00f0ff]" : "text-zinc-400"
                  }`}
                >
                  {lang === "th" ? beat.badgeTh : beat.badgeEn}
                </p>
                <h4 className="mt-2 text-lg font-bold text-white tracking-tight">
                  {lang === "th" ? beat.titleTh : beat.titleEn}
                </h4>
                <p className="mt-2 text-sm text-zinc-300 font-light leading-relaxed max-w-prose">
                  {lang === "th" ? beat.descriptionTh : beat.descriptionEn}
                </p>
                <p className="mt-3 font-mono text-xs text-zinc-400">
                  <span className="text-[#00f0ff]" aria-hidden="true">
                    →{" "}
                  </span>
                  {beat.streamState}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  };

  // Mobile: the device cannot pin, so a 3-step selector sits directly above
  // it and only the selected stage's story is shown.
  const renderMobileStepper = () => {
    const beat = beats[activeBeat];
    return (
      <div className="space-y-4">
        <div
          role="group"
          aria-label={t("ขั้นตอนสถาปัตยกรรม", "Architecture stages")}
          className="grid grid-cols-3 gap-2"
        >
          {beats.map((b, bIdx) => {
            const isActive = activeBeat === bIdx;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => applyBeat(bIdx)}
                aria-current={isActive ? "step" : undefined}
                className={`min-h-14 rounded-lg border px-2 py-2 text-left font-mono text-[11px] leading-tight transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] ${
                  isActive
                    ? "border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff]"
                    : "border-white/[0.08] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {(lang === "th" ? b.badgeTh : b.badgeEn).replace(
                  /\s*\/\/\s*/,
                  " ",
                )}
              </button>
            );
          })}
        </div>
        {beat && (
          <div aria-live="polite" className="min-h-[7.5rem]">
            <h4 className="text-base font-bold text-white tracking-tight">
              {lang === "th" ? beat.titleTh : beat.titleEn}
            </h4>
            <p className="mt-1.5 text-sm text-zinc-300 font-light leading-relaxed">
              {lang === "th" ? beat.descriptionTh : beat.descriptionEn}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render Project Narrative Header Block
  const renderProjectHeader = () => {
    return (
      <div className="space-y-6">
        {/* Title block; tag and year sit in one quiet meta line */}
        <div className="space-y-1.5">
          <p className="font-mono text-xs text-zinc-400">
            {project.tag} · {displayYear}
          </p>
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

        {/* Description */}
        <p className="text-sm xl:text-[15px] text-zinc-300/90 font-light leading-relaxed max-w-xl min-h-[4.5rem]">
          {highlightedDescription}
        </p>

        {/* Outcome metrics */}
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
                  {getMetricValue(metric, lang)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Stack, architecture and repository notes live in the modal */}
        <div>
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
        </div>
      </div>
    );
  };

  const storyColumn = (
    <div className="col-span-7 space-y-8">
      {renderProjectHeader()}
      {renderStoryBeats()}
    </div>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl bg-[#090c13]/90 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all duration-500 p-6 sm:p-10 lg:p-12 backdrop-blur-md"
    >
      {/* Render exactly one layout tree: duplicated hidden markup would
          steal the beat refs from the visible runway and duplicate ids. */}
      {isDesktop ? (
        <div className="grid grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* DOM order follows visual order so keyboard focus matches the
              alternating rhythm (device left on even, right on odd). */}
          {isReversed && storyColumn}
          <div className="col-span-5 self-start [@media(min-height:860px)]:sticky [@media(min-height:860px)]:top-16">
            {renderDeviceMockup()}
          </div>
          {!isReversed && storyColumn}
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          {renderProjectHeader()}
          {renderMobileStepper()}
          <div className="flex justify-center">{renderDeviceMockup()}</div>
        </div>
      )}

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
