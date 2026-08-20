import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactModal } from './ContactModal';
import { MockContactService } from '../../../../services/ContactService/MockContactService';

describe('ContactModal Feature Component', () => {
  it('renders modal form when isOpen is true', () => {
    const mockService = new MockContactService();
    render(<ContactModal isOpen={true} onClose={vi.fn()} contactService={mockService} />);
    expect(screen.getByText('Send a Direct Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
  });
});
