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
    color: "#10b981",
    descriptionTh:
      "แอปพลิเคชันมือถือสำหรับตรวจคัดกรองและประเมินความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) ได้แก่ โรคเบาหวาน, ความดันโลหิตสูง, โรคหัวใจ และโรคอ้วน ออกแบบ UI/UX ให้ใช้งานง่ายและตอบโจทย์ทั้งบุคลากรทางการแพทย์ เจ้าหน้าที่ อสม. และประชาชนทั่วไป",
    descriptionEn:
      "Mobile application designed for risk screening and assessment of Non-Communicable Diseases (NCDs) including Diabetes, Hypertension, Heart Disease, and Obesity. UI designed for healthcare workers, village health volunteers (VHVs), and patients.",
    problemTh:
      "กระบวนการคัดกรองโรค NCDs ในชุมชนเดิมใช้กระดาษที่มีแบบสอบถามและตัวแปรคำนวณซับซ้อน มักเกิด Human Error ในการคิดคะแนนความเสี่ยง และมีอุปสรรคสำคัญคือพื้นที่ปฏิบัติงานของ อสม. มักเป็นจุดอับสัญญาณอินเทอร์เน็ต",
    problemEn:
      "Traditional community NCDs screening relied on paper forms with multi-variable risk scoring, prone to human calculation errors. Moreover, village health volunteers (VHVs) frequently operate in remote areas with unstable or no internet connectivity.",
    decisionRationaleTh:
      "ย้าย Business Logic ในการประเมิน Risk Scoring และ State Validation ทั้งหมดมาทำงานบน Client-side (Flutter & BLoC) เพื่อให้สามารถคำนวณคะแนนและแสดงผลประเมินความเสี่ยงได้ทันทีแบบ Real-time แม้ไม่มีสัญญาณอินเทอร์เน็ต",
    decisionRationaleEn:
      "Migrated all risk scoring business logic and form state validation to client-side (Flutter & BLoC). This allows risk evaluation without a network request.",
    tradeOffsTh:
      "ยอมแลกความซับซ้อนของ BLoC State Machines และ Domain Validation Rules บน Client ที่สูงขึ้น เพื่อให้คำนวณคะแนนได้โดยไม่ต้องรอเครือข่าย และตรวจสอบข้อมูลก่อนประมวลผล",
    tradeOffsEn:
      "Accepted higher state machine and domain validation complexity on the client side to support offline scoring and input validation.",
    evidenceTh:
      "จากการทดสอบภาคสนาม (Field Testing) ร่วมกับบุคลากรและ อสม. พบว่า อสม. สับสนกับค่า Lab และศัพท์แพทย์เฉพาะทาง จึง Redesign Input ให้เป็น Visual Range Slider พร้อม Color-coded Status และระบบแปลงหน่วยอัตโนมัติ",
    evidenceEn:
      "Usability field tests with healthcare workers and VHVs revealed confusion around technical lab thresholds. We redesigned inputs into visual range sliders with color-coded risk bands and automatic unit conversions.",
    outcomeTh:
      "ลดเวลาคัดกรองต่อคนลงเหลือ < 3-5 นาที (จากเดิม 10-15 นาทีในกระบวนการบันทึกด้วยมือ), ขจัดความผิดพลาดในการคำนวณคะแนนความเสี่ยง (100% computational integrity ตามเกณฑ์ประเมินทางการแพทย์), พร้อมออกรายงานสรุปผลการตรวจได้ทันที",
    outcomeEn:
      "Reduced screening time per patient to < 3-5 mins (down from 10-15 mins in manual workflows), achieved 100% calculation integrity matching clinical guidelines, and enabled instant summary report generation.",
    highlightsTh: [
      "พัฒนา Front-end ด้วย Flutter & Dart โดยใช้ BLoC จัดการ State",
      "จัดการฐานข้อมูลด้วย MySQL สำหรับบันทึกและประมวลผลข้อมูลผู้ป่วยอย่างรัดกุม ปลอดภัยตามมาตรฐานข้อมูลสุขภาพ",
      "พัฒนาระบบคำนวณและประเมินคะแนนความเสี่ยง (Risk Score Algorithm) พร้อมออกรายงานสรุปผลการคัดกรองอัตโนมัติ",
      "ทดสอบการใช้งานจริง (Field Testing) ร่วมกับบุคลากรทางการแพทย์และเจ้าหน้าที่ อสม. ในพื้นที่จริงเพื่อปรับปรุง UI/UX ให้ใช้งานง่ายที่สุด",
    ],
    highlightsEn: [
      "Built the Flutter & Dart front end, using BLoC for state management.",
      "Structured MySQL database management for secure, accurate patient health records.",
      "Built the automated risk-scoring logic and summary report generation.",
      "Conducted real-world usability testing with healthcare professionals and Village Health Volunteers (VHVs).",
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
    repositoryNoticeEn: "Community Healthcare Research · Private Codebase",
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
    color: "#06b6d4",
    descriptionTh:
      "ร่วมพัฒนาและอัปเดตฟีเจอร์บนแอปพลิเคชัน Pinto ที่ใช้งานจริง ดูแล State Management เพื่อรองรับการแสดงผลเมนู WebView และพัฒนาระบบสะสมแต้มแชท (Chat Streaks) พร้อมเชื่อมต่อ Profile API",
    descriptionEn:
      "Built and shipped features on the production Pinto app: state management for the hybrid WebView menus, and a gamified Chat Streaks system synced with the user Profile API.",
    problemTh:
      "ต้องการเพิ่ม Daily Active Users (DAU) และ User Engagement ภายในแอป โดยผสานหน้าเว็บ WebView ที่มีอยู่เดิมเข้ากับ Native Experience โดยไม่ทำให้ประสิทธิภาพและความลื่นไหลของแอปลดลง",
    problemEn:
      "Needed to boost Daily Active Users (DAU) and engagement by bringing the existing WebView menus into the native Flutter app without slowing it down.",
    decisionRationaleTh:
      "ออกแบบ State Bridge Controller เพื่อซิงค์ข้อมูลระหว่าง Flutter Native กับ WebView และสร้างระบบ Chat Streaks Gamification เชื่อมต่อกับ Profile API",
    decisionRationaleEn:
      "Built a state bridge controller to keep native Flutter and the WebView in sync, and a gamified Chat Streaks feature connected to the user Profile API.",
    tradeOffsTh:
      "จัดการ Memory Overhead และ Lifecycle ของ Hybrid WebView เพื่อแลกกับความยืดหยุ่นในการอัปเดตเมนูโปรโมชั่นฝั่ง Server โดยไม่ต้อง Release App Store ใหม่",
    tradeOffsEn:
      "Balanced hybrid WebView memory overhead against business agility, allowing instant server-side menu updates without requiring App Store release cycles.",
    evidenceTh:
      "หน้าเมนู WebView ที่โหลดซ้ำทุกครั้งทำให้รู้สึกช้า จึงเพิ่ม Caching และ Optimistic UI ระหว่างสลับเมนู ให้หน้าจอไม่ค้างรอโหลด",
    evidenceEn:
      "Reloading the WebView menu on every visit felt slow, so I added caching and optimistic UI updates between menus to keep the screen from stalling.",
    outcomeTh:
      "ร่วมส่งมอบฟีเจอร์เมนู WebView และระบบ Gamification Chat Streaks สู่ Production พร้อมเชื่อมต่อ Profile API อย่างเสถียร รองรับการขยายตัวของผู้ใช้งานตามเป้าหมายของทีม",
    outcomeEn:
      "Successfully shipped hybrid WebView menus and gamified Chat Streaks features to production, integrating with Profile API and meeting team sprint delivery targets.",
    highlightsTh: [
      "พัฒนาและปรับปรุงฟีเจอร์ด้วย Flutter & Dart รองรับการสลับเมนูแบบ Hybrid WebView",
      "สร้างระบบ Gamification สะสมแต้มต่อเนื่อง (Chat Streaks) เพื่อกระตุ้นการมีส่วนร่วม (Engagement) ของผู้ใช้งาน",
      "เชื่อมต่อระบบคะแนนและข้อมูลผู้ใช้งานผ่าน Profile API ได้อย่างแม่นยำและปลอดภัย",
      "ทำงานร่วมกับทีมผ่านกระบวนการ Agile / Scrum และควบคุมเวอร์ชันโค้ดด้วย Git / GitHub ตาม Timeline",
    ],
    highlightsEn: [
      "Built Flutter & Dart modules connecting native screens with the WebView menus.",
      "Implemented the Chat Streaks logic, designed to encourage users to chat daily.",
      "Integrated Profile API for real-time loyalty point updates and reward redemption.",
      "Collaborated in Agile sprints with Git/GitHub version control meeting project release timelines.",
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
      { labelTh: "การทำงาน", labelEn: "Execution", value: "Production-ready" },
    ],
    architectureTh:
      "Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller",
    architectureEn:
      "Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller",
    githubUrl: "https://github.com/Theeraphat-S",
    repositoryType: "commercial",
    repositoryNoticeTh:
      "ซอร์สโค้ดเชิงพาณิชย์ของบริษัทภายใต้ข้อตกลงรักษาความลับ (Proprietary NDA)",
    repositoryNoticeEn: "Commercial Production · Proprietary Codebase (NDA)",
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
    color: "#3b82f6",
    descriptionTh:
      "ออกแบบและพัฒนาโมดูลฝั่งระบบจัดการร้านค้า ณ จุดขาย (POS) เชื่อมต่อ Rest API ระหว่างหน้าบ้านและระบบหลังบ้านเพื่อจัดการข้อมูลสินค้า ออเดอร์ และการรับชำระเงินให้มีความถูกต้อง เสถียร และปลอดภัย",
    descriptionEn:
      "Designed and developed retail Point of Sale (POS) store management modules. Integrated Rest APIs between client and backend to keep inventory data in sync and transactions reliable.",
    problemTh:
      "ระบบแคชเชียร์และจัดการสต็อกแบบเดิมทำงานช้า ไม่รองรับการเชื่อมต่อขัดข้องชั่วคราว ทำให้แถวคิดเงินติดขัดและเสี่ยงต่อข้อมูลสต็อกไม่ตรงกัน (Race Condition)",
    problemEn:
      "Legacy POS and stock tracking suffered from checkout bottlenecks and risk of data inconsistencies (race conditions) during intermittent network disconnections.",
    decisionRationaleTh:
      "ออกแบบ Client-side Cart & Order State ที่มี Optimistic Updates และระบบคิวส่ง Request ซ้ำอัตโนมัติ (Retry Mechanism with Idempotency Key) เมื่อต่อเน็ตได้",
    decisionRationaleEn:
      "Implemented optimistic cart updates and an idempotent retry queue so cashiers can keep working when the network drops.",
    tradeOffsTh:
      "ยอมรับภาระการทำ Local Queue Reconciliation และ Conflict Resolution เพื่อแลกกับความเร็วในการสแกนคิดเงินหน้าเคาน์เตอร์ที่ไม่มีทางสะดุด",
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
      "ออกแบบระบบจัดการสินค้าคงคลัง (Inventory) และระบบตะกร้าสินค้าที่คิดคำนวณราคาและภาษีอัตโนมัติ",
      "เชื่อมต่อ RESTful API ระหว่างหน้าบ้านและระบบหลังบ้าน พร้อมกลไกป้องกันข้อมูลซ้ำซ้อน",
      "เก็บธุรกรรมลงคิว SQLite บนเครื่องเมื่อออฟไลน์ แล้วส่งซ้ำแบบ Idempotent เมื่อกลับมาออนไลน์",
      "ระบบออกแบบให้ทำงานได้อย่างต่อเนื่องแม้ในสภาวะการเชื่อมต่อที่ไม่เสถียร (Offline-tolerant UI)",
    ],
    highlightsEn: [
      "Designed real-time inventory tracking and dynamic checkout calculation logic.",
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
    repositoryNoticeTh: "งานช่วงฝึกงาน · ซอร์สโค้ดของบริษัท (Private)",
    repositoryNoticeEn: "Internship work · Company private codebase",
  },
];
