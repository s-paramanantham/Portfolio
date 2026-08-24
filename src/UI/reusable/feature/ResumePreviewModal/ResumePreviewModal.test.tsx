import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumePreviewModal } from './ResumePreviewModal';

describe('ResumePreviewModal Feature Component', () => {
  it('renders modal content when isOpen is true', () => {
    const handleClose = vi.fn();
    render(<ResumePreviewModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText('Official PDF Document')).toBeInTheDocument();
    expect(screen.getByText('Structured Executive Summary')).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
    expect(screen.getByTitle('Paramanantham Official Resume PDF')).toBeInTheDocument();
  });

  it('switches to Structured Executive Summary tab when clicked', () => {
    const handleClose = vi.fn();
    render(<ResumePreviewModal isOpen={true} onClose={handleClose} />);

    const summaryTab = screen.getByRole('button', { name: /structured executive summary/i });
    fireEvent.click(summaryTab);

    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    const { container } = render(<ResumePreviewModal isOpen={false} onClose={handleClose} />);
    expect(container.firstChild).toBeNull();
  });
});
