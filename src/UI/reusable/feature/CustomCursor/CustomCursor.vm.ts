import { useState, useEffect, useRef } from 'react';

export interface CursorPosition {
  readonly x: number;
  readonly y: number;
}

export interface UseCustomCursorViewModelReturn {
  readonly dotPos: CursorPosition;
  readonly ringPos: CursorPosition;
  readonly isHovered: boolean;
  readonly isClicking: boolean;
  readonly isVisible: boolean;
  readonly isTouchDevice: boolean;
}

export const useCustomCursorViewModel = (): UseCustomCursorViewModelReturn => {
  const [dotPos, setDotPos] = useState<CursorPosition>({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const targetPosRef = useRef<CursorPosition>({ x: -100, y: -100 });
  const ringPosRef = useRef<CursorPosition>({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent): void => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });
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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Smooth spring trailing animation for the ring
    const animateFollower = (): void => {
      const ease = 0.18;
      ringPosRef.current = {
        x: ringPosRef.current.x + (targetPosRef.current.x - ringPosRef.current.x) * ease,
        y: ringPosRef.current.y + (targetPosRef.current.y - ringPosRef.current.y) * ease,
      };
      setRingPos({ ...ringPosRef.current });
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
    dotPos,
    ringPos,
    isHovered,
    isClicking,
    isVisible,
    isTouchDevice,
  };
};
