import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "../../../context/LanguageContext";

interface ContactEmailCardProps {
  email: string;
}

export const ContactEmailCard: React.FC<ContactEmailCardProps> = ({
  email,
}) => {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#06b6d4", "#ffffff"],
    });

    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/40 transition-all gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-mono text-zinc-400 block">
            {t("อีเมลหลัก (Direct Email)", "Primary Email")}
          </span>
          <a
            href={`mailto:${email}`}
            className="text-sm sm:text-base font-bold font-mono text-zinc-100 hover:text-emerald-400 transition-colors break-all block mt-0.5"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
        <button
          onClick={() => copyEmailToClipboard(email)}
          data-cursor-text="Copy"
          className="flex-1 py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {copiedEmail ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">
                {t("คัดลอกแล้ว!", "Copied!")}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t("คัดลอกอีเมล", "Copy Email")}</span>
            </>
          )}
        </button>

        <a
          href={`mailto:${email}`}
          data-cursor-text="Send"
          className="py-2 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1"
        >
          <span>{t("ส่งอีเมล", "Send")}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
