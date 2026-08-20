export interface ApiRequestConfig {
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, string | number | boolean>;
  readonly timeout?: number;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T;
  readonly message?: string;
  readonly errors?: string[];
  readonly timestamp: string;
}

export interface ApiClientInterface {
  get<T>(url: string, config?: ApiRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T>;
  delete<T>(url: string, config?: ApiRequestConfig): Promise<T>;
}
