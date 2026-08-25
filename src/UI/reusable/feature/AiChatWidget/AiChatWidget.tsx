import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useAiChatWidgetViewModel, UseAiChatWidgetViewModelProps } from './AiChatWidget.vm';
import { Button } from '../../base/Button/Button';
import { ChatMessageContent } from './ChatMessageContent';

export interface AiChatWidgetProps extends UseAiChatWidgetViewModelProps {
  readonly className?: string;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ aiChatService, className = '' }) => {
  const {
    isOpen,
    messages,
    inputQuery,
    isTyping,
    quickPrompts,
    toggleOpen,
    closeChat,
    setInputQuery,
    sendMessage,
    handleActionClick,
    clearHistory,
  } = useAiChatWidgetViewModel({ aiChatService });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // Only auto-focus on desktop screens so mobile virtual keyboard does not obstruct the view
      if (typeof window !== 'undefined' && window.innerWidth >= 640) {
        inputRef.current?.focus();
      }

      // Lock background scroll on mobile devices while chat drawer is open
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }
  }, [messages, isOpen, isTyping]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <aside aria-label="AI Portfolio Assistant" className={className}>
      {/* Mobile Dark Backdrop Overlay with click-to-close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs sm:hidden animate-fadeIn"
          onClick={closeChat}
          aria-hidden="true"
        />
      )}

      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            type="button"
            onClick={toggleOpen}
            aria-label="Ask Parama AI (Genius)"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 dark:bg-slate-950/90 text-cyan-300 dark:text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 text-xs font-semibold hover:border-cyan-400 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Ask Parama AI (Genius)</span>
          </button>
        )}

        <button
          type="button"
          onClick={toggleOpen}
          aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
          title={isOpen ? 'Close AI Assistant' : 'Open Parama AI (Genius Copilot)'}
          className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border shadow-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
            isOpen
              ? 'bg-slate-800 dark:bg-slate-900 border-slate-700 text-slate-300 hover:text-white rotate-90'
              : 'bg-gradient-to-tr from-cyan-600 via-indigo-600 to-cyan-400 text-white border-cyan-400/50 shadow-cyan-500/30 hover:scale-110 active:scale-95'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              {/* Glowing Pulse Ring */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-slate-950" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Responsive Chat Panel: Centered on Mobile, Viewport-Safe Bottom-Right Docked on Desktop */}
      {isOpen && (
        <div className="fixed inset-x-3.5 inset-y-6 my-auto sm:my-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-auto sm:w-[420px] max-w-[440px] h-[min(540px,calc(100dvh-7.5rem))] max-h-[calc(100dvh-7.5rem)] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl transition-all duration-300 animate-scaleUp">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    Parama AI
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                    Genius Copilot
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Portfolio Knowledge Engine Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearHistory}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={closeChat}
                title="Close chat"
                aria-label="Close chat"
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
                    }`}
                  >
                    <ChatMessageContent text={msg.text} />

                    {/* Actionable buttons if assistant provided them */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
                        {msg.actions.map((act) => (
                          <button
                            key={act.label}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 transition-all cursor-pointer"
                          >
                            <span>{act.label}</span>
                            {act.actionType === 'external' ? (
                              <ExternalLink className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            ) : (
                              <ArrowRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    <span
                      className={`block text-[10px] font-mono mt-1 text-right ${
                        isUser ? 'text-cyan-100' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono pl-9 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 text-[11px]">Genius analyzing portfolio knowledge...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1 pl-1">
              <Zap className="w-3 h-3 text-amber-500" /> Suggestions:
            </span>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={isTyping}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800/90 hover:bg-cyan-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-300 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shrink-0 cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Parama..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            />

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputQuery.trim() || isTyping}
              className="px-3.5 py-2.5 rounded-xl shrink-0 min-h-[40px]"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </aside>
  );
};
