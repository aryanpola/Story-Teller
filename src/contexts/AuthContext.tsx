import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../services/storageService';

interface User {
  id: string;
  email: string;
  parentName: string;
  childrenNames: string[];
  role: string;
  apiKey: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  apiKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from storage (works for both web and mobile)
    const loadUserData = async () => {
      try {
        const storedToken = await storage.get<string>('token');
        const storedApiKey = await storage.get<string>('apiKey');
        const storedUser = await storage.get<User>('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          if (storedApiKey) setApiKey(storedApiKey);
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error loading auth data', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Execute the async function
    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      
      setToken(data.token);
      setApiKey(data.apiKey);
      setUser(data.user);
      
      // Save to storage (works for both web and mobile)
      await storage.set('token', data.token);
      if (data.apiKey) await storage.set('apiKey', data.apiKey);
      await storage.set('user', data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      
      setToken(data.token);
      setApiKey(data.apiKey);
      setUser(data.user);
      
      // Save to storage (works for both web and mobile)
      await storage.set('token', data.token);
      if (data.apiKey) await storage.set('apiKey', data.apiKey);
      await storage.set('user', data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setApiKey(null);
    
    // Remove from storage (works for both web and mobile)
    await storage.remove('token');
    await storage.remove('apiKey');
    await storage.remove('user');
  };

  const value = {
    user,
    token,
    apiKey,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};