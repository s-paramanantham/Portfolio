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
        return 'bg-white/60 dark:bg-slate-950/40 backdrop-blur-sm border-slate-200/70 dark:border-slate-800/50 shadow-sm';
      case 'high':
        return 'bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200 dark:border-slate-700/80 shadow-xl';
      case 'medium':
      default:
        return 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-slate-200/90 dark:border-slate-800/80 shadow-md';
    }
  };

  const glowClasses = borderGlow
    ? 'shadow-lg shadow-cyan-500/5 border-cyan-500/30 dark:border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-cyan-500/15 transition-all duration-300'
    : 'border';

  const hoverClasses = hoverable
    ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/95 dark:hover:bg-slate-900/80 transition-all duration-300'
    : '';

  return {
    surfaceClasses: `${getIntensityClasses()} ${glowClasses} ${hoverClasses}`.trim(),
  };
};
