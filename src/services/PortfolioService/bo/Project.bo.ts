import { ProjectDto, ProjectCategoryDto, ProjectMetricDto } from '../dto/Project.dto';

export type ProjectCategoryBo = ProjectCategoryDto;
export type ProjectMetricBo = ProjectMetricDto;

export interface ProjectBo {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategoryBo;
  readonly subtitle: string;
  readonly summary: string;
  readonly description: readonly string[];
  readonly technologies: readonly string[];
  readonly metrics: readonly ProjectMetricBo[];
  readonly keyHighlights: readonly string[];
  readonly integrations?: readonly string[];
  readonly architecturePoints?: readonly string[];
  readonly liveDemoUrl?: string;
  readonly githubUrl?: string;
  readonly isFeatured: boolean;
  readonly badgeText?: string;
}

export class ProjectMapper {
  public static toBo(dto: ProjectDto): ProjectBo {
    return {
      id: dto.id,
      title: dto.title,
      category: dto.category,
      subtitle: dto.subtitle,
      summary: dto.summary,
      description: [...dto.description],
      technologies: [...dto.technologies],
      metrics: dto.metrics.map((m) => ({ label: m.label, value: m.value })),
      keyHighlights: [...dto.keyHighlights],
      integrations: dto.integrations ? [...dto.integrations] : undefined,
      architecturePoints: dto.architecturePoints ? [...dto.architecturePoints] : undefined,
      liveDemoUrl: dto.liveDemoUrl,
      githubUrl: dto.githubUrl,
      isFeatured: dto.isFeatured,
      badgeText: dto.badgeText,
    };
  }
}
