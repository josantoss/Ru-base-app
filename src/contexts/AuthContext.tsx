import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, JwtPayload } from "../types";
import { AuthContext } from "./AuthContextDefinition";
import { MockAuthRepository } from "../data/repositories/Authrepository";
import { LoginUseCase, RegisterUseCase } from "../domain/usecases/AuthUseCases";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (isTokenValid(storedToken)) {
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token expired, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const login = async (username: string, password: string) => {
    const authRepository = new MockAuthRepository();
    const loginUseCase = new LoginUseCase(authRepository);
    
    try {
      const { token: newToken, user: userData } = await loginUseCase.execute(username, password);
      
      // Store token and user data
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  // Google One Tap or button-based login
  const loginWithGoogle = async (credential: string) => {
    try {
      // In a real app, send credential to backend to verify and issue app JWT.
      // For demo, decode credential with jwt payload and map to a user.
      const payload = JSON.parse(atob(credential.split(".")[1])) as JwtPayload & { email?: string };
      const mockPayload: JwtPayload = {
        sub: payload.sub || "google-user",
        username: payload.email || payload.username || "google_user",
        role: "user",
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payloadEncoded = btoa(JSON.stringify(mockPayload));
      const signature = btoa("mock-signature");
      const appToken = `${header}.${payloadEncoded}.${signature}`;

      const userData: User = {
        id: mockPayload.sub,
        username: mockPayload.username,
        role: mockPayload.role,
        email: (payload as any).email,
      };

      localStorage.setItem('authToken', appToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(appToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error("Google login failed");
    }
  };

  // Generic social login using fetched profile (e.g., Google OAuth userinfo)
  const loginWithSocialProfile = async (provider: 'google' | 'linkedin', profile: { sub?: string; id?: string; email?: string; name?: string; }): Promise<void> => {
    const socialId = profile.sub || profile.id || `${provider}-user`;
    const username = profile.email || profile.name || `${provider}_user`;
    const mockPayload: JwtPayload = {
      sub: socialId,
      username,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadEncoded = btoa(JSON.stringify(mockPayload));
    const signature = btoa("mock-signature");
    const appToken = `${header}.${payloadEncoded}.${signature}`;

    const userData: User = {
      id: mockPayload.sub,
      username: mockPayload.username,
      role: mockPayload.role,
      email: profile.email,
    };

    localStorage.setItem('authToken', appToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(appToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (username: string, password: string, email?: string) => {
    // Demo: create account but DO NOT log in automatically
    const authRepository = new MockAuthRepository();
    const registerUseCase = new RegisterUseCase(authRepository);
    await registerUseCase.execute(username, password, email);
    // Intentionally skip storing token/user here to require explicit login
  };

  const value = {
    user,
    isAuthenticated,
    token,
    isLoading,
    login,
    logout,
    signup,
    login,
    loginWithGoogle,
    loginWithSocialProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, password: string, email?: string) => Promise<void>;
}
