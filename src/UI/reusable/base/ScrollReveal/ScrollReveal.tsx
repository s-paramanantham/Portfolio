import React from 'react';
import {
  useScrollRevealViewModel,
  RevealDirection,
} from './ScrollReveal.vm';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly direction?: RevealDirection;
  readonly delay?: number;
  readonly duration?: number;
  readonly threshold?: number;
  readonly once?: boolean;
  readonly children: React.ReactNode;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  direction = 'bottom',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  children,
  className = '',
  style,
  ...restProps
}) => {
  const { ref, containerClasses, inlineStyles } = useScrollRevealViewModel({
    direction,
    delay,
    duration,
    threshold,
    once,
  });

  return (
    <div
      ref={ref}
      className={`${containerClasses} ${className}`}
      style={{ ...inlineStyles, ...style }}
      {...restProps}
    >
      {children}
    </div>
  );
};
