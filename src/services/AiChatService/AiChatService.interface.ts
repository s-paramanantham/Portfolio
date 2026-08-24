import { ChatMessageBo } from './bo/ChatMessage.bo';

export interface AiChatServiceInterface {
  sendMessage(userQuery: string): Promise<ChatMessageBo>;
  getInitialGreeting(): ChatMessageBo;
  getQuickPrompts(): readonly string[];
}
