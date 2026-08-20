import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollReveal } from './ScrollReveal';

describe('ScrollReveal Base Component', () => {
  it('renders children content correctly', () => {
    render(
      <ScrollReveal direction="bottom">
        <div>Boom Content</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Boom Content')).toBeInTheDocument();
  });

  it('renders with directional properties without crashing', () => {
    const { container } = render(
      <ScrollReveal direction="left" delay={150} duration={800}>
        <span>Left Slide In</span>
      </ScrollReveal>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
