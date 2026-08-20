import { config } from '../config/Config';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private static shouldLog(level: LogLevel): boolean {
    const currentLevel = config.app.logLevel;
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
  }

  private static sanitize(data: unknown): unknown {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => Logger.sanitize(item));
    }

    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('password') ||
        lowerKey.includes('token') ||
        lowerKey.includes('secret') ||
        lowerKey.includes('authorization') ||
        lowerKey.includes('apikey')
      ) {
        sanitizedObj[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitizedObj[key] = Logger.sanitize(value);
      } else {
        sanitizedObj[key] = value;
      }
    }
    return sanitizedObj;
  }

  public static debug(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      const sanitized = context ? this.sanitize(context) : undefined;
      // Controlled debug logging
      if (sanitized) {
        console.debug(`[DEBUG] ${message}`, sanitized);
      } else {
        console.debug(`[DEBUG] ${message}`);
      }
    }
  }

  public static info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      const sanitized = context ? this.sanitize(context) : undefined;
      if (sanitized) {
        console.info(`[INFO] ${message}`, sanitized);
      } else {
        console.info(`[INFO] ${message}`);
      }
    }
  }

  public static warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      const sanitized = context ? this.sanitize(context) : undefined;
      if (sanitized) {
        console.warn(`[WARN] ${message}`, sanitized);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  public static error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      const errorMessage = error instanceof Error ? error.message : String(error ?? '');
      const sanitized = context ? this.sanitize(context) : undefined;
      console.error(`[ERROR] ${message} | Details: ${errorMessage}`, sanitized ?? '');
    }
  }
}
