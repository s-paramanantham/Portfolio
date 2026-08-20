import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { useExperienceIntroSectionViewModel } from './ExperienceIntroSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';
import { Badge } from '../../reusable/base/Badge/Badge';
import { AnimatedCounter } from '../../reusable/base/AnimatedCounter/AnimatedCounter';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface ExperienceIntroSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const ExperienceIntroSection: React.FC<ExperienceIntroSectionProps> = ({
  portfolioService,
}) => {
  const { experienceIntro, isLoading } = useExperienceIntroSectionViewModel({ portfolioService });

  if (isLoading || !experienceIntro) {
    return <Loader label="Loading experience overview..." />;
  }

  return (
    <section
      id="experience"
      aria-label="Engineering Experience Overview"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >

      <GlassSurface intensity="high" borderGlow className="p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Narrative Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="md" icon={<Sparkles className="w-3 h-3" />}>
                {experienceIntro.tagline}
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Proven execution across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">
                AVASOFT &amp; ZEB
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {experienceIntro.narrative}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-300">
                {experienceIntro.architectureSummary}
              </p>
            </div>
          </div>

          {/* Metrics Right Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {experienceIntro.metrics.map((m) => (
              <div
                key={m.label}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 group-hover:scale-105 transition-transform origin-left">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2">
                  <span className="text-xs font-bold text-white block">{m.label}</span>
                  <span className="text-[11px] text-slate-400">{m.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassSurface>
    </section>
  );
};
