import { useState } from 'react';
import { ProjectBo } from '../../../../services/PortfolioService/bo/Project.bo';

export interface UseProjectCardViewModelProps {
  readonly project: ProjectBo;
}

export interface UseProjectCardViewModelReturn {
  readonly isModalOpen: boolean;
  readonly openModal: () => void;
  readonly closeModal: () => void;
}

export const useProjectCardViewModel = (
  _props: UseProjectCardViewModelProps
): UseProjectCardViewModelReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
