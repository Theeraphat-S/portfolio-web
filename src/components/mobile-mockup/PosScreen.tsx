import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Plus,
  Minus,
  ScanLine,
  CloudOff,
  Cloud,
  ShoppingCart,
  ReceiptText,
  Package,
  Coffee,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";
import { SAFE_BOTTOM, SAFE_TOP } from "./DeviceFrame";

interface PosScreenProps {
  direction?: number;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
  activeBeat?: number;
  /** Reports connectivity so the device status bar can mirror it. */
  onOnlineChange?: (online: boolean) => void;
}

interface PosCartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  qty: number;
}

interface QueuedOrder {
  id: string;
  total: number;
  itemCount: number;
}

const BRAND = "#006c4c";

export const PosScreen: React.FC<PosScreenProps> = ({
  onDispatchEvent,
  activeBeat,
  onOnlineChange,
}) => {
  const { t } = useLanguage();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [queuedOrders, setQueuedOrders] = useState<QueuedOrder[]>([]);
  const [justSynced, setJustSynced] = useState(0);
  const [dismissed, setDismissed] = useState<string | null>(null);

  // Adjust state when activeBeat prop changes
  const [prevBeat, setPrevBeat] = useState(activeBeat);
  if (activeBeat !== prevBeat) {
    setPrevBeat(activeBeat);
    if (activeBeat === 0) {
      setIsOnline(true);
      setIsCompleted(false);
      setJustSynced(0);
    } else if (activeBeat === 1) {
      setIsOnline(false);
      setIsCompleted(false);
      setJustSynced(0);
      setPendingSyncCount((prev) => (prev === 0 ? 1 : prev));
    } else if (activeBeat === 2) {
      // Reconnected: the queue replays and drains.
      setIsCompleted(false);
      setIsOnline(true);
      setJustSynced(Math.max(pendingSyncCount, 1));
      setPendingSyncCount(0);
      setQueuedOrders([]);
    }
  }

  useEffect(() => {
    onOnlineChange?.(isOnline);
  }, [isOnline, onOnlineChange]);

  const [cartItems, setCartItems] = useState<PosCartItem[]>([
    {
      id: "sku-1",
      name: "Premium Arabica (250g)",
      sku: "COF-8812",
      price: 250,
      qty: 1,
    },
    {
      id: "sku-2",
      name: "Ceramic Drip Tumbler",
      sku: "ACC-1044",
      price: 170,
      qty: 1,
    },
  ]);

  const totalAmount = cartItems.reduce((acc, it) => acc + it.price * it.qty, 0);
  const itemTotal = cartItems.reduce((acc, it) => acc + it.qty, 0);

  const updateItemQty = (id: string, delta: number) => {
    const updated = cartItems
      .map((it) =>
        it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it,
      )
      .filter((it) => it.qty > 0);

    setCartItems(updated);
    setIsCompleted(false);

    const newTotal = updated.reduce((acc, i) => acc + i.price * i.qty, 0);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pos-system",
        source: "PosScreen",
        type: "bloc_event",
        tag: "CART_MUTATION",
        name: "UpdateCartItemEvent",
        stateName: "CartUpdatedState",
        details: `SKU updated ➔ New Order Total: ฿${newTotal}`,
        payload: {
          itemsCount: updated.reduce((acc, i) => acc + i.qty, 0),
          totalAmount: newTotal,
        },
        latencyMs: 0.5,
      }),
    );
  };

  const handleAddSampleItem = () => {
    const existing = cartItems.find((it) => it.sku === "ACC-3021");
    if (existing) {
      updateItemQty(existing.id, 1);
      return;
    }
    setCartItems((prev) => [
      ...prev,
      {
        id: "sku-3",
        name: "Drip Filter Paper (100pcs)",
        sku: "ACC-3021",
        price: 80,
        qty: 1,
      },
    ]);
    setIsCompleted(false);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pos-system",
        source: "PosScreen",
        type: "bloc_event",
        tag: "BARCODE_SCAN",
        name: "BarcodeScannedEvent(ACC-3021)",
        stateName: "ProductCatalogLoadedState",
        details: `Item resolved via local SQLite Cache: ฿80.00`,
        payload: {
          sku: "ACC-3021",
          price: 80,
          cacheHit: true,
        },
        latencyMs: 0.3,
      }),
    );
  };

  const handleFlushQueue = () => {
    setIsOnline(true);
    const count = pendingSyncCount;
    const ordersToSync = [...queuedOrders];
    setPendingSyncCount(0);
    setQueuedOrders([]);
    setJustSynced(count);
    setDismissed(null);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pos-system",
        source: "PosScreen",
        type: "sqlite_queue",
        tag: "QUEUE_FLUSH",
        name: "IdempotentSyncQueue::FlushPending",
        stateName: "BatchReconciledState",
        details: `Replayed ${count} queued transactions; the server drops duplicate UUIDs.`,
        payload: {
          flushedCount: count,
          syncedOrders: ordersToSync,
          strategy: "IDEMPOTENT_RETRY_BACKOFF",
        },
        latencyMs: 12.4,
      }),
    );
  };

  const toggleNetwork = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    setJustSynced(0);

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pos-system",
        source: "PosScreen",
        type: "telemetry",
        tag: nextState ? "NET_ONLINE" : "NET_OFFLINE",
        name: nextState ? "NetworkRestoredEvent" : "NetworkDroppedEvent",
        stateName: nextState
          ? "NetworkConnectedState"
          : "OfflineModeActiveState",
        details: nextState
          ? `Network active. Replaying the local queue.`
          : `Network disconnected. New transactions go to the local SQLite queue.`,
        payload: {
          isOnline: nextState,
          storage: "sqlite_queue",
        },
        latencyMs: 0.6,
      }),
    );

    if (nextState && pendingSyncCount > 0) {
      handleFlushQueue();
    }
  };

  const handleCommitCheckout = () => {
    setIsCompleted(true);
    setDismissed(null);
    setJustSynced(0);
    const txId = `uuid_tx_${Math.random().toString(36).substring(2, 8)}`;

    let nextQueue = queuedOrders;
    if (!isOnline) {
      nextQueue = [
        ...queuedOrders,
        { id: txId, total: totalAmount, itemCount: itemTotal },
      ];
      setQueuedOrders(nextQueue);
      setPendingSyncCount((prev) => prev + 1);
    }

    onDispatchEvent?.(
      createStreamEvent({
        projectId: "pos-system",
        source: "PosScreen",
        type: isOnline ? "bloc_event" : "sqlite_queue",
        tag: isOnline ? "HTTP_COMMIT" : "SQLITE_QUEUE",
        name: isOnline ? "CommitTransactionEvent" : "EnqueueOfflineTransaction",
        stateName: isOnline
          ? "TransactionCommittedState"
          : "OfflineEnqueuedState",
        details: isOnline
          ? `Idempotency UUID: ${txId} ➔ 200 OK via REST API (฿${totalAmount})`
          : `No connection. Enqueued in SQLite queue (Pending Sync: ${
              pendingSyncCount + 1
            })`,
        payload: {
          idempotencyKey: txId,
          total: totalAmount,
          itemCount: itemTotal,
          queuedOrders: isOnline ? undefined : nextQueue,
        },
        latencyMs: isOnline ? 1.8 : 0.4,
      }),
    );
  };

  const snackbar = isCompleted
    ? isOnline
      ? t("ชำระเงินแล้ว · ส่งเข้าระบบแล้ว", "Paid · sent to server")
      : t(
          `บันทึกไว้ในเครื่อง · รอส่ง ${pendingSyncCount} รายการ`,
          `Saved on device · ${pendingSyncCount} waiting to sync`,
        )
    : justSynced > 0
      ? t(
          `กลับมาออนไลน์ · ส่ง ${justSynced} ออเดอร์แล้ว`,
          `Back online · ${justSynced} order(s) synced`,
        )
      : null;

  // Snackbars dismiss themselves, as in Material.
  useEffect(() => {
    if (!snackbar) return;
    const id = window.setTimeout(() => setDismissed(snackbar), 2600);
    return () => window.clearTimeout(id);
  }, [snackbar]);
  const visibleSnackbar = snackbar && snackbar !== dismissed ? snackbar : null;

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f4f8f6] text-[#191d1b] font-sans select-none">
      {/* App bar */}
      <header
        className={`${SAFE_TOP} bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]`}
      >
        <div className="flex h-12 items-center gap-2 pl-4 pr-2">
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[15px] font-semibold">
              {t("ขายหน้าร้าน", "Checkout")}
            </p>
            <p className="truncate text-[11px] text-[#57615b]">
              {t("สาขานิมมาน · เครื่อง 04", "Nimman branch · Till 04")}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleNetwork}
            aria-label={t(
              "จำลองเปิด/ปิดอินเทอร์เน็ต",
              "Simulate going online or offline",
            )}
            title={t("แตะเพื่อจำลองออฟไลน์", "Tap to simulate offline")}
            className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-colors ${
              isOnline
                ? "bg-[#e1f3e7] text-[#17663a]"
                : "bg-[#fff0d1] text-[#7a4b00]"
            }`}
          >
            {isOnline ? (
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <CloudOff className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isOnline ? t("ออนไลน์", "Online") : t("ออฟไลน์", "Offline")}
          </button>
        </div>
      </header>

      {/* Offline banner */}
      <AnimatePresence initial={false}>
        {!isOnline && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 bg-[#fff4dc] px-4 py-2 text-[11px] leading-snug text-[#5c3a00]"
          >
            <CloudOff
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>
              {t(
                "ไม่มีอินเทอร์เน็ต ขายต่อได้ตามปกติ ออเดอร์จะถูกส่งเมื่อกลับมาออนไลน์",
                "No connection. Keep selling; orders send when you're back online.",
              )}
              {pendingSyncCount > 0 && (
                <strong className="font-semibold">
                  {" "}
                  {t(
                    `(รอส่ง ${pendingSyncCount})`,
                    `(${pendingSyncCount} queued)`,
                  )}
                </strong>
              )}
            </span>
          </m.div>
        )}
      </AnimatePresence>

      <div
        data-lenis-prevent
        className="flex-1 space-y-2.5 overflow-y-auto p-3 scrollbar-none"
      >
        {/* Scan */}
        <button
          type="button"
          onClick={handleAddSampleItem}
          className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-[#d3e3da] bg-white px-3 text-[13px] text-[#57615b] hover:border-[#9fd8bd]"
        >
          <ScanLine
            className="h-[18px] w-[18px]"
            style={{ color: BRAND }}
            aria-hidden="true"
          />
          {t("สแกนบาร์โค้ดหรือค้นหาสินค้า", "Scan barcode or search")}
        </button>

        {/* Cart */}
        <ul className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          {cartItems.length === 0 && (
            <li className="px-4 py-6 text-center text-[12px] text-[#57615b]">
              {t("ยังไม่มีสินค้าในตะกร้า", "Cart is empty")}
            </li>
          )}
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 border-t border-[#e6efea] px-3 py-2.5 first:border-t-0"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#dff3ea] text-[#006c4c]">
                {item.sku.startsWith("COF") ? (
                  <Coffee className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Package className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{item.name}</p>
                <p className="text-[11px] tabular-nums text-[#57615b]">
                  ฿{item.price} × {item.qty}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[13px] font-semibold tabular-nums">
                  ฿{item.price * item.qty}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateItemQty(item.id, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-[#d3e3da] text-[#404943]"
                  >
                    <Minus className="h-3 w-3" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateItemQty(item.id, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-[#d3e3da] text-[#404943]"
                  >
                    <Plus className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between text-[12px] text-[#57615b]">
            <span>{t(`สินค้า ${itemTotal} ชิ้น`, `${itemTotal} items`)}</span>
            <span className="tabular-nums">฿{totalAmount}.00</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-[13px] font-semibold">
              {t("ยอดสุทธิ", "Total")}
            </span>
            <span
              className="text-[22px] font-bold tabular-nums"
              style={{ color: BRAND }}
            >
              ฿{totalAmount}.00
            </span>
          </div>
        </div>
      </div>

      {/* Pay */}
      <div className="relative px-3 pb-2 pt-1">
        <AnimatePresence>
          {visibleSnackbar && (
            <m.div
              key={visibleSnackbar}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              role="status"
              className="absolute inset-x-3 bottom-full mb-2 flex items-center gap-2 rounded-lg bg-[#303036] px-3 py-2.5 text-[12px] text-[#f2f0f7] shadow-lg"
            >
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-[#8fe0ad]"
                aria-hidden="true"
              />
              {visibleSnackbar}
            </m.div>
          )}
        </AnimatePresence>
        <m.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleCommitCheckout}
          disabled={cartItems.length === 0}
          className="flex h-12 w-full cursor-pointer items-center justify-between rounded-full px-5 text-white transition-opacity disabled:cursor-default disabled:opacity-40"
          style={{ backgroundColor: BRAND }}
        >
          <span className="text-[14px] font-semibold">
            {t("ชำระเงิน", "Charge")}
          </span>
          <span className="text-[15px] font-bold tabular-nums">
            ฿{totalAmount}
          </span>
        </m.button>
      </div>

      {/* Navigation bar */}
      <nav
        aria-label={t("เมนูแอป", "App navigation")}
        className={`${SAFE_BOTTOM} grid grid-cols-3 border-t border-[#e6efea] bg-white pt-2`}
      >
        {[
          { id: "sell", icon: ShoppingCart, label: t("ขาย", "Sell") },
          { id: "orders", icon: ReceiptText, label: t("ออเดอร์", "Orders") },
          { id: "stock", icon: Package, label: t("สินค้า", "Products") },
        ].map(({ id, icon: Icon, label }) => {
          const active = id === "sell";
          return (
            <span
              key={id}
              className="flex flex-col items-center gap-1 text-[11px]"
            >
              <span
                className={`relative grid h-7 w-14 place-items-center rounded-full ${
                  active ? "bg-[#c4eed8] text-[#002114]" : "text-[#57615b]"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                {id === "orders" && pendingSyncCount > 0 && (
                  <span className="absolute right-2.5 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#ba1a1a] px-1 text-[9px] font-bold text-white">
                    {pendingSyncCount}
                  </span>
                )}
              </span>
              <span
                className={
                  active ? "font-semibold text-[#191d1b]" : "text-[#57615b]"
                }
              >
                {label}
              </span>
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default PosScreen;
