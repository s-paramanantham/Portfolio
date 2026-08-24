import { useState, useEffect, useRef } from 'react';

export type RevealDirection = 'bottom' | 'left' | 'right' | 'boom' | 'top';

export interface UseScrollRevealViewModelProps {
  readonly direction?: RevealDirection;
  readonly delay?: number;
  readonly duration?: number;
  readonly threshold?: number;
  readonly once?: boolean;
}

export interface UseScrollRevealViewModelReturn {
  readonly ref: React.RefObject<HTMLDivElement>;
  readonly isVisible: boolean;
  readonly containerClasses: string;
  readonly inlineStyles: React.CSSProperties;
}

export const useScrollRevealViewModel = (
  props: UseScrollRevealViewModelProps = {}
): UseScrollRevealViewModelReturn => {
  const {
    direction = 'bottom',
    delay = 0,
    duration = 650,
    threshold = 0.05,
    once = true,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );


    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getHiddenClasses = (): string => {
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-12 sm:-translate-x-16 scale-95';
      case 'right':
        return 'opacity-0 translate-x-12 sm:translate-x-16 scale-95';
      case 'boom':
        return 'opacity-0 scale-90';
      case 'top':
        return 'opacity-0 -translate-y-12 scale-95';
      case 'bottom':
      default:
        return 'opacity-0 translate-y-12 sm:translate-y-16 scale-95';
    }
  };

  const getVisibleClasses = (): string => {
    return 'opacity-100 translate-x-0 translate-y-0 scale-100';
  };

  const containerClasses = `transition-all will-change-[transform,opacity] ${
    isVisible ? getVisibleClasses() : getHiddenClasses()
  }`.trim();

  const inlineStyles: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return {
    ref,
    isVisible,
    containerClasses,
    inlineStyles,
  };
};
