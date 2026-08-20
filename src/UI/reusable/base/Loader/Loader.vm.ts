export interface UseLoaderViewModelProps {
  readonly size?: 'sm' | 'md' | 'lg';
}

export interface UseLoaderViewModelReturn {
  readonly spinnerSizeClasses: string;
}

export const useLoaderViewModel = (props: UseLoaderViewModelProps): UseLoaderViewModelReturn => {
  const { size = 'md' } = props;

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'w-5 h-5 border-2';
      case 'lg':
        return 'w-12 h-12 border-4';
      case 'md':
      default:
        return 'w-8 h-8 border-3';
    }
  };

  return {
    spinnerSizeClasses: getSizeClasses(),
  };
};
