import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, QrCode, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { screenVariants } from "./types";

interface PosScreenProps {
  direction: number;
}

export const PosScreen: React.FC<PosScreenProps> = ({ direction }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      key="pos"
      custom={direction}
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
            Retail Module
          </p>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            POS Express Checkout
            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
          </h4>
        </div>
        <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
          API Online
        </span>
      </div>

      {/* Cart Summary */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[11px] text-zinc-300 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
          <span>Premium Arabica Beans (250g)</span>
          <span className="font-mono font-bold text-blue-300">฿250</span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-zinc-300 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
          <span>Ceramic Drip Cup x1</span>
          <span className="font-mono font-bold text-blue-300">฿170</span>
        </div>
      </div>

      {/* Total & QR PromptPay */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-950/40 to-zinc-900 border border-blue-500/30">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-zinc-300">
            {t("ยอดชำระสุทธิ", "Total Amount")}
          </span>
          <span className="text-base font-bold font-mono text-emerald-400">
            ฿420.00
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px]">
          <QrCode className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <span className="font-semibold text-zinc-200 block">
              PromptPay QR Code
            </span>
            <span className="text-[9px] text-zinc-400 font-mono">
              Ref: INV-256903-88
            </span>
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-950/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        {t("ยืนยันการรับชำระเงิน (Sync API)", "Complete Transaction (Sync API)")}
      </motion.button>
    </motion.div>
  );
};

export default PosScreen;
