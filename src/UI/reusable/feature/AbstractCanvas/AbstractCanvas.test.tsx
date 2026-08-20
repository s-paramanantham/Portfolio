import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AbstractCanvas } from './AbstractCanvas';

describe('AbstractCanvas Feature Component', () => {
  it('renders canvas element with aria-hidden', () => {
    const { container } = render(<AbstractCanvas />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });
});
