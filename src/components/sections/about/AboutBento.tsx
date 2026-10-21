import React, { useRef } from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { bridgeFor } from "../../../data";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FADE_UP } from "../../../lib/motion";
import {
  GraduationCap,
  Layers,
  ShieldCheck,
  Zap,
  Presentation,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export const AboutBento: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // The opening of the chapter rises with the scroll as the Hero headline
  // lifts away, settling once its top is 60% down the viewport.
  const openingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: openingRef,
    offset: ["start end", "start 60%"],
  });
  const openingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const openingY = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-line">
      <m.div
        ref={openingRef}
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: openingOpacity, y: openingY }
        }
      >
        {/* 1. Section Eyebrow */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-line">
          <span className="editorial-eyebrow text-primary">
            01 // {t("ตัวตน & ปรัชญา", "IDENTITY & PHILOSOPHY")}
          </span>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
            {t("แนวทางการทำงาน", "HOW I WORK")}
          </span>
        </div>

        {/* 2. Main Statement (Reduced ~15-20% for faster scanability) */}
        <div className="space-y-4 mb-10">
          <BilingualStack
            as="h2"
            className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-[1.15] max-w-4xl"
            th={
              <>
                ยังอยู่ช่วงต้นของสายอาชีพ{" "}
                <span className="text-primary">จึงให้ความสำคัญกับพื้นฐาน</span>{" "}
                ทั้ง State ที่อ่านเข้าใจง่าย แอปที่รับมือเน็ตไม่เสถียรได้
                และการรับฟังผู้ใช้งานจริง
              </>
            }
            en={
              <>
                Still early in my career,{" "}
                <span className="text-primary">
                  so I focus on the fundamentals
                </span>
                : clear state, apps that cope with bad networks, and listening
                to the people who use them.
              </>
            }
          />

          <ChapterBridge
            bridge={bridgeFor("about")}
            className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl"
          />
        </div>
      </m.div>

      {/* 3. Engineering Principles (3 clean columns, no heavy bloated cards) */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={FADE_UP}
        className="mb-12"
      >
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
          {t("สิ่งที่ฝึกฝนอยู่", "WHAT I PRACTICE")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Principle 01 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-line hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">01</span>
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Predictable State
            </h3>
            <BilingualStack
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              th={
                "ใช้ BLoC แยกตรรกะออกจาก UI ให้การเปลี่ยน State ติดตามและทดสอบได้ง่าย"
              }
              en={
                "Use BLoC to keep logic out of widgets, so state changes are easier to follow and test."
              }
            />
          </div>

          {/* Principle 02 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-line hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">02</span>
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Offline Resilience
            </h3>
            <BilingualStack
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              th={"เก็บข้อมูลไว้ในเครื่องและส่งคำขอซ้ำเมื่อเครือข่ายไม่เสถียร"}
              en={
                "Store data locally and retry requests when the network is unreliable."
              }
            />
          </div>

          {/* Principle 03 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-line hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">03</span>
              <Zap className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Smooth UI
            </h3>
            <BilingualStack
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              th={
                "สังเกตการ Rebuild ของ Widget และการใช้ Memory เพื่อให้หน้าจอตอบสนองลื่นไหล"
              }
              en={
                "Watch widget rebuilds and memory use so screens stay responsive."
              }
            />
          </div>
        </div>
      </m.div>

      {/* 4. Real Data Metrics (Restrained typography, cyan only for values) */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={FADE_UP}
        className="mb-12 p-4 sm:p-5 rounded-xl bg-white/[0.015] border border-line"
      >
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
          {t("ตัวเลขสำคัญ", "AT A GLANCE")}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-line">
          <div className="space-y-0.5 pt-2 md:pt-0 md:pr-4 flex flex-col justify-between">
            <BilingualStack
              as="span"
              className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]"
              th="ความแม่นยำ NCDs"
              en="NCDS ACCURACY"
            />
            <span className="text-2xl sm:text-3xl font-mono font-bold text-primary block">
              100%
            </span>
            <BilingualStack
              as="span"
              className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]"
              th="คำนวณตรงตามเกณฑ์"
              en="Matches scoring rules"
            />
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:px-4 flex flex-col justify-between">
            <BilingualStack
              as="span"
              className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]"
              th="นศ. ที่ให้คำปรึกษา"
              en="STUDENTS MENTORED"
            />
            <span className="text-2xl sm:text-3xl font-mono font-bold text-primary block">
              100+
            </span>
            <BilingualStack
              as="span"
              className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]"
              th="ในฐานะผู้ช่วยสอน"
              en="As a teaching assistant"
            />
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:px-4 flex flex-col justify-between">
            <BilingualStack
              as="span"
              className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]"
              th="วาระผู้ช่วยสอน"
              en="TEACHING TERMS"
            />
            <span className="text-2xl sm:text-3xl font-mono font-bold text-primary block">
              3
            </span>
            <BilingualStack
              as="span"
              className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]"
              th="3 ภาคการศึกษาต่อเนื่อง"
              en="Consecutive terms"
            />
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:pl-4 flex flex-col justify-between">
            <BilingualStack
              as="span"
              className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]"
              th="โปรเจกต์"
              en="PROJECTS"
            />
            <span className="text-2xl sm:text-3xl font-mono font-bold text-primary block">
              3
            </span>
            <BilingualStack
              as="span"
              className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]"
              th="โปรเจกต์จบ 1 · ฝึกงาน 2"
              en="1 capstone · 2 internship"
            />
          </div>
        </div>
      </m.div>

      {/* 5. Impact & Academic Background (Compact supporting cards) */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={FADE_UP}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-line flex items-start gap-3.5 min-h-[110px]">
          <GraduationCap className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {t("วุฒิการศึกษา", "ACADEMIC CREDENTIALS")}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-line">
                2022 - 2026
              </span>
            </div>
            <BilingualStack
              className="text-sm font-sans font-medium text-zinc-200"
              th={"วท.บ. สาขาวิชาเทคโนโลยีสารสนเทศ"}
              en={"B.Sc. in Information Technology"}
            />
            <BilingualStack
              className="text-xs text-zinc-400 font-mono"
              th={"มหาวิทยาลัยแม่โจ้ • วิศวกรรมซอฟต์แวร์และระบบโมบาย"}
              en={"Maejo University • Software Engineering & Mobile Systems"}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-line flex items-start gap-3.5 min-h-[110px]">
          <Presentation className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {t("การสอนและการให้คำปรึกษา", "TEACHING & MENTORING")}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-line">
                {t("3 เทอมการศึกษา", "3 SEMESTERS")}
              </span>
            </div>
            <BilingualStack
              className="text-sm font-sans font-medium text-zinc-200"
              th={"ผู้ช่วยสอนประจำภาควิชา & วิทยากรรับเชิญ"}
              en={"Undergraduate Teaching Assistant & Guest Speaker"}
            />
            <BilingualStack
              className="text-xs text-zinc-400 font-mono"
              th={
                "ดูแลและให้คำปรึกษานักศึกษา 100+ คน ด้าน Frontend และตรรกะโปรแกรม"
              }
              en={
                "Helped 100+ students in Frontend, Database, and Programming Logic courses"
              }
            />
          </div>
        </div>
      </m.div>
    </section>
  );
};

export default AboutBento;
