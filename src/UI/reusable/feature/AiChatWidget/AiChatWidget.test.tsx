import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AiChatWidget } from './AiChatWidget';
import { AiChatService } from '../../../../services/AiChatService/AiChatService';

describe('AiChatWidget Feature Component', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  it('renders floating launcher button initially', () => {
    render(<AiChatWidget />);
    const launcher = screen.getByRole('button', { name: /open ai portfolio assistant/i });
    expect(launcher).toBeInTheDocument();
  });

  it('opens chat drawer and displays greeting when launcher is clicked', () => {
    render(<AiChatWidget />);
    const launcher = screen.getByRole('button', { name: /open ai portfolio assistant/i });
    fireEvent.click(launcher);

    expect(screen.getByText('Parama AI')).toBeInTheDocument();
    expect(screen.getByText('Genius Copilot')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ask anything about parama/i)).toBeInTheDocument();
  });

  it('sends user message and displays bot response', async () => {
    const aiChatService = new AiChatService();
    render(<AiChatWidget aiChatService={aiChatService} />);

    // Open chat
    const launcher = screen.getByRole('button', { name: /open ai portfolio assistant/i });
    fireEvent.click(launcher);

    // Type query and submit
    const input = screen.getByPlaceholderText(/ask anything about parama/i);
    fireEvent.change(input, { target: { value: 'What did you build at AVASOFT?' } });

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendBtn);

    // User message should appear
    expect(screen.getByText('What did you build at AVASOFT?')).toBeInTheDocument();

    // Assistant response should appear
    await waitFor(() => {
      expect(screen.getByText(/200\+ REST APIs/i)).toBeInTheDocument();
    });
  });

  it('triggers action navigation when action chip is clicked', () => {
    const scrollIntoViewMock = vi.fn();
    const querySelectorMock = vi.spyOn(document, 'querySelector').mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    } as unknown as Element);

    render(<AiChatWidget />);
    const launcher = screen.getByRole('button', { name: /open ai portfolio assistant/i });
    fireEvent.click(launcher);

    const actionBtn = screen.getByRole('button', { name: /explore zeb genomics/i });
    fireEvent.click(actionBtn);

    expect(querySelectorMock).toHaveBeenCalledWith('#projects');
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
