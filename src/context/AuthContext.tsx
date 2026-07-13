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
  updateProfile: (profile: Partial<UserProfile>, onboardingCompleted?: boolean) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!api.isAuthenticated()) {
          setLoading(false);
          return;
        }

        const response = await api.get<any>('/auth/me');
        
        if (response && response.data) {
          const userData = response.data;
          const name = userData.name || '';
          
          setUser({
            id: userData.id,
            name: name,
            email: userData.email,
            onboardingCompleted: false,
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
      const userData = response.data;
      const name = userData.name || '';
      setUser({
        id: userData.id,
        name: name,
        email: userData.email,
        onboardingCompleted: false,
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
      const userData = response.data;
      const userName = userData.name || name || '';
      setUser({
        id: userData.id,
        name: userName,
        email: userData.email,
        onboardingCompleted: false,
        profile: {}
      });
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
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
