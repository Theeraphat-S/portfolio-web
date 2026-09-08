import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Particles } from "./components/reactbits/Particles";
import { CustomCursor } from "./components/reactbits/CustomCursor";
import { ClickSpark } from "./components/reactbits/ClickSpark";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import {
  Hero,
  AboutBento,
  Projects,
  Skills,
  ExperienceTimeline,
  TelemetryDeck,
  MarqueeRibbons,
  ContactSection,
} from "./components/sections";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Handwriting SVG Preloader Sequence */}
        <Preloader />

        <SmoothScroll>
          {/* Interactive Custom Glow & Context Cursor */}
          <CustomCursor />

          {/* Theme-Aware Interactive Click Sparks */}
          <ClickSpark />

          <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-400 transition-colors duration-300">
            {/* React Bits Interactive Particle Background */}
            <Particles
              particleColors={["#0284c7", "#06b6d4", "#38bdf8"]}
              particleCount={40}
              speed={0.35}
              particleBaseSize={1.5}
            />

            {/* Global Floating Navbar */}
            <Navbar />

            {/* Main Content Sections */}
            <main className="relative z-10">
              <Hero />
              <AboutBento />
              <Projects />
              <Skills />
              <ExperienceTimeline />
              <TelemetryDeck />
              <MarqueeRibbons />
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </SmoothScroll>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
