import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MigrationProjectSection } from './MigrationProjectSection';

describe('MigrationProjectSection Screen Module', () => {
  it('renders section headline and pipeline stages', () => {
    render(<MigrationProjectSection />);
    expect(screen.getByText('Slack → Microsoft Teams Migration Platform')).toBeInTheDocument();
    expect(screen.getByText('Slack Workspace Ingestion')).toBeInTheDocument();
    expect(screen.getByText('Transformation & SQL Staging')).toBeInTheDocument();
    expect(screen.getByText('Teams Channel & File Ingestion')).toBeInTheDocument();
  });
});
