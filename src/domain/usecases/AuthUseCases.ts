import type { User } from "../../types";
import type { AuthRepository } from "../../data/repositories/AuthRepository";

interface LoginResult {
  token: string;
  user: User;
}

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {} // Explicit typing for exactOptionalPropertyTypes

  async execute(username: string, password: string): Promise<LoginResult> {
    const { token, user } = await this.authRepository.login(username, password);
    return { token, user };
  }
}

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(username: string, password: string, email?: string): Promise<LoginResult> {
    const { token, user } = await this.authRepository.register(username, password, email);
    return { token, user };
  }
}