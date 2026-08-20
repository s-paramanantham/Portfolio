export interface UseInputViewModelProps {
  readonly hasError?: boolean;
  readonly disabled?: boolean;
}

export interface UseInputViewModelReturn {
  readonly inputClasses: string;
}

export const useInputViewModel = (props: UseInputViewModelProps): UseInputViewModelReturn => {
  const { hasError = false, disabled = false } = props;

  const baseClasses = 'w-full px-4 py-3 bg-slate-900/80 border rounded-xl font-sans text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-950';

  const stateClasses = hasError
    ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30'
    : 'border-slate-800 focus:border-cyan-500/60 focus:ring-cyan-500/20';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed bg-slate-950/60'
    : '';

  return {
    inputClasses: `${baseClasses} ${stateClasses} ${disabledClasses}`.trim(),
  };
};
