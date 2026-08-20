export interface ApiConfig {
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly retryAttempts: number;
}

export interface AppConfig {
  readonly appName: string;
  readonly version: string;
  readonly environment: 'development' | 'staging' | 'production' | 'test';
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
  readonly useMockService: boolean;
}

export interface SocialLinksConfig {
  readonly email: string;
  readonly alternativeEmail: string;
  readonly phone: string;
  readonly location: string;
  readonly linkedin: string;
  readonly github: string;
}

export interface EmailJsConfig {
  readonly serviceId: string;
  readonly templateId: string;
  readonly publicKey: string;
  readonly isConfigured: boolean;
}

export interface Config {
  readonly app: AppConfig;
  readonly api: ApiConfig;
  readonly social: SocialLinksConfig;
  readonly emailjs: EmailJsConfig;
}

export const config: Config = {
  app: {
    appName: 'Paramanantham S — Technical Portfolio & Digital Experience Platform',
    version: '1.0.0',
    environment: (import.meta.env.MODE as 'development' | 'staging' | 'production' | 'test') || 'development',
    logLevel: import.meta.env.DEV ? 'debug' : 'error',
    useMockService: import.meta.env.VITE_USE_MOCK_SERVICE === 'false' ? false : true,
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.paramanantham.dev/v1',
    timeoutMs: 10000,
    retryAttempts: 3,
  },
  social: {
    email: 'Paramanantham.S@outlook.com',
    alternativeEmail: 'spananth1205@gmail.com',
    phone: '+91 9092079167',
    location: 'Chennai, Tamil Nadu, India',
    linkedin: 'https://www.linkedin.com/in/s-paramanantham',
    github: 'https://github.com/s-paramanantham',
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    isConfigured: Boolean(
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ),
  },
};
