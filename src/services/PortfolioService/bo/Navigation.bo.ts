import { NavigationItemDto } from '../dto/Navigation.dto';

export interface NavigationItemBo {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly sectionId: string;
}

export class NavigationMapper {
  public static toBo(dto: NavigationItemDto): NavigationItemBo {
    return {
      id: dto.id,
      label: dto.label,
      href: dto.href,
      sectionId: dto.sectionId,
    };
  }
}
