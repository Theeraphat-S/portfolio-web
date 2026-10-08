import React from "react";
import { BilingualStack } from "../../BilingualStack";
import { motion } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const CATEGORY_META = [
  {
    index: "01",
    labelEn: "MOBILE",
    labelTh: "โมบาย",
    taglineEn:
      "Cross-platform apps with Flutter, state management, and reactive UI.",
    taglineTh:
      "แอปข้ามแพลตฟอร์มด้วย Flutter การจัดการ State และ UI แบบ Reactive",
  },
  {
    index: "02",
    labelEn: "LANGUAGES & WEB",
    labelTh: "ภาษาและเว็บ",
    taglineEn: "Programming languages, web basics, and REST API backends.",
    taglineTh: "ภาษาโปรแกรม พื้นฐานเว็บ และ REST API ฝั่ง Backend",
  },
  {
    index: "03",
    labelEn: "DATA & TOOLING",
    labelTh: "ข้อมูลและเครื่องมือ",
    taglineEn:
      "Relational persistence, API testing tools, version control, and development workflows.",
    taglineTh:
      "ฐานข้อมูลเชิงสัมพันธ์ เครื่องมือทดสอบ API ระบบ Version Control และกระบวนการพัฒนา",
  },
  {
    index: "04",
    labelEn: "TEAMWORK & TEACHING",
    labelTh: "การทำงานเป็นทีมและการสอน",
    taglineEn:
      "Teaching assistant work, helping students, and working in Agile sprints.",
    taglineTh:
      "การเป็นผู้ช่วยสอนประจำภาควิชา ให้คำปรึกษานักศึกษารุ่นน้อง และการทำงานแบบ Agile",
  },
];

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  const fadeIn = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="capabilities"
      className="relative py-16 sm:py-24 border-b border-white/[0.08]"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="skills" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          03 // {t("ความสามารถ & ระบบ", "CAPABILITIES & SYSTEMS")}
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          {t("ทักษะแยกตามหมวด", "SKILLS BY DOMAIN")}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-4 mb-16 max-w-4xl"
      >
        <BilingualStack
          as="h2"
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
          th={"ทักษะและเครื่องมือ"}
          en={"Skills & Tools"}
        />
        <BilingualStack
          className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed"
          th={
            "Flutter และ Dart คือเครื่องมือหลัก นอกจากนี้มีประสบการณ์ด้านเว็บ Backend และฐานข้อมูลจากการเรียนและการฝึกงาน รวมถึงการเป็นผู้ช่วยสอน 3 ภาคการศึกษา"
          }
          en={
            "Flutter and Dart are my main tools. I also have hands-on experience with web, backend and databases from university and my internship, plus three semesters as a teaching assistant."
          }
        />
      </motion.div>

      {/* Clean Monospace Tree Layout (2 Columns with Hairline Separation) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-12 lg:gap-y-14">
        {skillCategories.map((category: SkillCategory, catIdx: number) => {
          const meta = CATEGORY_META[catIdx] || {
            index: String(catIdx + 1).padStart(2, "0"),
            labelEn: "CAPABILITY",
            labelTh: "ความสามารถ",
            taglineEn: "",
            taglineTh: "",
          };

          return (
            <motion.div
              key={catIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="space-y-5"
            >
              {/* Category Tree Root Header */}
              <div className="pb-3 border-b border-white/[0.08] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-semibold tracking-wider">
                    <span>{meta.index} //</span>
                    <span>{lang === "th" ? meta.labelTh : meta.labelEn}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {t(
                      `${category.skills.length} ทักษะ`,
                      `${category.skills.length} SKILLS`,
                    )}
                  </span>
                </div>
                <BilingualStack
                  as="h3"
                  className="text-xl font-bold text-white tracking-tight"
                  th={category.nameTh}
                  en={category.nameEn}
                />
                <BilingualStack
                  className="text-xs font-mono text-zinc-400 leading-normal md:min-h-[2lh]"
                  th={meta.taglineTh}
                  en={meta.taglineEn}
                />
              </div>

              {/* Monospace Tree Branches */}
              <div className="font-mono text-xs space-y-2.5 pl-1 sm:pl-2">
                {category.skills.map((skill, sIdx) => {
                  const isLast = sIdx === category.skills.length - 1;
                  const connector = isLast ? "└─" : "├─";

                  return (
                    <div
                      key={sIdx}
                      data-cursor-text="SKILL"
                      className="group/node flex items-start justify-between gap-3 py-1.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-default"
                    >
                      {/* Left: Monospace Connector + Name + Short Desc */}
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-zinc-600 select-none font-bold group-hover/node:text-[#00f0ff] transition-colors shrink-0">
                          {connector}
                        </span>
                        <div className="space-y-0.5 min-w-0">
                          <span className="font-medium text-zinc-200 group-hover/node:text-white transition-colors block truncate">
                            {skill.name}
                          </span>
                          <span className="text-xs text-zinc-400 font-sans font-light block">
                            {skill.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
