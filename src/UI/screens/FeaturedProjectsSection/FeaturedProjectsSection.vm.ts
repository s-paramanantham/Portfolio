import { useState, useEffect, useMemo } from 'react';
import { ProjectBo, ProjectCategoryBo } from '../../../services/PortfolioService/bo/Project.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseFeaturedProjectsSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseFeaturedProjectsSectionViewModelReturn {
  readonly projects: readonly ProjectBo[];
  readonly categories: readonly (ProjectCategoryBo | 'All')[];
  readonly activeCategory: ProjectCategoryBo | 'All';
  readonly filteredProjects: readonly ProjectBo[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly setActiveCategory: (category: ProjectCategoryBo | 'All') => void;
}

export const useFeaturedProjectsSectionViewModel = (
  props: UseFeaturedProjectsSectionViewModelProps = {}
): UseFeaturedProjectsSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [projects, setProjects] = useState<readonly ProjectBo[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryBo | 'All'>('All');
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
          Logger.info('Projects loaded successfully', { count: data.length });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch projects';
        if (isMounted) {
          setError(message);
          Logger.error('Failed to fetch projects', err);
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

  const categories: readonly (ProjectCategoryBo | 'All')[] = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return {
    projects,
    categories,
    activeCategory,
    filteredProjects,
    isLoading,
    error,
    setActiveCategory,
  };
};
