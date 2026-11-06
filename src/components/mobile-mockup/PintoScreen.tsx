import React, { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Check,
  RotateCw,
  Ticket,
  Flame,
  UserRound,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Coins,
  Settings,
  Globe,
  Lock,
  MoreVertical,
  House,
  Clapperboard,
  Plus,
  MessagesSquare,
  Soup,
  Salad,
  CupSoda,
  IceCreamCone,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";
import { useTransientFlag } from "../../hooks/useTransientFlag";
import { SAFE_BOTTOM, SAFE_TOP } from "./DeviceFrame";
import { pintoDemo } from "../../data/deviceDemos";
import { PintoMenuItem, PintoMenuVisual } from "../../types/portfolio";

export type PintoState = "webview" | "streak" | "profile";

interface PintoScreenProps {
  direction?: number;
  activeState?: PintoState;
  onStateChange?: (state: PintoState) => void;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
}

// Pinto brand green, matched to the production app. Fills only: text
// on white uses --color-pinto-green-text, text on this fill uses
// --color-pinto-on-green, so both clear 4.5:1.
const PINTO_GREEN = "#23b14d";

// Illustrative dish tiles: menu items carry a visual key, not photos.
const MENU_VISUAL: Record<PintoMenuVisual, { icon: LucideIcon; tile: string }> =
  {
    noodles: {
      icon: Soup,
      tile: "bg-pinto-tile-noodles text-pinto-tile-noodles-ink",
    },
    salad: {
      icon: Salad,
      tile: "bg-pinto-tile-salad text-pinto-tile-salad-ink",
    },
    drink: {
      icon: CupSoda,
      tile: "bg-pinto-tile-drink text-pinto-tile-drink-ink",
    },
    dessert: {
      icon: IceCreamCone,
      tile: "bg-pinto-tile-dessert text-pinto-tile-dessert-ink",
    },
  };

const { menu } = pintoDemo;
const menuPrice = new Map(menu.items.map((item) => [item.id, item.price]));
const cartSummary = (cart: Record<string, number>) =>
  Object.entries(cart).reduce(
    (acc, [id, qty]) => ({
      count: acc.count + qty,
      total: acc.total + qty * (menuPrice.get(id) ?? 0),
    }),
    { count: 0, total: 0 },
  );

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

  const shouldReduceMotion = useReducedMotion();
  const [isProfileRefreshing, flashProfileRefreshing] = useTransientFlag(700);
  // Beat 3 shows the streak already written to the profile, so a reader
  // who lands there without tapping still sees the synced points.
  const [isStreaked, setIsStreaked] = useState(currentState === "profile");
  const [cart, setCart] = useState<Record<string, number>>(menu.startingCart);
  const streakCount = pintoDemo.startingStreakDays + (isStreaked ? 1 : 0);
  const points =
    pintoDemo.startingPoints + (isStreaked ? pintoDemo.streakRewardPoints : 0);
  const { count: cartCount, total: cartTotal } = cartSummary(cart);

  // Adjust state when the screen changes: returning to the menu starts
  // from the demo cart again; reaching the profile applies today's streak.
  const [prevState, setPrevState] = useState(currentState);
  if (currentState !== prevState) {
    setPrevState(currentState);
    if (currentState === "webview") {
      setCart(menu.startingCart);
    } else if (currentState === "profile") {
      setIsStreaked(true);
    }
  }

  // Illustrative bridge call: the add button lives in the web menu, and a
  // message over the JavaScript channel keeps the native cart in step.
  const addToCart = (item: PintoMenuItem) => {
    const qty = (cart[item.id] ?? 0) + 1;
    const next = { ...cart, [item.id]: qty };
    const summary = cartSummary(next);
    setCart(next);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pinto-app",
        source: "PintoScreen",
        type: "bridge_call",
        tag: "JS_BRIDGE",
        name: "AddToCartEvent",
        stateName: "CartUpdatedState",
        details: `WebView postMessage { action: 'ADD_TO_CART', itemId: '${item.id}' } ➔ native cart: ${summary.count} items · ฿${summary.total}`,
        payload: {
          bridgeName: "FlutterNativeBridge",
          itemId: item.id,
          qty,
          cartItems: summary.count,
          cartTotal: summary.total,
        },
        latencyMs: 0.4,
      }),
    );
  };

  const triggerStreakClaim = (e?: React.MouseEvent) => {
    if (isStreaked) return;
    const newCount = streakCount + 1;
    setIsStreaked(true);

    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.5;

    // Loaded on the first claim, not with the page.
    void import("canvas-confetti").then(({ default: confetti }) =>
      confetti({
        particleCount: 36,
        spread: 60,
        origin: { x, y },
        colors: [PINTO_GREEN, "#ffc84a", "#bfeccf", "#2e9d5b"],
        disableForReducedMotion: true,
        zIndex: 2000,
        scalar: 0.85,
      }),
    );

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
    "grid h-9 w-9 place-items-center rounded-full text-pinto-icon cursor-pointer hover:bg-black/5";

  return (
    <div className="absolute inset-0 flex flex-col bg-pinto-surface text-pinto-on-surface font-sans select-none">
      {/* Native Flutter app bar */}
      <header className={`${SAFE_TOP} bg-white`}>
        {currentState === "webview" ? (
          <>
            <div className="flex h-12 items-center gap-1 pl-1.5 pr-1.5">
              <span className={iconButton} aria-hidden="true">
                <ChevronLeft className="h-[22px] w-[22px]" />
              </span>
              <p className="min-w-0 flex-1 truncate text-[16px] font-semibold">
                {t(menu.store.th, menu.store.en)}
              </p>
              <span className={iconButton} aria-hidden="true">
                <MoreVertical className="h-[19px] w-[19px]" />
              </span>
            </div>

            {/* WebView chrome: where native ends and the web menu begins */}
            <div className="flex h-7 items-center gap-1.5 border-y border-pinto-outline bg-pinto-surface px-3 text-[10px] text-pinto-on-surface-variant">
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-1.5 py-px font-semibold text-pinto-icon">
                <Globe className="h-3 w-3" aria-hidden="true" />
                WebView
              </span>
              <Lock className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate font-mono">{menu.path}</span>
            </div>
          </>
        ) : (
          <div className="flex h-12 items-center gap-2 border-b border-pinto-outline pl-4 pr-1.5">
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
              className="min-h-full bg-white px-4 pb-3 pt-3"
            >
              {/* Web content inside the WebView: the store's existing menu */}
              <h3 className="text-[13px] font-bold">
                {t(menu.sections.popular.th, menu.sections.popular.en)}
              </h3>
              <ul className="mt-1">
                {menu.items.map((item) => {
                  const qty = cart[item.id] ?? 0;
                  const name = t(item.name.th, item.name.en);
                  const { icon: Icon, tile } = MENU_VISUAL[item.visual];
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 border-b border-pinto-outline-soft py-2.5 last:border-b-0"
                    >
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${tile}`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium leading-normal">
                          {name}
                        </p>
                        <p className="text-[12px] leading-normal text-pinto-on-surface-variant tabular-nums">
                          ฿{item.price}
                        </p>
                      </div>
                      <span
                        className="w-5 text-right text-[12px] font-semibold text-pinto-green-text tabular-nums"
                        aria-hidden="true"
                      >
                        {qty > 0 ? `×${qty}` : ""}
                      </span>
                      <m.button
                        type="button"
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.9 }
                        }
                        onClick={() => addToCart(item)}
                        aria-label={`${t("เพิ่มลงตะกร้า", "Add to cart")}: ${name}`}
                        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-pinto-green-text text-pinto-green-text transition-colors hover:bg-pinto-green-50"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </m.button>
                    </li>
                  );
                })}
              </ul>
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
              <div className="rounded-3xl bg-gradient-to-b from-pinto-green-50 to-white p-4 text-center shadow-app-card">
                <span
                  className="mx-auto grid h-14 w-14 place-items-center rounded-full"
                  style={{ backgroundColor: "var(--color-pinto-green-100)" }}
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
                <p className="mt-1 text-[13px] text-pinto-on-surface-variant">
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
                              : "border border-dashed border-pinto-green-300"
                          }`}
                          style={
                            done ? { backgroundColor: PINTO_GREEN } : undefined
                          }
                        >
                          {done && (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </span>
                        <span className="text-[10px] text-pinto-on-surface-variant">
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
                      ? "cursor-default bg-pinto-green-wash text-pinto-on-surface-variant"
                      : "cursor-pointer text-pinto-on-green"
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
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-pinto-green-200 bg-white p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pinto-green-50">
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
                  <p className="text-[11px] text-pinto-on-surface-variant">
                    {t(pintoDemo.voucher.note.th, pintoDemo.voucher.note.en)}
                  </p>
                </div>
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-pinto-green-text)" }}
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
              <div className="rounded-3xl bg-white p-4 shadow-app-card">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-[15px] font-semibold text-pinto-on-green"
                    style={{ backgroundColor: PINTO_GREEN }}
                  >
                    P
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold">
                      {t("สมาชิก Pinto", "Pinto member")}
                    </p>
                    <span className="mt-0.5 inline-block rounded-full bg-pinto-amber-50 px-2 py-0.5 text-[11px] font-semibold text-pinto-amber-text">
                      {pintoDemo.tierName}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-pinto-on-surface-variant">
                      {t("แต้มสะสม", "Points")}
                    </p>
                    <p className="text-[24px] font-bold leading-tight tabular-nums">
                      {points.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[11px] text-pinto-on-surface-variant tabular-nums">
                    {t(
                      `อีก ${pintoDemo.nextTierPoints - points} แต้มถึง ${pintoDemo.nextTierName}`,
                      `${pintoDemo.nextTierPoints - points} pts to ${pintoDemo.nextTierName}`,
                    )}
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-pinto-track">
                  <div
                    className="h-full w-full origin-left rounded-full transition-transform duration-500"
                    style={{
                      backgroundColor: PINTO_GREEN,
                      transform: `scaleX(${points / pintoDemo.nextTierPoints})`,
                    }}
                  />
                </div>
                <p className="mt-3 flex min-h-[18px] items-center gap-1.5 text-[11px] leading-normal text-pinto-green-text">
                  <Flame className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {isStreaked
                    ? t(
                        `สตรีควันที่ ${streakCount} · +${pintoDemo.streakRewardPoints} แต้มเข้าโปรไฟล์แล้ว`,
                        `Day ${streakCount} streak · +${pintoDemo.streakRewardPoints} pts added`,
                      )
                    : t(
                        `สตรีค ${streakCount} วัน · เช็คอินวันนี้เพื่อรับแต้ม`,
                        `${streakCount}-day streak · check in today for points`,
                      )}
                </p>
              </div>

              <ul className="overflow-hidden rounded-2xl bg-white shadow-app-card">
                {[
                  { icon: Coins, label: t("ประวัติแต้ม", "Points history") },
                  { icon: Ticket, label: t("คูปองของฉัน", "My vouchers") },
                  { icon: ShoppingBag, label: t("คำสั่งซื้อ", "Orders") },
                  { icon: Settings, label: t("ตั้งค่า", "Settings") },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-t border-pinto-outline-soft px-4 py-3 first:border-t-0"
                  >
                    <Icon
                      className="h-[18px] w-[18px] text-pinto-on-surface-variant"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-[13px]">{label}</span>
                    <ChevronRight
                      className="h-4 w-4 text-pinto-chevron"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Native Flutter cart, outside the WebView: it reads the same cart
          state the web menu writes through the bridge. */}
      {currentState === "webview" && (
        <div className="border-t border-pinto-outline bg-white px-3 py-2">
          <div
            className="flex h-11 items-center gap-3 rounded-full pl-3 pr-4 text-pinto-on-green"
            style={{ backgroundColor: PINTO_GREEN }}
          >
            <span className="relative grid h-7 w-7 shrink-0 place-items-center">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <m.span
                key={cartCount}
                initial={shouldReduceMotion ? false : { scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="absolute -right-1 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-pinto-green-text tabular-nums"
              >
                {cartCount}
              </m.span>
            </span>
            <p
              className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-normal"
              aria-live="polite"
            >
              {t(`ตะกร้า ${cartCount} รายการ`, `Cart · ${cartCount} items`)}
            </p>
            <span className="text-[14px] font-bold tabular-nums">
              ฿{cartTotal}
            </span>
          </div>
        </div>
      )}

      {/* Bottom bar: home, clips, create, chats, profile */}
      <nav
        aria-label={t("เมนูแอป", "App navigation")}
        className={`${SAFE_BOTTOM} grid grid-cols-5 items-center bg-white pt-1.5 shadow-app-nav`}
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
            className="grid h-11 w-11 place-items-center rounded-full text-white shadow-pinto-fab"
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
      style={{
        color: active ? PINTO_GREEN : "var(--color-pinto-on-surface-variant)",
      }}
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
