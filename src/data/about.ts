import { AboutContent } from "../types";
import { personalData } from "./personal";

const { education } = personalData;

/** Copy for the Approach chapter: one statement, one line on practice and
 * the credentials behind it. The NCDs accuracy figure lives with the NCDs
 * case study, not here. */
export const aboutData: AboutContent = {
  headlineTh: {
    lead: "ยังอยู่ช่วงต้นของสายอาชีพ ",
    highlight: "จึงให้ความสำคัญกับพื้นฐาน",
    rest: " ทั้ง State ที่อ่านเข้าใจง่าย แอปที่รับมือเน็ตไม่เสถียรได้ และการรับฟังผู้ใช้งานจริง",
  },
  headlineEn: {
    lead: "Still early in my career, ",
    highlight: "so I focus on the fundamentals",
    rest: ": clear state, apps that cope with bad networks, and listening to the people who use them.",
  },
  practiceTh:
    "ในทางปฏิบัติคือใช้ BLoC แยกตรรกะออกจาก UI ให้ติดตามและทดสอบ State ได้ง่าย เก็บข้อมูลไว้ในเครื่องและส่งคำขอซ้ำเมื่อเครือข่ายไม่เสถียร และสังเกตการ Rebuild ของ Widget กับการใช้ Memory เพื่อให้หน้าจอตอบสนองลื่นไหล",
  practiceEn:
    "In practice: BLoC keeps logic out of widgets so state changes are easy to follow and test, data is stored locally and requests retried when the network is unreliable, and I watch widget rebuilds and memory so screens stay responsive.",
  credentialsLabelTh: "พื้นฐานที่มา",
  credentialsLabelEn: "Credentials",
  credentials: [
    {
      id: "degree",
      labelTh: "ปริญญาตรี",
      labelEn: "Degree",
      valueTh: `วท.บ. เทคโนโลยีสารสนเทศ ${education.universityTh}`,
      valueEn: `B.Sc. Information Technology, ${education.universityEn}`,
      detailTh: "วิศวกรรมซอฟต์แวร์และระบบโมบาย",
      detailEn: "Software Engineering & Mobile Systems",
      periodTh: education.yearsTh,
      periodEn: education.yearsEn,
    },
    {
      id: "ta",
      labelTh: "ผู้ช่วยสอน",
      labelEn: "Teaching assistant",
      valueTh: "4 ภาคการศึกษา ใน 3 รายวิชา",
      valueEn: "4 semesters across 3 courses",
      detailTh: "ดูแลนักศึกษา 100+ คน ด้าน Frontend ฐานข้อมูล และตรรกะโปรแกรม",
      detailEn:
        "Helped 100+ students in Frontend, Database and Programming Logic",
      periodTh: "2566 – 2568",
      periodEn: "2023 – 2025",
    },
    {
      id: "speaker",
      labelTh: "วิทยากรรับเชิญ",
      labelEn: "Guest speaker",
      valueTh:
        "เวิร์กช็อป AI เพื่อการเรียนรู้และการเขียนโปรแกรมอย่างมีจริยธรรม",
      valueEn: "Workshop on AI for learning and ethical programming",
      detailTh: "โรงเรียนจักรคำคณาทร",
      detailEn: "Jakkhumkhanathorn School",
      periodTh: "2568",
      periodEn: "2025",
    },
    {
      id: "internship",
      labelTh: "ฝึกงาน",
      labelEn: "Internship",
      valueTh: "Mobile Developer Intern",
      valueEn: "Mobile Developer Intern",
      detailTh: "ฝากด้วย โลจิสติกส์ แอนด์ ดิจิทัล แพลตฟอร์ม",
      detailEn: "Fakduay Logistics & Digital Platform",
      periodTh: "2568 – 2569",
      periodEn: "2025 – 2026",
    },
  ],
};
