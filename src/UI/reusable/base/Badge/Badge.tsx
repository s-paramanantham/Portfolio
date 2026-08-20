import React from 'react';
import { useBadgeViewModel, BadgeVariant, BadgeSize } from './Badge.vm';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly icon?: React.ReactNode;
  readonly children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'slate',
  size = 'sm',
  icon,
  children,
  className = '',
  ...restProps
}) => {
  const { badgeClasses } = useBadgeViewModel({ variant, size });

  return (
    <span className={`${badgeClasses} ${className}`} {...restProps}>
      {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
