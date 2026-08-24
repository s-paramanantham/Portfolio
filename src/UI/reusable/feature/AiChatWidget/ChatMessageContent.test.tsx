import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessageContent } from './ChatMessageContent';

describe('ChatMessageContent Markdown Renderer Component', () => {
  it('renders plain text paragraphs', () => {
    render(<ChatMessageContent text="Hello world! This is a simple test." />);
    expect(screen.getByText('Hello world! This is a simple test.')).toBeInTheDocument();
  });

  it('renders bold and italic formatted tokens', () => {
    render(<ChatMessageContent text="This is **bold text** and *italic note*." />);
    const boldElem = screen.getByText('bold text');
    expect(boldElem.tagName).toBe('STRONG');

    const italicElem = screen.getByText('italic note');
    expect(italicElem.tagName).toBe('EM');
  });

  it('renders headers, bullet lists, and links properly', () => {
    const markdown = `### Key Highlights
- Bullet item one
1. Numbered item one
[Visit LinkedIn](https://linkedin.com)`;

    render(<ChatMessageContent text={markdown} />);

    expect(screen.getByText('Key Highlights')).toBeInTheDocument();
    expect(screen.getByText('Bullet item one')).toBeInTheDocument();
    expect(screen.getByText('Numbered item one')).toBeInTheDocument();

    const linkElem = screen.getByRole('link', { name: /visit linkedin/i });
    expect(linkElem).toHaveAttribute('href', 'https://linkedin.com');
  });
});
