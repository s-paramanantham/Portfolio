import React from 'react';
import { useLoaderViewModel } from './Loader.vm';

export interface LoaderProps {
  readonly label?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  label = 'Loading...',
  size = 'md',
  fullScreen = false,
}) => {
  const { spinnerSizeClasses } = useLoaderViewModel({ size });

  const content = (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div
        className={`${spinnerSizeClasses} border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin`}
        aria-hidden="true"
      />
      {label && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center w-full">{content}</div>;
};
