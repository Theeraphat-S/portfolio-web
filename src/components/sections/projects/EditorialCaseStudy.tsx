import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { m, useReducedMotion } from "motion/react";
import { BEAT_COMMIT, FADE_UP, IN_VIEW } from "../../../lib/motion";
import { scrollToElement } from "../../../lib/lenis";
import { ArrowUpRight, Terminal } from "lucide-react";
import { getMetricValue } from "../../../lib/utils";
import { useLanguage } from "../../../context/LanguageContext";
import { ProjectItem, StoryBeat } from "../../../types";
import { BEATS_BY_PROJECT } from "../../../data";
import { PintoScreen, PintoState } from "../../mobile-mockup/PintoScreen";
import { NcdsScreen } from "../../mobile-mockup/NcdsScreen";
import { PosScreen } from "../../mobile-mockup/PosScreen";
import { LiveEventDock } from "../../mobile-mockup/LiveEventDock";
import { BeatSignal, DeviceFrame } from "../../mobile-mockup/DeviceFrame";
import { BLoCStreamEvent } from "../../../types/stream";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useBeatScrub } from "../../../hooks/useBeatScrub";
import { BilingualStack } from "../../BilingualStack";
import { ChunkBoundary } from "../../ChunkBoundary";
import { createChunk } from "../../../lib/lazyChunk";

// The drawer carries the Dart snippets; it loads on first open, and
// hovering or focusing a dock button starts the download.
const drawerChunk = createChunk(
  () => import("../../mobile-mockup/DevToolsDrawer"),
);

interface EditorialCaseStudyProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
  /** Starts loading the case-study modal before the click. */
  onPrefetch?: () => void;
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

const SOURCE_BY_PROJECT: Record<string, string> = {
  "ncds-screening": "NcdsScreen",
  "pinto-app": "PintoScreen",
  "pos-system": "PosScreen",
};

// The event a beat emits carries that beat's on-screen state, so the
// dock and DevTools log read the same values as the device.
const beatEvent = (
  projectId: string,
  beat: StoryBeat,
  bIdx: number,
  timestamp: string,
): BLoCStreamEvent => ({
  id: `beat-${projectId}-${bIdx}-${timestamp}`,
  timestamp,
  projectId,
  source: SOURCE_BY_PROJECT[projectId] ?? "ScrollytellingEngine",
  type: bIdx === 0 ? "bloc_event" : bIdx === 1 ? "bloc_state" : "telemetry",
  tag: beat.streamTag,
  name: beat.streamState,
  details: beat.streamDetails,
  payload: beat.streamPayload,
  latencyMs: 0.4,
});

export const EditorialCaseStudy: React.FC<EditorialCaseStudyProps> = ({
  project,
  index,
  onSelect,
  onPrefetch,
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

  const beats = useMemo(() => BEATS_BY_PROJECT[project.id] || [], [project.id]);

  // Live BLoC Stream Events and DevTools Drawer. The log opens on the
  // first beat's state, which is what the device shows on load.
  const [streamEvents, setStreamEvents] = useState<BLoCStreamEvent[]>(() =>
    beats[0] ? [beatEvent(project.id, beats[0], 0, "09:41:00.012")] : [],
  );
  // The beat whose event was last emitted. The first scrub into the
  // opening beat is not a change, so it emits nothing.
  const emittedBeatRef = useRef(0);
  // The runway's one authored moment: each emitted beat change plays a
  // single coordinated commit (frame edge light, screen sweep, beat rule,
  // dock row) keyed to this. Null until the first real change.
  const [beatSignal, setBeatSignal] = useState<BeatSignal | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Stays mounted after the first open so the exit animation can run.
  const [drawerLoaded, setDrawerLoaded] = useState(false);
  // A failed chunk unmounts the drawer; the next click retries with a
  // fresh lazy component.
  const [DevToolsDrawer, setDevToolsDrawer] = useState(drawerChunk.create);
  const handleDrawerError = () => {
    setIsDrawerOpen(false);
    setDrawerLoaded(false);
    setDevToolsDrawer(drawerChunk.create);
  };
  const [drawerTab, setDrawerTab] = useState<"stream" | "code" | "telemetry">(
    "stream",
  );

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

      if (bIdx === emittedBeatRef.current) return;
      const direction = bIdx > emittedBeatRef.current ? 1 : -1;
      emittedBeatRef.current = bIdx;
      setBeatSignal((prev) => ({ key: (prev?.key ?? 0) + 1, direction }));

      const now = new Date();
      const timeStr =
        now.toTimeString().split(" ")[0] +
        "." +
        String(now.getMilliseconds()).padStart(3, "0");

      handleDispatchEvent(beatEvent(project.id, beat, bIdx, timeStr));
    },
    [beats, project.id],
  );

  // Scroll drives the beats: the pinned runway scrubs across the beat list,
  // the stacked layout across the stepper and device. Anything the reader
  // taps on the device holds until the scroll crosses into another beat.
  const scrubTargetRef = useRef<HTMLElement | null>(null);
  const { segments, beatOpacity } = useBeatScrub({
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
  // Reduced motion gets the state change alone, instantly.
  const commitSignal = shouldReduceMotion ? null : beatSignal;

  // Land a beat just past the reading line so the scrub selects it.
  const scrollToBeat = (bIdx: number) => {
    const el = beatRefs.current[bIdx];
    if (el) scrollToElement(el, window.innerHeight * 0.5 - 48);
  };

  const handleTabClick = (tab: PintoState) => {
    setPintoActiveTab(tab);
    const tabIdx = tab === "webview" ? 0 : tab === "streak" ? 1 : 2;
    setActiveBeat(tabIdx);
    // The screen emits its own tap event; a later scroll back to the
    // previous beat is then a change again.
    emittedBeatRef.current = tabIdx;
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
        /^\d+\s*/,
        "",
      )
    : "";

  // Render Phone Simulator Device (Sticky Pin Anchor)
  const renderDeviceMockup = () => {
    return (
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] flex flex-col items-center gap-3">
        {/* Active stage label, in flow directly above the device so a
            stage change shows next to the screen it changes. The rail
            fills as the reader scrolls (not under reduced motion). */}
        {
          <div className="w-full px-3.5 py-1.5 rounded-lg bg-hud/90 border border-primary/25 backdrop-blur-md shadow-sm font-mono text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-primary font-semibold truncate">
                  {activeBeatLabel}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 text-zinc-300 shrink-0"
                aria-live="polite"
              >
                <span className="sr-only">{t("ขั้นตอน", "Step")}</span>
                <span className="text-primary font-semibold">
                  {String(activeBeat + 1).padStart(2, "0")}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">
                  {String(beats.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            {!shouldReduceMotion && (
              <div aria-hidden="true" className="mt-1.5 mb-0.5 flex gap-1">
                {segments.map((segment, sIdx) => (
                  <span key={sIdx} className="h-px flex-1 bg-line">
                    <m.span
                      className="block h-full origin-left bg-signal"
                      style={{ scaleX: segment }}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
        }

        <DeviceFrame
          screenId={`screen-panel-${project.id}`}
          label={`${primaryTitle} interactive demonstration`}
          offline={project.id === "pos-system" && !posOnline}
          signal={commitSignal}
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
          animateEntry={!shouldReduceMotion}
          eventsCount={streamEvents.length}
          onPrefetchDrawer={drawerChunk.prefetch}
          onOpenDrawer={(tab) => {
            setDrawerTab(tab);
            setDrawerLoaded(true);
            setIsDrawerOpen(true);
          }}
        />
        <BilingualStack
          className="w-full text-center text-xs text-zinc-400"
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
        <p className="pb-3 text-xs text-zinc-400">
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
                aria-current={isActive ? "step" : undefined}
                style={{ opacity: beatOpacity[bIdx] }}
                className={`relative min-h-[50vh] border-t py-7 text-left transition-[border-color] duration-(--dur-base) has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                  isActive ? "border-primary/60" : "border-line"
                }`}
              >
                {/* Beat commit, part 3: a signal line draws across the
                    newly active beat's rule, then hands it to blue. */}
                {isActive && commitSignal && (
                  <m.span
                    key={commitSignal.key}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-signal"
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                    transition={{
                      scaleX: BEAT_COMMIT,
                      opacity: { ...BEAT_COMMIT, times: [0, 0.7, 1] },
                    }}
                  />
                )}
                {/* One real button covers the whole step, so the step stays
                    clickable while its heading and text keep their semantics. */}
                <button
                  type="button"
                  onClick={() => scrollToBeat(bIdx)}
                  aria-label={`${lang === "th" ? beat.badgeTh : beat.badgeEn}: ${lang === "th" ? beat.titleTh : beat.titleEn}`}
                  className="absolute inset-0 z-10 cursor-pointer outline-none"
                />
                <p
                  className={`font-mono text-xs  font-semibold ${
                    isActive ? "text-primary" : "text-zinc-400"
                  }`}
                >
                  {lang === "th" ? beat.badgeTh : beat.badgeEn}
                </p>
                <div className="mt-2">
                  <BilingualStack
                    as="h4"
                    className="text-lg font-semibold text-white tracking-tight"
                    th={beat.titleTh}
                    en={beat.titleEn}
                  />
                </div>
                <div className="mt-2">
                  <BilingualStack
                    className="text-sm text-zinc-300 font-normal leading-relaxed max-w-prose"
                    th={beat.descriptionTh}
                    en={beat.descriptionEn}
                  />
                </div>
                <p className="mt-3 font-mono text-xs text-zinc-400">
                  {beat.streamState}
                </p>
                {/* The event this beat emits, so the step shows what the
                    dock will log instead of leaving the column empty. */}
                <pre
                  aria-hidden="true"
                  className={`mt-2 whitespace-pre-wrap break-words rounded-lg border bg-void px-3 py-2.5 font-mono text-xs leading-relaxed text-zinc-300 transition-[border-color] duration-(--dur-base) ${
                    isActive ? "border-primary/40" : "border-line"
                  }`}
                >
                  {JSON.stringify(beat.streamPayload, null, 2)}
                </pre>
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
  const renderStageText = () => {
    const beat = beats[activeBeat];
    return (
      <>
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
                {/* Only the shown stage is a heading in the outline. */}
                <BilingualStack
                  as={bIdx === activeBeat ? "h4" : "div"}
                  className="text-base font-semibold text-white tracking-tight"
                  th={b.titleTh}
                  en={b.titleEn}
                />
                <div className="mt-1.5">
                  <BilingualStack
                    className="text-sm text-zinc-300 font-normal leading-relaxed"
                    th={b.descriptionTh}
                    en={b.descriptionEn}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderStepper = () => {
    return (
      <div>
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
                className={`relative overflow-hidden min-h-14 rounded-lg border px-1.5 sm:px-2 py-2 text-left font-mono text-xs leading-tight transition-colors cursor-pointer ${
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
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal/70"
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
          <p className="flex gap-3 font-mono text-xs text-zinc-400">
            <span>{project.tag}</span>
            <span>{displayYear}</span>
          </p>
          <BilingualStack
            as="h3"
            className="text-3xl xl:text-4xl font-semibold tracking-tight text-white leading-tight"
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
            className="text-sm text-zinc-400"
            th={project.subtitleTh}
            en={project.subtitleEn}
          />
        </div>

        {/* Description */}
        <BilingualStack
          className="text-sm xl:text-base text-zinc-300/90 font-normal leading-relaxed max-w-xl"
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
                  className="text-xs font-mono text-zinc-400 block break-words"
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
            onPointerEnter={onPrefetch}
            onFocus={onPrefetch}
            aria-haspopup="dialog"
            data-cursor-text="ANALYZE"
            className="group/cta btn-lift relative inline-flex items-center justify-center gap-2.5 min-w-[170px] max-lg:min-h-11 pointer-coarse:min-h-11 pl-5 pr-1.5 py-1 rounded-lg bg-surface border-[1.5px] border-edge hover:border-signal text-zinc-200 hover:text-white text-xs font-mono transition shadow-hard-sm cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-signal transition-colors" />
            <span className="font-semibold">
              {t("อ่าน case study", "View case study")}
            </span>
            <span aria-hidden="true" className="cta-icon bg-white/[0.06]">
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/cta:text-signal transition-colors" />
            </span>
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
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={FADE_UP}
      className="bezel [--bezel-radius:1.5rem] relative backdrop-blur-md"
    >
      <div className="bezel-core bg-deck/90 border border-line hover:border-signal/30 transition-[border-color] duration-(--dur-slow) p-[1.125rem] sm:p-[2.125rem] lg:p-[2.625rem]">
        {/* Render exactly one layout tree: duplicated hidden markup would
          steal the beat refs from the visible runway and duplicate ids. */}
        {isPinned ? (
          <div className="grid grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* DOM order follows visual order so keyboard focus matches the
              alternating rhythm (device left on even, right on odd). */}
            {isReversed && storyColumn}
            <div className="col-span-5 self-start sticky top-16">
              {/* Held still while pinned: the beat commit is the device's
                only motion, so nothing drifts under it. */}
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
          // One column on small screens; with reduced motion on desktop the
          // stepper and device sit beside the header instead of pinning.
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
            <div className="lg:col-span-7">{renderProjectHeader()}</div>
            <div
              ref={(el) => {
                scrubTargetRef.current = el;
              }}
              className="lg:col-span-5"
            >
              <div className="mb-4">{renderStageText()}</div>
              {renderStepper()}
              <div className="mt-6 sm:mt-8 flex justify-center">
                {renderDeviceMockup()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flutter & BLoC DevTools Drawer */}
      {drawerLoaded && (
        <ChunkBoundary onError={handleDrawerError}>
          <Suspense fallback={null}>
            <DevToolsDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              initialTab={drawerTab}
              projectId={project.id}
              events={streamEvents}
              onClearEvents={() => setStreamEvents([])}
            />
          </Suspense>
        </ChunkBoundary>
      )}
    </m.article>
  );
};

export default EditorialCaseStudy;
