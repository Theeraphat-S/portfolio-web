import { StoryBeat } from "../types/portfolio";

export const BEATS_BY_PROJECT: Record<string, StoryBeat[]> = {
  "ncds-screening": [
    {
      id: "intake-validation",
      badgeTh: "01 // FORM & BLoC INTAKE",
      badgeEn: "01 // FORM & BLoC INTAKE",
      titleTh: "การรับข้อมูล Vitals & การตรวจสอบฝั่ง Client",
      titleEn: "Client-side Vitals Intake & Validation",
      subtitleTh: "ตรวจค่าบนเครื่อง ไม่ต้องรอเครือข่าย",
      subtitleEn: "Validated on the device, no network wait",
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
      titleTh: "คำนวณความเสี่ยงโรคเรื้อรังอัตโนมัติ",
      titleEn: "Automatic Risk Scoring",
      subtitleTh: "ใส่ค่าเดิม ได้คะแนนเดิมทุกครั้ง",
      subtitleEn: "Same inputs, same score, every time",
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
      id: "webview-menu",
      badgeTh: "01 // HYBRID WEBVIEW MENU",
      badgeEn: "01 // HYBRID WEBVIEW MENU",
      titleTh: "เมนู WebView ภายในแอป Flutter",
      titleEn: "Hybrid WebView Menu in a Native Shell",
      subtitleTh: "อัปเดตเมนูจากฝั่ง Server ได้โดยไม่ต้องออกเวอร์ชันใหม่",
      subtitleEn: "Server-driven menus without app releases",
      descriptionTh:
        "นำหน้าเมนูร้านค้าแบบเว็บเดิมมาแสดงใน WebView ภายในแอป Flutter และจัดการ State ให้ตะกร้าสินค้าฝั่ง Native ตรงกับเมนูบนเว็บ",
      descriptionEn:
        "Embedded the existing web menus in a WebView inside the Flutter app, with state management keeping the native cart in step with the web menu.",
      streamTag: "WEBVIEW_MESSAGE",
      streamState: "WebViewMenuLoadedState",
      streamDetails: "Hybrid menu loaded in native shell ➔ cart bridge ready",
      highlightSpecs: ["WebView", "State Management", "Native Cart"],
    },
    {
      id: "chat-streaks",
      badgeTh: "02 // GAMIFIED RETENTION",
      badgeEn: "02 // GAMIFIED RETENTION",
      titleTh: "ระบบสะสมแต้มแชทต่อเนื่อง (Chat Streaks)",
      titleEn: "Gamified Chat Streaks",
      subtitleTh: "กระตุ้นให้ผู้ใช้กลับมาใช้งานทุกวัน",
      subtitleEn: "A daily reason to come back",
      descriptionTh:
        "กลไกนับวันแชทต่อเนื่องและให้รางวัลเมื่อเช็คอินครบตามเงื่อนไข เพื่อกระตุ้นการใช้งานรายวัน",
      descriptionEn:
        "Streak logic that counts consecutive chat days and unlocks rewards on check-in, giving users a daily reason to return.",
      streamTag: "STREAK_UPDATED",
      streamState: "StreakCountState",
      streamDetails: "Day 8 claimed ➔ +50 pts, voucher unlocked",
      highlightSpecs: ["Gamification", "BLoC", "Rewards"],
    },
    {
      id: "profile-sync",
      badgeTh: "03 // PROFILE API SYNC",
      badgeEn: "03 // PROFILE API SYNC",
      titleTh: "ซิงค์แต้มและสถานะผ่าน Profile API",
      titleEn: "Profile API Sync & State Bridge",
      subtitleTh: "ยอดเดียวกันทั้งหน้า Native และ WebView",
      subtitleEn: "One balance across native and web screens",
      descriptionTh:
        "บันทึกแต้มจาก Chat Streaks ผ่าน Profile API และใช้ State Bridge ส่งข้อมูลผู้ใช้ระหว่าง Flutter กับ WebView ให้ทุกหน้าจอแสดงข้อมูลเดียวกัน",
      descriptionEn:
        "Streak points are written through the Profile API, and a state bridge passes user data between Flutter and the WebView so every screen shows the same profile.",
      streamTag: "PROFILE_API",
      streamState: "ProfileSyncedState",
      streamDetails: "GET /profile ➔ points & tier refreshed",
      highlightSpecs: ["Profile API", "REST", "State Bridge"],
    },
  ],
  "pos-system": [
    {
      id: "cart-state-machine",
      badgeTh: "01 // REACTIVE CART",
      badgeEn: "01 // REACTIVE CART",
      titleTh: "ตะกร้าสินค้าแบบ Reactive",
      titleEn: "Reactive Cart State",
      subtitleTh: "ยอดรวมอัปเดตทันทีทุกครั้งที่สแกน",
      subtitleEn: "Totals update on every scan",
      descriptionTh:
        "State ของตะกร้าสินค้าคำนวณยอดรวม ภาษี และจำนวนชิ้นใหม่ทันทีที่เพิ่มหรือลดสินค้า โดยไม่ต้องรอ Server",
      descriptionEn:
        "Cart state recalculates totals, tax and item counts the moment an item is added or removed, without waiting on the server.",
      streamTag: "CART_MUTATION",
      streamState: "CartUpdatedState",
      streamDetails: "Register #04 Ready ➔ 2 SKUs in Cart, Net: ฿420.00",
      highlightSpecs: ["Reactive Cart", "Optimistic UI", "BLoC"],
    },
    {
      id: "offline-queue",
      badgeTh: "02 // OFFLINE QUEUE",
      badgeEn: "02 // OFFLINE QUEUE",
      titleTh: "ขายต่อได้เมื่อเน็ตหลุด ด้วยคิวใน SQLite",
      titleEn: "Offline Checkout with a SQLite Queue",
      subtitleTh: "หน้าเคาน์เตอร์ไม่ต้องหยุดรอเครือข่าย",
      subtitleEn: "The counter never waits on the network",
      descriptionTh:
        "เมื่อการเชื่อมต่อขาด ธุรกรรมจะถูกบันทึกลงคิวใน SQLite บนเครื่องก่อน แคชเชียร์จึงคิดเงินต่อได้ตามปกติ",
      descriptionEn:
        "When the connection drops, transactions are written to a local SQLite queue first, so the cashier keeps checking out as normal.",
      streamTag: "QUEUE_ENQUEUED",
      streamState: "OfflineModeActiveState",
      streamDetails: "Network disconnected ➔ TxID #TX-9042 queued in SQLite",
      highlightSpecs: ["SQLite", "Offline Queue", "Optimistic UI"],
    },
    {
      id: "idempotent-sync",
      badgeTh: "03 // IDEMPOTENT SYNC",
      badgeEn: "03 // IDEMPOTENT SYNC",
      titleTh: "ส่งคิวซ้ำอย่างปลอดภัยด้วย Idempotency Key",
      titleEn: "Idempotent Retry on Reconnect",
      subtitleTh: "ไม่มีการคิดเงินซ้ำ แม้ส่งคำขอซ้ำ",
      subtitleEn: "Retries never double-charge",
      descriptionTh:
        "เมื่อกลับมาออนไลน์ คิวจะถูกส่งขึ้น REST API อีกครั้ง โดยแต่ละธุรกรรมมี Transaction UUID ที่สร้างจากฝั่ง Client ทำให้ Server ตัดรายการซ้ำได้",
      descriptionEn:
        "Back online, the queue replays to the REST API. Each transaction carries a client-generated UUID, so the server can drop duplicates.",
      streamTag: "QUEUE_FLUSHED",
      streamState: "TransactionsSyncedState",
      streamDetails: "Reconnected ➔ #TX-9042 synced, duplicate retry ignored",
      highlightSpecs: ["Idempotency UUID", "Retry Queue", "REST API"],
    },
  ],
};
