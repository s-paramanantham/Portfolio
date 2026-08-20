import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Base Component', () => {
  it('renders badge text correctly', () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders badge with icon', () => {
    render(<Badge icon={<span data-testid="badge-icon">●</span>}>React</Badge>);
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
