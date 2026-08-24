import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import { useAboutSectionViewModel } from './AboutSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';
import { Badge } from '../../reusable/base/Badge/Badge';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface AboutSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ portfolioService }) => {
  const { aboutDetails, isLoading } = useAboutSectionViewModel({ portfolioService });

  if (isLoading || !aboutDetails) {
    return <Loader label="Loading education & background..." />;
  }

  const { education, coreValues } = aboutDetails;

  return (
    <section
      id="about"
      aria-label="About the Engineer and Background"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Background &amp; Philosophy
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineer. Builder. Problem Solver.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The engineering mindset, academic foundation, and technical values driving every line of production code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic Credentials & Location */}
        <div className="lg:col-span-6 space-y-6">
          <GlassSurface intensity="high" borderGlow className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Academic Background
              </h3>
              <Badge variant="emerald" size="sm" icon={<Award className="w-3 h-3" />}>
                Score: {education.score}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{education.degree}</h4>
              <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{education.institution}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {education.location}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
                Academic Highlights
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {education.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassSurface>
        </div>

        {/* Right Column: Engineering Principles & Values */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mb-4">
            <HeartHandshake className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Core Engineering Principles
          </h3>

          <div className="space-y-4">
            {coreValues.map((value, idx) => (
              <GlassSurface
                key={value.title}
                intensity="low"
                hoverable
                className="p-5 rounded-2xl flex items-start gap-4 group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:scale-110 group-hover:border-indigo-400 transition-all">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
