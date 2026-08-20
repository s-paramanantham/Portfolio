import React from 'react';
import { useTextareaViewModel } from './Textarea.vm';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  ...restProps
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = textareaId ? `${textareaId}-error` : undefined;
  const helperId = textareaId ? `${textareaId}-helper` : undefined;

  const { textareaClasses } = useTextareaViewModel({
    hasError: Boolean(error),
    disabled,
  });

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-slate-300 tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={textareaClasses}
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
