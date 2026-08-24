export type ThemeMode = 'dark' | 'light';

export interface ThemeStateBo {
  readonly currentTheme: ThemeMode;
  readonly isDark: boolean;
}
