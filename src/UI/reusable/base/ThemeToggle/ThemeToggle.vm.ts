import { useState, useEffect } from 'react';
import { ThemeServiceInterface } from '../../../../services/ThemeService/ThemeService.interface';
import { ServiceFactory } from '../../../../services/ServiceFactory';
import { ThemeMode } from '../../../../services/ThemeService/bo/Theme.bo';

export interface UseThemeToggleViewModelProps {
  readonly themeService?: ThemeServiceInterface;
}

export interface UseThemeToggleViewModelReturn {
  readonly theme: ThemeMode;
  readonly isDark: boolean;
  readonly toggleTheme: (origin?: { x: number; y: number }) => void;
  readonly label: string;
}

export const useThemeToggleViewModel = (
  props: UseThemeToggleViewModelProps = {}
): UseThemeToggleViewModelReturn => {
  const { themeService = ServiceFactory.getThemeService() } = props;

  const [themeState, setThemeState] = useState(() => themeService.getThemeState());

  useEffect(() => {
    const unsubscribe = themeService.subscribe((newState) => {
      setThemeState(newState);
    });
    return unsubscribe;
  }, [themeService]);

  const toggleTheme = (origin?: { x: number; y: number }): void => {
    themeService.toggleTheme(origin);
  };

  const label = themeState.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return {
    theme: themeState.currentTheme,
    isDark: themeState.isDark,
    toggleTheme,
    label,
  };
};
