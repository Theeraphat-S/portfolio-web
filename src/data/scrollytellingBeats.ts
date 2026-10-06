import { StoryBeat } from "../types/portfolio";

export const BEATS_BY_PROJECT: Record<string, StoryBeat[]> = {
  "ncds-screening": [
    {
      id: "intake-validation",
      badgeTh: "01 // FORM & BLoC INTAKE",
      badgeEn: "01 // FORM & BLoC INTAKE",
      titleTh: "การรับข้อมูล Vitals & การตรวจสอบฝั่ง Client",
      titleEn: "Client-side Vitals Intake & Validation",
      subtitleTh: "สถาปัตยกรรม Clean Architecture แบบไร้ความหน่วง",
      subtitleEn: "Zero-Latency UI with Clean Architecture",
      descriptionTh:
        "Presentation Layer ขับเคลื่อนด้วย BLoC รับข้อมูล Vitals (ระดับน้ำตาล, ความดัน) และตรวจสอบความถูกต้องแบบ Real-time โดยไม่พึ่งพาเครือข่าย",
      descriptionEn:
        "BLoC Presentation Layer receives vitals (glucose, blood pressure) and validates clinical thresholds in real-time with zero network latency.",
      streamTag: "FORM_VALIDATED",
      streamState: "UpdateVitalsEvent",
      streamDetails: "Glucose: 108 mg/dL, BP: 122/80 mmHg ➔ Normal Range",
      highlightSpecs: ["Flutter 3.x", "BLoC Pattern", "Form Validation"],
    },
    {
      id: "scoring-algorithm",
      badgeTh: "02 // RISK ALGORITHM",
      badgeEn: "02 // RISK ALGORITHM",
      titleTh: "อัลกอริทึมประเมินความเสี่ยงโรคเรื้อรังอัตโนมัติ",
      titleEn: "Automated Clinical Risk Scoring Engine",
      subtitleTh: "การประมวลผล Domain Logic เชิงกำหนด",
      subtitleEn: "Deterministic Domain Calculation",
      descriptionTh:
        "Business Logic ประเมินความเสี่ยงโรคเบาหวาน ความดันโลหิต หัวใจ และโรคอ้วน แยก Tier (Low, Moderate, High) ทันทีบนอุปกรณ์ ขจัด Human Calculation Error 100%",
      descriptionEn:
        "Domain layer evaluates Diabetes, Hypertension, Cardiac, and Obesity risk tiers instantly on-device, eliminating human calculation error by 100%.",
      streamTag: "BLoC::State",
      streamState: "RiskEvaluatedState",
      streamDetails: "Score: 4/15 (MODERATE Tier Verified)",
      highlightSpecs: [
        "Risk Scoring Engine",
        "Clean Architecture",
        "Domain Logic",
      ],
    },
    {
      id: "record-submission",
      badgeTh: "03 // PERSISTENCE & REPORT",
      badgeEn: "03 // PERSISTENCE & REPORT",
      titleTh: "บันทึกผลผ่าน REST API & ออกรายงาน",
      titleEn: "REST API Record Submission & Report Export",
      subtitleTh: "ข้อมูลผู้ป่วยรวมศูนย์ใน MySQL",
      subtitleEn: "Centralized MySQL Patient Records",
      descriptionTh:
        "เมื่อประเมินเสร็จ ผลคัดกรองที่ผ่านการตรวจสอบแล้วจะถูกส่งผ่าน REST API ไปเก็บในฐานข้อมูล MySQL ส่วนกลาง พร้อมออกรายงานผลการตรวจ PDF ให้ผู้รับการคัดกรองได้ทันที",
      descriptionEn:
        "Once scoring completes, the validated screening record is submitted through the REST API into a central MySQL database, with one-touch PDF report generation for the patient.",
      streamTag: "REST_SUBMIT",
      streamState: "RecordSubmittedState",
      streamDetails:
        "POST /assessments ➔ MySQL record saved & PDF export ready",
      highlightSpecs: ["REST API", "MySQL", "PDF Export Engine"],
    },
  ],
  "pinto-app": [
    {
      id: "order-tracking",
      badgeTh: "01 // REALTIME TRACKING",
      badgeEn: "01 // REALTIME TRACKING",
      titleTh: "ระบบติดตามคำสั่งซื้อเรียลไทม์ผ่าน WebSocket",
      titleEn: "Real-time Order Tracking & WebSocket Sync",
      subtitleTh: "สตรีมพิกัดตำแหน่งสดความหน่วงต่ำ",
      subtitleEn: "Low-Latency Location Stream",
      descriptionTh:
        "ซิงค์ตำแหน่งพนักงานขับ (Courier) แบบเรียลไทม์ แสดงผลบนหน้าจอคำสั่งซื้อพร้อมคำนวณระยะทางและเวลาที่เหลือ (ETA) แม่นยำ",
      descriptionEn:
        "Real-time courier GPS coordinates streamed over WebSockets, updating ETA and delivery milestone cards reactively.",
      streamTag: "WS_SYNC",
      streamState: "OrderTrackingState",
      streamDetails: "Courier Somchai K. (1.4km away, ETA 12:45)",
      highlightSpecs: ["WebSocket Stream", "Live GPS Telemetry", "BLoC State"],
    },
    {
      id: "chat-streaks",
      badgeTh: "02 // GAMIFIED RETENTION",
      badgeEn: "02 // GAMIFIED RETENTION",
      titleTh: "ระบบสะสมแต้มแชทต่อเนื่อง (Chat Streaks)",
      titleEn: "Gamified Chat Streaks Retention Engine",
      subtitleTh: "การกระตุ้นการมีส่วนร่วมและ DAU",
      subtitleEn: "Daily Active Users Engagement",
      descriptionTh:
        "กลไกสะสมแต้มแชทและภารกิจประจำวันเพื่อกระตุ้น DAU และการมีส่วนร่วม พร้อมคำนวณ Reward Multiplier แบบไดนามิกตาม Streak Count",
      descriptionEn:
        "Gamified streak engine motivating daily interactions, computing reward tier multipliers, and syncing state seamlessly with user profile.",
      streamTag: "STREAK_UPDATED",
      streamState: "StreakCountState",
      streamDetails: "Streak: 14 Days 🔥 (Multiplier 1.25x Active)",
      highlightSpecs: [
        "Gamification Engine",
        "State Management",
        "DAU Metrics",
      ],
    },
    {
      id: "webview-bridge",
      badgeTh: "03 // HYBRID PLATFORM BRIDGE",
      badgeEn: "03 // HYBRID PLATFORM BRIDGE",
      titleTh: "สถาปัตยกรรม Hybrid WebView Bridge & Profile API",
      titleEn: "Hybrid WebView Bridge & Profile API Integration",
      subtitleTh: "ช่องทางเชื่อมต่อสองทิศทางข้ามแพลตฟอร์ม",
      subtitleEn: "Bidirectional Platform Channel",
      descriptionTh:
        "เชื่อมผสานหน้าเว็บโปรโมชันเดิมผ่าน JavaScript Channel เข้ากับ Flutter Native อย่างแนบเนียน และซิงค์ Token ผู้ใช้งานกับ Profile API",
      descriptionEn:
        "Bidirectional JavaScriptChannel bridge synchronizing auth tokens and cart payloads between legacy WebViews and native Flutter widgets.",
      streamTag: "WEBVIEW_MESSAGE",
      streamState: "ProfileApiHandshakeState",
      streamDetails: "JWT Token Handshake ➔ Profile API HTTP 200 OK",
      highlightSpecs: [
        "WebView Bridge",
        "REST Profile API",
        "JavaScriptChannel",
      ],
    },
  ],
  "pos-system": [
    {
      id: "cart-state-machine",
      badgeTh: "01 // REACTIVE CART",
      badgeEn: "01 // REACTIVE CART",
      titleTh: "ระบบสแกนบาร์โค้ด & จัดการตะกร้าสินค้าความเร็วสูง",
      titleEn: "High-Speed Barcode & Cart State Machine",
      subtitleTh: "กลไกตะกร้าสินค้าแบบ Reactive",
      subtitleEn: "Reactive Cart Engine",
      descriptionTh:
        "สถาปัตยกรรมตะกร้าสินค้าแบบ Reactive อัปเดตยอดรวมและจำนวนชิ้นทันที ค้นหาสินค้าจาก Local Cache ด้วยความเร็วระดับ Sub-millisecond",
      descriptionEn:
        "Reactive cart state engine calculating totals, taxes, and item counts with sub-millisecond local SKU cache hits.",
      streamTag: "CART_MUTATION",
      streamState: "CartUpdatedState",
      streamDetails: "Register #04 Ready ➔ 2 SKUs in Cart, Net: ฿420.00",
      highlightSpecs: ["Local SQLite Cache", "Reactive Cart", "Barcode Engine"],
    },
    {
      id: "offline-idempotency",
      badgeTh: "02 // FAULT-TOLERANT OFFLINE",
      badgeEn: "02 // FAULT-TOLERANT OFFLINE",
      titleTh: "โหมดออฟไลน์พร้อมคิวซิงค์ที่มีความคงทน (Idempotency)",
      titleEn: "Optimistic UI & Idempotent Offline Sync Queue",
      subtitleTh: "ระบบขายหน้าร้านที่ทนทานต่อข้อผิดพลาด",
      subtitleEn: "Fault-Tolerant Store Operations",
      descriptionTh:
        "ขายและออกใบเสร็จได้อย่างต่อเนื่องแม้เน็ตหลุด ด้วยการบันทึกลง Write-Ahead Logging (WAL) และคิวส่งข้อมูลซ้ำที่มี Idempotency Key ป้องกันการบันทึกซ้ำซ้อน",
      descriptionEn:
        "Ensures retail continuity during network blackouts via local SQLite WAL logs and idempotent background retry queues.",
      streamTag: "QUEUE_ENQUEUED",
      streamState: "OfflineModeActiveState",
      streamDetails:
        "Network disconnected. Offline WAL queue active (TxID #TX-9042)",
      highlightSpecs: ["Idempotency Queue", "Offline WAL", "Optimistic UI"],
    },
    {
      id: "transaction-checkout",
      badgeTh: "03 // ESC/POS CHECKOUT",
      badgeEn: "03 // ESC/POS CHECKOUT",
      titleTh: "การชำระเงิน & คำสั่งพิมพ์ใบเสร็จผ่าน Thermal Printer",
      titleEn: "Finalized Checkout & Thermal Print Dispatch",
      subtitleTh: "การเชื่อมต่ออุปกรณ์ฮาร์ดแวร์และบันทึกตรวจสอบ",
      subtitleEn: "Hardware Integration & Audit Trail",
      descriptionTh:
        "จำลองขั้นตอนการชำระเงินและส่งคำสั่งพิมพ์ใบเสร็จผ่าน ESC/POS Driver โดยตรง พร้อมบันทึกประวัติการขายเข้าระบบ Audit Trail อย่างสมบูรณ์",
      descriptionEn:
        "Dispatches direct ESC/POS byte streams to thermal receipt printers upon checkout confirmation, creating tamper-evident audit trails.",
      streamTag: "TRANSACTION_COMMITTED",
      streamState: "ReceiptPrintedState",
      streamDetails: "Tx #TX-9042 committed. Thermal print stream dispatched.",
      highlightSpecs: ["ESC/POS Driver", "Payment Gateway", "Audit Trail"],
    },
  ],
};
