import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface UseButtonViewModelProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UseButtonViewModelReturn {
  readonly isDisabled: boolean;
  readonly isBusy: boolean;
  readonly variantClasses: string;
  readonly sizeClasses: string;
  readonly handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const useButtonViewModel = (props: UseButtonViewModelProps): UseButtonViewModelReturn => {
  const { variant = 'primary', size = 'md', isLoading = false, disabled = false, onClick } = props;

  const isDisabled = disabled || isLoading;
  const isBusy = isLoading;

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/30';
      case 'secondary':
        return 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/80 hover:border-slate-600 shadow-sm';
      case 'outline':
        return 'bg-transparent hover:bg-cyan-950/30 text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 hover:border-cyan-400';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent';
      case 'danger':
        return 'bg-red-600/90 hover:bg-red-500 text-white border border-red-500/50 shadow-lg shadow-red-500/20';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5';
      case 'lg':
        return 'px-6 py-3 text-base font-semibold rounded-xl gap-3';
      case 'md':
      default:
        return 'px-4 py-2.5 text-sm font-semibold rounded-lg gap-2';
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return {
    isDisabled,
    isBusy,
    variantClasses: getVariantClasses(),
    sizeClasses: getSizeClasses(),
    handleClick,
  };
};
