import { ScaleMetricDto } from '../dto/ScaleMetric.dto';

export interface ScaleMetricBo {
  readonly id: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly label: string;
  readonly description: string;
  readonly category: 'Development' | 'Migration' | 'Quality' | 'Integration';
  readonly iconName: 'Layers' | 'Monitor' | 'Cpu' | 'Users' | 'MessageSquare' | 'Database' | 'Building2' | 'ShieldCheck' | 'Server' | 'Code2';
}


export class ScaleMetricMapper {
  public static toBo(dto: ScaleMetricDto): ScaleMetricBo {
    return {
      id: dto.id,
      numericValue: dto.numericValue,
      suffix: dto.suffix,
      label: dto.label,
      description: dto.description,
      category: dto.category,
      iconName: dto.iconName,
    };
  }
}
