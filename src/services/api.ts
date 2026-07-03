import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface UserData {
  id: string;
  email: string;
  role: string;
  name?: string;
}

let currentUser: UserData | null = null;

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.logout();
          if (!window.location.pathname.includes('/login') && 
              !window.location.pathname.includes('/register')) {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<T>({
        method,
        url: endpoint,
        data: body,
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message || 'Erro na requisição';
        return {
          data: null as T,
          error: errorMessage,
        };
      }
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<UserData>> {
    const response = await this.post<UserData>('/auth/login', { email, password });
    if (response.data) {
      currentUser = response.data;
    }
    return response;
  }

  async signup(email: string, password: string, metadata: any): Promise<ApiResponse<UserData>> {
    const response = await this.post<UserData>('/auth/signup', {
      email,
      password,
      metadata,
    });
    if (response.data) {
      currentUser = response.data;
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.post('/auth/logout', {});
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      currentUser = null;
      window.location.href = '/login';
    }
  }

  getCurrentUser(): UserData | null {
    return currentUser;
  }

  isAuthenticated(): boolean {
    return !!currentUser;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body);
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message || 'Erro no upload';
        return {
          data: null as T,
          error: errorMessage,
        };
      }
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async download(endpoint: string): Promise<Blob> {
    const response = await this.client.get(endpoint, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const api = new Api();
export type { ApiResponse };
