import type { User } from "../../types";
import type { AuthRepository } from "../../data/repositories/Authrepository";

interface LoginResult {
  token: string;
  user: User;
}

export class LoginUseCase {
  private authRepository: AuthRepository;
  
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(orgIpc: string, indIpc: string, password: string): Promise<LoginResult> {
    const { token, user } = await this.authRepository.login(orgIpc, indIpc, password);
    return { token, user };
  }
}

export class RegisterUseCase {
  private authRepository: AuthRepository;
  
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(username: string, password: string, email?: string): Promise<LoginResult> {
    const { token, user } = await this.authRepository.register(username, password, email);
    return { token, user };
  }
}