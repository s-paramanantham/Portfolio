import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GenomicsProjectSection } from './GenomicsProjectSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('GenomicsProjectSection Screen Module', () => {
  it('renders section title and overview tab', async () => {
    const mockService = new MockPortfolioService();
    render(<GenomicsProjectSection portfolioService={mockService} />);
    expect(screen.getByText('Genomics-Based Healthcare Platform')).toBeInTheDocument();
    expect(screen.getByText('Medication Intelligence Driven by Patient Genetics')).toBeInTheDocument();
  });

  it('switches to Real-Time Streaming tab on click', () => {
    const mockService = new MockPortfolioService();
    render(<GenomicsProjectSection portfolioService={mockService} />);
    const tab = screen.getByRole('tab', { name: /real-time streaming/i });
    fireEvent.click(tab);
    expect(screen.getByText('Dual-Stream Real-Time Architecture')).toBeInTheDocument();
    expect(screen.getByText(/LIVE TELEMETRY STREAM/i)).toBeInTheDocument();
  });
});

