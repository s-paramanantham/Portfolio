import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumeSection } from './ResumeSection';

describe('ResumeSection Screen Module', () => {
  it('renders resume section title, download link and highlights', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Download Verified Engineering Resume')).toBeInTheDocument();
    expect(screen.getByText('Download Official Resume (DOCX)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /preview resume/i })).toBeInTheDocument();
    expect(screen.getByText('Backend Engineering')).toBeInTheDocument();
    expect(screen.getByText('200+ APIs')).toBeInTheDocument();
  });

  it('opens preview modal when preview button is clicked', () => {
    render(<ResumeSection />);
    const previewBtn = screen.getByRole('button', { name: /preview resume/i });
    fireEvent.click(previewBtn);
    expect(screen.getByText('Interactive Document (DOCX & PDF)')).toBeInTheDocument();
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
  });
});
