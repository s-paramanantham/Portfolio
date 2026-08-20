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
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30';
      case 'indigo':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30';
      case 'emerald':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
      case 'amber':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      case 'purple':
      case 'violet':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/30';
      case 'slate':
      default:
        return 'bg-slate-800/70 text-slate-300 border-slate-700/60';
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
