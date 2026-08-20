import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';


describe('CustomCursor Feature Component', () => {
  it('renders custom cursor container when initialized', () => {
    const { container } = render(<CustomCursor />);
    expect(container).toBeDefined();
  });
});
