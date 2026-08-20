import { ContactMessagePayloadDto, ContactSubmissionResultDto } from '../dto/ContactMessage.dto';

export interface ContactMessagePayloadBo {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactValidationErrorsBo {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactSubmissionResultBo {
  readonly success: boolean;
  readonly message: string;
  readonly submittedAt: string;
}

export class ContactMessageMapper {
  public static toPayloadDto(bo: ContactMessagePayloadBo): ContactMessagePayloadDto {
    return {
      name: bo.name,
      email: bo.email,
      subject: bo.subject,
      message: bo.message,
    };
  }

  public static toResultBo(dto: ContactSubmissionResultDto): ContactSubmissionResultBo {
    return {
      success: dto.success,
      message: dto.message,
      submittedAt: dto.submittedAt,
    };
  }
}
