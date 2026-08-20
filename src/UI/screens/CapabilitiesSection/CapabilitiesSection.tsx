import React from 'react';
import { useCapabilitiesSectionViewModel } from './CapabilitiesSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { CapabilityDrawer } from '../../reusable/feature/CapabilityDrawer/CapabilityDrawer';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface CapabilitiesSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  portfolioService,
}) => {
  const { categories, isLoading, error } = useCapabilitiesSectionViewModel({ portfolioService });

  return (
    <section
      id="capabilities"
      aria-label="Interactive Technical Capabilities and Skills Matrix"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Technical Skills &amp; Competencies
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Capabilities &amp; Domain Expertise
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Interactive matrix categorized by engineering domains. Click on any capability to view production application context.
        </p>
      </div>

      {isLoading ? (
        <Loader label="Loading technical capabilities matrix..." />
      ) : error ? (
        <div className="p-4 sm:p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-center max-w-md mx-auto text-xs sm:text-sm">
          {error}
        </div>
      ) : (
        <CapabilityDrawer categories={categories} />
      )}
    </section>
  );
};

