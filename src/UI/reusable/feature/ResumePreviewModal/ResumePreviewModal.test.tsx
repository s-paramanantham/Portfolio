import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumePreviewModal } from './ResumePreviewModal';

describe('ResumePreviewModal Feature Component', () => {
  it('renders modal content when isOpen is true', () => {
    const handleClose = vi.fn();
    render(<ResumePreviewModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText('Interactive Document (DOCX & PDF)')).toBeInTheDocument();
    expect(screen.getByText('PDF Viewer')).toBeInTheDocument();
    expect(screen.getByText('Download DOCX')).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
  });

  it('switches to PDF tab when clicked', () => {
    const handleClose = vi.fn();
    render(<ResumePreviewModal isOpen={true} onClose={handleClose} />);

    const pdfTab = screen.getByRole('button', { name: /pdf viewer/i });
    fireEvent.click(pdfTab);

    expect(screen.getByText('Embedded PDF Viewer')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    const { container } = render(<ResumePreviewModal isOpen={false} onClose={handleClose} />);
    expect(container.firstChild).toBeNull();
  });
});
