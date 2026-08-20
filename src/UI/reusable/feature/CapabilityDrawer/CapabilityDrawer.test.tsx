import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CapabilityDrawer } from './CapabilityDrawer';
import { CapabilityCategoryBo } from '../../../../services/PortfolioService/bo/Capability.bo';

const mockCategories: readonly CapabilityCategoryBo[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Modern web UI',
    iconName: 'Layout',
    skills: [
      {
        name: 'React',
        proficiency: 'Core Production',
        context: '300+ production screens',
        isHighlighted: true,
      },
    ],
  },
];

describe('CapabilityDrawer Feature Component', () => {
  it('renders category tab and skill cards', () => {
    render(<CapabilityDrawer categories={mockCategories} />);
    expect(screen.getByRole('tab', { name: /frontend engineering/i })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Core Production')).toBeInTheDocument();
  });

  it('selects skill and shows detailed context', () => {
    render(<CapabilityDrawer categories={mockCategories} />);
    const skillCard = screen.getByText('React');
    fireEvent.click(skillCard);
    expect(screen.getByText(/Production Application Context: React/i)).toBeInTheDocument();
  });
});
