import React from 'react';
import {
  Layout,
  Server,
  Database,
  Cloud,
  Zap,
  ShieldCheck,
  Terminal,
  Sparkles,
  Info,
} from 'lucide-react';
import { CapabilityCategoryBo, CapabilityItemBo } from '../../../../services/PortfolioService/bo/Capability.bo';
import { useCapabilityDrawerViewModel } from './CapabilityDrawer.vm';
import { Badge } from '../../base/Badge/Badge';
import { GlassSurface } from '../../base/GlassSurface/GlassSurface';

export interface CapabilityDrawerProps {
  readonly categories: readonly CapabilityCategoryBo[];
}

export const CapabilityDrawer: React.FC<CapabilityDrawerProps> = ({ categories }) => {
  const {
    selectedCategoryId,
    selectedSkill,
    activeCategory,
    selectCategory,
    selectSkill,
  } = useCapabilityDrawerViewModel({ categories });

  const renderCategoryIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Layout':
        return <Layout className={className} />;
      case 'Server':
        return <Server className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'Cloud':
        return <Cloud className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      default:
        return <Layout className={className} />;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      {/* Category Selection Tabs */}
      <div
        role="tablist"
        aria-label="Capability Domains"
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
      >
        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${category.id}`}
              onClick={() => selectCategory(category.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation active:scale-[0.98] ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={isSelected ? 'text-cyan-400' : 'text-slate-500'}>
                {renderCategoryIcon(category.iconName)}
              </span>
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Skills Surface */}
      {activeCategory && (
        <GlassSurface
          intensity="high"
          borderGlow
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 w-full overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="text-cyan-400">
                  {renderCategoryIcon(activeCategory.iconName, 'w-5 h-5')}
                </span>
                {activeCategory.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {activeCategory.description}
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto">
              {activeCategory.skills.length} Capabilities
            </span>
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
            {activeCategory.skills.map((skill: CapabilityItemBo) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => selectSkill(isSelected ? null : skill)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[44px] touch-manipulation active:scale-[0.99] select-none ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {skill.name}
                    </span>
                    {skill.isHighlighted && (
                      <Badge variant="cyan" size="sm" icon={<Sparkles className="w-2.5 h-2.5" />}>
                        Core
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Proficiency: <strong className="text-slate-300">{skill.proficiency}</strong>
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{skill.context}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Skill Context Panel */}
          {selectedSkill && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-slate-300 flex items-start gap-2.5 sm:gap-3 animate-fadeIn">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 font-semibold text-xs sm:text-sm block">
                  Production Application Context: {selectedSkill.name}
                </strong>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{selectedSkill.context}</p>
              </div>
            </div>
          )}
        </GlassSurface>
      )}
    </div>
  );
};

