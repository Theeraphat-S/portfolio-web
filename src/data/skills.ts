import { SkillCategory } from "../types";

export const skillCategoriesData: SkillCategory[] = [
  {
    nameTh: "การพัฒนาโมบายแอป",
    nameEn: "Mobile Development",
    icon: "smartphone",
    color: "cyan",
    skills: [
      {
        name: "Flutter",
        level: "Advanced / Core",
        desc: "Cross-platform native iOS & Android UI development",
      },
      {
        name: "Dart",
        level: "Advanced / Core",
        desc: "Asynchronous programming, OOP, Streams, Generics",
      },
      {
        name: "BLoC / Cubit",
        level: "Advanced",
        desc: "Predictable state management",
      },
      {
        name: "Provider",
        level: "Proficient",
        desc: "Lightweight reactive state architecture",
      },
      {
        name: "Android Studio",
        level: "Proficient",
        desc: "Native build configs, debugging, emulators",
      },
      {
        name: "Clean Architecture",
        level: "Proficient",
        desc: "Domain, Data, and Presentation layer separation",
      },
    ],
  },
  {
    nameTh: "ภาษาโปรแกรมและเว็บเทคโนโลยี",
    nameEn: "Languages & Web Stack",
    icon: "code",
    color: "cyan",
    skills: [
      {
        name: "Java",
        level: "Proficient",
        desc: "Core OOP, Data structures, Backend foundation",
      },
      {
        name: "JavaScript / TS",
        level: "Proficient",
        desc: "Modern ES6+, Async/Await, Web standards",
      },
      {
        name: "HTML5 & CSS3",
        level: "Proficient",
        desc: "Semantic layouts, Responsive modern design",
      },
      {
        name: "Go (Golang)",
        level: "Intermediate",
        desc: "Basics of services and concurrency",
      },
      {
        name: "React",
        level: "Proficient",
        desc: "Component architecture, Hooks, Modern SPAs",
      },
      {
        name: "Spring Boot",
        level: "Intermediate",
        desc: "REST API development with Java",
      },
    ],
  },
  {
    nameTh: "ฐานข้อมูลและเครื่องมือ",
    nameEn: "Databases & Tools",
    icon: "database",
    color: "blue",
    skills: [
      {
        name: "MySQL",
        level: "Advanced",
        desc: "Relational DB design, Complex queries, Indexing",
      },
      {
        name: "Oracle Database",
        level: "Intermediate",
        desc: "SQL queries, triggers, views",
      },
      {
        name: "Git & GitHub",
        level: "Advanced",
        desc: "Version control, Branching workflows, PR reviews",
      },
      {
        name: "VS Code & Eclipse",
        level: "Advanced",
        desc: "Primary IDEs with optimized extensions",
      },
      {
        name: "REST API & Postman",
        level: "Advanced",
        desc: "API testing, Mock servers, Request inspection",
      },
    ],
  },
  {
    nameTh: "การทำงานร่วมกันและการสื่อสาร",
    nameEn: "Teamwork & Communication",
    icon: "users",
    color: "indigo",
    skills: [
      {
        name: "Cross-Functional Collaboration",
        level: "Expert",
        desc: "Working smoothly with designers, PMs, and doctors",
      },
      {
        name: "Technical Communication & TA",
        level: "Expert",
        desc: "Mentoring 100+ university students in coding",
      },
      {
        name: "Logical Problem Solving",
        level: "Advanced",
        desc: "Debugging and breaking problems into steps",
      },
      {
        name: "Adaptive Learning",
        level: "Advanced",
        desc: "Rapidly mastering emerging tech & AI tools",
      },
      {
        name: "Agile / Scrum Mindset",
        level: "Proficient",
        desc: "Sprint planning, Standups, Iterative delivery",
      },
    ],
  },
];
