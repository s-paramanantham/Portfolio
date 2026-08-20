import { CareerMilestoneDto } from '../dto/CareerJourney.dto';

export interface CareerMilestoneBo {
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

export class CareerJourneyMapper {
  public static toBo(dto: CareerMilestoneDto): CareerMilestoneBo {
    return {
      id: dto.id,
      company: dto.company,
      officialRole: dto.officialRole,
      engineeringRole: dto.engineeringRole,
      period: dto.period,
      duration: dto.duration,
      location: dto.location,
      isCurrent: dto.isCurrent,
      companyDescription: dto.companyDescription,
      keyResponsibilities: [...dto.keyResponsibilities],
      technicalOwnership: [...dto.technicalOwnership],
      technologies: [...dto.technologies],
      quantifiedImpact: [...dto.quantifiedImpact],
    };
  }
}
