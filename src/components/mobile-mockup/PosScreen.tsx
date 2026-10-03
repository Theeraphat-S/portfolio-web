import React, { useState } from "react";
import { motion } from "motion/react";
import { QrCode, CheckCircle2, Wifi, Battery, Plus, Minus } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  PosRegisterIcon,
  ReceiptTextIcon,
  DatabaseSyncIcon,
  WifiOfflineIcon,
} from "../icons/Iconsax";
import { BLoCStreamEvent } from "../../types/stream";
import { createStreamEvent } from "../../lib/streamUtils";

interface PosScreenProps {
  direction?: number;
  onDispatchEvent?: (event: BLoCStreamEvent) => void;
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

export const PosScreen: React.FC<PosScreenProps> = ({ onDispatchEvent }) => {
  const { t } = useLanguage();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [queuedOrders, setQueuedOrders] = useState<QueuedOrder[]>([]);

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

  const updateItemQty = (id: string, delta: number) => {
    const updated = cartItems
      .map((it) =>
        it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it,
      )
      .filter((it) => it.qty > 0);

    setCartItems(updated);
    setIsCompleted(false);

    const newTotal = updated.reduce((acc, i) => acc + i.price * i.qty, 0);

    if (onDispatchEvent) {
      onDispatchEvent(
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
    }
  };

  const handleAddSampleItem = () => {
    const filterItem: PosCartItem = {
      id: `sku-item-${cartItems.length + 1}`,
      name: "Drip Filter Paper (100pcs)",
      sku: "ACC-3021",
      price: 80,
      qty: 1,
    };
    setCartItems((prev) => [...prev, filterItem]);
    setIsCompleted(false);

    if (onDispatchEvent) {
      onDispatchEvent(
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
    }
  };

  const toggleNetwork = (override?: boolean) => {
    const nextState = override !== undefined ? override : !isOnline;
    setIsOnline(nextState);

    if (onDispatchEvent) {
      onDispatchEvent(
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
            ? `Network active. Triggering idempotent background retry queue flush.`
            : `Network disconnected. Switching to local SQLite Write-Ahead Logging (WAL).`,
          payload: {
            isOnline: nextState,
            protocol: "WAL_JOURNAL",
          },
          latencyMs: 0.6,
        }),
      );
    }

    if (nextState && pendingSyncCount > 0) {
      handleFlushQueue();
    }
  };

  const handleFlushQueue = () => {
    setIsOnline(true);
    const count = pendingSyncCount;
    const ordersToSync = [...queuedOrders];
    setPendingSyncCount(0);
    setQueuedOrders([]);

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "pos-system",
          source: "PosScreen",
          type: "sqlite_queue",
          tag: "QUEUE_FLUSH",
          name: "IdempotentSyncQueue::FlushPending",
          stateName: "BatchReconciledState",
          details: `Reconciled ${count} offline transactions to remote MySQL with zero double-charging.`,
          payload: {
            flushedCount: count,
            syncedOrders: ordersToSync,
            strategy: "IDEMPOTENT_RETRY_BACKOFF",
          },
          latencyMs: 12.4,
        }),
      );
    }
  };

  const handleCommitCheckout = () => {
    setIsCompleted(true);
    const txId = `uuid_tx_${Math.random().toString(36).substring(2, 8)}`;
    const itemCount = cartItems.reduce((acc, it) => acc + it.qty, 0);

    let nextQueue = queuedOrders;
    if (!isOnline) {
      const newOrder: QueuedOrder = {
        id: txId,
        total: totalAmount,
        itemCount,
      };
      nextQueue = [...queuedOrders, newOrder];
      setQueuedOrders(nextQueue);
      setPendingSyncCount((prev) => prev + 1);
    }

    if (onDispatchEvent) {
      onDispatchEvent(
        createStreamEvent({
          projectId: "pos-system",
          source: "PosScreen",
          type: isOnline ? "bloc_event" : "sqlite_queue",
          tag: isOnline ? "HTTP_COMMIT" : "SQLITE_QUEUE",
          name: isOnline
            ? "CommitTransactionEvent"
            : "EnqueueOfflineTransaction",
          stateName: isOnline
            ? "TransactionCommittedState"
            : "OfflineEnqueuedState",
          details: isOnline
            ? `Idempotency UUID: ${txId} ➔ 200 OK Sync with MySQL (฿${totalAmount})`
            : `No connection. Enqueued in SQLite WAL queue (Pending Sync: ${
                pendingSyncCount + 1
              })`,
          payload: {
            idempotencyKey: txId,
            total: totalAmount,
            itemCount,
            paymentMode: "PromptPay QR Instant",
            dataIntegrity: "99.9%",
            queuedOrders: isOnline ? undefined : nextQueue,
          },
          latencyMs: isOnline ? 1.8 : 0.4,
        }),
      );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#070b12] text-zinc-100 select-none">
      {/* 1. Status Bar */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/[0.04]">
        <span className="font-semibold text-zinc-200">09:41</span>
        <div className="w-16 h-3.5 bg-black rounded-full border border-white/[0.08] flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          {isOnline ? (
            <Wifi className="w-3 h-3 text-sky-400" />
          ) : (
            <WifiOfflineIcon size={12} color="#f43f5e" />
          )}
          <Battery className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* 2. App Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/[0.06] bg-[#0c101a]/90 backdrop-blur-md">
        <div>
          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase block">
            RETAIL POINT OF SALE
          </span>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <PosRegisterIcon size={14} color="#3b82f6" />
            <span>POS Register #04</span>
          </h4>
        </div>

        {/* Network & Offline Queue Toggle */}
        <button
          type="button"
          onClick={() => toggleNetwork()}
          aria-label="Toggle network state"
          title="Click to simulate Online / Offline"
          className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold transition-all border flex items-center gap-1 cursor-pointer ${
            isOnline
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
              : "bg-rose-500/10 text-rose-400 border-rose-500/25"
          }`}
        >
          {isOnline ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE SYNC</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>OFFLINE ({pendingSyncCount})</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Screen Body */}
      <div className="flex-1 p-3 flex flex-col justify-between space-y-2.5 overflow-y-auto">
        {/* Preset Scenarios */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.06] text-[9px] font-mono overflow-x-auto">
          <span className="text-zinc-500 uppercase px-1 shrink-0">
            SCENARIOS:
          </span>
          <button
            type="button"
            onClick={() => toggleNetwork(false)}
            className="px-2 py-0.5 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors shrink-0 cursor-pointer"
          >
            📶 Simulate Offline
          </button>
          <button
            type="button"
            onClick={handleCommitCheckout}
            className="px-2 py-0.5 rounded bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/30 transition-colors shrink-0 cursor-pointer"
          >
            ⚡ QR Checkout
          </button>
          <button
            type="button"
            onClick={handleFlushQueue}
            className="px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-colors shrink-0 cursor-pointer"
          >
            🔄 Flush Queue
          </button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="uppercase tracking-wider">
              {t(
                "รายการสินค้าในตะกร้า",
                `Cart Order (${cartItems.length} Items)`,
              )}
            </span>
            <button
              type="button"
              onClick={handleAddSampleItem}
              className="text-[#00f0ff] hover:underline flex items-center gap-0.5 cursor-pointer text-[9px]"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>+ Add SKU</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex justify-between items-center text-[10px]"
              >
                <div>
                  <p className="font-semibold text-zinc-200">{item.name}</p>
                  <p className="text-[8px] font-mono text-zinc-400">
                    SKU: {item.sku} &bull; ฿{item.price} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => updateItemQty(item.id, -1)}
                      className="p-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-[9px] text-white bg-black/60 px-1.5 py-0.5 rounded font-bold min-w-[16px] text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateItemQty(item.id, 1)}
                      className="p-0.5 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <span className="font-mono font-bold text-blue-300 min-w-[50px] text-right">
                    ฿{item.price * item.qty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & QR PromptPay Card */}
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0c1626] to-[#090d16] border border-blue-500/25 space-y-2 shadow-md">
          <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-1.5">
            <span className="text-[9px] font-mono text-zinc-400 uppercase">
              {t("ยอดชำระสุทธิ", "Net Payable Amount")}
            </span>
            <span className="text-base font-bold font-mono text-sky-400">
              ฿{totalAmount}.00
            </span>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/[0.06]">
            <QrCode className="w-7 h-7 text-[#2196f3] shrink-0" />
            <div className="text-[9px] font-mono">
              <span className="font-bold text-zinc-200 block">
                PromptPay QR Instant
              </span>
              <span className="text-zinc-400 text-[8px]">
                {isOnline
                  ? "Auto-reconciled with backend API"
                  : "Queued in local SQLite WAL table"}
              </span>
            </div>
          </div>
        </div>

        {/* Resilience Telemetry */}
        <div className="p-2 rounded-lg bg-zinc-900/50 border border-white/[0.04] space-y-1 text-[9px] font-mono">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Idempotency Strategy</span>
            <span className="text-zinc-300 font-bold">Client UUID v4 Key</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1">
              <DatabaseSyncIcon
                size={12}
                color="#10b981"
                animated={!isOnline}
              />
              SQLite Retry Queue
            </span>
            <span
              className={`font-bold ${
                pendingSyncCount > 0 ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {pendingSyncCount > 0
                ? `${pendingSyncCount} Pending (Auto-flush)`
                : "0 Pending (Synced 99.9%)"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={handleCommitCheckout}
          aria-label="Commit checkout transaction"
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {isOnline
                  ? t("ออกใบเสร็จ & ซิงค์สำเร็จ", "Receipt Printed (Synced)")
                  : t("บันทึกลงคิวออฟไลน์สำเร็จ", "Enqueued in Offline SQLite")}
              </span>
            </>
          ) : (
            <>
              <ReceiptTextIcon size={14} color="#ffffff" />
              <span>
                {t(
                  "ยืนยันการชำระเงิน (Sync API)",
                  "Commit Transaction (Sync API)",
                )}
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* 4. Bottom Bar */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-[#0c101a] flex flex-col items-center">
        <div className="w-24 h-1 bg-white/20 rounded-full my-0.5" />
      </div>
    </div>
  );
};

export default PosScreen;
