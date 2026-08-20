import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CareerJourneySection } from './CareerJourneySection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('CareerJourneySection Screen Module', () => {
  it('renders career journey milestones', async () => {
    const mockService = new MockPortfolioService();
    render(<CareerJourneySection portfolioService={mockService} />);
    expect(await screen.findByText('Professional Experience & Milestones')).toBeInTheDocument();
    expect(await screen.findByText('ZEB')).toBeInTheDocument();
    const avasoftElements = await screen.findAllByText('AVASOFT');
    expect(avasoftElements.length).toBeGreaterThan(0);
  });
});
