import React from 'react';
import { useAbstractCanvasViewModel } from './AbstractCanvas.vm';

export interface AbstractCanvasProps {
  readonly className?: string;
}

export const AbstractCanvas: React.FC<AbstractCanvasProps> = ({ className = '' }) => {
  const { canvasRef } = useAbstractCanvasViewModel();

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
