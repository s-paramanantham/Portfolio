import { ContactMessagePayloadBo, ContactSubmissionResultBo } from './bo/ContactMessage.bo';

export interface ContactServiceInterface {
  sendMessage(payload: ContactMessagePayloadBo): Promise<ContactSubmissionResultBo>;
}
