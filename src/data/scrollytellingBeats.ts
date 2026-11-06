import { StoryBeat } from "../types/portfolio";

export const BEATS_BY_PROJECT: Record<string, StoryBeat[]> = {
  "ncds-screening": [
    {
      id: "intake-validation",
      badgeTh: "01 Form & BLoC intake",
      badgeEn: "01 Form & BLoC intake",
      titleTh: "การรับข้อมูล Vitals & การตรวจสอบฝั่ง Client",
      titleEn: "Client-side vitals intake & validation",
      subtitleTh: "ตรวจค่าบนเครื่อง ไม่ต้องรอเครือข่าย",
      subtitleEn: "Validated on the device, no network wait",
      descriptionTh:
        "Presentation Layer ที่ใช้ BLoC รับค่า Vitals (ระดับน้ำตาล, ความดัน) และตรวจความถูกต้องตามเกณฑ์ทันทีที่กรอก โดยไม่ต้องเรียกเครือข่าย",
      descriptionEn:
        "BLoC Presentation Layer receives vitals (glucose, blood pressure) and checks them against clinical thresholds as they are entered, without a network call.",
      streamTag: "FORM_VALIDATED",
      streamState: "UpdateVitalsEvent",
      streamDetails:
        "Glucose 98 mg/dL, BP 118/80 mmHg ➔ in range, not evaluated yet",
      streamPayload: {
        glucose: 98,
        systolic: 118,
        diastolic: 80,
        evaluated: false,
      },
      highlightSpecs: ["Flutter 3.x", "BLoC Pattern", "Form Validation"],
    },
    {
      id: "scoring-algorithm",
      badgeTh: "02 Risk algorithm",
      badgeEn: "02 Risk algorithm",
      titleTh: "คำนวณความเสี่ยงโรคเรื้อรังอัตโนมัติ",
      titleEn: "Automatic risk scoring",
      subtitleTh: "ใส่ค่าเดิม ได้คะแนนเดิมทุกครั้ง",
      subtitleEn: "Same inputs, same score, every time",
      descriptionTh:
        "Business Logic ประเมินความเสี่ยงโรคเบาหวาน ความดันโลหิต หัวใจ และโรคอ้วน แยก Tier (Low, Moderate, High) ทันทีบนอุปกรณ์ ไม่มีขั้นตอนที่คนต้องคิดคะแนนเอง",
      descriptionEn:
        "Domain layer evaluates Diabetes, Hypertension, Cardiac, and Obesity risk tiers instantly on-device, so no one adds up the score by hand.",
      streamTag: "BLoC::State",
      streamState: "RiskEvaluatedState",
      streamDetails: "Glucose 108 mg/dL, BP 122/80 mmHg ➔ score 4/15, Moderate",
      streamPayload: {
        glucose: 108,
        systolic: 122,
        diastolic: 80,
        totalScore: 4,
        tier: "MODERATE",
        evaluatedOn: "client",
      },
      highlightSpecs: [
        "Risk Scoring Engine",
        "Clean Architecture",
        "Domain Logic",
      ],
    },
    {
      id: "record-submission",
      badgeTh: "03 Persistence & report",
      badgeEn: "03 Persistence & report",
      titleTh: "บันทึกผลผ่าน REST API & ออกรายงาน",
      titleEn: "REST API record submission & report export",
      subtitleTh: "ข้อมูลผู้ป่วยรวมศูนย์ใน MySQL",
      subtitleEn: "Patient records kept centrally in MySQL",
      descriptionTh:
        "เมื่อประเมินเสร็จ ผลคัดกรองที่ผ่านการตรวจสอบแล้วจะถูกส่งผ่าน REST API ไปเก็บในฐานข้อมูล MySQL ส่วนกลาง พร้อมออกรายงานผลการตรวจ PDF ให้ผู้รับการคัดกรองได้ทันที",
      descriptionEn:
        "Once scoring completes, the validated screening record is submitted through the REST API into a central MySQL database, with one-touch PDF report generation for the patient.",
      streamTag: "REST_SUBMIT",
      streamState: "RecordSubmittedState",
      streamDetails:
        "POST /assessments ➔ record saved (4/15), PDF report ready",
      streamPayload: {
        patientRef: "HN 0941",
        totalScore: 4,
        tier: "MODERATE",
        saved: true,
        pdfReady: true,
      },
      highlightSpecs: ["REST API", "MySQL", "PDF Export Engine"],
    },
  ],
  "pinto-app": [
    {
      id: "webview-menu",
      badgeTh: "01 Hybrid WebView menu",
      badgeEn: "01 Hybrid WebView menu",
      titleTh: "เมนู WebView ภายในแอป Flutter",
      titleEn: "Hybrid WebView menu in a native shell",
      subtitleTh: "อัปเดตเมนูจากฝั่ง Server ได้โดยไม่ต้องออกเวอร์ชันใหม่",
      subtitleEn: "Server-driven menus without app releases",
      descriptionTh:
        "นำหน้าเมนูร้านค้าแบบเว็บเดิมมาแสดงใน WebView ภายในแอป Flutter และจัดการ State ให้ตะกร้าสินค้าฝั่ง Native ตรงกับเมนูบนเว็บ",
      descriptionEn:
        "Embedded the existing web menus in a WebView inside the Flutter app, with state management keeping the native cart in step with the web menu.",
      streamTag: "WEBVIEW_MESSAGE",
      streamState: "WebViewMenuLoadedState",
      streamDetails: "Web menu loaded in WebView ➔ native cart: 2 items · ฿109",
      streamPayload: {
        bridge: "JavaScriptChannel",
        path: "/menu/nimman-kitchen",
        cartItems: 2,
        cartTotal: 109,
      },
      highlightSpecs: ["WebView", "State Management", "Native Cart"],
    },
    {
      id: "chat-streaks",
      badgeTh: "02 Gamified retention",
      badgeEn: "02 Gamified retention",
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
      streamDetails: "7-day streak ➔ today's check-in open (+50 pts)",
      streamPayload: {
        streakDays: 7,
        checkedInToday: false,
        rewardPoints: 50,
      },
      highlightSpecs: ["Gamification", "BLoC", "Rewards"],
    },
    {
      id: "profile-sync",
      badgeTh: "03 Profile API sync",
      badgeEn: "03 Profile API sync",
      titleTh: "ซิงค์แต้มและสถานะผ่าน Profile API",
      titleEn: "Profile API sync & state bridge",
      subtitleTh: "ยอดเดียวกันทั้งหน้า Native และ WebView",
      subtitleEn: "One balance across native and web screens",
      descriptionTh:
        "บันทึกแต้มจาก Chat Streaks ผ่าน Profile API และใช้ State Bridge ส่งข้อมูลผู้ใช้ระหว่าง Flutter กับ WebView ให้ทุกหน้าจอแสดงข้อมูลเดียวกัน",
      descriptionEn:
        "Streak points are written through the Profile API, and a state bridge passes user data between Flutter and the WebView so every screen shows the same profile.",
      streamTag: "PROFILE_API",
      streamState: "ProfileSyncedState",
      streamDetails: "GET /profile ➔ 1,500 pts, Gold, 8-day streak",
      streamPayload: {
        points: 1500,
        tier: "Gold",
        streakDays: 8,
        pointsToNextTier: 500,
      },
      highlightSpecs: ["Profile API", "REST", "State Bridge"],
    },
  ],
  "pos-system": [
    {
      id: "cart-state-machine",
      badgeTh: "01 Reactive cart",
      badgeEn: "01 Reactive cart",
      titleTh: "ตะกร้าสินค้าแบบ Reactive",
      titleEn: "Reactive cart state",
      subtitleTh: "ยอดรวมอัปเดตทันทีทุกครั้งที่สแกน",
      subtitleEn: "Totals update on every scan",
      descriptionTh:
        "State ของตะกร้าสินค้าคำนวณยอดรวม ภาษี และจำนวนชิ้นใหม่ทันทีที่เพิ่มหรือลดสินค้า โดยไม่ต้องรอ Server",
      descriptionEn:
        "Cart state recalculates totals, tax and item counts the moment an item is added or removed, without waiting on the server.",
      streamTag: "CART_MUTATION",
      streamState: "CartUpdatedState",
      streamDetails:
        "Till 04 online ➔ 2 items, total ฿420.00 (VAT ฿27.48 incl.)",
      streamPayload: {
        till: "04",
        itemCount: 2,
        total: 420,
        vatIncluded: 27.48,
        online: true,
      },
      highlightSpecs: ["Reactive Cart", "Optimistic UI", "BLoC"],
    },
    {
      id: "offline-queue",
      badgeTh: "02 Offline queue",
      badgeEn: "02 Offline queue",
      titleTh: "ขายต่อได้เมื่อเน็ตหลุด ด้วยคิวใน SQLite",
      titleEn: "Offline checkout with a SQLite queue",
      subtitleTh: "หน้าเคาน์เตอร์ไม่ต้องหยุดรอเครือข่าย",
      subtitleEn: "The counter keeps selling when the network drops",
      descriptionTh:
        "เมื่อการเชื่อมต่อขาด ธุรกรรมจะถูกบันทึกลงคิวใน SQLite บนเครื่องก่อน แคชเชียร์จึงคิดเงินต่อได้ตามปกติ",
      descriptionEn:
        "When the connection drops, transactions are written to a local SQLite queue first, so the cashier keeps checking out as normal.",
      streamTag: "QUEUE_ENQUEUED",
      streamState: "OfflineModeActiveState",
      streamDetails: "Connection lost ➔ 1 order queued in SQLite",
      streamPayload: {
        online: false,
        queuedOrders: 1,
        storage: "sqlite",
      },
      highlightSpecs: ["SQLite", "Offline Queue", "Optimistic UI"],
    },
    {
      id: "idempotent-sync",
      badgeTh: "03 Idempotent sync",
      badgeEn: "03 Idempotent sync",
      titleTh: "ส่งคิวซ้ำอย่างปลอดภัยด้วย Idempotency Key",
      titleEn: "Idempotent retry on reconnect",
      subtitleTh: "ไม่มีการคิดเงินซ้ำ แม้ส่งคำขอซ้ำ",
      subtitleEn: "Retries never double-charge",
      descriptionTh:
        "เมื่อกลับมาออนไลน์ คิวจะถูกส่งขึ้น REST API อีกครั้ง โดยแต่ละธุรกรรมมี Transaction UUID ที่สร้างจากฝั่ง Client ทำให้ Server ตัดรายการซ้ำได้",
      descriptionEn:
        "Back online, the queue replays to the REST API. Each transaction carries a client-generated UUID, so the server can drop duplicates.",
      streamTag: "QUEUE_FLUSHED",
      streamState: "TransactionsSyncedState",
      streamDetails:
        "Back online ➔ 1 queued order replayed, server drops duplicate UUIDs",
      streamPayload: {
        online: true,
        replayedOrders: 1,
        queuedOrders: 0,
        dedupeKey: "clientUuid",
      },
      highlightSpecs: ["Idempotency UUID", "Retry Queue", "REST API"],
    },
  ],
};
