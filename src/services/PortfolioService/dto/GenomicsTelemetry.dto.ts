export interface GenomicsTelemetryDto {
  readonly logs: readonly string[];
  readonly activeAllele: string;
  readonly metabolizerStatus: string;
  readonly recommendationSummary: string;
}
