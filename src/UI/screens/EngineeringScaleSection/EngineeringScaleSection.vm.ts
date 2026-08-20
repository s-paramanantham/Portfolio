import { useState, useEffect } from 'react';
import { ScaleMetricBo } from '../../../services/PortfolioService/bo/ScaleMetric.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseEngineeringScaleSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseEngineeringScaleSectionViewModelReturn {
  readonly metrics: readonly ScaleMetricBo[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

export const useEngineeringScaleSectionViewModel = (
  props: UseEngineeringScaleSectionViewModelProps = {}
): UseEngineeringScaleSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [metrics, setMetrics] = useState<readonly ScaleMetricBo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioService.getScaleMetrics();
        if (isMounted) {
          setMetrics(data);
          Logger.info('Scale metrics loaded successfully', { count: data.length });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load scale metrics';
        if (isMounted) {
          setError(message);
          Logger.error('Failed to load scale metrics', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMetrics();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  return {
    metrics,
    isLoading,
    error,
  };
};
