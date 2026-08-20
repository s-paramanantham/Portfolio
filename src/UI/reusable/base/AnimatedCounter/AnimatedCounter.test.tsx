import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedCounter } from './AnimatedCounter';

describe('AnimatedCounter Base Component', () => {
  it('renders counter with prefix and suffix', () => {
    render(<AnimatedCounter value={100} suffix="+" prefix="#" />);
    const element = screen.getByLabelText('#100+');
    expect(element).toBeInTheDocument();
  });
});
