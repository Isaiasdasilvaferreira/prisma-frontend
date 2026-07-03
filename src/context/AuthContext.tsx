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
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await api.get<UserData>('/auth/me');
        if (response.data) {
          setUser({
            id: response.data.id,
            name: response.data.name || '',
            email: response.data.email,
            onboardingCompleted: localStorage.getItem('onboardingCompleted') === 'true',
            profile: {}
          });
        }
      } catch (error) {
        setUser(null);
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
      setUser({
        id: response.data.id,
        name: response.data.name || '',
        email: response.data.email,
        onboardingCompleted: localStorage.getItem('onboardingCompleted') === 'true',
        profile: {}
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.signup(email, password, { name });
    if (response.error) {
      throw new Error(response.error);
    }
    if (response.data) {
      setUser({
        id: response.data.id,
        name: response.data.name || name,
        email: response.data.email,
        onboardingCompleted: false,
        profile: {}
      });
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const response = await api.put<UserData>('/user/profile', profile);
      if (response.data) {
        const onboardingDone = profile.onboardingCompleted === true;
        if (onboardingDone) {
          localStorage.setItem('onboardingCompleted', 'true');
        }
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...profile
          } as UserProfile,
          onboardingCompleted: onboardingDone || user.onboardingCompleted
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout, 
        updateProfile,
        isAuthenticated: !!user 
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
