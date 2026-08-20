import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Base Component', () => {
  it('renders input with label correctly', () => {
    render(<Input label="Your Name" placeholder="Enter your name" />);
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('displays error message when error prop is passed', () => {
    render(<Input label="Email" error="Invalid email address" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email address');
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('triggers onChange handler when typed into', () => {
    const handleChange = vi.fn();
    render(<Input label="Subject" onChange={handleChange} />);
    const input = screen.getByLabelText('Subject');
    fireEvent.change(input, { target: { value: 'New Message' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
