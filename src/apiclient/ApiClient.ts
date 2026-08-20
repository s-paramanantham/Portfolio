import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { config } from '../config/Config';
import { Logger } from '../helpers/Logger';
import { ApiClientInterface, ApiRequestConfig, ApiResponse } from './ApiClient.interface';

class ApiClientImpl implements ApiClientInterface {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeoutMs,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (reqConfig: InternalAxiosRequestConfig) => {
        const correlationId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        reqConfig.headers.set('X-Correlation-ID', correlationId);
        Logger.debug(`[HTTP Request] ${reqConfig.method?.toUpperCase()} ${reqConfig.url}`, {
          correlationId,
          params: reqConfig.params as Record<string, unknown> | undefined,
        });
        return reqConfig;
      },
      (error: AxiosError) => {
        Logger.error('[HTTP Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        Logger.debug(`[HTTP Response] ${response.status} ${response.config.url}`, {
          status: response.status,
        });
        return response;
      },
      (error: AxiosError) => {
        const status = error.response?.status;
        const message = error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
          ? String((error.response.data as { message: unknown }).message)
          : error.message || 'Network request failed';

        Logger.error(`[HTTP Response Error] ${status || 'Network'} - ${message}`, error, {
          url: error.config?.url,
          status,
        });

        return Promise.reject(new Error(message));
      }
    );
  }

  public async get<T>(url: string, requestConfig?: ApiRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T> | T>(url, {
      headers: requestConfig?.headers,
      params: requestConfig?.params,
      timeout: requestConfig?.timeout,
    });
    return this.extractData<T>(response.data);
  }

  public async post<T>(url: string, data?: unknown, requestConfig?: ApiRequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T> | T>(url, data, {
      headers: requestConfig?.headers,
      params: requestConfig?.params,
      timeout: requestConfig?.timeout,
    });
    return this.extractData<T>(response.data);
  }

  public async put<T>(url: string, data?: unknown, requestConfig?: ApiRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T> | T>(url, data, {
      headers: requestConfig?.headers,
      params: requestConfig?.params,
      timeout: requestConfig?.timeout,
    });
    return this.extractData<T>(response.data);
  }

  public async delete<T>(url: string, requestConfig?: ApiRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T> | T>(url, {
      headers: requestConfig?.headers,
      params: requestConfig?.params,
      timeout: requestConfig?.timeout,
    });
    return this.extractData<T>(response.data);
  }

  private extractData<T>(payload: ApiResponse<T> | T): T {
    if (
      payload &&
      typeof payload === 'object' &&
      'success' in payload &&
      'data' in payload &&
      (payload as ApiResponse<T>).success === true
    ) {
      return (payload as ApiResponse<T>).data;
    }
    return payload as T;
  }
}

export const ApiClient: ApiClientInterface = new ApiClientImpl();
