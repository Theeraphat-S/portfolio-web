import { ProjectItem } from "../types";

export const projectsData: ProjectItem[] = [
  {
    id: "ncds-screening",
    titleTh: "แอปพลิเคชันคัดกรองความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs)",
    titleEn: "NCDs Risk Screening Mobile Application",
    subtitleTh: "โปรเจกต์จบปีสุดท้าย มหาวิทยาลัยแม่โจ้",
    subtitleEn: "Final-year Capstone Project at Maejo University",
    category: "mobile",
    year: "2568",
    yearTh: "2568",
    yearEn: "2025",
    tag: "Healthcare Mobile App",
    shortName: "NCDs Screening",
    origin: "capstone",
    proofTh: "ลดเวลาคัดกรองจาก 10–15 เหลือ 3–5 นาที ทดสอบภาคสนามกับ อสม.",
    proofEn: "Screening cut from 10–15 to 3–5 min, field-tested with VHVs",
    color: "#4d7cfe",
    descriptionTh:
      "แอปพลิเคชันมือถือสำหรับตรวจคัดกรองและประเมินความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) ได้แก่ โรคเบาหวาน, ความดันโลหิตสูง, โรคหัวใจ และโรคอ้วน ออกแบบ UI/UX ให้ใช้งานง่ายและตอบโจทย์ทั้งบุคลากรทางการแพทย์ เจ้าหน้าที่ อสม. และประชาชนทั่วไป",
    descriptionEn:
      "Mobile application designed for risk screening and assessment of Non-Communicable Diseases (NCDs) including Diabetes, Hypertension, Heart Disease, and Obesity. UI designed for healthcare workers, village health volunteers (VHVs), and patients.",
    problemTh:
      "กระบวนการคัดกรองโรค NCDs ในชุมชนเดิมใช้กระดาษที่มีแบบสอบถามและตัวแปรคำนวณซับซ้อน มักเกิด Human Error ในการคิดคะแนนความเสี่ยง และพื้นที่ที่ อสม. ลงทำงานมักเป็นจุดอับสัญญาณอินเทอร์เน็ต",
    problemEn:
      "Traditional community NCDs screening relied on paper forms with multi-variable risk scoring, prone to human calculation errors. Village health volunteers (VHVs) also often work in areas with patchy or no internet signal.",
    decisionRationaleTh:
      "ย้าย Business Logic ในการประเมิน Risk Scoring และ State Validation ทั้งหมดมาทำงานบน Client-side (Flutter & BLoC) จึงคำนวณคะแนนและแสดงผลความเสี่ยงได้โดยไม่ต้องรอการเรียกเครือข่าย",
    decisionRationaleEn:
      "Moved all risk-scoring logic and form state validation to the client (Flutter & BLoC), so scoring doesn't wait on a network request.",
    tradeOffsTh:
      "ยอมแลกความซับซ้อนของ BLoC State Machines และ Domain Validation Rules บน Client ที่สูงขึ้น เพื่อให้คำนวณคะแนนได้โดยไม่ต้องรอเครือข่าย และตรวจสอบข้อมูลก่อนประมวลผล",
    tradeOffsEn:
      "Accepted higher state machine and domain validation complexity on the client side to support offline scoring and input validation.",
    evidenceTh:
      "จากการทดสอบภาคสนาม (Field Testing) ร่วมกับบุคลากรและ อสม. พบว่า อสม. สับสนกับค่า Lab และศัพท์แพทย์เฉพาะทาง จึง Redesign Input ให้เป็น Visual Range Slider พร้อม Color-coded Status และระบบแปลงหน่วยอัตโนมัติ",
    evidenceEn:
      "Usability field tests with healthcare workers and VHVs revealed confusion around technical lab thresholds. We redesigned inputs into visual range sliders with color-coded risk bands and automatic unit conversions.",
    outcomeTh:
      "ลดเวลาคัดกรองต่อคนลงเหลือ < 3-5 นาที จากเดิม 10-15 นาทีตอนบันทึกด้วยมือ คะแนนความเสี่ยงที่คำนวณได้ตรงกับเกณฑ์ประเมินทางการแพทย์ทุกครั้ง (แม่นยำ 100%) และออกรายงานสรุปผลได้ทันทีหลังคัดกรอง",
    outcomeEn:
      "Screening now takes < 3-5 mins per patient, down from 10-15 mins on paper. Risk scores match the clinical scoring criteria every time (100% accuracy), and the summary report is ready as soon as screening ends.",
    highlightsTh: [
      "พัฒนา Front-end ด้วย Flutter & Dart โดยใช้ BLoC จัดการ State",
      "จัดการฐานข้อมูล MySQL ที่เก็บผลคัดกรองของผู้ป่วย",
      "พัฒนาระบบคำนวณและประเมินคะแนนความเสี่ยง (Risk Score Algorithm) พร้อมออกรายงานสรุปผลการคัดกรองอัตโนมัติ",
      "ทดสอบการใช้งานจริง (Field Testing) ร่วมกับบุคลากรทางการแพทย์และเจ้าหน้าที่ อสม. ในพื้นที่ แล้วนำผลมาปรับ UI/UX",
    ],
    highlightsEn: [
      "Built the Flutter & Dart front end, using BLoC for state management.",
      "Managed the MySQL database that stores patient screening records.",
      "Built the automated risk-scoring logic and summary report generation.",
      "Ran usability tests in the field with healthcare professionals and Village Health Volunteers (VHVs), then reworked the UI from what we saw.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Bloc",
      "MySQL",
      "REST API",
      "Figma",
      "Clean Architecture",
    ],
    metrics: [
      {
        labelTh: "เวลาคัดกรอง",
        labelEn: "Screening Time",
        value: "< 3-5 min",
        valueTh: "< 3-5 นาที",
        valueEn: "< 3-5 min",
      },
      {
        labelTh: "ความแม่นยำคะแนน",
        labelEn: "Scoring Accuracy",
        value: "100% (Zero Error)",
      },
      {
        labelTh: "โรคที่รองรับ",
        labelEn: "Diseases Covered",
        value: "4 disease groups",
        valueTh: "4 กลุ่มโรค",
        valueEn: "4 disease groups",
      },
    ],
    architectureTh:
      "Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)",
    architectureEn:
      "Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)",
    githubUrl: "https://github.com/Theeraphat-S",
    repositoryType: "private",
    repositoryNoticeTh: "ซอร์สโค้ดวิจัยและสาธารณสุขชุมชน (Private Codebase)",
    repositoryNoticeEn: "Community healthcare research, private codebase",
  },
  {
    id: "pinto-app",
    titleTh: "Pinto Application — เมนู WebView & ฟังก์ชันสะสมแต้ม",
    titleEn: "Pinto Application — WebView & Gamified Chat Streaks",
    subtitleTh:
      "ฝึกงาน ณ บริษัท ฝากด้วย โลจิสติกส์ แอนด์ ดิจิทัล แพลตฟอร์ม จำกัด",
    subtitleEn: "Internship at Fakduay Logistics & Digital Platform",
    category: "mobile",
    year: "2569",
    yearTh: "2569",
    yearEn: "2026",
    tag: "Commercial App Feature",
    shortName: "Pinto App",
    origin: "internship",
    proofTh: "ส่งมอบเมนู WebView และ Chat Streaks ขึ้นแอปที่ใช้งานจริง",
    proofEn: "WebView menus and Chat Streaks shipped to the production app",
    color: "#4d7cfe",
    descriptionTh:
      "ร่วมพัฒนาและอัปเดตฟีเจอร์บนแอปพลิเคชัน Pinto ที่ใช้งานจริง ดูแล State Management เพื่อรองรับการแสดงผลเมนู WebView และพัฒนาระบบสะสมแต้มแชท (Chat Streaks) พร้อมเชื่อมต่อ Profile API",
    descriptionEn:
      "Built and shipped features on the production Pinto app: state management for the hybrid WebView menus, and a gamified Chat Streaks system synced with the user Profile API.",
    problemTh:
      "เป้าหมายคือให้ผู้ใช้กลับมาเปิดแอปทุกวันมากขึ้น (Daily Active Users) โจทย์คือนำหน้าเมนูเว็บที่มีอยู่เดิมมาแสดงในแอป Flutter ผ่าน WebView โดยที่แอปไม่ช้าลง",
    problemEn:
      "The goal was more daily active users (DAU). The task: bring the existing web menus into the native Flutter app through a WebView without slowing it down.",
    decisionRationaleTh:
      "ออกแบบ State Bridge Controller เพื่อซิงค์ข้อมูลระหว่าง Flutter Native กับ WebView และสร้างระบบ Chat Streaks Gamification เชื่อมต่อกับ Profile API",
    decisionRationaleEn:
      "Built a state bridge controller to keep native Flutter and the WebView in sync, and a gamified Chat Streaks feature connected to the user Profile API.",
    tradeOffsTh:
      "รับภาระ Memory Overhead และ Lifecycle ของ Hybrid WebView ไว้ เพื่อให้อัปเดตเมนูโปรโมชั่นจากฝั่ง Server ได้โดยไม่ต้องออกเวอร์ชันใหม่บน App Store",
    tradeOffsEn:
      "Took on the WebView's memory overhead and lifecycle handling so menus can be updated from the server without a new App Store release.",
    evidenceTh:
      "หน้าเมนู WebView ที่โหลดซ้ำทุกครั้งทำให้รู้สึกช้า จึงเพิ่ม Caching และ Optimistic UI ระหว่างสลับเมนู ให้หน้าจอไม่ค้างรอโหลด",
    evidenceEn:
      "Reloading the WebView menu on every visit felt slow, so I added caching and optimistic UI updates between menus to keep the screen from stalling.",
    outcomeTh:
      "ร่วมส่งเมนู WebView และ Chat Streaks ขึ้นแอป Pinto เวอร์ชัน Production โดยแต้มสะสมบันทึกผ่าน Profile API",
    outcomeEn:
      "The WebView menus and Chat Streaks are live in the production Pinto app, with streak points saved through the Profile API.",
    highlightsTh: [
      "พัฒนาและปรับปรุงฟีเจอร์ด้วย Flutter & Dart รองรับการสลับเมนูแบบ Hybrid WebView",
      "สร้างระบบ Gamification สะสมแต้มต่อเนื่อง (Chat Streaks) เพื่อกระตุ้นการมีส่วนร่วม (Engagement) ของผู้ใช้งาน",
      "บันทึกแต้มสะสมและข้อมูลผู้ใช้งานลงโปรไฟล์ผ่าน Profile API",
      "ทำงานกับทีมแบบ Agile / Scrum ใช้ Git / GitHub คุมเวอร์ชันโค้ด และส่งงานตาม Timeline",
    ],
    highlightsEn: [
      "Built Flutter & Dart modules connecting native screens with the WebView menus.",
      "Implemented the Chat Streaks logic, designed to encourage users to chat daily.",
      "Wrote streak points to the user's profile through the Profile API.",
      "Worked in Agile sprints with Git/GitHub for version control, and kept to the project's release timeline.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "State Management",
      "WebView",
      "Profile API",
      "Git / GitHub",
      "Agile",
    ],
    metrics: [
      { labelTh: "บทบาท", labelEn: "Role", value: "Mobile Intern" },
      { labelTh: "กระบวนการ", labelEn: "Methodology", value: "Agile / Scrum" },
      {
        labelTh: "การทำงาน",
        labelEn: "Execution",
        value: "Shipped to production",
      },
    ],
    architectureTh:
      "Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller",
    architectureEn:
      "Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller",
    githubUrl: "https://github.com/Theeraphat-S",
    repositoryType: "commercial",
    repositoryNoticeTh:
      "ซอร์สโค้ดเชิงพาณิชย์ของบริษัทภายใต้ข้อตกลงรักษาความลับ (Proprietary NDA)",
    repositoryNoticeEn: "Commercial production, proprietary codebase (NDA)",
  },
  {
    id: "pos-system",
    titleTh: "ระบบจัดการ ณ จุดขาย (POS System & Store Management)",
    titleEn: "Point of Sale (POS) & Store Management System",
    subtitleTh:
      "ฝึกงาน ณ บริษัท ฝากด้วย โลจิสติกส์ แอนด์ ดิจิทัล แพลตฟอร์ม จำกัด",
    subtitleEn: "Internship at Fakduay Logistics & Digital Platform",
    category: "system",
    year: "2569",
    yearTh: "2569",
    yearEn: "2026",
    tag: "Retail POS Module",
    shortName: "Retail POS",
    origin: "internship",
    proofTh: "คิดเงินต่อได้แม้เน็ตหลุด และไม่คิดเงินซ้ำเมื่อส่งคำขอซ้ำ",
    proofEn: "Checkout keeps working offline, with no double charges on retry",
    color: "#4d7cfe",
    descriptionTh:
      "พัฒนาฟีเจอร์ชำระเงินของโมดูลระบบ ณ จุดขาย (POS) และเชื่อมต่อกับ REST API เพื่อให้รายการขายตรงกับระบบหลังบ้าน",
    descriptionEn:
      "Built checkout features for a retail Point of Sale (POS) module and connected them to the REST API, so transactions stay in sync with the backend.",
    problemTh:
      "การคิดเงินต้องทำต่อได้ตอนเน็ตหลุดชั่วคราว โดยแถวคิดเงินไม่ติดขัด และข้อมูลสต็อกไม่เพี้ยนจากการส่งข้อมูลชนกัน (Race Condition)",
    problemEn:
      "Checkout had to keep running through short network drops, without stalling the line or letting stock data drift out of sync (race conditions).",
    decisionRationaleTh:
      "ออกแบบ Client-side Cart & Order State ที่มี Optimistic Updates และระบบคิวส่ง Request ซ้ำอัตโนมัติ (Retry Mechanism with Idempotency Key) เมื่อต่อเน็ตได้",
    decisionRationaleEn:
      "Implemented optimistic cart updates and an idempotent retry queue so cashiers can keep working when the network drops.",
    tradeOffsTh:
      "ยอมรับภาระการทำ Local Queue Reconciliation และ Conflict Resolution เพื่อให้การสแกนคิดเงินหน้าเคาน์เตอร์ไม่ต้องหยุดรอเครือข่าย",
    tradeOffsEn:
      "Accepted the extra work of reconciling a local queue so checkout never has to wait on the network.",
    evidenceTh:
      "ตอนทดสอบปิด-เปิดเน็ตระหว่างคิดเงิน พบว่าคำขอเดิมอาจถูกส่งซ้ำ จึงสร้าง Transaction UUID ฝั่งเครื่อง เพื่อไม่ให้คิดเงินซ้ำ",
    evidenceEn:
      "Toggling the network during checkout showed the same request could be sent twice, so I added client-generated transaction UUIDs to prevent double-charging.",
    outcomeTh:
      "ระบบคิดเงินทำงานต่อได้แม้เน็ตหลุด โดยเก็บธุรกรรมไว้ในคิว SQLite บนเครื่อง และป้องกันการคิดเงินซ้ำเมื่อส่งซ้ำด้วย Transaction UUID",
    outcomeEn:
      "Checkout keeps working through network drops by holding transactions in a local SQLite queue, and client-generated UUIDs prevent double-charging when the queue retries.",
    highlightsTh: [
      "ทำตะกร้าสินค้าแบบ Reactive ที่คำนวณยอดรวม ภาษี และจำนวนชิ้นใหม่ทันที โดยไม่ต้องรอ Server",
      "เชื่อมต่อ RESTful API ระหว่างหน้าบ้านและระบบหลังบ้าน พร้อมกลไกป้องกันข้อมูลซ้ำซ้อน",
      "เก็บธุรกรรมลงคิว SQLite บนเครื่องเมื่อออฟไลน์ แล้วส่งซ้ำแบบ Idempotent เมื่อกลับมาออนไลน์",
      "เพิ่ม Error Handling ให้ขั้นตอนคิดเงินของแคชเชียร์ทำงานต่อได้เมื่อเน็ตหลุดช่วงสั้น ๆ",
    ],
    highlightsEn: [
      "Built a reactive cart that recalculates totals, tax and item counts without waiting on the server.",
      "Integrated REST APIs between client and backend with duplicate-safe request handling.",
      "Queued transactions in local SQLite during outages and replayed them with idempotency keys on reconnect.",
      "Added error handling so the cashier flow keeps working through short outages.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "SQLite",
      "REST API",
      "MySQL",
      "State Management",
      "Postman",
    ],
    metrics: [
      {
        labelTh: "โหมดออฟไลน์",
        labelEn: "Offline Mode",
        value: "SQLite queue",
        valueTh: "คิว SQLite",
        valueEn: "SQLite queue",
      },
      {
        labelTh: "ป้องกันซ้ำซ้อน",
        labelEn: "Deduplication",
        value: "Idempotency UUID",
      },
      {
        labelTh: "พัฒนาที่",
        labelEn: "Built At",
        value: "Fakduay internship",
        valueTh: "ฝึกงานที่ฝากด้วย",
        valueEn: "Fakduay internship",
      },
    ],
    architectureTh:
      "Modular Client Architecture with Optimistic UI updates and resilient API request retry logic",
    architectureEn:
      "Modular Client Architecture with Optimistic UI updates and resilient API request retry logic",
    githubUrl: "https://github.com/Theeraphat-S",
    repositoryType: "commercial",
    repositoryNoticeTh: "งานช่วงฝึกงาน ซอร์สโค้ดของบริษัท (Private)",
    repositoryNoticeEn: "Internship work, company private codebase",
  },
];
