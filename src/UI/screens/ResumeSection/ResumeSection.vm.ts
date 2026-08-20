import { useState } from 'react';

export interface ResumeHighlight {
  readonly title: string;
  readonly value: string;
  readonly description: string;
}

export interface UseResumeSectionViewModelReturn {
  readonly resumeUrl: string;
  readonly resumeFileName: string;
  readonly highlights: readonly ResumeHighlight[];
  readonly coreCompetencies: readonly string[];
  readonly isPreviewOpen: boolean;
  readonly openPreview: () => void;
  readonly closePreview: () => void;
}

export const useResumeSectionViewModel = (): UseResumeSectionViewModelReturn => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const resumeUrl = '/Paramanantham_S_Resume.docx';
  const resumeFileName = 'Paramanantham_S_Resume.docx';

  const highlights: readonly ResumeHighlight[] = [
    {
      title: 'Backend Engineering',
      value: '200+ APIs',
      description: 'Node.js & Express.js REST APIs with SQL Server SSMS data staging.',
    },
    {
      title: 'Frontend Architecture',
      value: '300+ Screens',
      description: 'React, TypeScript, Tailwind CSS precision healthcare platform modules.',
    },
    {
      title: 'Full Stack Integration',
      value: '350+ APIs',
      description: 'REST, WebSockets, and SSE real-time streaming pipelines integrated.',
    },
    {
      title: 'Data Migration',
      value: '2TB+ Data',
      description: '500+ users and 100K+ messages migrated with zero throttling.',
    },
  ];

  const coreCompetencies: readonly string[] = [
    'Node.js & Express.js',
    'Python & FastAPI',
    'React & TypeScript',
    'Tailwind CSS Responsive UI',
    'SQL Server (SSMS) & Postgres',
    'AWS Bedrock & AWS Cognito',
    'WebSockets & SSE Streaming',
    'Enterprise Migration Pipelines',
  ];

  const openPreview = (): void => {
    setIsPreviewOpen(true);
  };

  const closePreview = (): void => {
    setIsPreviewOpen(false);
  };

  return {
    resumeUrl,
    resumeFileName,
    highlights,
    coreCompetencies,
    isPreviewOpen,
    openPreview,
    closePreview,
  };
};
