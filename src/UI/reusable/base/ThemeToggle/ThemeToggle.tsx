import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeToggleViewModel, UseThemeToggleViewModelProps } from './ThemeToggle.vm';

export interface ThemeToggleProps extends UseThemeToggleViewModelProps {
  readonly className?: string;
  readonly showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  themeService,
  className = '',
  showLabel = false,
}) => {
  const { isDark, toggleTheme, label } = useThemeToggleViewModel({ themeService });
  const [isBooming, setIsBooming] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (isBooming) return;

    setIsBooming(true);
    setTimeout(() => setIsBooming(false), 600);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX && e.clientX > 0 ? e.clientX : rect.left + rect.width / 2;
    const y = e.clientY && e.clientY > 0 ? e.clientY : rect.top + rect.height / 2;

    toggleTheme({ x, y });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px] min-w-[40px] justify-center cursor-pointer overflow-hidden group ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-400/40 hover:bg-slate-800 shadow-sm shadow-amber-500/10'
          : 'bg-white/90 border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 hover:bg-slate-50 shadow-sm shadow-indigo-500/10'
      } ${className}`}
    >
      {/* Booming circular shockwave ring on click */}
      {isBooming && (
        <span
          className={`absolute inset-0 rounded-full animate-ping pointer-events-none opacity-50 ${
            isDark ? 'bg-amber-400' : 'bg-indigo-500'
          }`}
        />
      )}

      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-300 transition-all duration-500 rotate-0 scale-100 group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 transition-all duration-500 rotate-0 scale-100 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none pr-1">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
