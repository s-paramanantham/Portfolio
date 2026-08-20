import { useState, useEffect } from 'react';
import { AboutDetailsBo } from '../../../services/PortfolioService/bo/Education.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseAboutSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseAboutSectionViewModelReturn {
  readonly aboutDetails: AboutDetailsBo | null;
  readonly isLoading: boolean;
}

export const useAboutSectionViewModel = (
  props: UseAboutSectionViewModelProps = {}
): UseAboutSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [aboutDetails, setAboutDetails] = useState<AboutDetailsBo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      try {
        const data = await portfolioService.getAboutDetails();
        if (isMounted) {
          setAboutDetails(data);
        }
      } catch (error: unknown) {
        Logger.error('Failed to load about details', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  return {
    aboutDetails,
    isLoading,
  };
};
