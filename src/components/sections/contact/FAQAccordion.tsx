import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";

interface FAQItem {
  questionTh: string;
  questionEn: string;
  answerTh: string;
  answerEn: string;
}

export const FAQAccordion: React.FC = () => {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      questionTh: "ความเชี่ยวชาญหลักและ Tech Stack ที่คุณถนัดที่สุดคืออะไร?",
      questionEn: "What is your primary area of expertise and tech stack?",
      answerTh:
        "ผมเชี่ยวชาญการพัฒนา Mobile Application ข้ามแพลตฟอร์มด้วย Flutter & Dart โดยเน้นสถาปัตยกรรม Bloc Pattern, Clean Architecture, การเชื่อมต่อ RESTful API ความเสถียรสูง และการจัดการ Local Database (SQLite, Hive) แบบ Offline-First",
      answerEn:
        "I specialize in cross-platform mobile development using Flutter & Dart, focusing on Bloc Pattern, Clean Architecture, high-stability RESTful API integration, and offline-first caching with SQLite and Hive.",
    },
    {
      questionTh: "คุณพร้อมเริ่มงานในรูปแบบใด (Onsite, Hybrid หรือ Remote)?",
      questionEn:
        "What work arrangements are you open to (Onsite, Hybrid, Remote)?",
      answerTh:
        "ผมเปิดรับทั้งรูปแบบ Remote, Hybrid และ Onsite ในกรุงเทพฯ หรือเชียงใหม่ พร้อมเริ่มงานได้ทันที มีความคล่องตัวในการปรับตัวเข้ากับวัฒนธรรมทีมและการทำงานแบบ Agile",
      answerEn:
        "I am fully open to Remote, Hybrid, and Onsite roles in Bangkok or Chiang Mai. Ready to start and adapt quickly to team culture and Agile workflows.",
    },
    {
      questionTh: "มีประสบการณ์ทำระบบจริงระดับใดมาบ้าง?",
      questionEn: "What real-world project scale have you worked on?",
      answerTh:
        "ได้พัฒนาแอปพลิเคชันใช้งานจริงตั้งแต่ระบบคัดกรองความเสี่ยงโรคทางทันตกรรม (POLABDC), แอปพลิเคชันโลจิสติกส์และสะสมคะแนน (J&T Partner), ระบบ Point of Sale (POS) หน้าร้านที่เชื่อมต่อ API และจัดการ State ที่ซับซ้อนได้อย่างราบรื่น",
      answerEn:
        "I've built end-to-end production apps including clinical risk screening (POLABDC), commercial logistics & loyalty points (J&T Partner), and responsive POS cashier applications with complex state handling.",
    },
    {
      questionTh:
        "หากต้องการติดต่อเพื่อสัมภาษณ์งานหรือเริ่มโปรเจกต์ ต้องทำอย่างไร?",
      questionEn:
        "How can recruiters or teams reach out to discuss opportunities?",
      answerTh:
        "สามารถส่งอีเมลมาที่ theeraphat.sm@gmail.com หรือติดต่อผ่านแบบฟอร์มด้านล่างนี้ โดยผมจะตอบกลับภายใน 24 ชั่วโมงครับ",
      answerEn:
        "The fastest way is via email at theeraphat.sm@gmail.com or by filling out the message form below. I usually respond within 24 hours.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-12 space-y-3 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-4 h-4 text-emerald-500" />
        <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-900 dark:text-zinc-100 uppercase">
          {t("คำถามที่พบบ่อย (FAQ)", "FREQUENTLY ASKED QUESTIONS")}
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-start gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {lang === "th" ? faq.questionTh : faq.questionEn}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/50">
                      {lang === "th" ? faq.answerTh : faq.answerEn}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;
