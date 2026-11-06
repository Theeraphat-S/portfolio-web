import { SkillCategory } from "../types";

export const skillCategoriesData: SkillCategory[] = [
  {
    nameTh: "การพัฒนาโมบายแอป",
    nameEn: "Mobile development",
    icon: "smartphone",
    color: "cyan",
    skills: [
      {
        name: "Flutter",
        level: "Advanced / Core",
        descTh: "พัฒนา UI แบบเนทีฟข้ามแพลตฟอร์มสำหรับ iOS และ Android",
        descEn: "Cross-platform native iOS & Android UI development",
      },
      {
        name: "Dart",
        level: "Advanced / Core",
        descTh: "การเขียนโปรแกรมแบบอะซิงโครนัส, OOP, Streams, Generics",
        descEn: "Asynchronous programming, OOP, Streams, Generics",
      },
      {
        name: "BLoC / Cubit",
        level: "Advanced",
        descTh: "การจัดการ state ที่คาดเดาได้",
        descEn: "Predictable state management",
      },
      {
        name: "Provider",
        level: "Proficient",
        descTh: "การจัดการ state แบบรีแอกทีฟที่มีน้ำหนักเบา",
        descEn: "Lightweight reactive state management",
      },
      {
        name: "Android Studio",
        level: "Proficient",
        descTh: "ตั้งค่าบิลด์เนทีฟ, ดีบัก, อีมูเลเตอร์",
        descEn: "Native build configs, debugging, emulators",
      },
      {
        name: "Clean Architecture",
        level: "Proficient",
        descTh: "แยกเลเยอร์ Domain, Data และ Presentation",
        descEn: "Domain, Data, and Presentation layer separation",
      },
    ],
  },
  {
    nameTh: "ภาษาโปรแกรมและเว็บเทคโนโลยี",
    nameEn: "Languages & web stack",
    icon: "code",
    color: "cyan",
    skills: [
      {
        name: "Java",
        level: "Proficient",
        descTh: "พื้นฐาน OOP, โครงสร้างข้อมูล, พื้นฐานงานแบ็กเอนด์",
        descEn: "Core OOP, Data structures, Backend foundation",
      },
      {
        name: "JavaScript / TS",
        level: "Proficient",
        descTh: "ES6+ สมัยใหม่, Async/Await, มาตรฐานเว็บ",
        descEn: "Modern ES6+, Async/Await, Web standards",
      },
      {
        name: "HTML5 & CSS3",
        level: "Proficient",
        descTh: "Semantic markup, เลย์เอาต์แบบ Responsive",
        descEn: "Semantic markup, Responsive layouts",
      },
      {
        name: "Go (Golang)",
        level: "Intermediate",
        descTh: "พื้นฐานการเขียนเซอร์วิสและ concurrency",
        descEn: "Basics of services and concurrency",
      },
      {
        name: "React",
        level: "Proficient",
        descTh: "สถาปัตยกรรมคอมโพเนนต์, Hooks, SPA สมัยใหม่",
        descEn: "Component architecture, Hooks, Modern SPAs",
      },
      {
        name: "Spring Boot",
        level: "Intermediate",
        descTh: "พัฒนา REST API ด้วย Java",
        descEn: "REST API development with Java",
      },
    ],
  },
  {
    nameTh: "ฐานข้อมูลและเครื่องมือ",
    nameEn: "Databases & tools",
    icon: "database",
    color: "blue",
    skills: [
      {
        name: "MySQL",
        level: "Advanced",
        descTh: "ออกแบบฐานข้อมูลเชิงสัมพันธ์, คิวรีที่ซับซ้อน, การทำ Index",
        descEn: "Relational DB design, Complex queries, Indexing",
      },
      {
        name: "Oracle Database",
        level: "Intermediate",
        descTh: "คิวรี SQL, ทริกเกอร์, วิว",
        descEn: "SQL queries, triggers, views",
      },
      {
        name: "Git & GitHub",
        level: "Advanced",
        descTh: "ควบคุมเวอร์ชัน, เวิร์กโฟลว์แบบแตกแบรนช์, รีวิว PR",
        descEn: "Version control, Branching workflows, PR reviews",
      },
      {
        name: "VS Code & Eclipse",
        level: "Advanced",
        descTh: "IDE หลักที่ใช้ ตั้งค่าร่วมกับส่วนขยาย",
        descEn: "Primary IDEs, set up with extensions",
      },
      {
        name: "REST API & Postman",
        level: "Advanced",
        descTh: "ทดสอบ API, Mock server, ตรวจสอบรีเควสต์",
        descEn: "API testing, Mock servers, Request inspection",
      },
    ],
  },
  {
    nameTh: "การทำงานร่วมกันและการสื่อสาร",
    nameEn: "Teamwork & communication",
    icon: "users",
    color: "indigo",
    skills: [
      {
        name: "Cross-Functional Collaboration",
        level: "Advanced",
        descTh: "ทำงานร่วมกับดีไซเนอร์ PM และบุคลากรทางการแพทย์",
        descEn: "Working with designers, PMs, and healthcare workers",
      },
      {
        name: "Technical Communication & TA",
        level: "Advanced",
        descTh: "ให้คำแนะนำการเขียนโค้ดแก่นักศึกษามหาวิทยาลัยกว่า 100 คน",
        descEn: "Mentoring 100+ university students in coding",
      },
      {
        name: "Logical Problem Solving",
        level: "Advanced",
        descTh: "ดีบักและแตกปัญหาออกเป็นขั้นตอน",
        descEn: "Debugging and breaking problems into steps",
      },
      {
        name: "Adaptive Learning",
        level: "Advanced",
        descTh: "เรียนรู้เครื่องมือใหม่ด้วยการลงมือสร้างงานจริง",
        descEn: "Picking up new tools by building with them",
      },
      {
        name: "Agile / Scrum Mindset",
        level: "Proficient",
        descTh: "วางแผนสปรินต์, Standup, ส่งมอบงานแบบวนรอบ",
        descEn: "Sprint planning, Standups, Iterative delivery",
      },
    ],
  },
];
