import React from "react";
import { GraduationCap, Award, Briefcase, Check } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 border-b border-zinc-900">
      {/* Section Subtitle & Heading */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
          01 // {t("ประวัติและตัวตน", "ABOUT & BACKGROUND")}
        </span>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight leading-snug">
            {lang === "th"
              ? "สร้างสรรค์แอปพลิเคชันจากความต้องการจริง สู่โค้ดที่ดูแลรักษาได้ในระยะยาว"
              : "Crafting software born from real human needs, engineered for maintainability."}
          </h2>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              {lang === "th"
                ? "ผมเริ่มต้นการเดินทางในสายนักพัฒนาโมบายแอปพลิเคชันด้วยความสนใจในการแก้ปัญหาเชิงโครงสร้าง (Architecture) และประสบการณ์การใช้งานจริง ในฐานะนักศึกษาชั้นปีสุดท้าย สาขาเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่โจ้ ผมได้ทุ่มเทพัฒนาแอปพลิเคชันด้วย Flutter & Dart พร้อมสถาปัตยกรรม BLoC ซึ่งทำให้การจัดการ State และ Logic มีความแน่นอนและเป็นระบบ"
                : "My journey in mobile development began with an obsession over solid architecture and real human usability. As a graduating IT specialist at Maejo University, I dedicated myself to mastering Flutter & Dart using the BLoC pattern, ensuring state transitions and business rules remain predictable, testable, and robust."}
            </p>

            <p>
              {lang === "th"
                ? "ตัวอย่างที่ชัดเจนที่สุดคือผลงานโปรเจกต์จบ (Capstone Project) 'NCDs Risk Screening' สำหรับคัดกรองโรคไม่ติดต่อเรื้อรัง ซึ่งผมออกแบบให้ระบบสามารถคำนวณความเสี่ยงและทำงานได้แบบ Offline-First 100% เพื่อให้อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) สามารถใช้งานในพื้นที่ห่างไกลที่ไม่มีสัญญาณอินเทอร์เน็ตได้จริง และลดระยะเวลาคัดกรองต่อคนลงได้กว่า 60%"
                : "A hallmark of my engineering approach is my Capstone project, 'NCDs Risk Screening'. Designed specifically for community health volunteers operating in remote offline areas, I migrated core validation algorithms to the client side. This achieved 100% offline functionality, reduced patient screening times by over 60%, and eliminated manual scoring errors entirely."}
            </p>

            <p>
              {lang === "th"
                ? "นอกจากงานพัฒนาโปรแกรม ผมยังได้รับความไว้วางใจให้ทำหน้าที่ผู้ช่วยสอน (Teaching Assistant) ถึง 3 ภาคการศึกษา ในรายวิชา Web Programming, Database และ Logic รวมถึงได้รับเชิญเป็นวิทยากรบรรยายหัวข้อ AI สิ่งเหล่านี้ช่วยขัดเกลาทักษะการสื่อสาร การทำงานเป็นทีม และการอธิบายเรื่องทางเทคนิคที่ซับซ้อนให้เข้าใจง่าย"
                : "Beyond writing code, I served as a Departmental Teaching Assistant (TA) for 3 consecutive semesters covering Web Programming, Relational Databases, and Algorithmic Logic. I was also invited as a guest keynote speaker on AI. These experiences strengthened my communication, team collaboration, and ability to translate complex technical concepts into clear action."}
            </p>
          </div>

          {/* Core Principles */}
          <div className="pt-4 border-t border-zinc-900">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              {t("หลักการทำงานที่ยึดถือ", "Core Engineering Principles")}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Deterministic State Management</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Offline-First Reliability</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Separation of Concerns & Clean Code</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Usability Field-Testing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Structured Specs & Credentials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education Block */}
          <div className="border border-zinc-800 bg-zinc-900/30 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">
                {t("ประวัติการศึกษา", "Academic Credentials")}
              </h3>
            </div>
            <div>
              <p className="font-bold text-zinc-100 text-sm">
                {lang === "th"
                  ? personal.education.universityTh
                  : personal.education.universityEn}
              </p>
              <p className="text-zinc-300 text-xs mt-0.5">
                {lang === "th"
                  ? personal.education.degreeTh
                  : personal.education.degreeEn}
              </p>
              <p className="text-zinc-500 font-mono text-[11px] mt-1">
                {lang === "th"
                  ? personal.education.yearsTh
                  : personal.education.yearsEn}{" "}
                &bull; Chiang Mai, Thailand
              </p>
            </div>
            <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 leading-relaxed">
              {t(
                "ศึกษาเชิงลึกด้าน Data Structures, OOP, Software Engineering, Database Systems และ Client-side Applications",
                "Focused on Data Structures, Algorithms, Software Engineering methodologies, and Client/Server architecture.",
              )}
            </p>
          </div>

          {/* Academic Leadership Block */}
          <div className="border border-zinc-800 bg-zinc-900/30 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">
                {t("การถ่ายทอด & บทบาทวิชาการ", "Academic Leadership & Mentorship")}
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-zinc-200">
                  {t(
                    "ผู้ช่วยสอน (Teaching Assistant) 3 ภาคการศึกษา",
                    "Teaching Assistant (3 Semesters)",
                  )}
                </p>
                <p className="text-zinc-400 mt-0.5">
                  {t(
                    "รายวิชา Web Programming, Database Systems และ Computer Logic มหาวิทยาลัยแม่โจ้",
                    "Mentored students in Web Programming, Databases & Logic at Maejo University.",
                  )}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80">
                <p className="font-semibold text-zinc-200">
                  {t(
                    "วิทยากรบรรยายพิเศษด้าน AI",
                    "Invited AI Workshop Keynote",
                  )}
                </p>
                <p className="text-zinc-400 mt-0.5">
                  {t(
                    "บรรยายแก่นักเรียนห้องเรียนพิเศษ Gifted Computer โรงเรียนจักรคำคณาทร ลำพูน",
                    "Delivered AI workshop for Gifted Computer program at Jakkhumkhanathorn School.",
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Work Mode & Readiness */}
          <div className="border border-zinc-800 bg-zinc-900/30 rounded-lg p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Briefcase className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">
                {t("ความพร้อมในการปฏิบัติงาน", "Employment Readiness")}
              </h3>
            </div>
            <p className="text-xs text-zinc-300">
              {t(
                "พร้อมเริ่มงานทันทีทั้งในรูปแบบ Onsite (กรุงเทพฯ / เชียงใหม่), Hybrid หรือ Full Remote",
                "Ready for immediate hire: Onsite (Bangkok / Chiang Mai), Hybrid, or Full Remote.",
              )}
            </p>
            <p className="text-[11px] font-mono text-zinc-500 pt-1">
              Agile / Scrum &bull; Git & GitHub Workflow &bull; English Professional Reading
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBento;
