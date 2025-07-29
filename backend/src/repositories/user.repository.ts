import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { User, GetUserResponse, CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { PrismaClient } from '../generated/prisma';

const userSelectFields = {
   id: true,
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
   points: true
};

export class UserRepository implements IUserRepository {
   private prisma: PrismaClient;

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getUsers(): Promise<GetUserResponse[]> {
      try {
         return this.prisma.users.findMany({
            select: userSelectFields
         });
      } catch (error: any) {
         throw new Error("Failed to get users: " + error.message);
      }
   }

   async getUserById(id: number): Promise<GetUserResponse | null> {
      try {
         return this.prisma.users.findUnique({
            where: { id: id },
            select: userSelectFields
         });
      } catch (error: any) {
         throw new Error("Failed to get user by ID: " + error.message);
      }
   }

   async getUserByEmail(email: string): Promise<User | null> {
      try {
         return this.prisma.users.findUnique({
            where: { email: email }
         });
      } catch (error: any) {
         throw new Error(`Failed to get user by email: ${error.message}`);
      }
   }
   
   async createUser(userData: CreateUserDto): Promise<User> {
      try {
         return this.prisma.users.create({
            data: userData
         });
      } catch (error: any) {
         throw new Error(`Failed to create user: ${error.message}`);
      }
   }
   
   async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
      try {
         return this.prisma.users.update({
            where: { id: id },
            data: userData
         });
      } catch (error: any) {
         throw new Error(`Failed to update user with ID ${id}: ${error.message}`);
      }
   }

   async updateRefreshToken(id: number, refreshToken: string | null): Promise<void> {
      try {
         await this.prisma.users.update({
            where: { id: id },
            data: { refreshToken: refreshToken }
         });
      } catch (error: any) {
         throw new Error(`Failed to update refresh token for user with ID ${id}: ${error.message}`);
      }
   }

   async deleteUser(id: number): Promise<void> {
      try {
         await this.prisma.users.delete({
            where: { id: id }
         });
      } catch (error: any) {
         throw new Error(`Failed to delete user with ID ${id}: ${error.message}`);
      }
   }
}