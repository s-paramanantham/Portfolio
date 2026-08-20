export class Formatters {
  /**
   * Format numbers to compact strings (e.g. 100000 -> 100K)
   */
  public static formatCompactNumber(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return value.toString();
  }

  /**
   * Format byte sizes to human-readable strings
   */
  public static formatDataSize(bytesInGb: number): string {
    if (bytesInGb >= 1024) {
      return `${(bytesInGb / 1024).toFixed(1).replace(/\.0$/, '')}TB`;
    }
    return `${bytesInGb}GB`;
  }

  /**
   * Sanitize text input to prevent XSS injection
   */
  public static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .slice(0, 2000);
  }

  /**
   * Validate email using RFC standard regex
   */
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }
}
