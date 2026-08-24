export type BadgeVariant = 'cyan' | 'indigo' | 'emerald' | 'amber' | 'violet' | 'purple' | 'slate';
export type BadgeSize = 'sm' | 'md';

export interface UseBadgeViewModelProps {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
}

export interface UseBadgeViewModelReturn {
  readonly badgeClasses: string;
}

export const useBadgeViewModel = (props: UseBadgeViewModelProps): UseBadgeViewModelReturn => {
  const { variant = 'slate', size = 'sm' } = props;

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'cyan':
        return 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-300/80 dark:border-cyan-500/30 font-medium';
      case 'indigo':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-300/80 dark:border-indigo-500/30 font-medium';
      case 'emerald':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-500/30 font-medium';
      case 'amber':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300/80 dark:border-amber-500/30 font-medium';
      case 'purple':
      case 'violet':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300/80 dark:border-purple-500/30 font-medium';
      case 'slate':
      default:
        return 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700/60 font-medium';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'md':
        return 'px-3 py-1 text-xs font-medium';
      case 'sm':
      default:
        return 'px-2.5 py-0.5 text-[11px] font-medium tracking-wide';
    }
  };

  return {
    badgeClasses: `inline-flex items-center gap-1.5 rounded-full border font-sans ${getVariantClasses()} ${getSizeClasses()}`.trim(),
  };
};
