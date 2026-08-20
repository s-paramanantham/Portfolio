export interface EducationDto {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
  readonly score: string;
  readonly location: string;
  readonly highlights: readonly string[];
}

export interface CoreValueDto {
  readonly title: string;
  readonly description: string;
}

export interface AboutDetailsDto {
  readonly education: EducationDto;
  readonly coreValues: readonly CoreValueDto[];
}
