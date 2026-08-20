import { ProjectBo } from './bo/Project.bo';
import { CareerMilestoneBo } from './bo/CareerJourney.bo';
import { ScaleMetricBo } from './bo/ScaleMetric.bo';
import { CapabilityCategoryBo } from './bo/Capability.bo';
import { ExperienceIntroBo } from './bo/ExperienceIntro.bo';
import { AboutDetailsBo } from './bo/Education.bo';
import { GenomicsTelemetryBo } from './bo/GenomicsTelemetry.bo';
import { NavigationItemBo } from './bo/Navigation.bo';

export interface PortfolioServiceInterface {
  getProjects(): Promise<readonly ProjectBo[]>;
  getFeaturedProjects(): Promise<readonly ProjectBo[]>;
  getCareerJourney(): Promise<readonly CareerMilestoneBo[]>;
  getScaleMetrics(): Promise<readonly ScaleMetricBo[]>;
  getCapabilities(): Promise<readonly CapabilityCategoryBo[]>;
  getExperienceIntro(): Promise<ExperienceIntroBo>;
  getAboutDetails(): Promise<AboutDetailsBo>;
  getGenomicsTelemetry(): Promise<GenomicsTelemetryBo>;
  getNavigationItems(): Promise<readonly NavigationItemBo[]>;
}
