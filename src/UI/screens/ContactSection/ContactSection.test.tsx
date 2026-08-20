import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from './ContactSection';
import { MockContactService } from '../../../services/ContactService/MockContactService';

describe('ContactSection Screen Module', () => {
  it('renders contact section headline and direct channels', () => {
    const mockService = new MockContactService();
    render(<ContactSection contactService={mockService} />);
    expect(screen.getByText(/Have something worth building\?/i)).toBeInTheDocument();
    expect(screen.getByText('Paramanantham.S@outlook.com')).toBeInTheDocument();
    expect(screen.getByText('+91 9092079167')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
  });

  it('submits message and renders success state', async () => {
    const mockService = new MockContactService();
    render(<ContactSection contactService={mockService} />);

    fireEvent.change(screen.getByLabelText('Your Name'), {
      target: { value: 'Alex Mercer' },
    });
    fireEvent.change(screen.getByLabelText('Your Email'), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Full Stack Engineering Role' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'We would love to discuss an engineering role with you.' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument();
    });
  });
});
