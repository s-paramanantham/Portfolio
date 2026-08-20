import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectsSection } from './ProjectsSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('ProjectsSection Unified Module', () => {
  it('renders section title and projects overview', async () => {
    const mockService = new MockPortfolioService();
    render(<ProjectsSection portfolioService={mockService} />);
    expect(screen.getByText('Featured Engineering Projects')).toBeInTheDocument();
    expect(await screen.findByText('Genomics-Based Healthcare Platform')).toBeInTheDocument();
    expect(await screen.findByText('Slack → Microsoft Teams Migration Platform')).toBeInTheDocument();
  });

  it('switches to genomics deep dive view on button click', async () => {
    const mockService = new MockPortfolioService();
    render(<ProjectsSection portfolioService={mockService} />);
    const genomicsBtn = await screen.findByRole('button', {
      name: /explore 3-role architecture/i,
    });
    fireEvent.click(genomicsBtn);
    expect(await screen.findByText('Back to Projects Overview')).toBeInTheDocument();
  });
});
