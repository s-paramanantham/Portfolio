import { useState, useRef, useEffect } from 'react';

export type PipelineStage = 'source' | 'processing' | 'destination';

export interface UseMigrationProjectSectionViewModelReturn {
  readonly activeStage: PipelineStage;
  readonly setActiveStage: (stage: PipelineStage) => void;
  readonly isSimulatingMigration: boolean;
  readonly migrationProgress: number;
  readonly simulationStatus: string;
  readonly startSimulation: () => void;
  readonly resetSimulation: () => void;
}

export const useMigrationProjectSectionViewModel = (): UseMigrationProjectSectionViewModelReturn => {
  const [activeStage, setActiveStage] = useState<PipelineStage>('processing');
  const [isSimulatingMigration, setIsSimulatingMigration] = useState<boolean>(false);
  const [migrationProgress, setMigrationProgress] = useState<number>(100);
  const [simulationStatus, setSimulationStatus] = useState<string>(
    'Pipeline Ready — 500+ Users & 2TB+ Data Migrated'
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startSimulation = (): void => {
    if (isSimulatingMigration) return;
    setIsSimulatingMigration(true);
    setMigrationProgress(0);
    setActiveStage('source');
    setSimulationStatus('Step 1/3: Ingesting Slack Enterprise workspace inventory & corporate exports...');

    let currentProgress = 0;
    timerRef.current = setInterval(() => {
      currentProgress += 5;

      if (currentProgress <= 33) {
        setActiveStage('source');
        setSimulationStatus(
          `Step 1/3: Ingesting Slack workspace inventory & attachments (${currentProgress}%)...`
        );
      } else if (currentProgress <= 66) {
        setActiveStage('processing');
        setSimulationStatus(
          `Step 2/3: Executing 200+ Node/Express APIs & staging 2TB+ in SQL Server (${currentProgress}%)...`
        );
      } else if (currentProgress < 100) {
        setActiveStage('destination');
        setSimulationStatus(
          `Step 3/3: Automating Teams channel creation & uploading files to OneDrive/SharePoint (${currentProgress}%)...`
        );
      } else {
        currentProgress = 100;
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setIsSimulatingMigration(false);
        setActiveStage('destination');
        setSimulationStatus(
          '✓ Enterprise Migration Completed: 500+ users, 100K+ chats, 2TB+ data with 0 throttling!'
        );
      }

      setMigrationProgress(currentProgress);
    }, 180);
  };

  const resetSimulation = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsSimulatingMigration(false);
    setMigrationProgress(100);
    setActiveStage('processing');
    setSimulationStatus('Pipeline Ready — 500+ Users & 2TB+ Data Migrated');
  };

  return {
    activeStage,
    setActiveStage,
    isSimulatingMigration,
    migrationProgress,
    simulationStatus,
    startSimulation,
    resetSimulation,
  };
};

