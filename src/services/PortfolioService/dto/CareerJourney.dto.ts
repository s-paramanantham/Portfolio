export interface CareerMilestoneDto {
  readonly id: string;
  readonly company: string;
  readonly officialRole: string;
  readonly engineeringRole: string;
  readonly period: string;
  readonly duration: string;
  readonly location: string;
  readonly isCurrent: boolean;
  readonly companyDescription: string;
  readonly keyResponsibilities: readonly string[];
  readonly technicalOwnership: readonly string[];
  readonly technologies: readonly string[];
  readonly quantifiedImpact: readonly string[];
}
