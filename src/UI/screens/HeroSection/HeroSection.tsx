import React from 'react';
import { ArrowRight, Sparkles, Code2, Database, Network } from 'lucide-react';
import { useHeroSectionViewModel } from './HeroSection.vm';
import { Button } from '../../reusable/base/Button/Button';
import { Badge } from '../../reusable/base/Badge/Badge';
import { AbstractCanvas } from '../../reusable/feature/AbstractCanvas/AbstractCanvas';

export const HeroSection: React.FC = () => {
  const { scrollToSection } = useHeroSectionViewModel();

  return (
    <section
      id="home"
      aria-label="Introduction & Engineering Philosophy"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Cursor-Reactive Canvas Background */}
      <AbstractCanvas />

      {/* Ambient Gradient Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability / Status Pill */}
        <div className="mb-4 sm:mb-6 animate-fadeIn max-w-full px-2">
          <Badge
            variant="cyan"
            size="md"
            icon={<span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1 shrink-0" />}
            className="text-center justify-center max-w-full flex-wrap leading-relaxed py-1.5 px-3.5 text-[11px] sm:text-xs"
          >
            Software Engineer &bull; Full Stack Developer &bull; 2+ Years Enterprise Experience
          </Badge>
        </div>

        {/* Primary Name Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            PARAMANANTHAM S
          </span>
        </h1>

        {/* Roles & Subtitle */}
        <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-semibold text-cyan-400 mb-6 flex-wrap">
          <span>Software Engineer</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-indigo-400">Full Stack Developer</span>
        </div>


        {/* Supporting Philosophy Statement */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
          Building production-grade digital experiences, enterprise platforms, and intelligent applications with modern full-stack architectures.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('projects')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto touch-manipulation"
          >
            Explore My Work
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection('experience')}
            leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
            className="w-full sm:w-auto touch-manipulation"
          >
            View Experience
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto touch-manipulation"
          >
            Let&apos;s Connect
          </Button>
        </div>

        {/* Core Architecture Highlights Chips */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>React &bull; TypeScript &bull; Tailwind</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Node.js / Express &bull; Python / FastAPI &bull; SQL Server / Postgres</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>WebSockets &bull; SSE &bull; AWS / Azure</span>
          </div>
        </div>
      </div>
    </section>
  );
};


