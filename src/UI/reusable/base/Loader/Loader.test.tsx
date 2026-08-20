import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Base Component', () => {
  it('renders loading status with label', () => {
    render(<Loader label="Loading projects..." />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading projects...')).toBeInTheDocument();
  });
});
