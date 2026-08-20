import { ContactServiceInterface } from './ContactService.interface';
import { ContactMessagePayloadBo, ContactSubmissionResultBo } from './bo/ContactMessage.bo';

export class MockContactService implements ContactServiceInterface {
  public async sendMessage(
    payload: ContactMessagePayloadBo
  ): Promise<ContactSubmissionResultBo> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: `Thank you, ${payload.name}! Your message regarding "${payload.subject}" has been received. I will get back to you shortly.`,
      submittedAt: new Date().toISOString(),
    };
  }
}
