export type CapabilityCategoryTypeDto =
  | 'Frontend Engineering'
  | 'Backend Engineering'
  | 'Databases & Storage'
  | 'Cloud & DevOps'
  | 'Real-Time & AI Systems'
  | 'Testing & Quality'
  | 'Scripting & Utilities';

export interface CapabilityItemDto {
  readonly name: string;
  readonly proficiency: 'Core Production' | 'Advanced' | 'Working Knowledge';
  readonly context: string;
  readonly isHighlighted?: boolean;
}

export interface CapabilityCategoryDto {
  readonly id: string;
  readonly title: CapabilityCategoryTypeDto;
  readonly description: string;
  readonly iconName: string;
  readonly skills: readonly CapabilityItemDto[];
}
