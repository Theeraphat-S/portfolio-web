import React, { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Check,
  RotateCw,
  Ticket,
  Flame,
  UserRound,
  UserCheck,
  ChevronRight,
  ShoppingBag,
  Coins,
  Settings,
  ScanLine,
  Sparkles,
  Search,
  Star,
  Plane,
  Shirt,
  Soup,
  ListFilter,
  Heart,
  Play,
  House,
  Clapperboard,
  Plus,
  MessagesSquare,
  Cat,
  Mountain,
  Laptop,
  Coffee,
  Palmtree,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";
import { useTransientFlag } from "../../hooks/useTransientFlag";
import { SAFE_BOTTOM, SAFE_TOP } from "./DeviceFrame";
import { pintoDemo } from "../../data/deviceDemos";
import { PintoFeedPost, PintoPostVisual } from "../../types/portfolio";

export type PintoState = "webview" | "streak" | "profile";

interface PintoScreenProps {
  direction?: number;
  activeState?: PintoState;
  onStateChange?: (state: PintoState) => void;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
}

// Pinto brand green, matched to the production app.
const PINTO_GREEN = "#23b14d";

// Illustrative photo tiles: posts carry a visual key, not real photos.
const POST_VISUAL: Record<PintoPostVisual, { icon: LucideIcon; tile: string }> =
  {
    cat: {
      icon: Cat,
      tile: "bg-gradient-to-b from-[#3b3f4a] to-[#1e2129] text-[#f2c38f]",
    },
    laptop: {
      icon: Laptop,
      tile: "bg-gradient-to-b from-[#c9d6ea] to-[#8fa6c9] text-[#23324d]",
    },
    coffee: {
      icon: Coffee,
      tile: "bg-gradient-to-b from-[#dfe7f5] to-[#b9c9e6] text-[#3b4f7a]",
    },
    mountain: {
      icon: Mountain,
      tile: "bg-gradient-to-b from-[#ffd9a8] to-[#e98d5a] text-[#5a2a10]",
    },
  };

const SHAPE_ASPECT: Record<PintoFeedPost["shape"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
};

export const PintoScreen: React.FC<PintoScreenProps> = ({
  activeState: controlledState,
  onStateChange,
  onDispatchEvent,
}) => {
  const { t } = useLanguage();
  const [internalState, setInternalState] = useState<PintoState>("webview");
  const currentState = controlledState ?? internalState;

  const handleStateSelect = (state: PintoState) => {
    if (onStateChange) {
      onStateChange(state);
    } else {
      setInternalState(state);
    }

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pinto-app",
        source: "PintoScreen",
        type: "bloc_event",
        tag: "NAVIGATION",
        name: `SwitchScreenEvent(${state.toUpperCase()})`,
        stateName: `${state.charAt(0).toUpperCase() + state.slice(1)}ActiveState`,
        details: `Navigation state emitted to Flutter Navigator`,
        latencyMs: 1.1,
      }),
    );
  };

  const [isProfileRefreshing, flashProfileRefreshing] = useTransientFlag(700);
  const [streakCount, setStreakCount] = useState(pintoDemo.startingStreakDays);
  const [isStreaked, setIsStreaked] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const points =
    pintoDemo.startingPoints + (isStreaked ? pintoDemo.streakRewardPoints : 0);

  // Illustrative bridge call: a tap in web content posts to Flutter so
  // native state stays in step (the pattern used for the WebView menus).
  const toggleLike = (post: PintoFeedPost) => {
    const isLiked = liked.includes(post.id);
    setLiked((prev) =>
      isLiked ? prev.filter((x) => x !== post.id) : [...prev, post.id],
    );

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pinto-app",
        source: "PintoScreen",
        type: "bridge_call",
        tag: "JS_BRIDGE",
        name: "JavascriptChannel::postMessage",
        stateName: "FeedSyncedState",
        details: `Payload: { action: '${isLiked ? "UNLIKE" : "LIKE"}', postId: ${post.id} } ➔ native state updated`,
        payload: {
          bridgeName: "FlutterNativeBridge",
          postId: post.id,
          liked: !isLiked,
          likeCount: post.likes + (isLiked ? 0 : 1),
        },
        latencyMs: 0.4,
      }),
    );
  };

  const triggerStreakClaim = (e?: React.MouseEvent) => {
    if (isStreaked) return;
    const newCount = streakCount + 1;
    setStreakCount(newCount);
    setIsStreaked(true);

    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.5;

    confetti({
      particleCount: 36,
      spread: 60,
      origin: { x, y },
      colors: [PINTO_GREEN, "#ffc84a", "#bfeccf", "#2e9d5b"],
      disableForReducedMotion: true,
      zIndex: 2000,
      scalar: 0.85,
    });

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pinto-app",
        source: "PintoScreen",
        type: "bloc_event",
        tag: "BLoC::Event",
        name: "ClaimDailyStreakEvent",
        stateName: "StreakClaimedState",
        details: `Day ${newCount} active (+${pintoDemo.streakRewardPoints} PTS) ➔ State: StreakClaimedState(VoucherUnlocked: true)`,
        payload: {
          streakDays: newCount,
          pointsEarned: pintoDemo.streakRewardPoints,
          profileTier: pintoDemo.tierName,
          unlockedVoucher: pintoDemo.voucher.title.en,
        },
        latencyMs: 0.9,
      }),
    );
  };

  const handleProfileRefresh = () => {
    flashProfileRefreshing();
    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pinto-app",
        source: "PintoScreen",
        type: "bloc_event",
        tag: "PROFILE_API",
        name: "RefreshProfileEvent",
        stateName: "ProfileSyncedState",
        details: `GET /profile ➔ points & tier refreshed for streak rewards`,
      }),
    );
  };

  const iconButton =
    "grid h-9 w-9 place-items-center rounded-full text-[#404943] cursor-pointer hover:bg-black/5";

  const { categories } = pintoDemo;
  const chips: { label: string; icon?: LucideIcon; cls: string }[] = [
    {
      label: t(categories.all.th, categories.all.en),
      cls: "border-[#9aa19c] text-[#404943] bg-white",
    },
    {
      label: t(categories.travel.th, categories.travel.en),
      icon: Plane,
      cls: "border-[#9fe0d6] bg-[#e3f7f3] text-[#1b9a87]",
    },
    {
      label: t(categories.fashion.th, categories.fashion.en),
      icon: Shirt,
      cls: "border-[#f7b7cc] bg-[#fde6ee] text-[#d4457a]",
    },
    {
      label: t(categories.food.th, categories.food.en),
      icon: Soup,
      cls: "border-[#f8d39a] bg-[#fff2dc] text-[#b86e00]",
    },
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f2f4f3] text-[#191d1a] font-sans select-none">
      {/* App bar */}
      <header className={`${SAFE_TOP} bg-white`}>
        {currentState === "webview" ? (
          <>
            <div className="flex h-12 items-center gap-1 pl-4 pr-1.5">
              <p
                className="flex-1 text-[22px] font-black italic tracking-tight"
                style={{ color: PINTO_GREEN }}
              >
                PINTO
              </p>
              <span className={iconButton} aria-hidden="true">
                <ScanLine className="h-[19px] w-[19px]" />
              </span>
              <span className={iconButton} aria-hidden="true">
                <Sparkles
                  className="h-[19px] w-[19px]"
                  style={{ color: PINTO_GREEN }}
                />
              </span>
              <span className={iconButton} aria-hidden="true">
                <Search className="h-[19px] w-[19px]" />
              </span>
            </div>

            {/* Following / For-you tabs */}
            <div className="grid grid-cols-2 border-b border-[#e6e9e7] text-[13px]">
              <span className="grid h-9 place-items-center text-[#8a918c]">
                <UserCheck className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span
                className="relative flex h-9 items-center justify-center gap-1 font-semibold"
                style={{ color: PINTO_GREEN }}
              >
                {t("น่าสนใจ", "For you")}
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                <span
                  className="absolute inset-x-3 bottom-0 h-[2px] rounded-full"
                  style={{ backgroundColor: PINTO_GREEN }}
                />
              </span>
            </div>

            {/* Category chips */}
            <div className="flex items-center gap-1.5 px-3 py-2">
              <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto scrollbar-none">
                {chips.map(({ label, icon: Icon, cls }) => (
                  <span
                    key={label}
                    className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${cls}`}
                  >
                    {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
                    {label}
                  </span>
                ))}
              </div>
              <span className="flex shrink-0 items-center gap-1 border-l border-[#e6e9e7] pl-2 text-[11px] text-[#5c6660]">
                {t("กำลังมาแรง", "Trending")}
                <ListFilter className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </>
        ) : (
          <div className="flex h-12 items-center gap-2 border-b border-[#e6e9e7] pl-4 pr-1.5">
            <p className="min-w-0 flex-1 truncate text-[16px] font-semibold">
              {currentState === "streak"
                ? t("แชท", "Chats")
                : t("โปรไฟล์", "Profile")}
            </p>
            {currentState === "profile" && (
              <button
                type="button"
                onClick={handleProfileRefresh}
                aria-label={t("รีเฟรชโปรไฟล์", "Refresh profile")}
                className={iconButton}
              >
                <RotateCw
                  className={`h-[18px] w-[18px] ${isProfileRefreshing ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        )}
      </header>

      <div
        data-lenis-prevent
        className="relative flex-1 overflow-y-auto scrollbar-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {currentState === "webview" && (
            <m.div
              key="webview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-2 items-start gap-1.5 p-1.5"
            >
              {/* Staggered two-column feed (web content inside the WebView) */}
              {pintoDemo.feedColumns.map((column, ci) => (
                <div key={ci} className="space-y-1.5">
                  {column.map((post) => {
                    const isLiked = liked.includes(post.id);
                    const { icon: Icon, tile } = POST_VISUAL[post.visual];
                    return (
                      <article
                        key={post.id}
                        className="overflow-hidden rounded-lg bg-white"
                      >
                        <header className="flex items-center gap-1.5 px-2 py-1.5">
                          <span
                            className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white"
                            style={{
                              backgroundColor: post.official
                                ? PINTO_GREEN
                                : "#8a9a90",
                            }}
                          >
                            {post.author.charAt(0)}
                            {post.official && (
                              <Check
                                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-white p-px"
                                style={{ color: PINTO_GREEN }}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[11px]">
                            {post.author}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleLike(post)}
                            aria-pressed={isLiked}
                            aria-label={`${t("ถูกใจ", "Like")} ${post.author}`}
                            className="flex cursor-pointer items-center gap-0.5 text-[10px] text-[#8a918c]"
                          >
                            <Heart
                              className={`h-3.5 w-3.5 ${isLiked ? "text-[#e0245e]" : "text-[#5c6660]"}`}
                              fill={isLiked ? "#e0245e" : "none"}
                              aria-hidden="true"
                            />
                            <span className="tabular-nums">
                              {post.likes + (isLiked ? 1 : 0)}
                            </span>
                          </button>
                        </header>
                        <div
                          className={`relative grid ${SHAPE_ASPECT[post.shape]} place-items-center ${tile}`}
                        >
                          <Icon
                            className="h-9 w-9 opacity-80"
                            aria-hidden="true"
                          />
                          {post.video && (
                            <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded bg-black/45 text-white">
                              <Play
                                className="h-2.5 w-2.5"
                                fill="currentColor"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </div>
                        <p className="truncate px-2 py-1.5 text-[11px]">
                          {t(post.caption.th, post.caption.en)}
                        </p>
                      </article>
                    );
                  })}
                  {ci === 0 && (
                    <div className="grid aspect-square place-items-center rounded-lg bg-[#e3f7f3] text-[#1b9a87]">
                      <Palmtree
                        className="h-8 w-8 opacity-70"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              ))}
            </m.div>
          )}

          {currentState === "streak" && (
            <m.div
              key="streak"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-3 p-3"
            >
              <div className="rounded-3xl bg-gradient-to-b from-[#e9f7ee] to-white p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                <span
                  className="mx-auto grid h-14 w-14 place-items-center rounded-full"
                  style={{ backgroundColor: "#c8efd6" }}
                >
                  <Flame
                    className="h-8 w-8"
                    style={{ color: PINTO_GREEN }}
                    fill={PINTO_GREEN}
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-2 text-[28px] font-bold leading-none tabular-nums">
                  {streakCount}
                </p>
                <p className="mt-1 text-[13px] text-[#5c6660]">
                  {t("วันที่แชทติดต่อกัน", "days chatting in a row")}
                </p>

                <div className="mt-4 grid grid-cols-7 gap-1">
                  {weekdayLabels(t).map((day, i) => {
                    const done = i < 6 || isStreaked;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full ${
                            done
                              ? "text-white"
                              : "border border-dashed border-[#9fd3b2]"
                          }`}
                          style={
                            done ? { backgroundColor: PINTO_GREEN } : undefined
                          }
                        >
                          {done && (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </span>
                        <span className="text-[10px] text-[#5c6660]">
                          {day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <m.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={triggerStreakClaim}
                  disabled={isStreaked}
                  className={`mt-4 h-11 w-full rounded-full text-[14px] font-semibold transition-colors ${
                    isStreaked
                      ? "cursor-default bg-[#e5efe8] text-[#5c6660]"
                      : "cursor-pointer text-white"
                  }`}
                  style={
                    isStreaked ? undefined : { backgroundColor: PINTO_GREEN }
                  }
                >
                  {isStreaked
                    ? t("เช็คอินวันนี้แล้ว", "Checked in today")
                    : t(
                        `เช็คอินรับ ${pintoDemo.streakRewardPoints} แต้ม`,
                        `Check in for ${pintoDemo.streakRewardPoints} pts`,
                      )}
                </m.button>
              </div>

              {/* Reward voucher */}
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#a8dcbb] bg-white p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e9f7ee]">
                  <Ticket
                    className="h-5 w-5"
                    style={{ color: PINTO_GREEN }}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold">
                    {t(pintoDemo.voucher.title.th, pintoDemo.voucher.title.en)}
                  </p>
                  <p className="text-[11px] text-[#5c6660]">
                    {t(pintoDemo.voucher.note.th, pintoDemo.voucher.note.en)}
                  </p>
                </div>
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: "#17703e" }}
                >
                  {t("ใช้เลย", "Use")}
                </span>
              </div>
            </m.div>
          )}

          {currentState === "profile" && (
            <m.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-3 p-3"
            >
              <div className="rounded-3xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-[15px] font-semibold text-white"
                    style={{ backgroundColor: PINTO_GREEN }}
                  >
                    P
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold">
                      {t("สมาชิก Pinto", "Pinto member")}
                    </p>
                    <span className="mt-0.5 inline-block rounded-full bg-[#fff1cc] px-2 py-0.5 text-[11px] font-semibold text-[#7a5600]">
                      {pintoDemo.tierName}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-[#5c6660]">
                      {t("แต้มสะสม", "Points")}
                    </p>
                    <p className="text-[24px] font-bold leading-tight tabular-nums">
                      {points.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#5c6660] tabular-nums">
                    {t(
                      `อีก ${pintoDemo.nextTierPoints - points} แต้มถึง ${pintoDemo.nextTierName}`,
                      `${pintoDemo.nextTierPoints - points} pts to ${pintoDemo.nextTierName}`,
                    )}
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e3efe7]">
                  <div
                    className="h-full w-full origin-left rounded-full transition-transform duration-500"
                    style={{
                      backgroundColor: PINTO_GREEN,
                      transform: `scaleX(${points / pintoDemo.nextTierPoints})`,
                    }}
                  />
                </div>
              </div>

              <ul className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                {[
                  { icon: Coins, label: t("ประวัติแต้ม", "Points history") },
                  { icon: Ticket, label: t("คูปองของฉัน", "My vouchers") },
                  { icon: ShoppingBag, label: t("คำสั่งซื้อ", "Orders") },
                  { icon: Settings, label: t("ตั้งค่า", "Settings") },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-t border-[#eaf1ec] px-4 py-3 first:border-t-0"
                  >
                    <Icon
                      className="h-[18px] w-[18px] text-[#5c6660]"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-[13px]">{label}</span>
                    <ChevronRight
                      className="h-4 w-4 text-[#a3b0a8]"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar: home, clips, create, chats, profile */}
      <nav
        aria-label={t("เมนูแอป", "App navigation")}
        className={`${SAFE_BOTTOM} grid grid-cols-5 items-center bg-white pt-1.5 shadow-[0_-1px_0_rgba(0,0,0,0.06)]`}
      >
        <NavIcon
          icon={House}
          label={t("หน้าแรก", "Home")}
          active={currentState === "webview"}
          onClick={() => handleStateSelect("webview")}
        />
        <NavIcon icon={Clapperboard} label={t("คลิป", "Clips")} />
        <span className="grid place-items-center">
          <span
            className="grid h-11 w-11 place-items-center rounded-full text-white shadow-[0_4px_10px_-3px_rgba(35,177,77,0.6)]"
            style={{ backgroundColor: PINTO_GREEN }}
            aria-hidden="true"
          >
            <Plus className="h-6 w-6" />
          </span>
        </span>
        <NavIcon
          icon={MessagesSquare}
          label={t("แชท", "Chats")}
          active={currentState === "streak"}
          onClick={() => handleStateSelect("streak")}
        />
        <NavIcon
          icon={UserRound}
          label={t("โปรไฟล์", "Profile")}
          active={currentState === "profile"}
          onClick={() => handleStateSelect("profile")}
        />
      </nav>
    </div>
  );
};

const NavIcon: React.FC<{
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon: Icon, label, active = false, onClick }) => {
  const iconEl = (
    <Icon
      className="h-[22px] w-[22px]"
      style={{ color: active ? PINTO_GREEN : "#5c6660" }}
      fill={active ? "rgba(35,177,77,0.15)" : "none"}
      aria-hidden="true"
    />
  );
  if (!onClick) {
    return (
      <span className="grid h-11 place-items-center" aria-hidden="true">
        {iconEl}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className="grid h-11 cursor-pointer place-items-center"
    >
      {iconEl}
    </button>
  );
};

const weekdayLabels = (t: (th: string, en: string) => string) => [
  t("จ", "M"),
  t("อ", "T"),
  t("พ", "W"),
  t("พฤ", "T"),
  t("ศ", "F"),
  t("ส", "S"),
  t("อา", "S"),
];

export default PintoScreen;
