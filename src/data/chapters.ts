import { BilingualText, StoryChapter } from "../types";

/** The six chapters of the page, in the order they are read. Each bridge
 * replaces the chapter's old lead paragraph and keeps its facts. */
export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "intro", labelTh: "แนะนำตัว", labelEn: "INTRO" },
  {
    id: "about",
    labelTh: "แนวคิด",
    labelEn: "APPROACH",
    bridge: {
      th: "พื้นฐานเหล่านี้มาจากการเรียนเทคโนโลยีสารสนเทศที่มหาวิทยาลัยแม่โจ้ (2565–2569) และการเขียน Flutter จริง ตั้งแต่แอปคัดกรองสุขภาพในโปรเจกต์จบ ไปจนถึงแอป Hybrid WebView และระบบคิดเงิน POS ที่ทำงานต่อได้เมื่อออฟไลน์ระหว่างฝึกงาน",
      en: "I learned them studying Information Technology at Maejo University (2022–2026) and building with Flutter: a health-screening app for my capstone, then a hybrid WebView app and an offline-capable POS checkout during my internship.",
    },
  },
  {
    id: "work",
    labelTh: "ผลงานเด่น",
    labelEn: "SELECTED WORK",
    bridge: {
      th: "นี่คือที่ที่ได้ใช้พื้นฐานเหล่านั้นจริง โปรเจกต์จบ 1 ชิ้น และงานระหว่างฝึกงาน 2 ชิ้น แต่ละกรณีศึกษาเล่าว่าผมทำส่วนไหน ตัดสินใจอะไร และได้เรียนรู้อะไร",
      en: "Here is where those fundamentals went to work: one capstone app and two internship projects. Each case study shows the part I built, the decisions involved, and what I learned.",
    },
  },
  {
    id: "capabilities",
    labelTh: "ความสามารถ",
    labelEn: "CAPABILITIES",
    bridge: {
      th: "เบื้องหลังโปรเจกต์เหล่านั้นคือชุดเครื่องมือนี้ Flutter และ Dart เป็นเครื่องมือหลัก พร้อมประสบการณ์ด้านเว็บ Backend และฐานข้อมูลจากการเรียนและการฝึกงาน รวมถึงการเป็นผู้ช่วยสอน 3 ภาคการศึกษา",
      en: "Behind those projects is this toolkit. Flutter and Dart are my main tools, with hands-on web, backend and database work from university and my internship, plus three semesters as a teaching assistant.",
    },
  },
  {
    id: "timeline",
    labelTh: "ประสบการณ์",
    labelEn: "EXPERIENCE",
    bridge: {
      th: "ทักษะเหล่านั้นฝึกมาจากบทบาทเหล่านี้ ฝึกงานเป็น Mobile Developer ที่ได้ส่งฟีเจอร์ขึ้นแอปที่ใช้งานจริง เป็นผู้ช่วยสอน 3 ภาคการศึกษา และเป็นวิทยากรรับเชิญด้าน AI ให้โรงเรียนมัธยม",
      en: "Those skills came from these roles: a mobile developer internship where I shipped features to a live app, three semesters as a teaching assistant, and a guest talk on AI for high-school students.",
    },
  },
  {
    id: "contact",
    labelTh: "ติดต่อ",
    labelEn: "CONTACT",
    bridge: {
      th: "ก้าวต่อไปคือทีมที่ได้เรียนรู้และเติบโตไปด้วยกัน พร้อมร่วมงานตำแหน่ง Junior Mobile Developer (Flutter & Dart) แบบเต็มเวลา อยู่เชียงใหม่ (GMT+7) และทำงานได้ทั้ง Onsite, Hybrid และ Remote",
      en: "The next step is a team to keep learning with. I am looking for a full-time junior Mobile Developer role (Flutter & Dart), based in Chiang Mai, Thailand (GMT+7) and open to onsite, hybrid, or remote work.",
    },
  },
];

/** The bridge line that opens a chapter. */
export const bridgeFor = (id: string): BilingualText => {
  const bridge = STORY_CHAPTERS.find((chapter) => chapter.id === id)?.bridge;
  if (!bridge) throw new Error(`Chapter "${id}" has no bridge line`);
  return bridge;
};
