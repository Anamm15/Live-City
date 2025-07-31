import { CreateUserRequest, GetUserResponse, UpdateUserRequest } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { hashPassword } from "../utils/encode";

export class UserService implements IUserService {
   private userRepository: IUserRepository;

   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository;
   }

   async getUsers(): Promise<GetUserResponse[]> {
      try {
         return this.userRepository.getUsers();
      } catch (error: any) {
         throw new Error("Failed to get users: " + error.message);
      }
   }

   async getUserById(id: number): Promise<GetUserResponse | null> {
      try {
         return this.userRepository.getUserById(id);
      } catch (error: any) {
         throw new Error("Failed to get user by ID: " + error.message);
      }
   }

   async createUser(userData: CreateUserRequest): Promise<GetUserResponse> {
      try {
         userData.password = await hashPassword(userData.password);
         return this.userRepository.createUser(userData);
      } catch (error: any) {
         throw new Error("Failed to create user: " + error.message);
      }
   }

   async updateUser(id: number, userData: UpdateUserRequest): Promise<GetUserResponse> {
      try {
         return this.userRepository.updateUser(id, userData);
      } catch (error: any) {
         throw new Error("Failed to update user: " + error.message);
      }
   }

   async deleteUser(id: number): Promise<void> {
      try {
         await this.userRepository.deleteUser(id);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
}