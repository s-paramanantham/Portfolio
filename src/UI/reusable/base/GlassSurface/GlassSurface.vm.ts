export type GlassIntensity = 'low' | 'medium' | 'high';

export interface UseGlassSurfaceViewModelProps {
  readonly intensity?: GlassIntensity;
  readonly borderGlow?: boolean;
  readonly hoverable?: boolean;
}

export interface UseGlassSurfaceViewModelReturn {
  readonly surfaceClasses: string;
}

export const useGlassSurfaceViewModel = (
  props: UseGlassSurfaceViewModelProps
): UseGlassSurfaceViewModelReturn => {
  const { intensity = 'medium', borderGlow = false, hoverable = false } = props;

  const getIntensityClasses = (): string => {
    switch (intensity) {
      case 'low':
        return 'bg-slate-950/40 backdrop-blur-sm border-slate-800/50';
      case 'high':
        return 'bg-slate-900/80 backdrop-blur-2xl border-slate-700/80';
      case 'medium':
      default:
        return 'bg-slate-900/60 backdrop-blur-xl border-slate-800/80';
    }
  };

  const glowClasses = borderGlow
    ? 'shadow-lg shadow-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-cyan-500/15 transition-all duration-300'
    : 'border';

  const hoverClasses = hoverable
    ? 'hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300'
    : '';

  return {
    surfaceClasses: `${getIntensityClasses()} ${glowClasses} ${hoverClasses}`.trim(),
  };
};
