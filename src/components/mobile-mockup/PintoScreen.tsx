import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  RefreshCw,
  Gift,
  ExternalLink,
  Wifi,
  Battery,
  Phone,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  RoutingIcon,
  FlameStreakIcon,
  CodeBridgeIcon,
  ShoppingBagIcon,
} from "../icons/Iconsax";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";

export type PintoState = "tracking" | "streak" | "webview";

interface PintoScreenProps {
  direction?: number;
  activeState?: PintoState;
  onStateChange?: (state: PintoState) => void;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
}

export const PintoScreen: React.FC<PintoScreenProps> = ({
  activeState: controlledState,
  onStateChange,
  onDispatchEvent,
}) => {
  const { t } = useLanguage();
  const [internalState, setInternalState] = useState<PintoState>("tracking");
  const currentState = controlledState ?? internalState;

  const handleStateSelect = (state: PintoState) => {
    if (onStateChange) {
      onStateChange(state);
    } else {
      setInternalState(state);
    }

    if (onDispatchEvent) {
      onDispatchEvent(
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
    }
  };

  // State 1: Tracking State
  const [courierDistance, setCourierDistance] = useState(1.4);
  const [isCourierNearby, setIsCourierNearby] = useState(false);

  // State 2: Streak State
  const [streakCount, setStreakCount] = useState(7);
  const [isStreaked, setIsStreaked] = useState(false);

  // State 3: WebView State
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Bento Salmon Teriyaki", price: 189, qty: 1 },
    { id: 2, name: "Cold Brew Arabica", price: 85, qty: 1 },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const updateQty = (id: number, delta: number) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(0, item.qty + delta) }
          : item,
      )
      .filter((item) => item.qty > 0);

    setCartItems(updated);

    const newTotal = updated.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "pinto-app",
          source: "PintoScreen",
          type: "bridge_call",
          tag: "JS_BRIDGE",
          name: "JavascriptChannel::postMessage",
          stateName: "CartSyncedState",
          details: `Payload: { action: 'UPDATE_QTY', id: ${id}, delta: ${delta} } ➔ Synced Total: ฿${newTotal}`,
          payload: {
            bridgeName: "FlutterNativeBridge",
            cartTotal: newTotal,
            itemCount: updated.reduce((acc, it) => acc + it.qty, 0),
          },
          latencyMs: 0.4,
        }),
      );
    }
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
      colors: ["#f59e0b", "#00f0ff", "#38bdf8", "#10b981"],
      disableForReducedMotion: true,
      zIndex: 2000,
      scalar: 0.85,
    });

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "pinto-app",
          source: "PintoScreen",
          type: "bloc_event",
          tag: "BLoC::Event",
          name: "ClaimDailyStreakEvent",
          stateName: "StreakClaimedState",
          details: `Day ${newCount} active (+50 PTS) ➔ State: StreakClaimedState(VoucherUnlocked: true)`,
          payload: {
            streakDays: newCount,
            pointsEarned: 50,
            profileTier: "Gold (1,500 PTS)",
            unlockedVoucher: "฿50 Logistics Discount",
          },
          latencyMs: 0.9,
        }),
      );
    }
  };

  const handleRefreshSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 700);

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "pinto-app",
          source: "PintoScreen",
          type: "bridge_call",
          tag: "BRIDGE_SYNC",
          name: "WebView::ReloadAndResync",
          stateName: "CatalogResyncedState",
          details: `Synchronized HTML5 merchant catalog with Flutter Native Cart State`,
          latencyMs: 0.6,
        }),
      );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#07090e] text-zinc-100 select-none">
      {/* 1. Status Bar */}
      <div className="px-5 pt-3 pb-1.5 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/[0.04] bg-[#090c13]">
        <span className="font-semibold text-zinc-200">09:41</span>
        <div className="w-16 h-3.5 bg-black rounded-full border border-white/[0.08] flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="w-1 h-1 rounded-full bg-[#00f0ff] animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Wifi className="w-3 h-3 text-zinc-300" />
          <Battery className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* 2. Production Flutter App Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/[0.06] bg-[#0a0e16]/95 backdrop-blur-md">
        <div>
          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase block">
            FAKDUAY LOGISTICS &bull; PROD
          </span>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Pinto Mobile</span>
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#00f0ff]/10 text-[#00f0ff] font-mono border border-[#00f0ff]/20">
              BLoC V8
            </span>
          </h4>
        </div>

        {/* Live WS Telemetry */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono bg-black/40 px-2 py-1 rounded-md border border-white/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">LIVE WS</span>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-[#00f0ff]">24ms</span>
        </div>
      </div>

      {/* 3. Screen Body with Smooth Animated Transition */}
      <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
        {/* Preset Bar */}
        <div className="mb-2 flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.06] text-[9px] font-mono overflow-x-auto">
          <span className="text-zinc-500 uppercase px-1 shrink-0">SCENARIOS:</span>
          <button
            type="button"
            onClick={() => {
              handleStateSelect("tracking");
              setCourierDistance(0.2);
              setIsCourierNearby(true);
            }}
            className="px-2 py-0.5 rounded bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🛵 Courier Arrived
          </button>
          <button
            type="button"
            onClick={() => {
              handleStateSelect("streak");
              triggerStreakClaim();
            }}
            className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🔥 Streak Check-in
          </button>
          <button
            type="button"
            onClick={() => {
              handleStateSelect("webview");
              handleRefreshSync();
            }}
            className="px-2 py-0.5 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 transition-colors shrink-0 cursor-pointer"
          >
            🌐 Sync Bridge
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: LIVE ORDER TRACKING */}
          {currentState === "tracking" && (
            <motion.div
              key="state-tracking"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 flex-1 flex flex-col justify-between"
            >
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0e1624] to-[#0a0f19] border border-white/[0.08] shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      {isCourierNearby ? "COURIER ARRIVED" : "COURIER EN ROUTE"}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/[0.06]">
                    ORDER #FD-8942
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase block">
                      Estimated Arrival
                    </span>
                    <span className="text-base font-bold font-mono text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                      {isCourierNearby ? "Arriving Now" : "12:45 PM"}
                      <span className="text-[10px] text-zinc-400 font-normal">
                        ({isCourierNearby ? "< 1 min" : "14 mins"})
                      </span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-[#00f0ff] block font-bold">
                      {courierDistance} km away
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      BLoC: InTransit
                    </span>
                  </div>
                </div>
              </div>

              {/* Simulated GPS Route */}
              <div className="relative p-3 rounded-xl bg-black/40 border border-white/[0.06] overflow-hidden space-y-2.5">
                <div className="flex items-start gap-2.5 relative">
                  <div className="flex flex-col items-center pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-500" />
                    <div className="w-0.5 h-7 bg-gradient-to-b from-zinc-500 to-[#00f0ff]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] ring-2 ring-[#00f0ff]/30 animate-pulse" />
                  </div>
                  <div className="space-y-2 text-[10px] font-mono flex-1">
                    <div>
                      <span className="text-zinc-400 text-[8px] uppercase tracking-wider block">
                        PICKUP
                      </span>
                      <p className="text-zinc-200 font-semibold truncate">
                        Bento Kitchen Nimman Soi 9
                      </p>
                    </div>
                    <div>
                      <span className="text-[#00f0ff] text-[8px] uppercase tracking-wider block">
                        DESTINATION
                      </span>
                      <p className="text-white font-semibold truncate">
                        Faculty of Science, MJU
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <RoutingIcon size={12} color="#00f0ff" animated />
                    Speed: 38 km/h
                  </span>
                  <span>Accuracy: High (&plusmn;3m)</span>
                </div>
              </div>

              {/* Courier Profile & Communication Card */}
              <div className="p-2.5 rounded-xl bg-[#0c1017] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[10px] font-bold text-[#00f0ff] font-mono">
                    SK
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">
                      Somchai K.
                    </p>
                    <p className="text-[9px] font-mono text-zinc-400">
                      Honda Wave &bull; &#9733; 4.9 (420+ rides)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (onDispatchEvent) {
                        onDispatchEvent(
                          createStreamEvent({
                            projectId: "pinto-app",
                            source: "PintoScreen",
                            type: "bloc_event",
                            tag: "COMM_CHANNEL",
                            name: "TriggerVoipCallEvent(Somchai)",
                            stateName: "DriverCallInitiatedState",
                            details: `Encrypted in-app driver communication channel initiated`,
                            latencyMs: 1.4,
                          }),
                        );
                      }
                    }}
                    aria-label="Call Courier"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] cursor-pointer"
                    title="Call Courier"
                  >
                    <Phone className="w-3 h-3 text-[#00f0ff]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (onDispatchEvent) {
                        onDispatchEvent(
                          createStreamEvent({
                            projectId: "pinto-app",
                            source: "PintoScreen",
                            type: "bloc_event",
                            tag: "COMM_CHANNEL",
                            name: "OpenDriverChatStreamEvent",
                            stateName: "ChatTunnelConnectedState",
                            details: `Websocket chat tunnel established with courier telemetry`,
                            latencyMs: 0.8,
                          }),
                        );
                      }
                    }}
                    aria-label="Chat with Courier"
                    className="p-1.5 rounded-lg bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/30 cursor-pointer"
                    title="Chat with Courier"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: GAMIFIED CHAT STREAKS */}
          {currentState === "streak" && (
            <motion.div
              key="state-streak"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 flex-1 flex flex-col justify-between"
            >
              <div className="rounded-xl bg-gradient-to-br from-amber-950/30 via-[#10141e] to-[#0c1017] border border-amber-500/25 p-3 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                      <FlameStreakIcon size={16} color="#f59e0b" animated />
                    </span>
                    <div>
                      <span className="text-[9px] font-mono text-amber-300/80 uppercase block tracking-wider">
                        {t("สถิติแชทต่อเนื่อง BLoC", "Streak Engine")}
                      </span>
                      <h5 className="text-xs font-bold text-white">
                        {t("Chat Streaks สะสมแต้ม", "Daily Chat Streaks")}
                      </h5>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-amber-400">
                      {streakCount}{" "}
                      <span className="text-[9px] font-normal text-zinc-400">
                        {t("วัน", "Days")}
                      </span>
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-300 mb-2 leading-relaxed">
                  {t(
                    "แชทสั่งสินค้าต่อเนื่องเพื่อปลดล็อก Voucher และเพิ่มอันดับโปรไฟล์",
                    "Keep messaging daily to preserve streak and unlock exclusive VIP vouchers.",
                  )}
                </p>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={triggerStreakClaim}
                  aria-label="Claim daily streak"
                  className={`w-full py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                    isStreaked
                      ? "bg-zinc-800 text-[#00f0ff] border border-[#00f0ff]/30"
                      : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 shadow-amber-950/40"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  {isStreaked
                    ? t(`เช็คอินสำเร็จ (${streakCount} วัน)`, `Claimed! ${streakCount} Days Active`)
                    : t("กดรับแต้มวันนี้ (+50 PTS)", "Claim Daily Streak (+50 Pts)")}
                </motion.button>
              </div>

              {/* 7-Day Timeline */}
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                  {t("บันทึก 7 วันล่าสุด", "7-Day Streak Timeline")}
                </span>
                <div className="grid grid-cols-7 gap-1 text-center font-mono">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, dIdx) => {
                    const isPassed = dIdx < 6;
                    const isToday = dIdx === 6;
                    return (
                      <div
                        key={dIdx}
                        className={`py-1 px-0.5 rounded-md border min-w-0 flex flex-col items-center gap-0.5 ${
                          isToday
                            ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                            : isPassed
                              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
                              : "bg-zinc-900 border-zinc-800 text-zinc-600"
                        }`}
                      >
                        <span className="text-[8px]">{day}</span>
                        {isPassed ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        ) : isToday ? (
                          <FlameStreakIcon size={10} color="#f59e0b" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Profile API Points & Tier */}
              <div className="p-2.5 rounded-xl bg-[#0c1017] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[10px] font-bold text-[#00f0ff] font-mono">
                    TS
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase block">
                      Profile API &bull; Gold
                    </span>
                    <span className="text-xs font-bold font-mono text-white">
                      {1450 + (isStreaked ? 50 : 0)}{" "}
                      <span className="text-[9px] text-[#00f0ff]">PTS</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-amber-400/90 block">
                    {500 - (isStreaked ? 50 : 0)} pts to Platinum
                  </span>
                  <div className="w-20 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <div className="w-[76%] h-full bg-gradient-to-r from-[#00f0ff] to-amber-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Unlocked Reward Voucher */}
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-400">
                    <Gift className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-200">
                      {t("ส่วนลดจัดส่ง ฿50", "฿50 Logistics Discount")}
                    </p>
                    <p className="text-[8px] font-mono text-zinc-400">
                      Streak reward &bull; Valid 5 days
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                  APPLY
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: HYBRID WEBVIEW */}
          {currentState === "webview" && (
            <motion.div
              key="state-webview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 flex-1 flex flex-col justify-between"
            >
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-between text-[9px] font-mono">
                <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-zinc-300 font-medium truncate">
                    bridge://merchant.fakduay.com/catalog
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRefreshSync}
                  aria-label="Resync WebView Bridge"
                  className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                  title="Resync Bridge"
                >
                  <RefreshCw
                    className={`w-2.5 h-2.5 ${isSyncing ? "animate-spin text-[#00f0ff]" : ""}`}
                  />
                </button>
              </div>

              <div className="px-2.5 py-1.5 rounded-md bg-[#00f0ff]/10 border border-[#00f0ff]/25 flex items-center justify-between text-[9px] font-mono">
                <span className="text-[#00f0ff] flex items-center gap-1.5">
                  <CodeBridgeIcon size={12} color="#00f0ff" />
                  JS &lt;-&gt; Flutter Bridge: Active
                </span>
                <span className="text-emerald-400 font-bold">
                  0.4ms Latency
                </span>
              </div>

              {/* Dynamic Items */}
              <div className="space-y-1.5">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">
                  {t("เมนูร้านค้าแบบไดนามิก (HTML5 Web)", "HTML5 Dynamic Menu")}
                </span>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] font-semibold text-zinc-200">
                        {item.name}
                      </p>
                      <p className="text-[8px] font-mono text-zinc-400">
                        ฿{item.price} &bull; Synced with Native Cart
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-[9px] text-white bg-black/60 px-1.5 py-0.5 rounded font-bold min-w-[18px] text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="p-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] hover:bg-[#00f0ff]/30 cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Native Checkout Bar */}
              <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-white/[0.08] flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="relative p-1.5 rounded-md bg-[#00f0ff]/15 text-[#00f0ff]">
                    <ShoppingBagIcon size={14} color="#00f0ff" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00f0ff] text-[8px] font-bold text-black flex items-center justify-center font-mono">
                      {cartCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-400 block uppercase">
                      Bridge Subtotal
                    </span>
                    <span className="text-xs font-bold font-mono text-white">
                      ฿{cartTotal}.00
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[8px] font-mono font-bold text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded border border-[#00f0ff]/30">
                  <span>SYNC STATE</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Realistic Flutter Bottom Navigation Bar */}
      <div className="px-3 pt-2 pb-1.5 border-t border-white/[0.06] bg-[#090c13] flex flex-col items-center">
        <div className="w-full grid grid-cols-3 text-center font-mono">
          <button
            type="button"
            onClick={() => handleStateSelect("tracking")}
            className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
              currentState === "tracking"
                ? "text-[#00f0ff] font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <RoutingIcon size={14} color={currentState === "tracking" ? "#00f0ff" : "#71717a"} />
            <span className="text-[8px] tracking-wider uppercase">
              TRACKING
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStateSelect("streak")}
            className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
              currentState === "streak"
                ? "text-amber-400 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FlameStreakIcon size={14} color={currentState === "streak" ? "#f59e0b" : "#71717a"} />
            <span className="text-[8px] tracking-wider uppercase">STREAKS</span>
          </button>

          <button
            type="button"
            onClick={() => handleStateSelect("webview")}
            className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
              currentState === "webview"
                ? "text-[#00f0ff] font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <CodeBridgeIcon size={14} color={currentState === "webview" ? "#00f0ff" : "#71717a"} />
            <span className="text-[8px] tracking-wider uppercase">WEBVIEW</span>
          </button>
        </div>
        <div className="w-20 h-1 bg-white/20 rounded-full mt-1.5 mb-0.5" />
      </div>
    </div>
  );
};

export default PintoScreen;
