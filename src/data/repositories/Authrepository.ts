import type { User } from "../../types";

export interface AuthRepository {
  login(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }>;
  register(
    username: string,
    password: string,
    email?: string
  ): Promise<{ token: string; user: User }>;
}

// Mock implementation for demo (replace with API calls in production).
export class MockAuthRepository implements AuthRepository {
  async login(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    if (username === "test" && password === "test") {
      // Create a proper JWT token with role information
      const payload = {
        sub: "123",
        username: "test",
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
        username: "test",
        role: "admin",
        email: "test@example.com"
      };
      return { token: mockToken, user: mockUser };
    }
    throw new Error("Invalid credentials");
  }

  async register(
    username: string,
    password: string,
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
