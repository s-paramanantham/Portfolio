import { AboutDetailsDto } from '../dto/Education.dto';

export interface EducationBo {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
  readonly score: string;
  readonly location: string;
  readonly highlights: readonly string[];
}

export interface CoreValueBo {
  readonly title: string;
  readonly description: string;
}

export interface AboutDetailsBo {
  readonly education: EducationBo;
  readonly coreValues: readonly CoreValueBo[];
}

export class EducationMapper {
  public static toBo(dto: AboutDetailsDto): AboutDetailsBo {
    return {
      education: {
        degree: dto.education.degree,
        institution: dto.education.institution,
        period: dto.education.period,
        score: dto.education.score,
        location: dto.education.location,
        highlights: [...dto.education.highlights],
      },
      coreValues: dto.coreValues.map((v) => ({
        title: v.title,
        description: v.description,
      })),
    };
  }
}
