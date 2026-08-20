import React from 'react';
import { useGlassSurfaceViewModel, GlassIntensity } from './GlassSurface.vm';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly intensity?: GlassIntensity;
  readonly borderGlow?: boolean;
  readonly hoverable?: boolean;
  readonly children: React.ReactNode;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  intensity = 'medium',
  borderGlow = false,
  hoverable = false,
  children,
  className = '',
  ...restProps
}) => {
  const { surfaceClasses } = useGlassSurfaceViewModel({ intensity, borderGlow, hoverable });

  return (
    <div
      className={`rounded-2xl ${surfaceClasses} ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};
