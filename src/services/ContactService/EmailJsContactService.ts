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
      const nameWithEmail = `${payload.name} (${payload.email})`;

      const templateParams: Record<string, string> = {
        // Combined Name & Email (formatted as "Your Name (your.email@domain.com)")
        name: nameWithEmail,
        from_name: nameWithEmail,
        sender_name: nameWithEmail,
        user_name: nameWithEmail,
        contact_name: nameWithEmail,
        sender: nameWithEmail,

        // Standalone clean name aliases
        clean_name: payload.name,
        original_name: payload.name,

        // Sender Email aliases (fixes missing sender email in template)
        email: payload.email,
        from_email: payload.email,
        sender_email: payload.email,
        user_email: payload.email,
        contact_email: payload.email,
        from_mail: payload.email,
        reply_to: payload.email,

        // Subject aliases
        subject: payload.subject,
        user_subject: payload.subject,
        title: payload.subject,

        // Message content aliases
        message: payload.message,
        content: payload.message,
        user_message: payload.message,
        body: payload.message,

        // Recipient details
        to_name: 'Paramanantham S',
        to_email: config.social.email,

        // Timestamp
        submitted_at: new Date().toISOString(),
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
      throw new Error(errorMessage, { cause: error });
    }
  }
}
