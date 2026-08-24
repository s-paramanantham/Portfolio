export type MessageSenderTypeDto = 'user' | 'assistant';

export type ChatActionTypeDto = 'navigate' | 'modal' | 'external';

export interface ChatActionDto {
  readonly label: string;
  readonly actionType: ChatActionTypeDto;
  readonly target: string;
  readonly iconName?: string;
}

export interface ChatMessageDto {
  readonly id: string;
  readonly sender: MessageSenderTypeDto;
  readonly text: string;
  readonly timestamp: string;
  readonly actions?: readonly ChatActionDto[];
}
