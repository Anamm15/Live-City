import {
  CreateUserRequest,
  UserResponse,
  UpdateUserRequest,
} from "../dto/user.dto";
import { PrismaClient } from "../generated/prisma";
import { UserMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { hashPassword } from "../utils/encode";
import { NotFoundError } from "../utils/errors";

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private fileRepository: IFileRepository;
  private prisma: PrismaClient;

  constructor(
    userRepository: IUserRepository,
    fileRepository: IFileRepository,
    prisma: PrismaClient
  ) {
    this.userRepository = userRepository;
    this.fileRepository = fileRepository;
    this.prisma = prisma;
  }

  async getUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.userRepository.getUsers();
      if (users.length === 0) {
        throw new NotFoundError(UserMessage.USER_NOT_FOUND);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<UserResponse> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new NotFoundError(UserMessage.USER_NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    try {
      const hashedPassword = await hashPassword(userData.password);
      const userToCreate = {
        ...userData,
        password: hashedPassword,
      };
      const createdUser = await this.userRepository.createUser(userToCreate);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    userData: UpdateUserRequest
  ): Promise<UserResponse> {
    try {
      return this.userRepository.updateUser(id, userData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
