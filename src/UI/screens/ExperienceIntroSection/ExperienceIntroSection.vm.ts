import { useState, useEffect } from 'react';
import { ExperienceIntroBo } from '../../../services/PortfolioService/bo/ExperienceIntro.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseExperienceIntroSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseExperienceIntroSectionViewModelReturn {
  readonly experienceIntro: ExperienceIntroBo | null;
  readonly isLoading: boolean;
}

export const useExperienceIntroSectionViewModel = (
  props: UseExperienceIntroSectionViewModelProps = {}
): UseExperienceIntroSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [experienceIntro, setExperienceIntro] = useState<ExperienceIntroBo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchIntro = async () => {
      try {
        const data = await portfolioService.getExperienceIntro();
        if (isMounted) {
          setExperienceIntro(data);
        }
      } catch (error: unknown) {
        Logger.error('Failed to load experience intro', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIntro();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  return {
    experienceIntro,
    isLoading,
  };
};
