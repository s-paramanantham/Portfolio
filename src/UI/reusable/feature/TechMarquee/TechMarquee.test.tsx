import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechMarquee } from './TechMarquee';

describe('TechMarquee Feature Component', () => {
  it('renders technology names and categories in marquee', () => {
    render(<TechMarquee />);
    const nodeElements = screen.getAllByText('Node.js');
    expect(nodeElements.length).toBeGreaterThan(0);
    const pythonElements = screen.getAllByText('Python');
    expect(pythonElements.length).toBeGreaterThan(0);
    const fastApiElements = screen.getAllByText('FastAPI');
    expect(fastApiElements.length).toBeGreaterThan(0);
  });
});
