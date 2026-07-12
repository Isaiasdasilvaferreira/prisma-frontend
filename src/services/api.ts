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
  token?: string;
}

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: UserData;
  };
  error?: string;
}

let currentUser: UserData | null = null;
let currentToken: string | null = null;

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
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data?.success && response.data?.data?.token) {
          const token = response.data.data.token;
          localStorage.setItem('token', token);
          currentToken = token;
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          currentToken = null;
          currentUser = null;
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

  async login(email: string, password: string): Promise<ApiResponse<UserData>> {
    try {
      const response = await this.client.post<LoginResponse>('/auth/login', { email, password });
      
      if (response.data.success && response.data.data) {
        const { token, user } = response.data.data;
        currentToken = token;
        currentUser = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { data: user, token };
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
        const { token, user } = response.data.data;
        currentToken = token;
        currentUser = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { data: user, token };
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
      // Erro silencioso
    } finally {
      currentToken = null;
      currentUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getCurrentUser(): UserData | null {
    if (!currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          currentUser = JSON.parse(storedUser);
        } catch {
          currentUser = null;
        }
      }
    }
    return currentUser;
  }

  getToken(): string | null {
    if (!currentToken) {
      currentToken = localStorage.getItem('token');
    }
    return currentToken;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
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
