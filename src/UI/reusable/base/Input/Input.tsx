import React from 'react';
import { useInputViewModel } from './Input.vm';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  ...restProps
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  const { inputClasses } = useInputViewModel({
    hasError: Boolean(error),
    disabled,
  });

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-300 tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={inputClasses}
        {...restProps}
      />
      {error && (
        <span id={errorId} className="text-xs font-medium text-red-400 mt-0.5" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} className="text-xs text-slate-400 mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
};
