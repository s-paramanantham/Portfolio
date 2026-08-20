import React from 'react';
import { useAnimatedCounterViewModel } from './AnimatedCounter.vm';

export interface AnimatedCounterProps {
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly durationMs?: number;
  readonly className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  durationMs = 1500,
  className = '',
}) => {
  const { count, elementRef } = useAnimatedCounterViewModel({
    targetValue: value,
    durationMs,
  });

  return (
    <span
      ref={elementRef}
      className={`font-mono font-bold tracking-tight ${className}`}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
