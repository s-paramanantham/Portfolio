import React from 'react';
import {
  Briefcase,
  Dna,
  ArrowLeft,
  Zap,
  LayoutGrid,
} from 'lucide-react';
import { useProjectsSectionViewModel } from './ProjectsSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ProjectCard } from '../../reusable/feature/ProjectCard/ProjectCard';
import { GenomicsProjectSection } from '../GenomicsProjectSection/GenomicsProjectSection';
import { MigrationProjectSection } from '../MigrationProjectSection/MigrationProjectSection';
import { Button } from '../../reusable/base/Button/Button';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface ProjectsSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ portfolioService }) => {
  const {
    projects,
    activeView,
    isLoading,
    error,
    setActiveView,
    openDeepDive,
    closeDeepDive,
  } = useProjectsSectionViewModel({ portfolioService });

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects & Case Studies"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          Enterprise Case Studies &amp; Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Featured Engineering Projects
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          Production systems scaling 300+ screens, 200+ REST APIs, real-time streaming architectures, and multi-terabyte enterprise data migrations.
        </p>

        {/* View Mode Toggle Switcher */}
        <div className="pt-4 flex items-center justify-center w-full">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-lg gap-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveView('overview')}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex-1 sm:flex-initial whitespace-nowrap ${
                activeView === 'overview'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              <span>Projects Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('genomics')}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex-1 sm:flex-initial whitespace-nowrap ${
                activeView === 'genomics'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <Dna className="w-3.5 h-3.5 shrink-0" />
              <span>Genomics Deep Dive</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('migration')}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex-1 sm:flex-initial whitespace-nowrap ${
                activeView === 'migration'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Migration Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader label="Loading engineering projects..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-center max-w-md mx-auto">
          {error}
        </div>
      ) : activeView === 'overview' ? (
        /* Overview Mode: Cards Grid with Deep Dive Buttons */
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col space-y-3">
                <ProjectCard project={project} />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openDeepDive(project.id)}
                  className="w-full justify-center min-h-[44px]"
                  leftIcon={
                    project.id.includes('genomics') ? (
                      <Dna className="w-4 h-4 text-cyan-300" />
                    ) : (
                      <Zap className="w-4 h-4 text-indigo-300" />
                    )
                  }
                >
                  {project.id.includes('genomics')
                    ? 'Explore 3-Role Architecture & Live Telemetry'
                    : 'Run Interactive Migration Pipeline Simulation'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Deep Dive Mode: Interactive Showcase on Demand */
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={closeDeepDive}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="w-full sm:w-auto min-h-[44px] justify-center sm:justify-start"
            >
              Back to Projects Overview
            </Button>

            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider text-center sm:text-right">
              {activeView === 'genomics'
                ? 'Interactive Genomics Showcase'
                : 'Interactive Migration Simulation'}
            </span>
          </div>

          {activeView === 'genomics' ? (
            <GenomicsProjectSection portfolioService={portfolioService} />
          ) : (
            <MigrationProjectSection />
          )}
        </div>
      )}
    </section>
  );
};
