import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedProjectsSection } from './FeaturedProjectsSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('FeaturedProjectsSection Screen Module', () => {
  it('renders project list and category filter', async () => {
    const mockService = new MockPortfolioService();
    render(<FeaturedProjectsSection portfolioService={mockService} />);
    expect(await screen.findByText('Featured Engineering Projects')).toBeInTheDocument();
    expect(await screen.findByText('Genomics-Based Healthcare Platform')).toBeInTheDocument();
    expect(await screen.findByText('Slack → Microsoft Teams Migration Platform')).toBeInTheDocument();
  });
});
