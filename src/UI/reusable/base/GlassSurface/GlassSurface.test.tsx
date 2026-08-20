import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassSurface } from './GlassSurface';

describe('GlassSurface Base Component', () => {
  it('renders children within glass surface container', () => {
    render(<GlassSurface>Glass Content</GlassSurface>);
    expect(screen.getByText('Glass Content')).toBeInTheDocument();
  });
});
