export interface ProjectItem {
  id: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  category: 'mobile' | 'system' | 'featured';
  year: string;
  tag: string;
  descriptionTh: string;
  descriptionEn: string;
  highlightsTh: string[];
  highlightsEn: string[];
  technologies: string[];
  metrics: { labelTh: string; labelEn: string; value: string }[];
  architectureTh: string;
  architectureEn: string;
  githubUrl?: string;
  demoUrl?: string;
  color: string;
}

export interface ExperienceItem {
  periodTh: string;
  periodEn: string;
  roleTh: string;
  roleEn: string;
  companyTh: string;
  companyEn: string;
  locationTh: string;
  locationEn: string;
  type: 'internship' | 'academic' | 'speaker' | 'ta';
  badgeTh: string;
  badgeEn: string;
  descriptionTh: string;
  descriptionEn: string;
  bulletsTh: string[];
  bulletsEn: string[];
  skills: string[];
}

export const portfolioData = {
  personal: {
    nameTh: 'ธีรภัทร ศรีมณฑา',
    nameEn: 'Theeraphat Srimontha',
    nickname: 'Oven',
    titleTh: 'Mobile Developer (Flutter & Dart)',
    titleEn: 'Mobile Developer (Flutter & Dart)',
    taglineTh: 'นักพัฒนาโมบายแอปพลิเคชันที่เชี่ยวชาญ Flutter, Bloc Architecture และการเชื่อมต่อระบบ API ความเสถียรสูง มุ่งมั่นสร้างสรรค์แอปที่ตอบโจทย์ผู้ใช้งานจริง',
    taglineEn: 'Passionate Mobile Developer specialized in Flutter, Bloc Architecture, and high-stability REST APIs, dedicated to building performant and human-centric applications.',
    statusTh: 'พร้อมเริ่มงานทันที (Open to Work)',
    statusEn: 'Available for Hire / Open to Work',
    expectedSalaryTh: '20,000 - 25,000 บาท/เดือน',
    expectedSalaryEn: '20,000 - 25,000 THB / Month',
    phone: '064-770-0893',
    email: 'theeraphat.sm@gmail.com',
    github: 'https://github.com/Theeraphat-S',
    githubUsername: 'Theeraphat-S',
    locationTh: 'อ.แม่อาย จ.เชียงใหม่ (ยินดีทำงาน Onsite/Hybrid/Remote)',
    locationEn: 'Chiang Mai, Thailand (Open to Onsite/Hybrid/Remote)',
    education: {
      degreeTh: 'ปริญญาตรี สาขาเทคโนโลยีสารสนเทศ (วท.บ.)',
      degreeEn: 'B.Sc. in Information Technology',
      universityTh: 'มหาวิทยาลัยแม่โจ้ (คณะวิทยาศาสตร์)',
      universityEn: 'Maejo University (Faculty of Science)',
      yearsTh: '2565 - 2569 (จบการศึกษา)',
      yearsEn: '2022 - 2026 (Graduating)',
    },
    reference: {
      nameTh: 'อาจารย์ ดร. จักกฤช เตโช',
      nameEn: 'Dr. Jakkrit Taecho',
      positionTh: 'อาจารย์ประจำสาขาวิชาเทคโนโลยีสารสนเทศ คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้',
      positionEn: 'Lecturer in Information Technology, Faculty of Science, Maejo University',
      phone: '088-267-2285',
      email: 'jakkrit@gmaejo.mju.ac.th',
    }
  },

  stats: [
    { value: '3+', labelTh: 'โปรเจกต์หลักที่เปิดใช้งานจริง', labelEn: 'Production & Real-World Apps' },
    { value: '100%', labelTh: 'Flutter & Bloc Architecture', labelEn: 'Flutter & Bloc Architecture' },
    { value: '3x', labelTh: 'ผู้ช่วยสอนประจำภาควิชา (TA)', labelEn: 'Teaching Assistant Semesters' },
    { value: '2569', labelTh: 'จบการศึกษา ม.แม่โจ้ (พร้อมทำงาน)', labelEn: 'Graduate Class of 2026' },
  ],

  projects: [
    {
      id: 'ncds-screening',
      titleTh: 'แอปพลิเคชันคัดกรองความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs)',
      titleEn: 'NCDs Risk Screening Mobile Application',
      subtitleTh: 'โปรเจกต์จบปีสุดท้าย มหาวิทยาลัยแม่โจ้',
      subtitleEn: 'Senior Capstone Project at Maejo University',
      category: 'mobile' as const,
      year: '2568',
      tag: 'Healthcare Mobile App',
      color: '#10b981',
      descriptionTh: 'แอปพลิเคชันมือถือสำหรับตรวจคัดกรองและประเมินความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) ได้แก่ โรคเบาหวาน, ความดันโลหิตสูง, โรคหัวใจ และโรคอ้วน ออกแบบ UI/UX ให้ใช้งานง่ายและตอบโจทย์ทั้งบุคลากรทางการแพทย์ เจ้าหน้าที่ อสม. และประชาชนทั่วไป',
      descriptionEn: 'Mobile application designed for risk screening and assessment of Non-Communicable Diseases (NCDs) including Diabetes, Hypertension, Heart Disease, and Obesity. Custom-engineered UI/UX catering to healthcare workers, village health volunteers (VHVs), and patients.',
      highlightsTh: [
        'ออกแบบและพัฒนา Front-end ด้วย Flutter & Dart พร้อมสถาปัตยกรรม Bloc เพื่อการจัดการ State ที่มีประสิทธิภาพสูง',
        'จัดการฐานข้อมูลด้วย MySQL สำหรับบันทึกและประมวลผลข้อมูลผู้ป่วยอย่างรัดกุม ปลอดภัยตามมาตรฐานข้อมูลสุขภาพ',
        'พัฒนาระบบคำนวณและประเมินคะแนนความเสี่ยง (Risk Score Algorithm) พร้อมออกรายงานสรุปผลการคัดกรองอัตโนมัติ',
        'ทดสอบการใช้งานจริง (Field Testing) ร่วมกับบุคลากรทางการแพทย์และเจ้าหน้าที่ อสม. ในพื้นที่จริงเพื่อปรับปรุง UI/UX ให้ใช้งานง่ายที่สุด'
      ],
      highlightsEn: [
        'Built full Front-end with Flutter & Dart using Bloc State Management for robust, scalable reactive UI.',
        'Structured MySQL database management for secure, accurate patient health records.',
        'Engineered automated risk scoring algorithm with instant medical report generation.',
        'Conducted real-world usability testing with healthcare professionals and Village Health Volunteers (VHVs).'
      ],
      technologies: ['Flutter', 'Dart', 'Bloc', 'MySQL', 'REST API', 'Figma', 'Clean Architecture'],
      metrics: [
        { labelTh: 'โรคที่รองรับ', labelEn: 'Diseases Covered', value: '4 กลุ่มโรค' },
        { labelTh: 'กลุ่มผู้ใช้งาน', labelEn: 'Target Personas', value: 'แพทย์ / อสม. / ผู้ป่วย' },
        { labelTh: 'ความแม่นยำฟอร์ม', labelEn: 'Form Accuracy', value: '100%' },
      ],
      architectureTh: 'Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)',
      architectureEn: 'Clean Architecture (Presentation Layer with Bloc, Domain Use Cases, Data Repository connecting to Backend REST API & MySQL)',
      githubUrl: 'https://github.com/Theeraphat-S',
    },
    {
      id: 'pinto-app',
      titleTh: 'Pinto Application — เมนู WebView & ฟังก์ชันสะสมแต้ม',
      titleEn: 'Pinto Application — WebView & Gamified Chat Streaks',
      subtitleTh: 'ฝึกงาน ณ บริษัท ฝากด้วย โลจิสติกส์ แอนด์ ดิจิทัล แพลตฟอร์ม จำกัด',
      subtitleEn: 'Internship at Fakduay Logistics & Digital Platform',
      category: 'mobile' as const,
      year: '2569',
      tag: 'Commercial App Feature',
      color: '#06b6d4',
      descriptionTh: 'ร่วมพัฒนาและอัปเดตฟีเจอร์สำคัญบนแอปพลิเคชัน Pinto ในระดับ Production จัดการสถาปัตยกรรม State Management เพื่อรองรับการแสดงผลเมนู WebView และพัฒนาระบบสะสมแต้มแชท (Chat Streaks) พร้อมเชื่อมต่อ Profile API',
      descriptionEn: 'Engineered and shipped core features on the production Pinto Application. Managed state architecture for hybrid WebView menu integration and developed gamified Chat Streaks system synced with user Profile API.',
      highlightsTh: [
        'พัฒนาและปรับปรุงฟีเจอร์ด้วย Flutter & Dart รองรับการสลับเมนูแบบ Hybrid WebView ได้อย่างลื่นไหลไม่มีสะดุด',
        'สร้างระบบ Gamification สะสมแต้มต่อเนื่อง (Chat Streaks) เพื่อกระตุ้นการมีส่วนร่วม (Engagement) ของผู้ใช้งาน',
        'เชื่อมต่อระบบคะแนนและข้อมูลผู้ใช้งานผ่าน Profile API ได้อย่างแม่นยำและปลอดภัย',
        'ทำงานร่วมกับทีมผ่านกระบวนการ Agile / Scrum และควบคุมเวอร์ชันโค้ดด้วย Git / GitHub ตาม Timeline'
      ],
      highlightsEn: [
        'Delivered responsive Flutter & Dart modules seamlessly bridging native screens with dynamic WebView menus.',
        'Implemented gamified Chat Streaks logic boosting daily active user engagement and retention.',
        'Integrated Profile API for real-time loyalty point updates and reward redemption.',
        'Collaborated in Agile sprints with Git/GitHub version control meeting project release timelines.'
      ],
      technologies: ['Flutter', 'Dart', 'State Management', 'WebView', 'Profile API', 'Git / GitHub', 'Agile'],
      metrics: [
        { labelTh: 'บทบาท', labelEn: 'Role', value: 'Mobile Intern' },
        { labelTh: 'กระบวนการ', labelEn: 'Methodology', value: 'Agile / Scrum' },
        { labelTh: 'การทำงาน', labelEn: 'Execution', value: 'Production-ready' },
      ],
      architectureTh: 'Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller',
      architectureEn: 'Feature-Driven Flutter Architecture with Modular State Management and WebView Bridge Controller',
      githubUrl: 'https://github.com/Theeraphat-S',
    },
    {
      id: 'pos-system',
      titleTh: 'ระบบจัดการ ณ จุดขาย (POS System & Store Management)',
      titleEn: 'Point of Sale (POS) & Store Management System',
      subtitleTh: 'ระบบจัดการสินค้าและการรับชำระเงินสำหรับธุรกิจค้าปลีก',
      subtitleEn: 'Retail Store Inventory & Payment Management',
      category: 'system' as const,
      year: '2569',
      tag: 'Enterprise System',
      color: '#3b82f6',
      descriptionTh: 'ออกแบบและพัฒนาโมดูลฝั่งระบบจัดการร้านค้า ณ จุดขาย (POS) เชื่อมต่อ Rest API ระหว่างหน้าบ้านและระบบหลังบ้านเพื่อจัดการข้อมูลสินค้า ออเดอร์ และการรับชำระเงินให้มีความถูกต้อง เสถียร และปลอดภัย',
      descriptionEn: 'Designed and developed retail Point of Sale (POS) store management modules. Integrated Rest APIs between client and backend to ensure synchronized inventory data, instant transaction processing, and receipt generation.',
      highlightsTh: [
        'ออกแบบระบบจัดการสินค้าคงคลัง (Inventory) และระบบตะกร้าสินค้าที่คิดคำนวณราคาและภาษีอัตโนมัติ',
        'เชื่อมต่อ RESTful API ความเร็วสูงระหว่างหน้าบ้านและระบบหลังบ้าน พร้อมกลไกป้องกันข้อมูลซ้ำซ้อน',
        'รองรับระบบชำระเงินแบบหลายช่องทาง (เงินสด, QR Code PromptPay) และออกใบเสร็จรับเงิน',
        'ระบบออกแบบให้ทำงานได้อย่างต่อเนื่องแม้ในสภาวะการเชื่อมต่อที่ไม่เสถียร (Offline-tolerant UI)'
      ],
      highlightsEn: [
        'Designed real-time inventory tracking and dynamic checkout calculation logic.',
        'Integrated high-throughput REST APIs ensuring zero transaction loss during peak operations.',
        'Supported multi-channel payments (Cash, QR PromptPay) with instant digital receipt generation.',
        'Engineered error-resilient client handling for seamless offline-tolerant cashier flow.'
      ],
      technologies: ['React / Flutter', 'JavaScript / Dart', 'REST API', 'MySQL', 'State Management', 'Postman'],
      metrics: [
        { labelTh: 'ความถูกต้องข้อมูล', labelEn: 'Data Consistency', value: '99.9%' },
        { labelTh: 'ช่องทางชำระ', labelEn: 'Payment Options', value: 'Cash & QR PromptPay' },
        { labelTh: 'สถาปัตยกรรม', labelEn: 'Architecture', value: 'RESTful Integration' },
      ],
      architectureTh: 'Modular Client Architecture with Optimistic UI updates and resilient API request retry logic',
      architectureEn: 'Modular Client Architecture with Optimistic UI updates and resilient API request retry logic',
      githubUrl: 'https://github.com/Theeraphat-S',
    }
  ] as ProjectItem[],


  skillCategories: [
    {
      nameTh: 'Mobile App Mastery',
      nameEn: 'Mobile App Mastery',
      icon: 'smartphone',
      color: 'emerald',
      skills: [
        { name: 'Flutter', level: 'Advanced / Core', desc: 'Cross-platform native iOS & Android UI development' },
        { name: 'Dart', level: 'Advanced / Core', desc: 'Asynchronous programming, OOP, Streams, Generics' },
        { name: 'Bloc / Cubit', level: 'Advanced', desc: 'Enterprise-grade predictable state management' },
        { name: 'Provider', level: 'Proficient', desc: 'Lightweight reactive state architecture' },
        { name: 'Android Studio', level: 'Proficient', desc: 'Native build configs, debugging, emulators' },
        { name: 'Clean Architecture', level: 'Proficient', desc: 'Domain, Data, and Presentation layer separation' },
      ]
    },
    {
      nameTh: 'Languages & Web Stack',
      nameEn: 'Languages & Web Stack',
      icon: 'code',
      color: 'cyan',
      skills: [
        { name: 'Java', level: 'Proficient', desc: 'Core OOP, Data structures, Backend foundation' },
        { name: 'JavaScript / TS', level: 'Proficient', desc: 'Modern ES6+, Async/Await, Web standards' },
        { name: 'HTML5 & CSS3', level: 'Proficient', desc: 'Semantic layouts, Responsive modern design' },
        { name: 'Go (Golang)', level: 'Intermediate', desc: 'Microservices & high-concurrency programming' },
        { name: 'React', level: 'Proficient', desc: 'Component architecture, Hooks, Modern SPAs' },
        { name: 'Spring Boot', level: 'Intermediate', desc: 'Java enterprise REST API development' },
      ]
    },
    {
      nameTh: 'Database & DevOps Tools',
      nameEn: 'Database & DevOps Tools',
      icon: 'database',
      color: 'blue',
      skills: [
        { name: 'MySQL', level: 'Advanced', desc: 'Relational DB design, Complex queries, Indexing' },
        { name: 'Oracle Database', level: 'Intermediate', desc: 'Enterprise SQL queries, Triggers, Views' },
        { name: 'Git & GitHub', level: 'Advanced', desc: 'Version control, Branching workflows, PR reviews' },
        { name: 'VS Code & Eclipse', level: 'Advanced', desc: 'Primary IDEs with optimized extensions' },
        { name: 'REST API & Postman', level: 'Advanced', desc: 'API testing, Mock servers, Request inspection' },
        { name: 'Antigravity IDE', level: 'Proficient', desc: 'Next-generation AI pair programming & workflows' },
      ]
    },
    {
      nameTh: 'Soft Skills & Leadership',
      nameEn: 'Soft Skills & Leadership',
      icon: 'users',
      color: 'indigo',
      skills: [
        { name: 'Cross-Functional Collaboration', level: 'Expert', desc: 'Working smoothly with designers, PMs, and doctors' },
        { name: 'Technical Communication & TA', level: 'Expert', desc: 'Mentoring 100+ university students in coding' },
        { name: 'Logical Problem Solving', level: 'Advanced', desc: 'Analytical bug diagnosis & architectural planning' },
        { name: 'Adaptive Learning', level: 'Advanced', desc: 'Rapidly mastering emerging tech & AI tools' },
        { name: 'Agile / Scrum Mindset', level: 'Proficient', desc: 'Sprint planning, Standups, Iterative delivery' },
      ]
    }
  ],

  experiences: [
    {
      periodTh: 'พ.ย. 2568 - มี.ค. 2569',
      periodEn: 'Nov 2025 - Mar 2026',
      roleTh: 'Mobile Developer Intern (นักศึกษาฝึกงาน)',
      roleEn: 'Mobile Developer Intern',
      companyTh: 'บริษัท ฝากด้วย โลจิสติกส์ แอนด์ ดิจิทัล แพลตฟอร์ม จำกัด',
      companyEn: 'Fakduay Logistics & Digital Platform Co., Ltd.',
      locationTh: 'เชียงใหม่, ประเทศไทย',
      locationEn: 'Chiang Mai, Thailand',
      type: 'internship',
      badgeTh: 'การฝึกงานวิชาชีพ',
      badgeEn: 'Industry Internship',
      descriptionTh: 'ร่วมเป็นส่วนหนึ่งของทีมพัฒนาแอปพลิเคชันเชิงพาณิชย์ พัฒนาแอปพลิเคชัน Pinto และระบบจัดการ ณ จุดขาย (POS) ด้วย Flutter/Dart เชื่อมต่อ REST API',
      descriptionEn: 'Contributed to commercial digital platforms, developing key modules for Pinto App and retail POS system using Flutter/Dart with high-throughput REST APIs.',
      bulletsTh: [
        'พัฒนาโครงสร้าง State Management สำหรับเมนู WebView และฟังก์ชัน Chat Streaks บน Pinto App',
        'ออกแบบและพัฒนาโมดูลฝั่งระบบจัดการร้านค้า POS เชื่อมต่อ Rest API ให้มีเสถียรภาพ',
        'ทำงานร่วมกับทีมผ่านกระบวนการ Agile/Scrum และจัดการเวอร์ชันซอร์สโค้ดด้วย Git/GitHub'
      ],
      bulletsEn: [
        'Architected State Management for hybrid WebView menus and Chat Streaks gamification in Pinto App.',
        'Engineered POS store management modules with resilient Rest API integration.',
        'Collaborated in Agile sprints and managed code versions through Git/GitHub.'
      ],
      skills: ['Flutter', 'Dart', 'State Management', 'REST API', 'Git', 'Agile']
    },
    {
      periodTh: '2567 - 2568 (3 เทอมการศึกษา)',
      periodEn: '2024 - 2025 (3 Semesters)',
      roleTh: 'ผู้ช่วยสอนประจำภาควิชา (Teaching Assistant - TA)',
      roleEn: 'Undergraduate Teaching Assistant (TA)',
      companyTh: 'สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่โจ้',
      companyEn: 'Department of Information Technology, Maejo University',
      locationTh: 'เชียงใหม่, ประเทศไทย',
      locationEn: 'Chiang Mai, Thailand',
      type: 'ta',
      badgeTh: 'ประสบการณ์วิชาการ',
      badgeEn: 'Academic Leadership',
      descriptionTh: 'ได้รับคัดเลือกให้เป็นผู้ช่วยสอน (TA) ถ่ายทอดความรู้และให้คำปรึกษาแก่นักศึกษารุ่นน้องใน 3 รายวิชาหลักของภาควิชา IT',
      descriptionEn: 'Selected as Teaching Assistant to mentor and guide junior undergraduate students across 3 core Computer Science & IT courses.',
      bulletsTh: [
        'การโปรแกรมฝั่งไคลเอนต์ (Client-Side Web Programming) — เทอม 2/2568 (HTML, CSS, JS, Frontend Frameworks)',
        'ระบบฐานข้อมูล (Database Systems) — เทอม 1-2/2567 (SQL, Relational DB Design, ER-Diagrams)',
        'ตรรกะและเทคนิคการเขียนโปรแกรม (Logic and Programming Techniques) — เทอม 1/2566 (Algorithms, Flowcharts, Problem Solving)'
      ],
      bulletsEn: [
        'Client-Side Web Programming — Term 2/2025 (HTML, CSS, JS, Frontend Frameworks)',
        'Database Systems — Term 1-2/2024 (SQL, Database Normalization, Relational Design)',
        'Logic and Programming Techniques — Term 1/2023 (Algorithmic Logic, Flowcharts, Coding Foundations)'
      ],
      skills: ['Mentoring', 'Client-side Web', 'Database Systems', 'Programming Logic', 'Communication']
    },
    {
      periodTh: 'กันยายน 2568',
      periodEn: 'September 2025',
      roleTh: 'วิทยากรโครงการพิเศษ (Keynote Instructor)',
      roleEn: 'Keynote Instructor & Speaker',
      companyTh: 'โครงการ "เริ่มต้นใช้ AI อย่างชาญฉลาดเพื่อการศึกษา"',
      companyEn: '"Smart AI for Education" Workshop',
      locationTh: 'โรงเรียนจักรคำคณาทร, จ.ลำพูน',
      locationEn: 'Jakkhumkhanathorn School, Lamphun',
      type: 'speaker',
      badgeTh: 'วิทยากรบรรยาย',
      badgeEn: 'Keynote Speaker',
      descriptionTh: 'ได้รับเชิญเป็นวิทยากรบรรยายและจัดเวิร์กช็อปให้แก่นักเรียน ม.4 ห้อง Gifted Computer โรงเรียนจักรคำคณาทร ในหัวข้อการประยุกต์ใช้ AI เพื่อการเรียนรู้และการเขียนโปรแกรมอย่างมีจริยธรรม',
      descriptionEn: 'Invited speaker leading a practical workshop for M.4 Gifted Computer students at Jakkhumkhanathorn School on leveraging generative AI and ethical programming practices.',
      bulletsTh: [
        'บรรยายแนวคิดและหลักการทำงานของ Modern AI Tools ในงาน Software Development และการศึกษา',
        'สาธิต Prompt Engineering และการใช้ AI ช่วยแก้โจทย์ Coding อย่างมีประสิทธิภาพและถูกต้องตามหลักวิชาการ',
        'ถ่ายทอดแรงบันดาลใจและเส้นทางสู่สายอาชีพนักพัฒนาซอฟต์แวร์ (Developer Roadmap)'
      ],
      bulletsEn: [
        'Delivered keynote on the architecture of Modern AI tools in software engineering and education.',
        'Demonstrated effective Prompt Engineering and practical AI-assisted problem solving.',
        'Inspired young aspiring programmers on modern software developer career pathways.'
      ],
      skills: ['AI Education', 'Prompt Engineering', 'Public Speaking', 'Workshop Facilitation']
    }
  ]
};
