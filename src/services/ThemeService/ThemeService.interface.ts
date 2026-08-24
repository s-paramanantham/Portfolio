import { ThemeMode, ThemeStateBo } from './bo/Theme.bo';

export type ThemeChangeListener = (themeState: ThemeStateBo) => void;

export interface ThemeToggleOrigin {
  readonly x: number;
  readonly y: number;
}

export interface ThemeServiceInterface {
  getTheme(): ThemeMode;
  getThemeState(): ThemeStateBo;
  setTheme(mode: ThemeMode): void;
  toggleTheme(origin?: ThemeToggleOrigin): ThemeMode;
  subscribe(listener: ThemeChangeListener): () => void;
}
