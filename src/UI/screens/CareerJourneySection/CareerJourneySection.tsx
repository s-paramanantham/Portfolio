import React from 'react';
import { useCareerJourneySectionViewModel } from './CareerJourneySection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { TimelineMilestone } from '../../reusable/feature/TimelineMilestone/TimelineMilestone';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface CareerJourneySectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const CareerJourneySection: React.FC<CareerJourneySectionProps> = ({
  portfolioService,
}) => {
  const { milestones, isLoading, error } = useCareerJourneySectionViewModel({ portfolioService });

  return (
    <section
      id="journey"
      aria-label="Career Journey & Professional Experience"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >

      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Career Journey
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Professional Experience &amp; Milestones
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Chronological progression across enterprise cloud migration and production healthcare systems.
        </p>
      </div>

      {isLoading ? (
        <Loader label="Loading career journey milestones..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-center max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="relative">
          {milestones.map((milestone, index) => (
            <TimelineMilestone
              key={milestone.id}
              milestone={milestone}
              isLast={index === milestones.length - 1}
            />
          ))}
        </div>
      )}
    </section>
  );
};
