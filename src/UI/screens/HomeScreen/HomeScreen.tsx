import React from 'react';
import { useHomeScreenViewModel } from './HomeScreen.vm';
import { NavigationBar } from '../../reusable/feature/NavigationBar/NavigationBar';
import { CustomCursor } from '../../reusable/feature/CustomCursor/CustomCursor';
import { HeroSection } from '../HeroSection/HeroSection';
import { TechMarquee } from '../../reusable/feature/TechMarquee/TechMarquee';
import { ExperienceIntroSection } from '../ExperienceIntroSection/ExperienceIntroSection';
import { CareerJourneySection } from '../CareerJourneySection/CareerJourneySection';
import { EngineeringScaleSection } from '../EngineeringScaleSection/EngineeringScaleSection';
import { ProjectsSection } from '../ProjectsSection/ProjectsSection';
import { CapabilitiesSection } from '../CapabilitiesSection/CapabilitiesSection';
import { ResumeSection } from '../ResumeSection/ResumeSection';
import { AboutSection } from '../AboutSection/AboutSection';
import { ContactSection } from '../ContactSection/ContactSection';
import { Footer } from '../Footer/Footer';
import { ErrorBoundary } from '../../reusable/base/ErrorBoundary/ErrorBoundary';
import { ScrollReveal } from '../../reusable/base/ScrollReveal/ScrollReveal';

export const HomeScreen: React.FC = () => {
  const { isInitialized } = useHomeScreenViewModel();

  if (!isInitialized) return null;

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Animated Interactive Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navigation Bar */}
      <NavigationBar />

      {/* Main Content Sections wrapped in ErrorBoundary & ScrollReveal */}
      <main className="flex-1 flex flex-col space-y-8 sm:space-y-16 overflow-hidden">
        <ErrorBoundary fallbackTitle="Hero Section Error">
          <ScrollReveal direction="bottom" duration={800}>
            <HeroSection />
          </ScrollReveal>
        </ErrorBoundary>

        {/* Live Running Technology Stack Marquee */}
        <ScrollReveal direction="boom" duration={700} delay={100}>
          <TechMarquee />
        </ScrollReveal>

        <ErrorBoundary fallbackTitle="Experience Overview Error">
          <ScrollReveal direction="left" duration={750}>
            <ExperienceIntroSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Career Journey Error">
          <ScrollReveal direction="right" duration={750}>
            <CareerJourneySection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Scale Analytics Error">
          <ScrollReveal direction="bottom" duration={750}>
            <EngineeringScaleSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Projects & Case Studies Error">
          <ScrollReveal direction="boom" duration={800}>
            <ProjectsSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Capabilities Matrix Error">
          <ScrollReveal direction="left" duration={750}>
            <CapabilitiesSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Resume & Credentials Error">
          <ScrollReveal direction="right" duration={750}>
            <ResumeSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="About Narrative Error">
          <ScrollReveal direction="bottom" duration={750}>
            <AboutSection />
          </ScrollReveal>
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="Contact Gateway Error">
          <ScrollReveal direction="boom" duration={800}>
            <ContactSection />
          </ScrollReveal>
        </ErrorBoundary>
      </main>



      {/* Footer */}
      <Footer />
    </div>
  );
};
