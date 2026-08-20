import React from 'react';
import { useCardViewModel, CardVariant } from './Card.vm';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: CardVariant;
  readonly isHoverable?: boolean;
  readonly children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  isHoverable = false,
  children,
  className = '',
  ...restProps
}) => {
  const { cardClasses } = useCardViewModel({ variant, isHoverable });

  return (
    <div
      className={`rounded-2xl p-6 ${cardClasses} ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};
