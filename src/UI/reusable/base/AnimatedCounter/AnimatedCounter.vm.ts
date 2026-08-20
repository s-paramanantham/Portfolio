import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseAnimatedCounterViewModelProps {
  readonly targetValue: number;
  readonly durationMs?: number;
}

export interface UseAnimatedCounterViewModelReturn {
  readonly count: number;
  readonly elementRef: RefObject<HTMLSpanElement>;
}

export const useAnimatedCounterViewModel = (
  props: UseAnimatedCounterViewModelProps
): UseAnimatedCounterViewModelReturn => {
  const { targetValue, durationMs = 1500 } = props;
  const [count, setCount] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return targetValue;
    }
    return 0;
  });
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const startTime = performance.now();
          const startValue = 0;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(startValue + (targetValue - startValue) * easeProgress);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, durationMs]);

  return {
    count,
    elementRef,
  };
};
