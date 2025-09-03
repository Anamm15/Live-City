import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import {
  User,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "../dto/user.dto";
import { PrismaClient } from "../generated/prisma";
import { AppError } from "../utils/errors";

const userSelectFields = {
  id: true,
  nationalIdentityNumber: true,
  name: true,
  email: true,
  gender: true,
  role: true,
  birthday: true,
  birthplace: true,
  religion: true,
  maritalStatus: true,
  education: true,
  job: true,
  phoneNumber: true,
  points: true,
};

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUsers(): Promise<UserResponse[]> {
    try {
      return this.prisma.users.findMany({
        select: userSelectFields,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getUserById(id: number): Promise<UserResponse | null> {
    try {
      return this.prisma.users.findUnique({
        where: { id: id },
        select: userSelectFields,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return this.prisma.users.findUnique({
        where: { email: email },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    try {
      return this.prisma.users.create({
        data,
        select: userSelectFields,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse> {
    try {
      return this.prisma.users.update({
        where: { id: id },
        data,
        select: userSelectFields,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string | null
  ): Promise<void> {
    try {
      await this.prisma.users.update({
        where: { id: id },
        data: { refreshToken: refreshToken },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.prisma.users.delete({
        where: { id: id },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
