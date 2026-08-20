import { ExperienceIntroDto } from '../dto/ExperienceIntro.dto';

export interface ExperienceMetricBadgeBo {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly subtext: string;
}

export interface ExperienceIntroBo {
  readonly tagline: string;
  readonly narrative: string;
  readonly architectureSummary: string;
  readonly metrics: readonly ExperienceMetricBadgeBo[];
}

export class ExperienceIntroMapper {
  public static toBo(dto: ExperienceIntroDto): ExperienceIntroBo {
    return {
      tagline: dto.tagline,
      narrative: dto.narrative,
      architectureSummary: dto.architectureSummary,
      metrics: dto.metrics.map((m) => ({
        value: m.value,
        suffix: m.suffix,
        label: m.label,
        subtext: m.subtext,
      })),
    };
  }
}
