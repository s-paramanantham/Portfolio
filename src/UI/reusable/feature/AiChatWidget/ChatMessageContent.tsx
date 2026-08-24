import React from 'react';

export interface ChatMessageContentProps {
  readonly text: string;
}

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ text }) => {
  const lines = text.split('\n');

  // Process markdown elements like bold, italic, inline code, and links
  const renderInlineFormatted = (rawText: string): React.ReactNode[] => {
    const parts = rawText.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return (
          <em key={index} className="italic text-slate-800 dark:text-slate-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 font-mono text-[11px]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch && linkMatch[1] && linkMatch[2]) {
        const linkLabel = linkMatch[1];
        const linkUrl = linkMatch[2];
        return (
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 dark:text-cyan-400 font-semibold underline hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            {linkLabel}
          </a>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="text-xs sm:text-sm font-bold text-cyan-800 dark:text-cyan-300 pt-1 pb-0.5 border-b border-slate-200 dark:border-slate-800/80"
            >
              {renderInlineFormatted(trimmed.slice(4))}
            </h4>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="text-sm font-bold text-slate-900 dark:text-white pt-1 pb-0.5"
            >
              {renderInlineFormatted(trimmed.slice(3))}
            </h3>
          );
        }

        // Bullet Point (- or *)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
              <div className="flex-1">{renderInlineFormatted(trimmed.slice(2))}</div>
            </div>
          );
        }

        // Numbered List (e.g. "1. ")
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch && numberedMatch[1] && numberedMatch[2]) {
          const num = numberedMatch[1];
          const itemContent = numberedMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="font-mono font-bold text-[11px] text-cyan-600 dark:text-cyan-400 shrink-0 min-w-[14px]">
                {num}.
              </span>
              <div className="flex-1">{renderInlineFormatted(itemContent)}</div>
            </div>
          );
        }

        // Regular Paragraph
        return <p key={idx}>{renderInlineFormatted(line)}</p>;
      })}
    </div>
  );
};
