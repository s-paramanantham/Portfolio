import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CapabilitiesSection } from './CapabilitiesSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('CapabilitiesSection Screen Module', () => {
  it('renders section title and skill categories', async () => {
    const mockService = new MockPortfolioService();
    render(<CapabilitiesSection portfolioService={mockService} />);
    expect(await screen.findByText('Capabilities & Domain Expertise')).toBeInTheDocument();
    const categoryElements = await screen.findAllByText('Frontend Engineering');
    expect(categoryElements.length).toBeGreaterThan(0);
  });
});
