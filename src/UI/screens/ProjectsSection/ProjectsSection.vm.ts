import { useState, useEffect } from 'react';
import { ProjectBo } from '../../../services/PortfolioService/bo/Project.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export type ProjectsViewMode = 'overview' | 'genomics' | 'migration';

export interface UseProjectsSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseProjectsSectionViewModelReturn {
  readonly projects: readonly ProjectBo[];
  readonly activeView: ProjectsViewMode;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly setActiveView: (view: ProjectsViewMode) => void;
  readonly openDeepDive: (projectId: string) => void;
  readonly closeDeepDive: () => void;
}

export const useProjectsSectionViewModel = (
  props: UseProjectsSectionViewModelProps = {}
): UseProjectsSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [projects, setProjects] = useState<readonly ProjectBo[]>([]);
  const [activeView, setActiveView] = useState<ProjectsViewMode>('overview');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioService.getProjects();
        if (isMounted) {
          setProjects(data);
          Logger.info('Projects loaded in unified ProjectsSection', { count: data.length });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch projects';
        if (isMounted) {
          setError(message);
          Logger.error('Failed to fetch projects in ProjectsSection', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  const openDeepDive = (projectId: string): void => {
    if (projectId.includes('genomics')) {
      setActiveView('genomics');
    } else if (projectId.includes('migration') || projectId.includes('slack')) {
      setActiveView('migration');
    } else {
      setActiveView('overview');
    }
  };

  const closeDeepDive = (): void => {
    setActiveView('overview');
  };

  return {
    projects,
    activeView,
    isLoading,
    error,
    setActiveView,
    openDeepDive,
    closeDeepDive,
  };
};
