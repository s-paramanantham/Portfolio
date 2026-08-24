import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseCustomCursorViewModelReturn {
  readonly ringRef: RefObject<HTMLDivElement>;
  readonly dotRef: RefObject<HTMLDivElement>;
  readonly isHovered: boolean;
  readonly isClicking: boolean;
  readonly isVisible: boolean;
  readonly isTouchDevice: boolean;
}

export const useCustomCursorViewModel = (): UseCustomCursorViewModelReturn => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
    );
  });

  const targetPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent): void => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      setIsVisible(true);
      setIsTouchDevice(false);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], [role="tab"], input, textarea, select, [data-cursor-interactive]')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleTouchStart = (): void => {
      setIsTouchDevice(true);
      setIsVisible(false);
    };

    const handleMouseDown = (): void => setIsClicking(true);
    const handleMouseUp = (): void => setIsClicking(false);
    const handleMouseLeave = (): void => setIsVisible(false);
    const handleMouseEnter = (): void => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.documentElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    // Direct GPU spring follower animation loop
    const animateFollower = (): void => {
      const ease = 0.18;
      ringPosRef.current.x += (targetPosRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y += (targetPosRef.current.y - ringPosRef.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(animateFollower);
    };

    animFrameRef.current = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return {
    ringRef,
    dotRef,
    isHovered,
    isClicking,
    isVisible,
    isTouchDevice,
  };
};
