import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://prisma-backend-z37q.onrender.com/api';

export interface UserData {
  id: string;
  email: string;
  role?: string;
  name?: string;
  user_metadata?: {
    name?: string;
    [key: string]: any;
  };
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
    user: {
      id: string;
      email: string;
      role?: string;
      user_metadata?: {
        name?: string;
        [key: string]: any;
      };
    };
  };
  error?: string;
}

export interface CreateUserOpportunityRequest {
  title: string;
  company: string;
  contract_type: string;
  modality: string;
  location: string | null;
  salary: string | null;
  available_registration: number;
  whatsapp: string | null;
  email: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
}

export interface UpdateUserOpportunityRequest {
  title?: string;
  company?: string;
  contract_type?: string;
  modality?: string;
  location?: string | null;
  salary?: string | null;
  available_registration?: number;
  whatsapp?: string | null;
  email?: string;
  description?: string;
  responsibilities?: string | null;
  requirements?: string | null;
  is_active?: boolean;
}

export interface UserOpportunityResponse {
  id: string;
  title: string;
  company: string;
  contract_type: string;
  modality: string;
  location: string | null;
  salary: string | null;
  available_registration: number | null;
  remaining_vacancies: number | null;
  applicant_ids: string[];
  whatsapp: string | null;
  email: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class Api {
  private client: AxiosInstance;
  private currentToken: string | null = null;

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
        const token = localStorage.getItem('auth_token');
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
          localStorage.setItem('auth_token', response.data.data.token);
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
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

  setToken(token: string | null): void {
    this.currentToken = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.currentToken || localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async login(email: string, password: string): Promise<ApiResponse<UserData>> {
    try {
      const response = await this.client.post<LoginResponse>('/auth/login', { email, password });
      
      if (response.data.success && response.data.data) {
        const { token, user } = response.data.data;
        localStorage.setItem('auth_token', token);
        this.currentToken = token;
        
        const userData: UserData = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.user_metadata?.name || '',
          user_metadata: user.user_metadata
        };
        
        return { data: userData, token };
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
        localStorage.setItem('auth_token', token);
        this.currentToken = token;
        
        const userData: UserData = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.user_metadata?.name || metadata?.name || '',
          user_metadata: user.user_metadata
        };
        
        return { data: userData, token };
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
    } finally {
      localStorage.removeItem('auth_token');
      this.currentToken = null;
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

  async createUserOpportunity(data: CreateUserOpportunityRequest): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.post<UserOpportunityResponse>('/user-opportunities', data);
  }

  async getUserOpportunities(isActive?: boolean): Promise<ApiResponse<UserOpportunityResponse[]>> {
    const query = isActive !== undefined ? `?is_active=${isActive}` : '';
    return this.get<UserOpportunityResponse[]>(`/user-opportunities${query}`);
  }

  async getUserOpportunity(id: string): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.get<UserOpportunityResponse>(`/user-opportunities/${id}`);
  }

  async updateUserOpportunity(id: string, data: UpdateUserOpportunityRequest): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.put<UserOpportunityResponse>(`/user-opportunities/${id}`, data);
  }

  async deleteUserOpportunity(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/user-opportunities/${id}`);
  }

  async approveUserOpportunity(id: string): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.patch<UserOpportunityResponse>(`/user-opportunities/${id}/approve`);
  }

  async rejectUserOpportunity(id: string): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.patch<UserOpportunityResponse>(`/user-opportunities/${id}/reject`);
  }

  async applyToOpportunity(id: string): Promise<ApiResponse<UserOpportunityResponse>> {
    return this.post<UserOpportunityResponse>(`/user-opportunities/${id}/apply`);
  }

  async getUserApplications(): Promise<ApiResponse<UserOpportunityResponse[]>> {
    return this.get<UserOpportunityResponse[]>('/user-applications');
  }

  private async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, body);
  }
}

export const api = new Api();
export type { ApiResponse };
