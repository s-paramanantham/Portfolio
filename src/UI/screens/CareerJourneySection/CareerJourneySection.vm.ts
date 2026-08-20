import { useState, useEffect } from 'react';
import { CareerMilestoneBo } from '../../../services/PortfolioService/bo/CareerJourney.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseCareerJourneySectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseCareerJourneySectionViewModelReturn {
  readonly milestones: readonly CareerMilestoneBo[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

export const useCareerJourneySectionViewModel = (
  props: UseCareerJourneySectionViewModelProps = {}
): UseCareerJourneySectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [milestones, setMilestones] = useState<readonly CareerMilestoneBo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchJourney = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioService.getCareerJourney();
        if (isMounted) {
          setMilestones(data);
          Logger.info('Career journey loaded successfully', { count: data.length });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load career journey';
        if (isMounted) {
          setError(message);
          Logger.error('Failed to load career journey', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchJourney();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  return {
    milestones,
    isLoading,
    error,
  };
};
