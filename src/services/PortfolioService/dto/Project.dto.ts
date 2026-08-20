export type ProjectCategoryDto =
  | 'Genomics & Healthcare'
  | 'Enterprise Migration'
  | 'AI & Intelligent Systems'
  | 'Full Stack Web';

export interface ProjectMetricDto {
  readonly label: string;
  readonly value: string;
}

export interface ProjectDto {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategoryDto;
  readonly subtitle: string;
  readonly summary: string;
  readonly description: readonly string[];
  readonly technologies: readonly string[];
  readonly metrics: readonly ProjectMetricDto[];
  readonly keyHighlights: readonly string[];
  readonly integrations?: readonly string[];
  readonly architecturePoints?: readonly string[];
  readonly liveDemoUrl?: string;
  readonly githubUrl?: string;
  readonly isFeatured: boolean;
  readonly badgeText?: string;
}
