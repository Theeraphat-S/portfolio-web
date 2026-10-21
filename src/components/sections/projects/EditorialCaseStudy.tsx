import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { m, useReducedMotion, useTransform } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion";
import { scrollToElement } from "../../../lib/lenis";
import { ArrowUpRight, Terminal } from "lucide-react";
import { getMetricValue } from "../../../lib/utils";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem } from "../../../types";
import { BEATS_BY_PROJECT } from "../../../data";
import { PintoScreen, PintoState } from "../../mobile-mockup/PintoScreen";
import { NcdsScreen } from "../../mobile-mockup/NcdsScreen";
import { PosScreen } from "../../mobile-mockup/PosScreen";
import { LiveEventDock } from "../../mobile-mockup/LiveEventDock";
import { DeviceFrame } from "../../mobile-mockup/DeviceFrame";
import { DevToolsDrawer } from "../../mobile-mockup/DevToolsDrawer";
import { BLoCStreamEvent } from "../../../types/stream";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useBeatScrub } from "../../../hooks/useBeatScrub";
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
        className="text-white font-medium border-b border-primary/40 pb-[0.5px]"
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
  const [posOnline, setPosOnline] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();
  // Pin the device only on desktop; small screens and reduced motion get
  // the stacked layout, where nothing is held in place while scrolling.
  const isPinned = isDesktop && !shouldReduceMotion;

  // Scale the pinned device down on short viewports so the whole stack
  // (screen + event dock) fits inside 100vh minus the sticky offset.
  const deviceRef = useRef<HTMLDivElement>(null);
  const [deviceFit, setDeviceFit] = useState({ scale: 1, height: 0 });
  useEffect(() => {
    const el = deviceRef.current;
    if (!isPinned || !el) return;
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
  }, [isPinned]);

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

  // Scroll drives the beats: the pinned runway scrubs across the beat list,
  // the stacked layout across the stepper and device. Anything the reader
  // taps on the device holds until the scroll crosses into another beat.
  const scrubTargetRef = useRef<HTMLElement | null>(null);
  const { progress, segments, beatOpacity } = useBeatScrub({
    targetRef: scrubTargetRef,
    beatCount: beats.length,
    getBoundaries: isPinned
      ? (rect) =>
          beatRefs.current
            .slice(1)
            .map((el) =>
              el
                ? (el.getBoundingClientRect().top - rect.top) / rect.height
                : 1,
            )
      : undefined,
    readingLine: isPinned ? 0.5 : 0.6,
    enabled: !shouldReduceMotion,
    onBeat: applyBeat,
  });
  const deviceDrift = useTransform(progress, [0, 1], [12, -12]);

  // Land a beat just past the reading line so the scrub selects it.
  const scrollToBeat = (bIdx: number) => {
    const el = beatRefs.current[bIdx];
    if (el) scrollToElement(el, window.innerHeight * 0.5 - 48);
  };

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
        {/* Active stage HUD (pinned runway only; the stacked layout uses
            the stepper above). The rail fills as the reader scrolls. */}
        {isPinned && (
          <div className="w-full px-3.5 py-1.5 rounded-lg bg-[#0a0d14]/90 border border-primary/25 backdrop-blur-md shadow-sm font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-primary font-semibold tracking-wider truncate">
                  {activeBeatLabel}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 text-zinc-300 shrink-0"
                aria-live="polite"
              >
                <span className="sr-only">{t("ขั้นตอน", "Step")}</span>
                <span className="text-primary font-bold">
                  {String(activeBeat + 1).padStart(2, "0")}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">
                  {String(beats.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div aria-hidden="true" className="mt-1.5 mb-0.5 flex gap-1">
              {segments.map((segment, sIdx) => (
                <span key={sIdx} className="h-px flex-1 bg-line">
                  <m.span
                    className="block h-full origin-left bg-primary"
                    style={{ scaleX: segment }}
                  />
                </span>
              ))}
            </div>
          </div>
        )}

        <DeviceFrame
          screenId={`screen-panel-${project.id}`}
          label={`${primaryTitle} interactive demonstration`}
          offline={project.id === "pos-system" && !posOnline}
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
              onOnlineChange={setPosOnline}
            />
          )}
        </DeviceFrame>

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

  // Pinned runway: flat beat list scrubbed by scroll; a click scrolls to
  // the beat so the scrub, not the click, selects it.
  const renderStoryBeats = () => {
    return (
      <div className="pt-2">
        <p className="pb-3 font-mono text-[11px] text-zinc-400">
          {t(
            "เลื่อนลงเพื่อดูแต่ละขั้นบนหน้าจอจำลอง",
            "Scroll to step through each stage on the device",
          )}
        </p>

        <ol
          ref={(el) => {
            scrubTargetRef.current = el;
          }}
        >
          {beats.map((beat, bIdx) => {
            const isActive = activeBeat === bIdx;
            return (
              <m.li
                key={beat.id}
                ref={(el) => {
                  beatRefs.current[bIdx] = el;
                }}
                onClick={() => scrollToBeat(bIdx)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollToBeat(bIdx);
                  }
                }}
                aria-current={isActive ? "step" : undefined}
                style={{ opacity: beatOpacity[bIdx] }}
                className={`min-h-[50vh] border-t py-7 text-left cursor-pointer outline-none transition-[border-color] duration-300 focus-visible:ring-1 focus-visible:ring-signal ${
                  isActive ? "border-primary/60" : "border-line"
                }`}
              >
                <p
                  className={`font-mono text-xs tracking-wider font-semibold ${
                    isActive ? "text-primary" : "text-zinc-400"
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
                  <span className="text-primary" aria-hidden="true">
                    →{" "}
                  </span>
                  {beat.streamState}
                </p>
              </m.li>
            );
          })}
        </ol>
      </div>
    );
  };

  // Stacked layout (small screens, or reduced motion): the device cannot
  // pin, so the selected stage's story comes first and the 3-step selector
  // sits flush against the top of the device. Each step fills as the
  // reader scrolls past the device.
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
          aria-label={t("ขั้นตอนของโปรเจกต์", "Project stages")}
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
                className={`relative overflow-hidden min-h-14 rounded-lg border px-2 py-2 text-left font-mono text-[11px] leading-tight transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal ${
                  isActive
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-line text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {(lang === "th" ? b.badgeTh : b.badgeEn).replace(
                  /\s*\/\/\s*/,
                  " ",
                )}
                <m.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary/60"
                  style={{ scaleX: segments[bIdx] }}
                />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-line sm:py-3.5 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className={`flex items-baseline justify-between gap-4 py-2.5 sm:block sm:py-0 sm:space-y-1 min-w-0 ${
                  mIdx === 0 ? "sm:pr-4" : mIdx === 1 ? "sm:px-4" : "sm:pl-4"
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
                  className="text-xs sm:text-sm font-mono font-semibold text-zinc-200 block break-words text-right sm:text-left"
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
            className="group/cta relative inline-flex items-center justify-center gap-2.5 min-w-[170px] px-5 py-2.5 rounded-full bg-[#0d1424] border border-white/[0.12] hover:border-signal/50 hover:bg-signal/[0.05] text-zinc-200 hover:text-white text-xs font-mono tracking-wider uppercase transition duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(56,217,255,0.15)] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-primary transition-colors" />
            <span className="font-semibold tracking-wider">
              {t("อ่าน case study", "VIEW CASE STUDY")}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
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
    <m.article
      id={`case-${project.id}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="relative rounded-3xl bg-[#0a1020]/90 border border-line hover:border-signal/30 transition duration-500 p-6 sm:p-10 lg:p-12 backdrop-blur-md"
    >
      {/* Render exactly one layout tree: duplicated hidden markup would
          steal the beat refs from the visible runway and duplicate ids. */}
      {isPinned ? (
        <div className="grid grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* DOM order follows visual order so keyboard focus matches the
              alternating rhythm (device left on even, right on odd). */}
          {isReversed && storyColumn}
          <div className="col-span-5 self-start sticky top-16">
            <m.div style={{ y: deviceDrift }}>
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
            </m.div>
          </div>
          {!isReversed && storyColumn}
        </div>
      ) : (
        // One column on small screens; with reduced motion on desktop the
        // stepper and device sit beside the header instead of pinning.
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          <div className="lg:col-span-7">{renderProjectHeader()}</div>
          <div
            ref={(el) => {
              scrubTargetRef.current = el;
            }}
            className="space-y-8 lg:col-span-5"
          >
            {renderMobileStepper()}
            <div className="flex justify-center">{renderDeviceMockup()}</div>
          </div>
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
    </m.article>
  );
};

export default EditorialCaseStudy;
