import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { mockUser } from '../mock/data';
import { saveUserToNeon, fetchUserFromNeon } from '../lib/neon';

export interface UserSession {
  user: User;
  token: string;
  createdAt: number;
  expiresAt: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, name?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AUTH_STORAGE_KEY = 'nova_auth_session_v1';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days persistence

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load persisted session on initial mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const cachedRaw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (cachedRaw) {
          const session: UserSession = JSON.parse(cachedRaw);
          // Check session token validity & expiration
          if (session && session.token && session.expiresAt > Date.now() && session.user) {
            setUser(session.user);
            setToken(session.token);

            // Background optional sync with Neon DB if email exists
            if (session.user.email) {
              fetchUserFromNeon(session.user.email).then((dbUser) => {
                if (dbUser) {
                  const updatedUser = { ...session.user, ...dbUser };
                  setUser(updatedUser);
                  persistSession(updatedUser, session.token);
                }
              }).catch(() => {
                // Ignore background DB sync errors
              });
            }
          } else {
            // Expired session -> clear
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.warn('[AuthProvider] Failed to restore auth session:', err);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const persistSession = (currentUser: User, sessionToken: string) => {
    const session: UserSession = {
      user: currentUser,
      token: sessionToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('[AuthProvider] Could not persist session to localStorage', e);
    }
  };

  const login = async (email: string, _password?: string, name?: string) => {
    setIsLoading(true);
    try {
      // Simulate real auth handshake delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      const sanitizedEmail = email.trim().toLowerCase();
      const displayName = name || (sanitizedEmail.split('@')[0] ? sanitizedEmail.split('@')[0].replace('.', ' ') : 'NOVA Learner');

      // Check if user exists in mock or neon DB
      const existingDbUser = await fetchUserFromNeon(sanitizedEmail);

      const authenticatedUser: User = {
        id: existingDbUser?.id || `usr_${Date.now()}`,
        name: existingDbUser?.name || displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: sanitizedEmail,
        avatarUrl: existingDbUser?.avatarUrl || mockUser.avatarUrl,
        role: 'student',
        xp: existingDbUser?.xp ?? 1420,
        level: existingDbUser?.level ?? 4,
        streak: existingDbUser?.streak ?? 12,
        enrolledCourses: ['c_101', 'c_102', 'c_103'],
      };

      const generatedToken = `nova_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // Save user to Neon DB if available
      await saveUserToNeon(authenticatedUser);

      setUser(authenticatedUser);
      setToken(generatedToken);
      persistSession(authenticatedUser, generatedToken);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password?: string, name?: string) => {
    return login(email, password, name);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('[AuthProvider] Error clearing auth storage on logout', e);
    }
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    if (token) {
      persistSession(updated, token);
    }
    saveUserToNeon(updated).catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
