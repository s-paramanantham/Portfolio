import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Screen Module', () => {
  it('renders footer brand name and copyright', () => {
    render(<Footer />);
    expect(screen.getByText('PARAMANANTHAM S')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /scroll back to top/i })).toBeInTheDocument();
  });
});
