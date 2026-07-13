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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!api.isAuthenticated()) {
          setLoading(false);
          return;
        }

        const response = await api.get<UserData>('/auth/me');
        if (response.data) {
          const name = response.data.name || response.data.user_metadata?.name || '';
          setUser({
            id: response.data.id,
            name: name,
            email: response.data.email,
            onboardingCompleted: false,
            profile: {}
          });
        }
      } catch (error) {
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
      const name = response.data.name || response.data.user_metadata?.name || '';
      const userData = {
        id: response.data.id,
        name: name,
        email: response.data.email,
        onboardingCompleted: false,
        profile: {}
      };
      setUser(userData);
      
      if (response.token) {
        setToken(response.token);
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.signup(email, password, { name });
    if (response.error) {
      throw new Error(response.error);
    }
    if (response.data) {
      const userName = response.data.name || response.data.user_metadata?.name || name || '';
      const userData = {
        id: response.data.id,
        name: userName,
        email: response.data.email,
        onboardingCompleted: false,
        profile: {}
      };
      setUser(userData);
      
      if (response.token) {
        setToken(response.token);
      }
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (profile: Partial<UserProfile>, onboardingCompleted?: boolean) => {
    if (!user) return;
    
    try {
      const onboardingDone = onboardingCompleted === true;

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
    } catch (error) {
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
