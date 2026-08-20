import { useState } from 'react';

export interface UseTimelineMilestoneViewModelReturn {
  readonly isExpanded: boolean;
  readonly toggleExpand: () => void;
}

export const useTimelineMilestoneViewModel = (): UseTimelineMilestoneViewModelReturn => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = (): void => {
    setIsExpanded((prev) => !prev);
  };

  return {
    isExpanded,
    toggleExpand,
  };
};
