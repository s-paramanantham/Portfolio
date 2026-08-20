import { CapabilityCategoryDto, CapabilityItemDto, CapabilityCategoryTypeDto } from '../dto/Capability.dto';

export type CapabilityCategoryTypeBo = CapabilityCategoryTypeDto;
export type CapabilityItemBo = CapabilityItemDto;

export interface CapabilityCategoryBo {
  readonly id: string;
  readonly title: CapabilityCategoryTypeBo;
  readonly description: string;
  readonly iconName: string;
  readonly skills: readonly CapabilityItemBo[];
}

export class CapabilityMapper {
  public static toBo(dto: CapabilityCategoryDto): CapabilityCategoryBo {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      iconName: dto.iconName,
      skills: dto.skills.map((s) => ({
        name: s.name,
        proficiency: s.proficiency,
        context: s.context,
        isHighlighted: s.isHighlighted,
      })),
    };
  }
}
