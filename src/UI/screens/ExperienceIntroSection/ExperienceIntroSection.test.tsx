import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceIntroSection } from './ExperienceIntroSection';
import { MockPortfolioService } from '../../../services/PortfolioService/MockPortfolioService';

describe('ExperienceIntroSection Screen Module', () => {
  it('renders section headline and company mentions', async () => {
    const mockService = new MockPortfolioService();
    render(<ExperienceIntroSection portfolioService={mockService} />);
    expect(await screen.findByText(/Proven execution across/i)).toBeInTheDocument();
    const companyElements = await screen.findAllByText(/AVASOFT & ZEB/i);
    expect(companyElements.length).toBeGreaterThan(0);
  });
});
