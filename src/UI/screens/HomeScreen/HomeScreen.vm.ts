import { useState, useEffect } from 'react';
import { Logger } from '../../../helpers/Logger';

export interface UseHomeScreenViewModelReturn {
  readonly isInitialized: boolean;
}

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    Logger.info('HomeScreen initialized successfully');
    setIsInitialized(true);
  }, []);

  return {
    isInitialized,
  };
};
