import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineMilestone } from './TimelineMilestone';
import { CareerMilestoneBo } from '../../../../services/PortfolioService/bo/CareerJourney.bo';

const mockMilestone: CareerMilestoneBo = {
  id: 'test-milestone',
  company: 'AVASOFT',
  officialRole: 'Migration Engineer',
  engineeringRole: 'Full Stack Engineer',
  period: 'March 2025 – March 2026',
  duration: '1 yr',
  location: 'Chennai, India',
  isCurrent: false,
  companyDescription: 'Enterprise software company',
  keyResponsibilities: ['Developed migration engine', 'Worked on SQL Server'],
  technicalOwnership: ['Pipeline orchestration'],
  technologies: ['React', 'TypeScript', 'Node.js'],
  quantifiedImpact: ['500+ users migrated'],
};

describe('TimelineMilestone Feature Component', () => {
  it('renders company name and roles', () => {
    render(<TimelineMilestone milestone={mockMilestone} />);
    expect(screen.getByText('AVASOFT')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText('Developed migration engine')).toBeInTheDocument();
  });

  it('expands additional details on click', () => {
    render(<TimelineMilestone milestone={mockMilestone} />);
    const card = screen.getByText('AVASOFT').closest('div');
    if (card) fireEvent.click(card);
    expect(screen.getByText('Key Technical Ownership')).toBeInTheDocument();
    expect(screen.getByText('500+ users migrated')).toBeInTheDocument();
  });
});
