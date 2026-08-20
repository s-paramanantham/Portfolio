import React from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { CareerMilestoneBo } from '../../../../services/PortfolioService/bo/CareerJourney.bo';
import { useTimelineMilestoneViewModel } from './TimelineMilestone.vm';
import { Badge } from '../../base/Badge/Badge';

export interface TimelineMilestoneProps {
  readonly milestone: CareerMilestoneBo;
  readonly isLast?: boolean;
}

export const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({
  milestone,
  isLast = false,
}) => {
  const { isExpanded, toggleExpand } = useTimelineMilestoneViewModel();

  return (
    <div className="relative flex gap-4 sm:gap-8 group">
      {/* Milestone Indicator & Connecting Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
            milestone.isCurrent
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-300'
          }`}
        >
          <Briefcase className="w-5 h-5" />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-700 via-slate-800 to-transparent my-2" />
        )}
      </div>

      {/* Milestone Content Card */}
      <div className="flex-1 pb-10">
        <div
          onClick={toggleExpand}
          className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 shadow-lg cursor-pointer"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold text-white tracking-tight">
                  {milestone.company}
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-sm font-semibold text-cyan-400">
                  {milestone.engineeringRole}
                </span>
                <Badge variant="slate" size="sm">
                  Official: {milestone.officialRole}
                </Badge>
                {milestone.isCurrent && (
                  <Badge variant="emerald" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                    Recent Role
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">{milestone.companyDescription}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono shrink-0">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {milestone.period}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {milestone.location}
              </span>
            </div>
          </div>

          {/* Key Responsibilities */}
          <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
            {milestone.keyResponsibilities.map((resp: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          {/* Expandable Technical Ownership & Impact */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Technical Ownership
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {milestone.technicalOwnership.map((item: string) => (
                    <Badge key={item} variant="indigo" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Quantified Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {milestone.quantifiedImpact.map((impact: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {impact}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {milestone.technologies.map((tech: string) => (
                    <Badge key={tech} variant="cyan" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Toggle indicator */}
          <div className="mt-4 flex items-center justify-center text-slate-500 hover:text-cyan-400 text-xs transition-colors">
            {isExpanded ? (
              <span className="inline-flex items-center gap-1">
                Show Less <ChevronUp className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                View Technical Ownership & Impact <ChevronDown className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
