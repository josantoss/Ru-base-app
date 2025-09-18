export interface JwtPayload {
    sub: string; // User ID
    username: string;
    role: string;
    exp: number; // Expiration
}

export interface User {
    id: string;
    username: string;
    role: string;
    email?: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';
