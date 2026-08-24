import { useState, useEffect } from 'react';
import { GenomicsTelemetryBo } from '../../../services/PortfolioService/bo/GenomicsTelemetry.bo';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Logger } from '../../../helpers/Logger';

export interface UseGenomicsProjectSectionViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseGenomicsProjectSectionViewModelReturn {
  readonly activeTab: 'overview' | 'streaming' | 'ai' | 'integrations';
  readonly telemetry: GenomicsTelemetryBo | null;
  readonly isStreamingActive: boolean;
  readonly displayedLogs: readonly string[];
  readonly setActiveTab: (tab: 'overview' | 'streaming' | 'ai' | 'integrations') => void;
  readonly toggleStreaming: () => void;
}

const DYNAMIC_GENOMICS_STREAM_LOGS: readonly string[] = [
  '[SSE-STREAM] Chromosome 19:10,245,110 variant CYP2C19 scanned: Normal metabolizer (*1/*1)',
  '[FASTAPI-BACKEND] Async pipeline validated 45 pharmacogenomic rules in 12ms',
  '[BEDROCK-AI] Sub-second LLM streaming token packet dispatched for clinician view',
  '[LIVEKIT-ROOM] WebRTC ultra-low-latency audio/video consultation session active',
  '[EPIC-EHR] FHIR patient record synchronized & HIPAA encounter signed',
  '[CONVESIO-PAY] Transaction verified for genomic test kit dispatch',
  '[SWELL-ECOMMERCE] Patient test kit order status updated to processing',
  '[CALENDAR-SYNC] Google & Microsoft consultation slot synchronized across timezones',
  '[WEBSOCKET-ROOM] Multi-clinician telemetry heartbeat active (240 FPS tick)',
  '[HIPAA-AUDIT] Encrypted audit checkpoint created for patient report locus #GEN-99483',
  '[ALERT-ENGINE] Warfarin sensitivity index computed: Normal sensitivity threshold',
  '[SSE-STREAM] VCF sequence chromosome 6:31,324,800 HLA-B*57:01 negative',
  '[FASTAPI-BACKEND] Generated dosage recommendation table with 100% precision',
  '[WEBSOCKET-ROOM] Live pharmacist consultation room latency: 18ms',
  '[BEDROCK-AI] Patient action plan synthesized with clinical references attached',
];

export const useGenomicsProjectSectionViewModel = (
  props: UseGenomicsProjectSectionViewModelProps = {}
): UseGenomicsProjectSectionViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [activeTab, setActiveTab] = useState<'overview' | 'streaming' | 'ai' | 'integrations'>('overview');
  const [telemetry, setTelemetry] = useState<GenomicsTelemetryBo | null>(null);
  const [isStreamingActive, setIsStreamingActive] = useState<boolean>(true);
  const [displayedLogs, setDisplayedLogs] = useState<readonly string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTelemetry = async () => {
      try {
        const data = await portfolioService.getGenomicsTelemetry();
        if (isMounted) {
          setTelemetry(data);
          setDisplayedLogs(data.logs);
        }
      } catch (error: unknown) {
        Logger.error('Failed to load genomics telemetry', error);
      }
    };

    fetchTelemetry();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  // Live real-time streaming effect
  useEffect(() => {
    if (!isStreamingActive || activeTab !== 'streaming') return;

    let logIndex = 0;
    const interval = setInterval(() => {
      const nextLog = DYNAMIC_GENOMICS_STREAM_LOGS[logIndex % DYNAMIC_GENOMICS_STREAM_LOGS.length];
      logIndex++;
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const enrichedLog = `${nextLog} (${timestamp})`;

      setDisplayedLogs((prev) => {
        const updated = [...prev, enrichedLog];
        // Keep last 15 entries for clean scrolling
        return updated.length > 15 ? updated.slice(updated.length - 15) : updated;
      });
    }, 2200);

    return () => {
      clearInterval(interval);
    };
  }, [isStreamingActive, activeTab]);

  const toggleStreaming = (): void => {
    setIsStreamingActive((prev) => !prev);
  };

  return {
    activeTab,
    telemetry,
    isStreamingActive,
    displayedLogs,
    setActiveTab,
    toggleStreaming,
  };
};

