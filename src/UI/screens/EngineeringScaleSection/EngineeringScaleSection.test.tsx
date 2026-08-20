import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EngineeringScaleSection } from './EngineeringScaleSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('EngineeringScaleSection Screen Module', () => {
  it('renders all scale metric cards', async () => {
    const mockService = new MockPortfolioService();
    render(<EngineeringScaleSection portfolioService={mockService} />);
    expect(await screen.findByText('Engineering Scale of Work')).toBeInTheDocument();
    expect(await screen.findByText('Application Modules')).toBeInTheDocument();
    expect(await screen.findByText('Production Screens')).toBeInTheDocument();
    expect(await screen.findByText('Enterprise Data Migrated')).toBeInTheDocument();
  });
});
