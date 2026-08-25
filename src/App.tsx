import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Particles } from './components/reactbits/Particles';
import { CustomCursor } from './components/reactbits/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SmoothScroll>
        {/* Interactive Custom Glow & Context Cursor */}
        <CustomCursor />

        <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
          {/* React Bits Interactive Particle Background */}
          <Particles
            particleColors={['#10b981', '#06b6d4', '#475569']}
            particleCount={45}
            speed={0.4}
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
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </LanguageProvider>
  );
};

export default App;
