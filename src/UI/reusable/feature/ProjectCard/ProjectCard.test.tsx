import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { ProjectBo } from '../../../../services/PortfolioService/bo/Project.bo';

const mockProject: ProjectBo = {
  id: 'test-project',
  title: 'Test Project Title',
  category: 'Genomics & Healthcare',
  subtitle: 'Test Subtitle',
  summary: 'Test project summary description.',
  description: ['Feature 1 implemented', 'Feature 2 engineered'],
  technologies: ['React', 'TypeScript', 'Node.js'],
  metrics: [{ label: 'Speed', value: '10x' }],
  keyHighlights: ['Highlight 1'],
  isFeatured: true,
  badgeText: 'Featured Project',
};

describe('ProjectCard Feature Component', () => {
  it('renders project title and category', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project Title')).toBeInTheDocument();
    expect(screen.getByText('Genomics & Healthcare')).toBeInTheDocument();
    expect(screen.getByText('Featured Project')).toBeInTheDocument();
  });

  it('opens details modal when explore button is clicked', () => {
    render(<ProjectCard project={mockProject} />);
    const button = screen.getByRole('button', { name: /explore case study/i });
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Feature 1 implemented')).toBeInTheDocument();
  });
});
