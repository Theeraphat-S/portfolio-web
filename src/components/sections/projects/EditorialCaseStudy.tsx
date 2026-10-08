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
import { BilingualStack } from "../../BilingualStack";

interface EditorialCaseStudyProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

// "Product — Feature" titles render as a title plus a feature subtitle.
const splitTitle = (raw: string): [string, string] => {
  for (const sep of [" — ", " - "]) {
    if (raw.includes(sep)) {
      const [title, subtitle] = raw.split(sep);
      return [title, subtitle];
    }
  }
  return [raw, ""];
};

const TECH_KEYWORDS = [
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
const TECH_KEYWORD_REGEX = new RegExp(`(${TECH_KEYWORDS.join("|")})`, "gi");

// Underline technical terms in a description.
const highlightTerms = (text: string): React.ReactNode[] =>
  text.split(TECH_KEYWORD_REGEX).map((part, pIdx) =>
    TECH_KEYWORDS.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
      <span
        key={pIdx}
        className="text-white font-medium border-b border-[#00f0ff]/40 pb-[0.5px]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );

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
        evaluatedOn: "client",
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
      tag: "WEBVIEW_MESSAGE",
      name: "WebViewMenuLoadedState",
      details: "Hybrid menu loaded in native shell ➔ cart bridge ready",
      payload: {
        bridge: "JavaScriptChannel",
        cartItems: 2,
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
  const [pintoActiveTab, setPintoActiveTab] = useState<PintoState>("webview");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Scale the pinned device down on short viewports so the whole stack
  // (screen + event dock) fits inside 100vh minus the sticky offset.
  const deviceRef = useRef<HTMLDivElement>(null);
  const [deviceFit, setDeviceFit] = useState({ scale: 1, height: 0 });
  useEffect(() => {
    const el = deviceRef.current;
    if (!isDesktop || !el) return;
    const measure = () => {
      // offsetHeight ignores transforms, so this is the unscaled height.
      const height = el.offsetHeight;
      const available = window.innerHeight - 96;
      const scale = Math.max(0.68, Math.min(1, available / height));
      setDeviceFit({ scale, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

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
        const tabs: PintoState[] = ["webview", "streak", "profile"];
        setPintoActiveTab(tabs[bIdx] || "webview");
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
    const tabIdx = tab === "webview" ? 0 : tab === "streak" ? 1 : 2;
    setActiveBeat(tabIdx);
  };

  const displayYear =
    lang === "th"
      ? project.yearTh || project.year
      : project.yearEn || project.year;

  const [titleTh, featureTh] = splitTitle(project.titleTh);
  const [titleEn, featureEn] = splitTitle(project.titleEn);
  const primaryTitle = lang === "th" ? titleTh : titleEn;

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
        <BilingualStack
          className="w-full text-center font-mono text-[11px] text-zinc-500"
          th="จำลองการทำงานของแอป Flutter ในเบราว์เซอร์ · ตัวเลขเป็นตัวอย่าง"
          en="In-browser simulation of the Flutter app · figures are illustrative"
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
                <div className="mt-2">
                  <BilingualStack
                    as="h4"
                    className="text-lg font-bold text-white tracking-tight"
                    th={beat.titleTh}
                    en={beat.titleEn}
                  />
                </div>
                <div className="mt-2">
                  <BilingualStack
                    className="text-sm text-zinc-300 font-light leading-relaxed max-w-prose"
                    th={beat.descriptionTh}
                    en={beat.descriptionEn}
                  />
                </div>
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

  // Mobile: the device cannot pin, so the selected stage's story comes first
  // and the 3-step selector sits flush against the top of the device.
  const renderMobileStepper = () => {
    const beat = beats[activeBeat];
    return (
      <div className="space-y-4">
        {beat && (
          // Every stage's text shares one grid cell, so switching stage or
          // language never changes the height above the device.
          <div aria-live="polite" className="grid">
            {beats.map((b, bIdx) => (
              <div
                key={b.id}
                aria-hidden={bIdx !== activeBeat}
                className={`col-start-1 row-start-1 ${bIdx === activeBeat ? "" : "invisible"}`}
              >
                <BilingualStack
                  as="h4"
                  className="text-base font-bold text-white tracking-tight"
                  th={b.titleTh}
                  en={b.titleEn}
                />
                <div className="mt-1.5">
                  <BilingualStack
                    className="text-sm text-zinc-300 font-light leading-relaxed"
                    th={b.descriptionTh}
                    en={b.descriptionEn}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
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
          <BilingualStack
            as="h3"
            className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight"
            th={titleTh}
            en={titleEn}
          />
          {(featureTh || featureEn) && (
            <BilingualStack
              className="text-base font-sans font-medium text-zinc-300"
              th={featureTh}
              en={featureEn}
            />
          )}
          <BilingualStack
            className="text-xs font-mono text-zinc-400 tracking-wide"
            th={project.subtitleTh}
            en={project.subtitleEn}
          />
        </div>

        {/* Description */}
        <BilingualStack
          className="text-sm xl:text-base text-zinc-300/90 font-light leading-relaxed max-w-xl"
          th={highlightTerms(project.descriptionTh)}
          en={highlightTerms(project.descriptionEn)}
        />

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
                <BilingualStack
                  as="span"
                  className="text-xs font-mono tracking-widest text-zinc-400 uppercase block break-words"
                  th={metric.labelTh}
                  en={metric.labelEn}
                />
                <BilingualStack
                  as="span"
                  className="text-xs sm:text-sm font-mono font-semibold text-zinc-200 block break-words"
                  th={getMetricValue(metric, "th")}
                  en={getMetricValue(metric, "en")}
                />
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
          <div className="col-span-5 self-start sticky top-16">
            <div
              ref={deviceRef}
              style={{
                transform: `scale(${deviceFit.scale})`,
                transformOrigin: "top center",
                // Reclaim the layout space the scale-down frees up.
                marginBottom: deviceFit.height * (deviceFit.scale - 1),
              }}
            >
              {renderDeviceMockup()}
            </div>
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
