import { LoginResponse } from "../dto/auth.dto";
import { User } from "../dto/user.dto";
import { UserMessage } from "../helpers/message.constants";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IAuthService } from "../interfaces/services/IAuthService";
import { comparePasswords } from "../utils/encode";
import { NotFoundError, UnauthenticatedError } from "../utils/errors";
import { JWTService } from "../utils/jwt";

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const user: User | null = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new NotFoundError(UserMessage.USER_NOT_FOUND);
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthenticatedError(UserMessage.USER_PASSWORD_INCORRECT);
      }

      const accessToken = JWTService.generateToken(
        {
          id: user.id.toString(),
          role: user.role,
        },
        "access"
      );

      const refreshToken = JWTService.generateToken(
        {
          id: user.id.toString(),
          role: user.role,
        },
        "refresh"
      );

      const response: LoginResponse = {
        accessToken,
        refreshToken,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(id: number): Promise<void> {
    try {
      await this.userRepository.updateRefreshToken(id, null);
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const payload = JWTService.verifyToken(refreshToken, "refresh");
      if (!payload) {
        throw new Error("Invalid refresh token");
      }

      const newAccessToken = JWTService.generateToken(
        {
          id: payload.id,
          role: payload.role,
        },
        "access"
      );

      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }
}
