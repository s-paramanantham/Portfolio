export type CardVariant = 'default' | 'glass' | 'glow' | 'interactive';

export interface UseCardViewModelProps {
  readonly variant?: CardVariant;
  readonly isHoverable?: boolean;
}

export interface UseCardViewModelReturn {
  readonly cardClasses: string;
}

export const useCardViewModel = (props: UseCardViewModelProps): UseCardViewModelReturn => {
  const { variant = 'default', isHoverable = false } = props;

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'glass':
        return 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl';
      case 'glow':
        return 'bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-cyan-400/40 dark:border-cyan-500/30 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/60 dark:hover:border-cyan-400/50 hover:shadow-cyan-500/20';
      case 'interactive':
        return 'bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer';
      case 'default':
      default:
        return 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md';
    }
  };

  const hoverClasses = isHoverable && variant !== 'interactive'
    ? 'transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'
    : '';

  return {
    cardClasses: `${getVariantClasses()} ${hoverClasses}`.trim(),
  };
};
