import { PortfolioServiceInterface } from './PortfolioService.interface';
import { ProjectBo, ProjectMapper } from './bo/Project.bo';
import { ProjectDto } from './dto/Project.dto';
import { CareerMilestoneBo, CareerJourneyMapper } from './bo/CareerJourney.bo';
import { CareerMilestoneDto } from './dto/CareerJourney.dto';
import { ScaleMetricBo, ScaleMetricMapper } from './bo/ScaleMetric.bo';
import { ScaleMetricDto } from './dto/ScaleMetric.dto';
import { CapabilityCategoryBo, CapabilityMapper } from './bo/Capability.bo';
import { CapabilityCategoryDto } from './dto/Capability.dto';
import { ExperienceIntroBo, ExperienceIntroMapper } from './bo/ExperienceIntro.bo';
import { ExperienceIntroDto } from './dto/ExperienceIntro.dto';
import { AboutDetailsBo, EducationMapper } from './bo/Education.bo';
import { AboutDetailsDto } from './dto/Education.dto';
import { GenomicsTelemetryBo, GenomicsTelemetryMapper } from './bo/GenomicsTelemetry.bo';
import { GenomicsTelemetryDto } from './dto/GenomicsTelemetry.dto';
import { NavigationItemBo, NavigationMapper } from './bo/Navigation.bo';
import { NavigationItemDto } from './dto/Navigation.dto';
import { ApiClientInterface } from '../../apiclient/ApiClient.interface';
import { ApiClient } from '../../apiclient/ApiClient';
import { Logger } from '../../helpers/Logger';

export class PortfolioApiService implements PortfolioServiceInterface {
  constructor(private readonly apiClient: ApiClientInterface = ApiClient) {}

  public async getProjects(): Promise<readonly ProjectBo[]> {
    try {
      const dtos = await this.apiClient.get<readonly ProjectDto[]>('/portfolio/projects');
      return dtos.map(ProjectMapper.toBo);
    } catch (error: unknown) {
      Logger.error('Failed to fetch projects via API', error);
      throw error;
    }
  }

  public async getFeaturedProjects(): Promise<readonly ProjectBo[]> {
    const projects = await this.getProjects();
    return projects.filter((p) => p.isFeatured);
  }

  public async getCareerJourney(): Promise<readonly CareerMilestoneBo[]> {
    try {
      const dtos = await this.apiClient.get<readonly CareerMilestoneDto[]>('/portfolio/career-journey');
      return dtos.map(CareerJourneyMapper.toBo);
    } catch (error: unknown) {
      Logger.error('Failed to fetch career journey via API', error);
      throw error;
    }
  }

  public async getScaleMetrics(): Promise<readonly ScaleMetricBo[]> {
    try {
      const dtos = await this.apiClient.get<readonly ScaleMetricDto[]>('/portfolio/scale-metrics');
      return dtos.map(ScaleMetricMapper.toBo);
    } catch (error: unknown) {
      Logger.error('Failed to fetch scale metrics via API', error);
      throw error;
    }
  }

  public async getCapabilities(): Promise<readonly CapabilityCategoryBo[]> {
    try {
      const dtos = await this.apiClient.get<readonly CapabilityCategoryDto[]>('/portfolio/capabilities');
      return dtos.map(CapabilityMapper.toBo);
    } catch (error: unknown) {
      Logger.error('Failed to fetch capabilities via API', error);
      throw error;
    }
  }

  public async getExperienceIntro(): Promise<ExperienceIntroBo> {
    try {
      const dto = await this.apiClient.get<ExperienceIntroDto>('/portfolio/experience-intro');
      return ExperienceIntroMapper.toBo(dto);
    } catch (error: unknown) {
      Logger.error('Failed to fetch experience intro via API', error);
      throw error;
    }
  }

  public async getAboutDetails(): Promise<AboutDetailsBo> {
    try {
      const dto = await this.apiClient.get<AboutDetailsDto>('/portfolio/about-details');
      return EducationMapper.toBo(dto);
    } catch (error: unknown) {
      Logger.error('Failed to fetch about details via API', error);
      throw error;
    }
  }

  public async getGenomicsTelemetry(): Promise<GenomicsTelemetryBo> {
    try {
      const dto = await this.apiClient.get<GenomicsTelemetryDto>('/portfolio/genomics-telemetry');
      return GenomicsTelemetryMapper.toBo(dto);
    } catch (error: unknown) {
      Logger.error('Failed to fetch genomics telemetry via API', error);
      throw error;
    }
  }

  public async getNavigationItems(): Promise<readonly NavigationItemBo[]> {
    try {
      const dtos = await this.apiClient.get<readonly NavigationItemDto[]>('/portfolio/navigation');
      return dtos.map(NavigationMapper.toBo);
    } catch (error: unknown) {
      Logger.error('Failed to fetch navigation items via API', error);
      throw error;
    }
  }
}
