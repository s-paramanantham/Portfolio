import { useState, useEffect } from 'react';
import { Logger } from '../../../helpers/Logger';

export interface UseHomeScreenViewModelReturn {
  readonly isInitialized: boolean;
}

export const useHomeScreenViewModel = (): UseHomeScreenViewModelReturn => {
  const [isInitialized] = useState<boolean>(true);

  useEffect(() => {
    Logger.info('HomeScreen initialized successfully');
  }, []);

  return {
    isInitialized,
  };
};
