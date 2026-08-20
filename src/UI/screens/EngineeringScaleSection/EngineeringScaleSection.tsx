import React from 'react';
import { useEngineeringScaleSectionViewModel } from './EngineeringScaleSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { MetricCard } from '../../reusable/feature/MetricCard/MetricCard';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface EngineeringScaleSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const EngineeringScaleSection: React.FC<EngineeringScaleSectionProps> = ({
  portfolioService,
}) => {
  const { metrics, isLoading, error } = useEngineeringScaleSectionViewModel({ portfolioService });

  return (
    <section
      id="scale"
      aria-label="Engineering Scale and Numbers"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Quantified Impact
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Engineering Scale of Work
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Measurable outcomes delivering high-volume systems, multi-terabyte migrations, and mission-critical reliability.
        </p>
      </div>

      {isLoading ? (
        <Loader label="Loading engineering metrics..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-center max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}
    </section>
  );
};
