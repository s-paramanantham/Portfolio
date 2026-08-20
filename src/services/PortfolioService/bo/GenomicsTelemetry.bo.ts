import { GenomicsTelemetryDto } from '../dto/GenomicsTelemetry.dto';

export interface GenomicsTelemetryBo {
  readonly logs: readonly string[];
  readonly activeAllele: string;
  readonly metabolizerStatus: string;
  readonly recommendationSummary: string;
}

export class GenomicsTelemetryMapper {
  public static toBo(dto: GenomicsTelemetryDto): GenomicsTelemetryBo {
    return {
      logs: [...dto.logs],
      activeAllele: dto.activeAllele,
      metabolizerStatus: dto.metabolizerStatus,
      recommendationSummary: dto.recommendationSummary,
    };
  }
}
