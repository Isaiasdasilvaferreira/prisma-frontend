import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://prisma-backend-z37q.onrender.com/api';

export interface UserData {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

interface LoginResponse {
  success: boolean;
  data?: {
    user: UserData;
  };
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

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
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
        const errorData = error.response?.data as any;
        const errorMessage = errorData?.error || errorData?.message || error.message || 'Erro na requisição';
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

  isAuthenticated(): boolean {
    return document.cookie.includes('token=');
  }

  async login(email: string, password: string): Promise<ApiResponse<UserData>> {
    try {
      const response = await this.client.post<LoginResponse>('/auth/login', { email, password });
      
      if (response.data.success && response.data.data) {
        return { data: response.data.data.user };
      }
      
      return { data: null, error: 'Erro ao fazer login' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as any;
        return { 
          data: null, 
          error: errorData?.error || errorData?.message || 'Erro ao fazer login' 
        };
      }
      return { data: null, error: 'Erro ao fazer login' };
    }
  }

  async signup(email: string, password: string, metadata: any): Promise<ApiResponse<UserData>> {
    try {
      const response = await this.client.post<LoginResponse>('/auth/signup', {
        email,
        password,
        metadata,
      });
      
      if (response.data.success && response.data.data) {
        return { data: response.data.data.user };
      }
      
      return { data: null, error: 'Erro ao criar conta' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as any;
        return { 
          data: null, 
          error: errorData?.error || errorData?.message || 'Erro ao criar conta' 
        };
      }
      return { data: null, error: 'Erro ao criar conta' };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout', {});
    } catch (error) {
      // silent
    }
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
