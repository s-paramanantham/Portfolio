import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';
import { MockPortfolioService } from '../../../../services/PortfolioService/MockPortfolioService';

describe('NavigationBar Feature Component', () => {
  it('renders brand name and navigation links', async () => {
    const mockService = new MockPortfolioService();
    render(<NavigationBar portfolioService={mockService} />);
    expect(screen.getByText('PARAMANANTHAM S')).toBeInTheDocument();
    expect(await screen.findByText('Experience')).toBeInTheDocument();
    expect(await screen.findByText('Scale & Performance')).toBeInTheDocument();
    expect(await screen.findByText('Projects')).toBeInTheDocument();
  });


  it('toggles mobile menu when hamburger button is clicked', async () => {
    const mockService = new MockPortfolioService();
    render(<NavigationBar portfolioService={mockService} />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument();
  });
});
