import type { User } from "../../types";
import { getApiUrl } from "../../utils/apiConfig";

export interface AuthRepository {
  login(
    orgIpc: string,
    indIpc: string,
    password: string
  ): Promise<{ token: string; user: User }>;
  register(
    username: string,
    password: string,
    email?: string
  ): Promise<{ token: string; user: User }>;
  getRoles(): Promise<string[]>;
}

export interface LoginRequest {
  orgIpc: string;
  indIpc: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
    email?: string;
  };
}

export interface RoleResponse {
  id: string;
  name: string;
  normalizedName: string;
}

// Real API implementation using manager's endpoints
export class ApiAuthRepository implements AuthRepository {
  async login(
    orgIpc: string,
    indIpc: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    try {
      const response = await fetch(getApiUrl('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgIpc,
          indIpc,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Login failed: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      
      return {
        token: data.token,
        user: {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role,
          email: data.user.email
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async register(
    _username: string,
    _password: string,
    _email?: string
  ): Promise<{ token: string; user: User }> {
    // API doesn't have a register endpoint, so we'll throw an error
    throw new Error("Registration not supported by API. Please contact administrator.");
  }

  async getRoles(): Promise<string[]> {
    try {
      const response = await fetch(getApiUrl('roles'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch roles: ${response.status}`);
      }

      const roles: RoleResponse[] = await response.json();
      return roles.map(role => role.name);
    } catch (error) {
      console.error('Get roles error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch roles');
    }
  }
}

// Mock implementation for demo (replace with API calls in production).
export class MockAuthRepository implements AuthRepository {
  async login(
    orgIpc: string,
    indIpc: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    // For demo purposes, accept any credentials
    if (orgIpc && indIpc && password) {
      // Create a proper JWT token with role information
      const payload = {
        sub: "123",
        username: `${orgIpc}-${indIpc}`,
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour from now
      };
      
      // Simple base64 encoding for demo (in production, use proper JWT library)
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payloadEncoded = btoa(JSON.stringify(payload));
      const signature = btoa("mock-signature");
      const mockToken = `${header}.${payloadEncoded}.${signature}`;
      
      const mockUser: User = { 
        id: "123", 
        username: `${orgIpc}-${indIpc}`,
        role: "admin",
        email: "test@example.com"
      };
      return { token: mockToken, user: mockUser };
    }
    throw new Error("Invalid credentials");
  }

  async getRoles(): Promise<string[]> {
    // Mock roles for demo
    return ['admin', 'user', 'moderator'];
  }

  async register(
    username: string,
    _password: string,
    email?: string
  ): Promise<{ token: string; user: User }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 150));

    // Accept any credentials for demo and assign a default 'user' role
    const payload = {
      sub: cryptoRandomId(),
      username,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadEncoded = btoa(JSON.stringify(payload));
    const signature = btoa("mock-signature");
    const mockToken = `${header}.${payloadEncoded}.${signature}`;

    const mockUser: User = {
      id: payload.sub,
      username,
      role: "user",
      email,
    };

    return { token: mockToken, user: mockUser };
  }
}

// Lightweight random id generator for demo
function cryptoRandomId(): string {
  try {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}
