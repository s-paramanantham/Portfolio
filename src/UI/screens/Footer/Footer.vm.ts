import { config } from '../../../config/Config';

export interface UseFooterViewModelReturn {
  readonly currentYear: number;
  readonly socialInfo: typeof config.social;
  readonly scrollToTop: () => void;
}

export const useFooterViewModel = (): UseFooterViewModelReturn => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    currentYear: new Date().getFullYear(),
    socialInfo: config.social,
    scrollToTop,
  };
};
