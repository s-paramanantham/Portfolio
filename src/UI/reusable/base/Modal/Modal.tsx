import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useModalViewModel } from './Modal.vm';

export interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
}) => {
  const { handleBackdropClick, handleContainerClick } = useModalViewModel({
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  const getMaxWidthClasses = (): string => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case '3xl':
        return 'max-w-3xl';
      case '4xl':
        return 'max-w-4xl';
      case '2xl':
      default:
        return 'max-w-2xl';
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      <div
        onClick={handleContainerClick}
        className={`w-full ${getMaxWidthClasses()} bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl dark:shadow-cyan-950/40 my-auto max-h-[88vh] flex flex-col overflow-hidden animate-scaleUp text-left`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 shrink-0">
          <div>
            {title && (
              <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shrink-0 ml-3 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

