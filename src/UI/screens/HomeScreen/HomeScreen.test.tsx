import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomeScreen } from './HomeScreen';

describe('HomeScreen Module', () => {
  it('renders all sections and header', async () => {
    render(<HomeScreen />);
    const nameElements = screen.getAllByText('PARAMANANTHAM S');
    expect(nameElements.length).toBeGreaterThan(0);
    expect(await screen.findByText(/Engineering Scale of Work/i)).toBeInTheDocument();
    expect(await screen.findByText(/Genomics-Based Healthcare Platform/i)).toBeInTheDocument();
    expect(await screen.findByText(/Slack → Microsoft Teams Migration Platform/i)).toBeInTheDocument();
    expect(await screen.findByText(/Download Verified Engineering Resume/i)).toBeInTheDocument();
  });
});


