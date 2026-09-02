import React from "react";
import { Terminal, CheckCircle } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

export const PhilosophyCard: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="md:col-span-1 lg:col-span-2">
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.15)"
        className="h-full flex flex-col justify-between"
        data-cursor-text="Philosophy"
      >
        <div>
          <div className="flex items-center gap-2.5 text-emerald-400 mb-3">
            <Terminal className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              {t("ความมุ่งมั่นและตัวตน", "Core Philosophy")}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {t(
              "สร้างซอฟต์แวร์ที่ตอบโจทย์ผู้ใช้งานจริงและมีโครงสร้างที่ยั่งยืน",
              "Building Clean, Reliable & Human-Centric Software",
            )}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {lang === "th"
              ? "มีความเชี่ยวชาญและหลงใหลในการพัฒนา Mobile Application ด้วย Flutter & Dart มีประสบการณ์สร้างแอปพลิเคชันใช้งานจริง ตั้งแต่ระบบคัดกรองโรค (NCDs) ไปจนถึงแอปพลิเคชัน Pinto และระบบ POS ที่มีการเชื่อมต่อ WebView และ Profile API พร้อมนำทักษะการแก้ปัญหาและการทำงานร่วมกับทีมมาพัฒนาโมบายแอปที่มีประสิทธิภาพสูงให้กับองค์กร"
              : "Specialized in building robust cross-platform mobile apps with Flutter & Dart. Experienced in shipping real-world apps from healthcare screening (NCDs) to enterprise e-commerce (Pinto) and Point of Sale (POS) systems with seamless API integration."}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-700/50 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Flutter & Bloc Specialist
          </span>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-700/50 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Clean Architecture
          </span>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-700/50 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            High-Stability REST APIs
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
};
