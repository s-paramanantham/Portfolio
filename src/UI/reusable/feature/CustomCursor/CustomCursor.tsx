import React from 'react';
import { useCustomCursorViewModel } from './CustomCursor.vm';

export const CustomCursor: React.FC = () => {
  const { dotPos, ringPos, isHovered, isClicking, isVisible, isTouchDevice } =
    useCustomCursorViewModel();

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Outer Spring Follower Aura */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,border-color,opacity,box-shadow] duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.6)] backdrop-blur-[1px]'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 bg-indigo-500/40 border-2 border-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.7)]'
            : 'w-10 h-10 -ml-5 -mt-5 bg-cyan-500/10 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
        }`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`,
        }}
      />

      {/* Center Precise Dot */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-transform duration-75 will-change-transform ${
          isHovered
            ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-cyan-200 scale-125 shadow-[0_0_10px_rgba(6,182,212,1)]'
            : isClicking
            ? 'w-2 h-2 -ml-1 -mt-1 bg-indigo-300 scale-75'
            : 'w-2 h-2 -ml-1 -mt-1 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
        }`}
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`,
        }}
      />
    </div>
  );
};

