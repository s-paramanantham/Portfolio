import { useState, useCallback } from 'react';
import { AiChatServiceInterface } from '../../../../services/AiChatService/AiChatService.interface';
import { ChatMessageBo, ChatActionBo } from '../../../../services/AiChatService/bo/ChatMessage.bo';
import { ServiceFactory } from '../../../../services/ServiceFactory';
import { Logger } from '../../../../helpers/Logger';

export interface UseAiChatWidgetViewModelProps {
  readonly aiChatService?: AiChatServiceInterface;
}

export interface UseAiChatWidgetViewModelReturn {
  readonly isOpen: boolean;
  readonly messages: readonly ChatMessageBo[];
  readonly inputQuery: string;
  readonly isTyping: boolean;
  readonly quickPrompts: readonly string[];
  readonly toggleOpen: () => void;
  readonly closeChat: () => void;
  readonly setInputQuery: (query: string) => void;
  readonly sendMessage: (overrideText?: string) => Promise<void>;
  readonly handleActionClick: (action: ChatActionBo) => void;
  readonly clearHistory: () => void;
}

export const useAiChatWidgetViewModel = (
  props: UseAiChatWidgetViewModelProps = {}
): UseAiChatWidgetViewModelReturn => {
  const { aiChatService = ServiceFactory.getAiChatService() } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageBo[]>(() => [
    aiChatService.getInitialGreeting(),
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const quickPrompts = aiChatService.getQuickPrompts();

  const toggleOpen = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const clearHistory = useCallback((): void => {
    setMessages([aiChatService.getInitialGreeting()]);
  }, [aiChatService]);

  const sendMessage = useCallback(
    async (overrideText?: string): Promise<void> => {
      const queryToSend = (overrideText ?? inputQuery).trim();
      if (!queryToSend || isTyping) return;

      const userMsg: ChatMessageBo = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: queryToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputQuery('');
      setIsTyping(true);

      try {
        const botResponse = await aiChatService.sendMessage(queryToSend);
        setMessages((prev) => [...prev, botResponse]);
      } catch (err: unknown) {
        Logger.error('Failed to get AI Chat response', err);
        const errorMsg: ChatMessageBo = {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I encountered an error retrieving that information. Please feel free to navigate using the sections above or download Parama's resume.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [inputQuery, isTyping, aiChatService]
  );

  const handleActionClick = useCallback((action: ChatActionBo): void => {
    if (action.actionType === 'navigate') {
      if (action.target === '#genomics') {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('portfolio:switch-project-view', { detail: { view: 'genomics' } })
          );
        }
        const element = document.querySelector('#projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.classList.add('ring-2', 'ring-cyan-400', 'ring-offset-4');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-cyan-400', 'ring-offset-4');
          }, 1500);
        }
        return;
      }

      if (action.target === '#migration') {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('portfolio:switch-project-view', { detail: { view: 'migration' } })
          );
        }
        const element = document.querySelector('#projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-4');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-4');
          }, 1500);
        }
        return;
      }

      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Subtle highlight pulse for 1.5 seconds
        element.classList.add('ring-2', 'ring-cyan-400', 'ring-offset-4');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-cyan-400', 'ring-offset-4');
        }, 1500);
      }
    } else if (action.actionType === 'external') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return {
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
  };
};
