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

    if (
      origin &&
      typeof origin.x === 'number' &&
      typeof origin.y === 'number' &&
      typeof document !== 'undefined'
    ) {
      this.triggerCircularGpuBloom(origin, nextTheme);
      return nextTheme;
    }

    this.setTheme(nextTheme);
    return nextTheme;
  }

  private triggerCircularGpuBloom(origin: ThemeToggleOrigin, nextTheme: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const { x, y } = origin;
    const viewportWidth =
      typeof window !== 'undefined'
        ? Math.max(window.visualViewport?.width || 0, window.innerWidth, document.documentElement.clientWidth || 0)
        : 1920;
    const viewportHeight =
      typeof window !== 'undefined'
        ? Math.max(window.visualViewport?.height || 0, window.innerHeight, document.documentElement.clientHeight || 0)
        : 1080;

    const originX = Math.max(0, Math.min(x, viewportWidth));
    const originY = Math.max(0, Math.min(y, viewportHeight));

    // Calculate maximum radius to any corner of the viewport + 40% margin to ensure 100% full-screen coverage
    const maxCornerDist = Math.hypot(
      Math.max(originX, viewportWidth - originX),
      Math.max(originY, viewportHeight - originY)
    );
    const targetRadius = Math.ceil(maxCornerDist * 1.4);

    const bloomEl = document.createElement('div');
    bloomEl.setAttribute('aria-hidden', 'true');
    bloomEl.style.position = 'fixed';
    bloomEl.style.left = `${originX}px`;
    bloomEl.style.top = `${originY}px`;
    bloomEl.style.width = '20px';
    bloomEl.style.height = '20px';
    bloomEl.style.marginLeft = '-10px';
    bloomEl.style.marginTop = '-10px';
    bloomEl.style.borderRadius = '9999px';
    bloomEl.style.pointerEvents = 'none';
    bloomEl.style.zIndex = '999999';
    bloomEl.style.willChange = 'transform, opacity';
    bloomEl.style.transform = 'translate3d(0, 0, 0) scale(0)';
    bloomEl.style.backgroundColor = nextTheme === 'dark' ? '#030712' : '#f8fafc';
    bloomEl.style.boxShadow =
      nextTheme === 'dark'
        ? '0 0 60px 10px rgba(6, 182, 212, 0.45), 0 0 100px 20px rgba(99, 102, 241, 0.35)'
        : '0 0 60px 10px rgba(99, 102, 241, 0.35), 0 0 100px 20px rgba(6, 182, 212, 0.25)';

    document.body.appendChild(bloomEl);

    // Apply the theme change
    this.setTheme(nextTheme);

    const cleanup = (): void => {
      if (bloomEl.parentNode) {
        bloomEl.parentNode.removeChild(bloomEl);
      }
    };

    const targetScale = Math.ceil((targetRadius * 2) / 20);

    if (typeof bloomEl.animate === 'function') {
      const animation = bloomEl.animate(
        [
          { transform: 'translate3d(0, 0, 0) scale(0)', opacity: 1 },
          { transform: `translate3d(0, 0, 0) scale(${targetScale * 0.85})`, opacity: 0.95, offset: 0.75 },
          { transform: `translate3d(0, 0, 0) scale(${targetScale})`, opacity: 0 },
        ],
        {
          duration: 620,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          fill: 'forwards',
        }
      );

      animation.onfinish = cleanup;
      animation.oncancel = cleanup;
    }

    setTimeout(cleanup, 700);
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
