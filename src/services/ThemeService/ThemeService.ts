import { ThemeMode, ThemeStateBo } from './bo/Theme.bo';
import { ThemeServiceInterface, ThemeChangeListener, ThemeToggleOrigin } from './ThemeService.interface';
import { Logger } from '../../helpers/Logger';

const THEME_STORAGE_KEY = 'paramanantham_portfolio_theme';

export class ThemeService implements ThemeServiceInterface {
  private static instance: ThemeService | null = null;
  private currentTheme: ThemeMode;
  private listeners: Set<ThemeChangeListener> = new Set();

  constructor() {
    this.currentTheme = this.resolveInitialTheme();
    this.applyThemeToDom(this.currentTheme);
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  public static reset(): void {
    ThemeService.instance = null;
  }

  private resolveInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }

      // Check system preference if no stored preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (err: unknown) {
      Logger.warn('Failed to access localStorage for theme preference', {
        error: err instanceof Error ? err.message : String(err),
      });
    }

    return 'dark';
  }

  private applyThemeToDom(theme: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }

  public getTheme(): ThemeMode {
    return this.currentTheme;
  }

  public getThemeState(): ThemeStateBo {
    return {
      currentTheme: this.currentTheme,
      isDark: this.currentTheme === 'dark',
    };
  }

  public setTheme(mode: ThemeMode): void {
    if (this.currentTheme === mode) return;

    this.currentTheme = mode;
    this.applyThemeToDom(mode);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch (err: unknown) {
      Logger.warn('Failed to persist theme to localStorage', {
        error: err instanceof Error ? err.message : String(err),
      });
    }

    this.notifyListeners();
  }

  public toggleTheme(origin?: ThemeToggleOrigin): ThemeMode {
    const nextTheme: ThemeMode = this.currentTheme === 'dark' ? 'light' : 'dark';

    // 60FPS GPU-accelerated circular screen reveal using View Transitions API
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      origin &&
      typeof origin.x === 'number' &&
      typeof origin.y === 'number'
    ) {
      const { x, y } = origin;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      try {
        const doc = document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
        };

        // Suppress layout reflows during the snapshot
        document.documentElement.classList.add('is-theme-transitioning');

        const transition = doc.startViewTransition(() => {
          this.setTheme(nextTheme);
        });

        transition.ready
          .then(() => {
            const clipPath = [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration: 420,
                easing: 'cubic-bezier(0.2, 0, 0, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );

            anim.finished.finally(() => {
              document.documentElement.classList.remove('is-theme-transitioning');
            });
          })
          .catch((err: unknown) => {
            document.documentElement.classList.remove('is-theme-transitioning');
            Logger.warn('View transition animation fallback', { error: String(err) });
          });

        transition.finished.finally(() => {
          document.documentElement.classList.remove('is-theme-transitioning');
        });

        return nextTheme;
      } catch (err: unknown) {
        document.documentElement.classList.remove('is-theme-transitioning');
        Logger.warn('startViewTransition error fallback', { error: String(err) });
      }
    }

    this.setTheme(nextTheme);
    return nextTheme;
  }

  public subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.add(listener);
    listener(this.getThemeState());

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const state = this.getThemeState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err: unknown) {
        Logger.error('Error notifying theme listener', err);
      }
    });
  }
}
