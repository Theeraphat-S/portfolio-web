# 📱 Theeraphat Srimontha — Mobile Developer Portfolio

<div align="center">

  <!-- Status Badges -->
  <a href="https://theeraphat-portfolio.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-theeraphat--portfolio.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/Theeraphat-S/Portfolio-Web">
    <img src="https://img.shields.io/badge/GitHub-Portfolio--Web-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
  <a href="mailto:theeraphat.sm@gmail.com">
    <img src="https://img.shields.io/badge/Email-theeraphat.sm%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="tel:0647700893">
    <img src="https://img.shields.io/badge/Phone-064--770--0893-34A853?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Phone" />
  </a>

  <br />
  <br />

  <!-- Core Tech Stacks -->
  <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
  <img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white" alt="Dart" />
  <img src="https://img.shields.io/badge/BLoC_Pattern-8A2BE2?style=for-the-badge&logo=redux&logoColor=white" alt="BLoC Pattern" />
  <img src="https://img.shields.io/badge/Clean_Architecture-10B981?style=for-the-badge&logo=target&logoColor=white" alt="Clean Architecture" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />

  <p align="center">
    <strong>🌟 High-Performance, Interactive & Bilingual Engineering Showcase</strong><br />
    Demonstrating production-grade cross-platform engineering with <b>Flutter, Dart, Clean Architecture, and BLoC</b>.
  </p>

  <p align="center">
    <a href="https://theeraphat-portfolio.vercel.app/"><strong>🌐 Open Live Portfolio App »</strong></a>
  </p>

</div>

---

## ⚡ Core Highlights

- 📱 **Interactive Mobile Simulator & Live DevTools**: In-browser smartphone shell simulating production mobile screens with a live developer drawer exposing BLoC event streams, widget trees, and FPS telemetry.
- 📜 **Scroll-Led Scrollytelling Runway**: Pinned viewport that synchronizes the simulated mobile app with architectural narrative beats as you scroll.
- 🌐 **Zero-Shift Bilingual Engine**: Instant Thai/English localization with fixed typography constraints guaranteeing zero layout shifts (CLS = 0).

---

## 📱 Mobile Architecture (Clean Architecture & BLoC)

All mobile systems follow strict Clean Architecture principles with unidirectional data flow:

```mermaid
flowchart TD
    subgraph UI_Layer["🎨 Presentation Layer (Flutter UI & BLoC)"]
        V["📱 Mobile Screens & Widgets"] -->|Dispatch Events| B["⚡ BLoC / Cubit Controller"]
        B -->|Emit States| V
    end

    subgraph Domain_Layer["🧠 Domain Layer (Pure Dart / Business Rules)"]
        UC["🎯 Use Cases / Interactors"] --- E["📦 Entities & Value Objects"]
        UC --- IR["🔌 Repository Interfaces"]
    end

    subgraph Data_Layer["💾 Data Layer (Data Sources & Repositories)"]
        R["🏗️ Repository Implementations"] --> RDS["🌐 Remote Data Source (REST API)"]
        R --> LDS["💽 Local Data Source (SQLite / Secure Cache)"]
    end

    B -->|Invokes| UC
    IR -.->|Implemented by| R
```

---

## 🚀 Featured Projects

### 🏥 NCDs Risk Screening App `Senior Capstone Project, 2025`

`Flutter` • `Dart` • `BLoC Pattern` • `Clean Architecture` • `REST API` • `MySQL`

- **Client-side Clinical Engine**: Migrated chronic disease risk algorithms on-device for village health volunteers (VHVs), eliminating human calculation error by 100%.
- **Measurable Impact**: Cut patient screening time from 10–15 min down to **< 3–5 min** with one-touch PDF clinical report generation.
- 🔗 [View Interactive Showcase](https://theeraphat-portfolio.vercel.app/)

### 📦 Pinto Logistics Commercial App `Internship at Fakduay, 2026`

`Flutter` • `Dart` • `WebSockets` • `Hybrid WebView Bridge` • `Agile/Scrum`

- **Real-Time GPS & Retention**: Low-latency courier tracking via WebSockets and gamified daily chat streaks with dynamic reward tier multipliers.
- **Hybrid Bridge Architecture**: Engineered a bidirectional `JavaScriptChannel` bridge synchronizing auth tokens and carts between legacy WebViews and native Flutter widgets.
- 🔗 [View Interactive Showcase](https://theeraphat-portfolio.vercel.app/)

### 💳 Enterprise Retail POS System `Commercial Retail`

`React 19` • `TypeScript` • `Tailwind CSS v4` • `REST API` • `ESC/POS`

- **Resilient Offline POS**: High-speed barcode scanning with sub-millisecond local SKU cache and SQLite Write-Ahead Logging (WAL) for 100% offline checkout continuity.
- **Hardware Integration**: Direct ESC/POS byte stream printing and instant dynamic PromptPay QR payment processing.
- 🔗 [View Interactive Showcase](https://theeraphat-portfolio.vercel.app/)

---

## 🛠️ Technical Skills

| Domain                     | Technologies & Expertise                                                                               |
| :------------------------- | :----------------------------------------------------------------------------------------------------- |
| **Mobile Development**     | **Flutter (Advanced)**, **Dart**, **BLoC & Cubit**, Provider, Clean Architecture, Android SDK          |
| **Frontend & Web**         | **React 19**, **TypeScript**, Next.js, Vite 6, Tailwind CSS v4, Motion, Lenis Smooth Scroll            |
| **Backend & Databases**    | **MySQL**, Oracle Database, Java / Spring Boot, Go (Golang), REST APIs, Postman                        |
| **Leadership & Mentoring** | **3x Teaching Assistant** (Client-side Web, Database Systems, Logic & Programming) at Maejo University |

---

## 💻 Quick Start

```bash
# Clone the repository
git clone https://github.com/Theeraphat-S/Portfolio-Web.git
cd Portfolio-Web

# Install dependencies & run development server
npm install
npm run dev
```

### Essential Scripts

| Command                | Action                                         |
| :--------------------- | :--------------------------------------------- |
| `npm run dev`          | Start local Vite development server            |
| `npm run build`        | Compile TypeScript and build production bundle |
| `npm run lint`         | Run ESLint 9 checks                            |
| `npm run format:check` | Verify Prettier code formatting                |

---

## 👤 Developer Profile & Contact

<div align="center">

### **Theeraphat Srimontha (Oven)**

**Mobile Application Developer (Flutter & Dart Specialist)**  
_B.Sc. in Information Technology, Maejo University (2022–2026)_  
📍 **Location:** Chiang Mai, Thailand (Open to **Onsite / Hybrid / Remote**) • 💼 **Status:** **Available immediately**

[![Website](https://img.shields.io/badge/🌐_Website-theeraphat--portfolio.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://theeraphat-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Theeraphat--S-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Theeraphat-S)
[![Email](https://img.shields.io/badge/Email-theeraphat.sm%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:theeraphat.sm@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-064--770--0893-34A853?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:0647700893)

</div>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
