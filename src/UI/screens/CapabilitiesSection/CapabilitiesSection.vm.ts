import { useState, useEffect } from 'react';
import { CapabilityCategoryBo } from '../../../services/PortfolioService/bo/Capability.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseCapabilitiesSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseCapabilitiesSectionViewModelReturn {
  readonly categories: readonly CapabilityCategoryBo[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

export const useCapabilitiesSectionViewModel = (
  props: UseCapabilitiesSectionViewModelProps = {}
): UseCapabilitiesSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [categories, setCategories] = useState<readonly CapabilityCategoryBo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCapabilities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioService.getCapabilities();
        if (isMounted) {
          setCategories(data);
          Logger.info('Capabilities loaded successfully', { count: data.length });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load capabilities';
        if (isMounted) {
          setError(message);
          Logger.error('Failed to load capabilities', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCapabilities();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  return {
    categories,
    isLoading,
    error,
  };
};
