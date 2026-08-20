import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { ScaleMetricBo } from '../../../../services/PortfolioService/bo/ScaleMetric.bo';

const mockMetric: ScaleMetricBo = {
  id: 'test-metric',
  numericValue: 300,
  suffix: '+',
  label: 'Production Screens',
  description: 'Screens developed',
  category: 'Development',
  iconName: 'Monitor',
};

describe('MetricCard Feature Component', () => {
  it('renders metric label and description', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('Production Screens')).toBeInTheDocument();
    expect(screen.getByText('Screens developed')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });
});
