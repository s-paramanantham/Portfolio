import React from 'react';
import { Briefcase } from 'lucide-react';
import { useFeaturedProjectsSectionViewModel } from './FeaturedProjectsSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ProjectCard } from '../../reusable/feature/ProjectCard/ProjectCard';
import { Loader } from '../../reusable/base/Loader/Loader';

export interface FeaturedProjectsSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  portfolioService,
}) => {
  const {
    categories,
    activeCategory,
    filteredProjects,
    isLoading,
    error,
    setActiveCategory,
  } = useFeaturedProjectsSectionViewModel({ portfolioService });

  return (
    <section
      id="work"
      aria-label="Featured Engineering Projects"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Case Studies &amp; Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Production systems, high-volume cloud migrations, and real-time streaming architectures.
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 pt-6 flex-wrap">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Rendering */}
      {isLoading ? (
        <Loader label="Loading projects catalog..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-center max-w-md mx-auto">
          {error}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};
