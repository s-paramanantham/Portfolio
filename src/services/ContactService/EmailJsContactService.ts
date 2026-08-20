import emailjs from '@emailjs/browser';
import { ContactServiceInterface } from './ContactService.interface';
import {
  ContactMessagePayloadBo,
  ContactSubmissionResultBo,
} from './bo/ContactMessage.bo';
import { config } from '../../config/Config';
import { Logger } from '../../helpers/Logger';

export class EmailJsContactService implements ContactServiceInterface {
  constructor(
    private readonly serviceId: string = config.emailjs.serviceId,
    private readonly templateId: string = config.emailjs.templateId,
    private readonly publicKey: string = config.emailjs.publicKey
  ) {}

  public async sendMessage(
    payload: ContactMessagePayloadBo
  ): Promise<ContactSubmissionResultBo> {
    if (!this.serviceId || !this.templateId || !this.publicKey) {
      Logger.warn(
        'EmailJS keys are not configured. Operating in local development simulated mode.'
      );
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: `Thank you, ${payload.name}! Your message regarding "${payload.subject}" has been received. (Simulated dev mode: configure VITE_EMAILJS_* keys in .env for live transmission).`,
        submittedAt: new Date().toISOString(),
      };
    }

    try {
      const templateParams = {
        name: payload.name,
        from_name: payload.name,
        email: payload.email,
        reply_to: payload.email,
        subject: payload.subject,
        message: payload.message,
        content: payload.message,
        to_name: 'Paramanantham S',
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams,
        this.publicKey
      );

      Logger.info('EmailJS message transmitted successfully', {
        status: response.status,
        text: response.text,
      });

      return {
        success: true,
        message: `Thank you, ${payload.name}! Your message regarding "${payload.subject}" has been sent successfully. I will get back to you shortly.`,
        submittedAt: new Date().toISOString(),
      };
    } catch (error: unknown) {
      Logger.error('Failed to transmit message via EmailJS', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'text' in error
          ? String((error as { text?: unknown }).text)
          : 'Failed to send message via EmailJS.';
      throw new Error(errorMessage);
    }
  }
}
