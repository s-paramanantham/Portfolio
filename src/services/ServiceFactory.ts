import { config } from '../config/Config';
import { PortfolioServiceInterface } from './PortfolioService/PortfolioService.interface';
import { PortfolioApiService } from './PortfolioService/PortfolioApiService';
import { MockPortfolioService } from './PortfolioService/MockPortfolioService';
import { ContactServiceInterface } from './ContactService/ContactService.interface';
import { MockContactService } from './ContactService/MockContactService';
import { EmailJsContactService } from './ContactService/EmailJsContactService';

export class ServiceFactory {
  private static portfolioServiceInstance: PortfolioServiceInterface | null = null;
  private static contactServiceInstance: ContactServiceInterface | null = null;

  public static getPortfolioService(): PortfolioServiceInterface {
    if (!this.portfolioServiceInstance) {
      this.portfolioServiceInstance = config.app.useMockService
        ? new MockPortfolioService()
        : new PortfolioApiService();
    }
    return this.portfolioServiceInstance;
  }

  public static getContactService(): ContactServiceInterface {
    if (!this.contactServiceInstance) {
      if (config.emailjs.isConfigured) {
        this.contactServiceInstance = new EmailJsContactService();
      } else if (config.app.useMockService) {
        this.contactServiceInstance = new MockContactService();
      } else {
        this.contactServiceInstance = new EmailJsContactService();
      }
    }
    return this.contactServiceInstance;
  }

  public static reset(): void {
    this.portfolioServiceInstance = null;
    this.contactServiceInstance = null;
  }
}
