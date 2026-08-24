import {
  ChatMessageDto,
  MessageSenderTypeDto,
  ChatActionTypeDto,
} from '../dto/ChatMessage.dto';

export type MessageSenderTypeBo = MessageSenderTypeDto;
export type ChatActionTypeBo = ChatActionTypeDto;

export interface ChatActionBo {
  readonly label: string;
  readonly actionType: ChatActionTypeBo;
  readonly target: string;
  readonly iconName?: string;
}

export interface ChatMessageBo {
  readonly id: string;
  readonly sender: MessageSenderTypeBo;
  readonly text: string;
  readonly timestamp: string;
  readonly actions?: readonly ChatActionBo[];
}

export class ChatMessageMapper {
  public static toBo(dto: ChatMessageDto): ChatMessageBo {
    return {
      id: dto.id,
      sender: dto.sender,
      text: dto.text,
      timestamp: dto.timestamp,
      actions: dto.actions
        ? dto.actions.map((a) => ({
            label: a.label,
            actionType: a.actionType,
            target: a.target,
            iconName: a.iconName,
          }))
        : undefined,
    };
  }

  public static toDto(bo: ChatMessageBo): ChatMessageDto {
    return {
      id: bo.id,
      sender: bo.sender,
      text: bo.text,
      timestamp: bo.timestamp,
      actions: bo.actions
        ? bo.actions.map((a) => ({
            label: a.label,
            actionType: a.actionType,
            target: a.target,
            iconName: a.iconName,
          }))
        : undefined,
    };
  }
}
