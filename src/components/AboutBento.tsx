import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Terminal, 
  MapPin, 
  Award, 
  CheckCircle,
  Sparkles,
  Code2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {t('ประวัติและความเชี่ยวชาญ', 'About & Profile')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t('พร้อมขับเคลื่อนโมบายแอปพลิเคชันสู่อนาคต', 'Engineering High-Performance Mobile Apps')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              'นักศึกษาจบใหม่ สาขา IT มหาวิทยาลัยแม่โจ้ ที่มีประสบการณ์สร้างแอปพลิเคชันใช้งานจริงทั้งในระดับโปรเจกต์จบและอุตสาหกรรม',
              'Graduating IT specialist from Maejo University with proven track record in production Flutter applications, state management, and real-world system integrations.'
            )}
          </p>
        </div>

        {/* Bento Grid Layout (Balanced 2 Rows x 3 Columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Featured Portrait Profile Card (Spans 1 col on lg) */}
          <div className="md:col-span-1 lg:col-span-1" data-cursor-text="Oven">
            <div className="group relative h-full min-h-[380px] sm:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950/90 shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-500">
              {/* Profile Background Image with Smooth Hover Zoom */}
              <img 
                src="/profile.jpg" 
                alt={personal.nameEn}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Glassmorphic Cyberpunk Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-end pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
                  {personal.nickname} ({lang === 'th' ? 'โอเว่น' : 'Oven'})
                </span>
              </div>

              {/* Bottom Profile Details Overlay */}
              <div className="relative z-10 p-5 sm:p-6 space-y-2">
                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {lang === 'th' ? personal.nameTh : personal.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold font-mono text-emerald-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    {lang === 'th' ? personal.titleTh : personal.titleEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {lang === 'th' ? 'เชียงใหม่' : 'Chiang Mai'}
                  </span>
                  <span className="text-[11px] text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
                    Maejo IT #2569
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Core Bio & Philosophy (Spans 2 cols on lg) */}
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
                    {t('ความมุ่งมั่นและตัวตน', 'Core Philosophy')}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {t('สร้างซอฟต์แวร์ที่ตอบโจทย์ผู้ใช้งานจริงและมีโครงสร้างที่ยั่งยืน', 'Building Clean, Reliable & Human-Centric Software')}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {lang === 'th' 
                    ? 'มีความเชี่ยวชาญและหลงใหลในการพัฒนา Mobile Application ด้วย Flutter & Dart มีประสบการณ์สร้างแอปพลิเคชันใช้งานจริง ตั้งแต่ระบบคัดกรองโรค (NCDs) ไปจนถึงแอปพลิเคชัน Pinto และระบบ POS ที่มีการเชื่อมต่อ WebView และ Profile API พร้อมนำทักษะการแก้ปัญหาและการทำงานร่วมกับทีมมาพัฒนาโมบายแอปที่มีประสิทธิภาพสูงให้กับองค์กร'
                    : 'Specialized in building robust cross-platform mobile apps with Flutter & Dart. Experienced in shipping real-world apps from healthcare screening (NCDs) to enterprise e-commerce (Pinto) and Point of Sale (POS) systems with seamless API integration.'
                  }
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

          {/* Card 3: Education (Maejo University) (Spans 1 col on lg) */}
          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.15)"
              className="h-full flex flex-col justify-between"
              data-cursor-text="Maejo IT"
            >
              <div>
                <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {t('ประวัติการศึกษา', 'Education')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'th' ? personal.education.universityTh : personal.education.universityEn}
                </h3>
                <p className="text-sm font-medium text-cyan-300 mt-1">
                  {lang === 'th' ? personal.education.degreeTh : personal.education.degreeEn}
                </p>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  {lang === 'th' ? personal.education.yearsTh : personal.education.yearsEn}
                </p>
                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {t(
                    'ศึกษาเจาะลึกโครงสร้างข้อมูล อัลกอริทึม ระบบฐานข้อมูล การพัฒนาซอฟต์แวร์ฝั่งไคลเอนต์และเซิร์ฟเวอร์ และได้รับคัดเลือกเป็น TA ประจำภาควิชา 3 เทอม',
                    'Comprehensive studies in Data Structures, Algorithms, Relational Databases, and Client/Server Engineering. Selected as departmental TA for 3 consecutive semesters.'
                  )}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  เชียงใหม่ (Chiang Mai)
                </span>
                <span className="text-emerald-400 font-mono font-medium">Class 2565-2569</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 4: Leadership & Academic Roles (Spans 1 col on lg) */}
          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="h-full flex flex-col justify-between"
              data-cursor-text="TA & Speaker"
            >
              <div>
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {t('บทบาทวิชาการ & การถ่ายทอด', 'Academic Leadership')}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {t('ผู้ช่วยสอน (TA 3 รายวิชา) & วิทยากร AI', '3x TA & AI Workshop Keynote')}
                </h4>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  {t(
                    'ถ่ายทอดความรู้แก่นักศึกษา IT ในวิชา Web Programming, Database และ Logic รวมถึงได้รับเกียรติเป็นวิทยากรบรรยายเรื่อง AI แก่นักเรียน Gifted Computer โรงเรียนจักรคำคณาทร',
                    'Mentored 100+ students in Frontend, SQL Databases & Logic. Invited keynote speaker on AI for Gifted Computer students at Jakkhumkhanathorn School.'
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-indigo-300 font-mono">
                <span>TA: Web, DB, Logic</span>
                <span>Speaker: M.4 Gifted AI</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 5: Work Style & Location (Spans 1 col on lg) */}
          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.15)"
              className="h-full flex flex-col justify-between"
              data-cursor-text="Available"
            >
              <div>
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {t('รูปแบบการทำงาน', 'Work Mode')}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {t('Onsite / Hybrid / Remote', 'Onsite / Hybrid / Remote')}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  {t('พร้อมทำงานในกรุงเทพฯ เชียงใหม่ หรือทำงานแบบ Remote ทั่วประเทศ', 'Open to relocation to Bangkok, Chiang Mai, or full Remote setup')}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center">
                <span className="text-[11px] font-mono text-blue-300">
                  Agile & Scrum Ready
                </span>
              </div>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
};
