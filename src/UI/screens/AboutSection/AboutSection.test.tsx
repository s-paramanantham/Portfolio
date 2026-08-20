import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutSection } from './AboutSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('AboutSection Screen Module', () => {
  it('renders about section narrative and education details', async () => {
    const mockService = new MockPortfolioService();
    render(<AboutSection portfolioService={mockService} />);
    expect(await screen.findByText(/Engineer. Builder./i)).toBeInTheDocument();
    expect(await screen.findByText('Bachelor of Science (B.Sc.) in Computer Science')).toBeInTheDocument();
    expect(await screen.findByText('Government Arts & Science College, Kadayanallur')).toBeInTheDocument();
    const scoreElements = await screen.findAllByText(/84%/i);
    expect(scoreElements.length).toBeGreaterThan(0);
  });
});
