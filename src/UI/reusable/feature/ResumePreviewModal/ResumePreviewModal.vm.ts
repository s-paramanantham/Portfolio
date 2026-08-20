import { useState } from 'react';
import { config } from '../../../../config/Config';

export type PreviewFormat = 'formatted' | 'pdf' | 'docx';

export interface UseResumePreviewModalViewModelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface UseResumePreviewModalViewModelReturn {
  readonly activeTab: PreviewFormat;
  readonly zoom: number;
  readonly pdfUrl: string;
  readonly docxUrl: string;
  readonly pdfFileName: string;
  readonly docxFileName: string;
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
  const [activeTab, setActiveTab] = useState<PreviewFormat>('formatted');
  const [zoom, setZoom] = useState<number>(100);

  const pdfUrl = '/Paramanantham_Resume.pdf';
  const docxUrl = '/Paramanantham_S_Resume.docx';
  const pdfFileName = 'Paramanantham_Resume.pdf';
  const docxFileName = 'Paramanantham_S_Resume.docx';

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
    docxUrl,
    pdfFileName,
    docxFileName,
    socialInfo: config.social,
    setActiveTab,
    zoomIn,
    zoomOut,
    resetZoom,
    handlePrint,
  };
};
