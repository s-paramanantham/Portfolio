import React from 'react';
import {
  Layers,
  Monitor,
  Cpu,
  Users,
  MessageSquare,
  Database,
  Building2,
  ShieldCheck,
  Server,
  Code2,
} from 'lucide-react';
import { ScaleMetricBo } from '../../../../services/PortfolioService/bo/ScaleMetric.bo';
import { AnimatedCounter } from '../../base/AnimatedCounter/AnimatedCounter';
import { GlassSurface } from '../../base/GlassSurface/GlassSurface';

export interface MetricCardProps {
  readonly metric: ScaleMetricBo;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const renderIcon = () => {
    const iconClass = 'w-5 h-5 text-cyan-400';
    switch (metric.iconName) {
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Monitor':
        return <Monitor className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'MessageSquare':
        return <MessageSquare className={iconClass} />;
      case 'Database':
        return <Database className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Server':
        return <Server className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      default:
        return <Cpu className={iconClass} />;
    }
  };


  return (
    <GlassSurface
      intensity="low"
      hoverable
      className="p-5 sm:p-6 flex flex-col justify-between h-full group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
          {renderIcon()}
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          {metric.category}
        </span>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight flex items-baseline gap-0.5">
          <AnimatedCounter value={metric.numericValue} suffix={metric.suffix} />
        </div>
        <h4 className="text-sm font-semibold text-slate-200 mt-2 tracking-tight group-hover:text-cyan-300 transition-colors">
          {metric.label}
        </h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{metric.description}</p>
      </div>
    </GlassSurface>
  );
};
