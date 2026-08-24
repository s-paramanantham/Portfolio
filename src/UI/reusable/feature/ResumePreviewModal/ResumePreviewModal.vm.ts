import { useState } from 'react';
import { config } from '../../../../config/Config';

export type PreviewFormat = 'pdf' | 'formatted';

export interface UseResumePreviewModalViewModelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface UseResumePreviewModalViewModelReturn {
  readonly activeTab: PreviewFormat;
  readonly zoom: number;
  readonly pdfUrl: string;
  readonly pdfFileName: string;
  readonly socialInfo: typeof config.social;
  readonly setActiveTab: (tab: PreviewFormat) => void;
  readonly zoomIn: () => void;
  readonly zoomOut: () => void;
  readonly resetZoom: () => void;
  readonly handlePrint: () => void;
}

export const useResumePreviewModalViewModel = (
  _props: UseResumePreviewModalViewModelProps = { isOpen: false, onClose: () => {} }
): UseResumePreviewModalViewModelReturn => {
  const [activeTab, setActiveTab] = useState<PreviewFormat>('pdf');
  const [zoom, setZoom] = useState<number>(100);

  const pdfUrl = '/Paramanantham_Resume.pdf';
  const pdfFileName = 'Paramanantham_Resume.pdf';

  const zoomIn = (): void => {
    setZoom((prev) => Math.min(prev + 15, 160));
  };

  const zoomOut = (): void => {
    setZoom((prev) => Math.max(prev - 15, 75));
  };

  const resetZoom = (): void => {
    setZoom(100);
  };

  const handlePrint = (): void => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return {
    activeTab,
    zoom,
    pdfUrl,
    pdfFileName,
    socialInfo: config.social,
    setActiveTab,
    zoomIn,
    zoomOut,
    resetZoom,
    handlePrint,
  };
};
