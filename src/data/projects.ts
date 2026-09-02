import { ProjectItem } from "../types";

export const projectsData: ProjectItem[] = [
  {
    id: "ncds-screening",
    titleTh: "แอปพลิเคชันคัดกรองความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs)",
    titleEn: "NCDs Risk Screening Mobile Application",
    subtitleTh: "โปรเจกต์จบปีสุดท้าย มหาวิทยาลัยแม่โจ้",
    subtitleEn: "Senior Capstone Project at Maejo University",
    category: "mobile",
    year: "2568",
    tag: "Healthcare Mobile App",
    color: "#10b981",
    descriptionTh:
      "แอปพลิเคชันมือถือสำหรับตรวจคัดกรองและประเมินความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) ได้แก่ โรคเบาหวาน, ความดันโลหิตสูง, โรคหัวใจ และโรคอ้วน ออกแบบ UI/UX ให้ใช้งานง่ายและตอบโจทย์ทั้งบุคลากรทางการแพทย์ เจ้าหน้าที่ อสม. และประชาชนทั่วไป",
    descriptionEn:
      "Mobile application designed for risk screening and assessment of Non-Communicable Diseases (NCDs) including Diabetes, Hypertension, Heart Disease, and Obesity. Custom-engineered UI/UX catering to healthcare workers, village health volunteers (VHVs), and patients.",
    problemTh:
      "กระบวนการคัดกรองโรค NCDs ในชุมชนเดิมใช้กระดาษที่มีแบบสอบถามและตัวแปรคำนวณซับซ้อน มักเกิด Human Error ในการคิดคะแนนความเสี่ยง และมีอุปสรรคสำคัญคือพื้นที่ปฏิบัติงานของ อสม. มักเป็นจุดอับสัญญาณอินเทอร์เน็ต",
    problemEn:
      "Traditional community NCDs screening relied on paper forms with multi-variable risk scoring, prone to human calculation errors. Moreover, village health volunteers (VHVs) frequently operate in remote areas with unstable or no internet connectivity.",
    decisionRationaleTh:
      "ย้าย Business Logic ในการประเมิน Risk Scoring และ State Validation ทั้งหมดมาทำงานบน Client-side (Flutter & BLoC) เพื่อให้สามารถคำนวณคะแนนและแสดงผลประเมินความเสี่ยงได้ทันทีแบบ Real-time แม้ไม่มีสัญญาณอินเทอร์เน็ต",
    decisionRationaleEn:
      "Migrated all risk scoring business logic and form state validation to client-side (Flutter & BLoC). This enables instant, zero-latency risk evaluation and continuous operation completely offline.",
    tradeOffsTh:
      "ยอมแลกความซับซ้อนของ BLoC State Machines และ Domain Validation Rules บน Client ที่สูงขึ้น เพื่อรับประกัน Zero-latency, Data Integrity และการประมวลผลที่แม่นยำ 100% หน้างาน",
    tradeOffsEn:
      "Accepted higher state machine and domain validation complexity on the client side in exchange for guaranteed offline reliability, instant feedback, and 100% computational integrity.",
    evidenceTh:
      "จากการทดสอบภาคสนาม (Field Testing) ร่วมกับบุคลากรและ อสม. พบว่า อสม. สับสนกับค่า Lab และศัพท์แพทย์เฉพาะทาง จึง Redesign Input ให้เป็น Visual Range Slider พร้อม Color-coded Status และระบบแปลงหน่วยอัตโนมัติ",
    evidenceEn:
      "Usability field tests with healthcare workers and VHVs revealed confusion around technical lab thresholds. We redesigned inputs into visual range sliders with color-coded risk bands and automatic unit conversions.",
    outcomeTh:
      "ลดเวลาเฉลี่ยในการคัดกรองต่อคนลงจาก 10-15 นาที เหลือ < 3-5 นาที (ลดลงกว่า 60%), ขจัดความผิดพลาดในการคำนวณคะแนนความเสี่ยงเป็น 0%, และส่งออกรายงานสรุปผลให้ รพ.สต. ได้ทันที",
    outcomeEn:
      "Reduced screening time per patient from 10-15 mins to < 3-5 mins (>60% reduction), eliminated scoring calculation errors to 0%, and enabled immediate automated medical report generation.",
    highlightsTh: [
      "ออกแบบและพัฒนา Front-end ด้วย Flutter & Dart พร้อมสถาปัตยกรรม Bloc เพื่อการจัดการ State ที่มีประสิทธิภาพสูง",
      "จัดการฐานข้อมูลด้วย MySQL สำหรับบันทึกและประมวลผลข้อมูลผู้ป่วยอย่างรัดกุม ปลอดภัยตามมาตรฐานข้อมูลสุขภาพ",
      "พัฒนาระบบคำนวณและประเมินคะแนนความเสี่ยง (Risk Score Algorithm) พร้อมออกรายงานสรุปผลการคัดกรองอัตโนมัติ",
      "ทดสอบการใช้งานจริง (Field Testing) ร่วมกับบุคลากรทางการแพทย์และเจ้าหน้าที่ อสม. ในพื้นที่จริงเพื่อปรับปรุง UI/UX ให้ใช้งานง่ายที่สุด",
    ],
    highlightsEn: [
      "Built full Front-end with Flutter & Dart using Bloc State Management for robust, scalable reactive UI.",
      "Structured MySQL database management for secure, accurate patient health records.",
      "Engineered automated risk scoring algorithm with instant medical report generation.",
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
        value: "< 3-5 นาที",
      },
      {
        labelTh: "ความแม่นยำคะแนน",
        labelEn: "Scoring Accuracy",
        value: "100% (Zero Error)",
      },
      {
        labelTh: "โรคที่รองรับ",
        labelEn: "Diseases Covered",
        value: "4 กลุ่มโรค",
      },
    ],
    architectureTh:
      "Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)",
    architectureEn:
      "Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)",
    githubUrl: "https://github.com/Theeraphat-S",
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
    tag: "Commercial App Feature",
    color: "#06b6d4",
    descriptionTh:
      "ร่วมพัฒนาและอัปเดตฟีเจอร์สำคัญบนแอปพลิเคชัน Pinto ในระดับ Production จัดการสถาปัตยกรรม State Management เพื่อรองรับการแสดงผลเมนู WebView และพัฒนาระบบสะสมแต้มแชท (Chat Streaks) พร้อมเชื่อมต่อ Profile API",
    descriptionEn:
      "Engineered and shipped core features on the production Pinto Application. Managed state architecture for hybrid WebView menu integration and developed gamified Chat Streaks system synced with user Profile API.",
    problemTh:
      "ต้องการเพิ่ม Daily Active Users (DAU) และ User Engagement ภายในแอป โดยผสานหน้าเว็บ WebView ที่มีอยู่เดิมเข้ากับ Native Experience โดยไม่ทำให้ประสิทธิภาพและความลื่นไหลของแอปลดลง",
    problemEn:
      "Needed to boost Daily Active Users (DAU) and engagement by seamlessly bridging legacy dynamic WebView menus with native Flutter experiences without degrading performance.",
    decisionRationaleTh:
      "ออกแบบ State Bridge Controller เพื่อซิงค์ข้อมูลระหว่าง Flutter Native กับ WebView และสร้างระบบ Chat Streaks Gamification เชื่อมต่อกับ Profile API",
    decisionRationaleEn:
      "Engineered a State Bridge Controller to synchronize state between native Flutter and WebView, and built a gamified Chat Streaks mechanism connected with user Profile API.",
    tradeOffsTh:
      "จัดการ Memory Overhead และ Lifecycle ของ Hybrid WebView เพื่อแลกกับความยืดหยุ่นในการอัปเดตเมนูโปรโมชั่นฝั่ง Server โดยไม่ต้อง Release App Store ใหม่",
    tradeOffsEn:
      "Balanced hybrid WebView memory overhead against business agility, allowing instant server-side menu updates without requiring App Store release cycles.",
    evidenceTh:
      "วิเคราะห์พฤติกรรมผู้ใช้พบว่า Drop-off rate สูงขึ้นเมื่อเกิดหน้าจอโหลดค้าง จึงปรับปรุง Caching Strategy และ Optimistic UI ระหว่างสลับเมนู",
    evidenceEn:
      "User telemetry indicated drop-offs during slow WebView reloads, prompting implementation of proactive caching and optimistic UI state transitions.",
    outcomeTh:
      "ยกระดับ User Retention และ Chat Engagement ได้ตามเป้าหมายของทีม พร้อมทั้งส่งมอบโมดูลที่เสถียรขึ้นสู่ Production ตามกำหนดเวลาของ Sprint",
    outcomeEn:
      "Met user retention and streak engagement targets while delivering robust, production-ready modules within Agile sprint schedules.",
    highlightsTh: [
      "พัฒนาและปรับปรุงฟีเจอร์ด้วย Flutter & Dart รองรับการสลับเมนูแบบ Hybrid WebView ได้อย่างลื่นไหลไม่มีสะดุด",
      "สร้างระบบ Gamification สะสมแต้มต่อเนื่อง (Chat Streaks) เพื่อกระตุ้นการมีส่วนร่วม (Engagement) ของผู้ใช้งาน",
      "เชื่อมต่อระบบคะแนนและข้อมูลผู้ใช้งานผ่าน Profile API ได้อย่างแม่นยำและปลอดภัย",
      "ทำงานร่วมกับทีมผ่านกระบวนการ Agile / Scrum และควบคุมเวอร์ชันโค้ดด้วย Git / GitHub ตาม Timeline",
    ],
    highlightsEn: [
      "Delivered responsive Flutter & Dart modules seamlessly bridging native screens with dynamic WebView menus.",
      "Implemented gamified Chat Streaks logic boosting daily active user engagement and retention.",
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
  },
  {
    id: "pos-system",
    titleTh: "ระบบจัดการ ณ จุดขาย (POS System & Store Management)",
    titleEn: "Point of Sale (POS) & Store Management System",
    subtitleTh: "ระบบจัดการสินค้าและการรับชำระเงินสำหรับธุรกิจค้าปลีก",
    subtitleEn: "Retail Store Inventory & Payment Management",
    category: "system",
    year: "2569",
    tag: "Enterprise System",
    color: "#3b82f6",
    descriptionTh:
      "ออกแบบและพัฒนาโมดูลฝั่งระบบจัดการร้านค้า ณ จุดขาย (POS) เชื่อมต่อ Rest API ระหว่างหน้าบ้านและระบบหลังบ้านเพื่อจัดการข้อมูลสินค้า ออเดอร์ และการรับชำระเงินให้มีความถูกต้อง เสถียร และปลอดภัย",
    descriptionEn:
      "Designed and developed retail Point of Sale (POS) store management modules. Integrated Rest APIs between client and backend to ensure synchronized inventory data, instant transaction processing, and receipt generation.",
    problemTh:
      "ระบบแคชเชียร์และจัดการสต็อกแบบเดิมทำงานช้า ไม่รองรับการเชื่อมต่อขัดข้องชั่วคราว ทำให้แถวคิดเงินติดขัดและเสี่ยงต่อข้อมูลสต็อกไม่ตรงกัน (Race Condition)",
    problemEn:
      "Legacy POS and stock tracking suffered from checkout bottlenecks and risk of data inconsistencies (race conditions) during intermittent network disconnections.",
    decisionRationaleTh:
      "ออกแบบ Client-side Cart & Order State ที่มี Optimistic Updates และระบบคิวส่ง Request ซ้ำอัตโนมัติ (Retry Mechanism with Idempotency Key) เมื่อต่อเน็ตได้",
    decisionRationaleEn:
      "Implemented optimistic cart state updates with idempotent background retry queues to ensure seamless cashier operations during network hiccups.",
    tradeOffsTh:
      "ยอมรับภาระการทำ Local Queue Reconciliation และ Conflict Resolution เพื่อแลกกับความเร็วในการสแกนคิดเงินหน้าเคาน์เตอร์ที่ไม่มีทางสะดุด",
    tradeOffsEn:
      "Accepted local queue reconciliation overhead to ensure zero checkout friction and non-blocking cashier UX.",
    evidenceTh:
      "ทดสอบ Stress Test ในสภาวะเน็ตกระตุก พบโอกาสยิง API ซ้ำ จึงเพิ่ม Client-generated Transaction UUID เพื่อป้องกัน Double-charging",
    evidenceEn:
      "Network stress testing exposed potential duplicate API triggers, leading to client-generated transaction UUIDs to guarantee zero double-charging.",
    outcomeTh:
      "อัตราความถูกต้องของข้อมูลธุรกรรมและสต็อกสินค้าอยู่ที่ 99.9% และลดเวลาต่อหนึ่ง Transaction ลงอย่างชัดเจน",
    outcomeEn:
      "Maintained 99.9% transaction and inventory consistency while significantly reducing average checkout duration per customer.",
    highlightsTh: [
      "ออกแบบระบบจัดการสินค้าคงคลัง (Inventory) และระบบตะกร้าสินค้าที่คิดคำนวณราคาและภาษีอัตโนมัติ",
      "เชื่อมต่อ RESTful API ความเร็วสูงระหว่างหน้าบ้านและระบบหลังบ้าน พร้อมกลไกป้องกันข้อมูลซ้ำซ้อน",
      "รองรับระบบชำระเงินแบบหลายช่องทาง (เงินสด, QR Code PromptPay) และออกใบเสร็จรับเงิน",
      "ระบบออกแบบให้ทำงานได้อย่างต่อเนื่องแม้ในสภาวะการเชื่อมต่อที่ไม่เสถียร (Offline-tolerant UI)",
    ],
    highlightsEn: [
      "Designed real-time inventory tracking and dynamic checkout calculation logic.",
      "Integrated high-throughput REST APIs ensuring zero transaction loss during peak operations.",
      "Supported multi-channel payments (Cash, QR PromptPay) with instant digital receipt generation.",
      "Engineered error-resilient client handling for seamless offline-tolerant cashier flow.",
    ],
    technologies: [
      "React / Flutter",
      "JavaScript / Dart",
      "REST API",
      "MySQL",
      "State Management",
      "Postman",
    ],
    metrics: [
      {
        labelTh: "ความถูกต้องข้อมูล",
        labelEn: "Data Consistency",
        value: "99.9%",
      },
      {
        labelTh: "ช่องทางชำระ",
        labelEn: "Payment Options",
        value: "Cash & QR PromptPay",
      },
      {
        labelTh: "สถาปัตยกรรม",
        labelEn: "Architecture",
        value: "RESTful Integration",
      },
    ],
    architectureTh:
      "Modular Client Architecture with Optimistic UI updates and resilient API request retry logic",
    architectureEn:
      "Modular Client Architecture with Optimistic UI updates and resilient API request retry logic",
    githubUrl: "https://github.com/Theeraphat-S",
  },
];
