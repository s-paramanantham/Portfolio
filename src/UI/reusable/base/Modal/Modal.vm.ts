import { useEffect, useCallback } from 'react';

export interface UseModalViewModelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface UseModalViewModelReturn {
  readonly handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly handleContainerClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const useModalViewModel = (props: UseModalViewModelProps): UseModalViewModelReturn => {
  const { isOpen, onClose } = props;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow || '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);


  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  return {
    handleBackdropClick,
    handleContainerClick,
  };
};
