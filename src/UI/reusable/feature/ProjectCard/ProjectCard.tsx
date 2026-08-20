import React from 'react';
import { ArrowUpRight, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { ProjectBo, ProjectMetricBo } from '../../../../services/PortfolioService/bo/Project.bo';
import { useProjectCardViewModel } from './ProjectCard.vm';
import { Badge } from '../../base/Badge/Badge';
import { Modal } from '../../base/Modal/Modal';
import { Button } from '../../base/Button/Button';
import { GlassSurface } from '../../base/GlassSurface/GlassSurface';

export interface ProjectCardProps {
  readonly project: ProjectBo;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isModalOpen, openModal, closeModal } = useProjectCardViewModel({ project });

  return (
    <>
      <GlassSurface
        intensity="medium"
        hoverable
        className="p-6 sm:p-7 flex flex-col justify-between h-full group"
      >
        <div>
          {/* Header & Badges */}
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider">
              {project.category}
            </span>
            {project.badgeText && (
              <Badge variant="cyan" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                {project.badgeText}
              </Badge>
            )}
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-indigo-300/90 font-medium mt-1 mb-3">{project.subtitle}</p>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
            {project.summary}
          </p>

          {/* Metrics Preview */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.metrics.slice(0, 2).map((m: ProjectMetricBo) => (
              <div
                key={m.label}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col"
              >
                <span className="text-base font-bold font-mono text-cyan-400">{m.value}</span>
                <span className="text-[11px] text-slate-400 truncate">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer & Actions */}
        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="slate" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="slate" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={openModal}
            className="w-full"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Explore Case Study
          </Button>
        </div>
      </GlassSurface>

      {/* Redesigned Premium Case Study Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={project.title} maxWidth="3xl">
        <div className="space-y-6 text-left">
          {/* Header Banner */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900/80 to-indigo-950/60 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                {project.category}
              </span>
              {project.badgeText && (
                <Badge variant="cyan" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  {project.badgeText}
                </Badge>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
              {project.subtitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Key Impact Metrics Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Quantified Production Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
              {project.metrics.map((m: ProjectMetricBo) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
                >
                  <div className="text-xl sm:text-2xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                    {m.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Contributions & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Technical Contributions &amp; System Architecture
            </h4>
            <div className="space-y-2.5">
              {project.description.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start gap-3 hover:bg-slate-900/90 transition-colors"
                >
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Highlights */}
          {project.keyHighlights && project.keyHighlights.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Core Engineering Highlights
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {project.keyHighlights.map((hl: string) => (
                  <Badge key={hl} variant="emerald" size="sm">
                    {hl}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Complete Tech Stack Matrix */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Complete Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((t: string) => (
                <Badge key={t} variant="slate" size="sm">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Close Case Study
            </Button>
          </div>
        </div>
      </Modal>


    </>
  );
};
