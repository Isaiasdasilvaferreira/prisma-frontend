import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, UserData } from '../services/api';

interface UserProfile {
  source?: string;
  objective?: string;
  services?: string[];
  workType?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompleted: boolean;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>, onboardingCompleted?: boolean) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getOnboardingState = () => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          const parsedUser = JSON.parse(storedUser);
          setUser({
            id: parsedUser.id,
            name: parsedUser.name || '',
            email: parsedUser.email,
            onboardingCompleted: getOnboardingState(),
            profile: {}
          });
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.error) {
      throw new Error(response.error);
    }
    if (response.data) {
      const userData = {
        id: response.data.id,
        name: response.data.name || '',
        email: response.data.email,
        onboardingCompleted: getOnboardingState(),
        profile: {}
      };
      setUser(userData);
      
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.signup(email, password, { name });
    if (response.error) {
      throw new Error(response.error);
    }
    if (response.data) {
      const userData = {
        id: response.data.id,
        name: response.data.name || name,
        email: response.data.email,
        onboardingCompleted: false,
        profile: {}
      };
      setUser(userData);
      
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (profile: Partial<UserProfile>, onboardingCompleted?: boolean) => {
    if (!user) return;
    
    try {
      const onboardingDone = onboardingCompleted === true;
      if (onboardingDone) {
        localStorage.setItem('onboardingCompleted', 'true');
      }

      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          profile: {
            ...prev.profile,
            ...profile
          } as UserProfile,
          onboardingCompleted: onboardingDone || prev.onboardingCompleted
        };
      });

      await api.put<UserData>('/user/profile', profile);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token,
        loading, 
        login, 
        register, 
        logout, 
        updateProfile,
        isAuthenticated: !!user && !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
