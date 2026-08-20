export interface ExperienceMetricBadgeDto {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly subtext: string;
}

export interface ExperienceIntroDto {
  readonly tagline: string;
  readonly narrative: string;
  readonly architectureSummary: string;
  readonly metrics: readonly ExperienceMetricBadgeDto[];
}
