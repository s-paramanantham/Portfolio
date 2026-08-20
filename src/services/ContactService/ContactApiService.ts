import { ContactServiceInterface } from './ContactService.interface';
import {
  ContactMessagePayloadBo,
  ContactSubmissionResultBo,
  ContactMessageMapper,
} from './bo/ContactMessage.bo';
import { ContactSubmissionResultDto } from './dto/ContactMessage.dto';
import { ApiClientInterface } from '../../apiclient/ApiClient.interface';
import { ApiClient } from '../../apiclient/ApiClient';
import { Logger } from '../../helpers/Logger';

export class ContactApiService implements ContactServiceInterface {
  constructor(private readonly apiClient: ApiClientInterface = ApiClient) {}

  public async sendMessage(
    payload: ContactMessagePayloadBo
  ): Promise<ContactSubmissionResultBo> {
    try {
      const dtoPayload = ContactMessageMapper.toPayloadDto(payload);
      const resultDto = await this.apiClient.post<ContactSubmissionResultDto>(
        '/contact/send',
        dtoPayload
      );
      return ContactMessageMapper.toResultBo(resultDto);
    } catch (error: unknown) {
      Logger.error('Failed to send contact message via API', error);
      throw error;
    }
  }
}
