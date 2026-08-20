import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea Base Component', () => {
  it('renders textarea with label correctly', () => {
    render(<Textarea label="Your Message" placeholder="Type here..." />);
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  it('displays error message when error prop is passed', () => {
    render(<Textarea label="Message" error="Message cannot be empty" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Message cannot be empty');
  });

  it('triggers onChange handler when typed into', () => {
    const handleChange = vi.fn();
    render(<Textarea label="Message" onChange={handleChange} />);
    const textarea = screen.getByLabelText('Message');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
