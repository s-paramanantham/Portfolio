export interface ScaleMetricDto {
  readonly id: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly label: string;
  readonly description: string;
  readonly category: 'Development' | 'Migration' | 'Quality' | 'Integration';
  readonly iconName: 'Layers' | 'Monitor' | 'Cpu' | 'Users' | 'MessageSquare' | 'Database' | 'Building2' | 'ShieldCheck' | 'Server' | 'Code2';
}

