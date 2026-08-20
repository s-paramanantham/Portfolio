import React from 'react';
import { useButtonViewModel, ButtonVariant, ButtonSize } from './Button.vm';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly leftIcon?: React.ReactNode;
  readonly rightIcon?: React.ReactNode;
  readonly children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className = '',
  type = 'button',
  ...restProps
}) => {
  const { isDisabled, isBusy, variantClasses, sizeClasses, handleClick } = useButtonViewModel({
    variant,
    size,
    isLoading,
    disabled,
    onClick,
  });

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      aria-busy={isBusy}
      className={`inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variantClasses} ${sizeClasses} ${className}`}
      {...restProps}
    >
      {isBusy ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isBusy && rightIcon && <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>}
    </button>
  );
};
