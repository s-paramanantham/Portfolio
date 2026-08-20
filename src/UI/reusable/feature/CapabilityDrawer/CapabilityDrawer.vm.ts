import { useState } from 'react';
import { CapabilityCategoryBo, CapabilityItemBo } from '../../../../services/PortfolioService/bo/Capability.bo';

export interface UseCapabilityDrawerViewModelProps {
  readonly categories: readonly CapabilityCategoryBo[];
}

export interface UseCapabilityDrawerViewModelReturn {
  readonly selectedCategoryId: string;
  readonly selectedSkill: CapabilityItemBo | null;
  readonly activeCategory: CapabilityCategoryBo | undefined;
  readonly selectCategory: (categoryId: string) => void;
  readonly selectSkill: (skill: CapabilityItemBo | null) => void;
}

export const useCapabilityDrawerViewModel = (
  props: UseCapabilityDrawerViewModelProps
): UseCapabilityDrawerViewModelReturn => {
  const { categories } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id ?? 'frontend'
  );
  const [selectedSkill, setSelectedSkill] = useState<CapabilityItemBo | null>(null);

  const activeCategory = categories.find((c) => c.id === selectedCategoryId) ?? categories[0];

  const selectCategory = (categoryId: string): void => {
    setSelectedCategoryId(categoryId);
    setSelectedSkill(null);
  };

  const selectSkill = (skill: CapabilityItemBo | null): void => {
    setSelectedSkill(skill);
  };

  return {
    selectedCategoryId,
    selectedSkill,
    activeCategory,
    selectCategory,
    selectSkill,
  };
};
