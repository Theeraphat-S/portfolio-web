import React, { useState } from "react";
import { motion } from "motion/react";
import {
  QrCode,
  CheckCircle2,
  Receipt,
  Wifi,
  Battery,
  Store,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface PosScreenProps {
  direction?: number;
}

export const PosScreen: React.FC<PosScreenProps> = () => {
  const { t } = useLanguage();
  const [isCompleted, setIsCompleted] = useState(false);

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
          <Wifi className="w-3 h-3 text-zinc-300" />
          <Battery className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* 2. App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06] bg-[#0c101a]/90 backdrop-blur-md">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase block">
            RETAIL POINT OF SALE
          </span>
          <h4 className="text-xs font-bold text-white flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-[#2196f3]" />
            <span>POS Register #04</span>
          </h4>
        </div>
        <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
          ONLINE SYNC
        </span>
      </div>

      {/* 3. Screen Body */}
      <div className="flex-1 p-3.5 flex flex-col justify-between space-y-3">
        {/* Cart Items List */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="uppercase tracking-wider">
              {t("รายการสินค้าในตะกร้า", "Cart Order (2 Items)")}
            </span>
            <span className="text-zinc-400">INV-256903-88</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex justify-between items-center text-[11px]">
            <div>
              <p className="font-semibold text-zinc-200">
                Premium Arabica (250g)
              </p>
              <p className="text-[9px] font-mono text-zinc-400">
                SKU: COF-8812 &bull; Qty: 1
              </p>
            </div>
            <span className="font-mono font-bold text-blue-300">฿250.00</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-white/[0.06] flex justify-between items-center text-[11px]">
            <div>
              <p className="font-semibold text-zinc-200">
                Ceramic Drip Tumbler
              </p>
              <p className="text-[9px] font-mono text-zinc-400">
                SKU: ACC-1044 &bull; Qty: 1
              </p>
            </div>
            <span className="font-mono font-bold text-blue-300">฿170.00</span>
          </div>
        </div>

        {/* Pricing & QR PromptPay Card */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#0c1626] to-[#090d16] border border-blue-500/25 space-y-2.5 shadow-md">
          <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              {t("ยอดชำระสุทธิ", "Net Payable Amount")}
            </span>
            <span className="text-base font-bold font-mono text-sky-400">
              ฿420.00
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-black/40 border border-white/[0.06]">
            <QrCode className="w-8 h-8 text-[#2196f3] shrink-0" />
            <div className="text-[10px] font-mono">
              <span className="font-bold text-zinc-200 block">
                PromptPay QR Instant
              </span>
              <span className="text-zinc-400 text-[9px]">
                Auto-reconciliation ready
              </span>
            </div>
          </div>
        </div>

        {/* Resilience Telemetry */}
        <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/[0.04] space-y-1 text-[10px] font-mono">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Idempotency Key</span>
            <span className="text-zinc-300 font-bold">uuid_v4_valid</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Retry Queue Engine</span>
            <span className="text-emerald-400 font-bold">0 Pending (Idle)</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsCompleted(!isCompleted)}
          aria-label={
            isCompleted
              ? "Receipt printed, click to reset transaction"
              : "Commit transaction with sync API"
          }
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12]"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {t("พิมพ์ใบเสร็จเรียบร้อย", "Receipt Printed (Success)")}
              </span>
            </>
          ) : (
            <>
              <Receipt className="w-3.5 h-3.5" />
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

      {/* 4. Simulated Bottom Bar */}
      <div className="px-4 py-2 border-t border-white/[0.04] bg-[#0c101a] flex flex-col items-center">
        <div className="w-24 h-1 bg-white/20 rounded-full my-0.5" />
      </div>
    </div>
  );
};

export default PosScreen;
