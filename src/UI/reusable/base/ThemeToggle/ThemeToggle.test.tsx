import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeService } from '../../../../services/ThemeService/ThemeService';

describe('ThemeToggle Reusable Component', () => {
  it('renders theme toggle and responds to user click', () => {
    const themeService = new ThemeService();
    render(<ThemeToggle themeService={themeService} showLabel />);

    const button = screen.getByRole('button', { name: /switch to/i });
    expect(button).toBeInTheDocument();

    const initialLabel = button.getAttribute('aria-label');
    fireEvent.click(button);

    const updatedLabel = button.getAttribute('aria-label');
    expect(updatedLabel).not.toEqual(initialLabel);
  });
});
