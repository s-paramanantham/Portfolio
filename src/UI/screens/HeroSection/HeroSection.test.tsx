import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection Screen Module', () => {
  it('renders candidate name and core roles', () => {
    render(<HeroSection />);
    expect(screen.getByText('PARAMANANTHAM S')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders primary CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /explore my work/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view experience/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /let's connect/i })).toBeInTheDocument();
  });
});
