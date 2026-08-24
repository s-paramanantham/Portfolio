import { config } from '../config/Config';
import { PortfolioServiceInterface } from './PortfolioService/PortfolioService.interface';
import { PortfolioApiService } from './PortfolioService/PortfolioApiService';
import { MockPortfolioService } from './PortfolioService/MockPortfolioService';
import { ContactServiceInterface } from './ContactService/ContactService.interface';
import { MockContactService } from './ContactService/MockContactService';
import { EmailJsContactService } from './ContactService/EmailJsContactService';

import { ThemeServiceInterface } from './ThemeService/ThemeService.interface';
import { ThemeService } from './ThemeService/ThemeService';
import { AiChatServiceInterface } from './AiChatService/AiChatService.interface';
import { AiChatService } from './AiChatService/AiChatService';

export class ServiceFactory {
  private static portfolioServiceInstance: PortfolioServiceInterface | null = null;
  private static contactServiceInstance: ContactServiceInterface | null = null;
  private static themeServiceInstance: ThemeServiceInterface | null = null;
  private static aiChatServiceInstance: AiChatServiceInterface | null = null;

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

  public static getThemeService(): ThemeServiceInterface {
    if (!this.themeServiceInstance) {
      this.themeServiceInstance = ThemeService.getInstance();
    }
    return this.themeServiceInstance;
  }

  public static getAiChatService(): AiChatServiceInterface {
    if (!this.aiChatServiceInstance) {
      this.aiChatServiceInstance = AiChatService.getInstance();
    }
    return this.aiChatServiceInstance;
  }

  public static reset(): void {
    this.portfolioServiceInstance = null;
    this.contactServiceInstance = null;
    this.themeServiceInstance = null;
    this.aiChatServiceInstance = null;
    ThemeService.reset();
    AiChatService.reset();
  }
}
