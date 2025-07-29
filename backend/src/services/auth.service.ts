import { User } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IAuthService } from "../interfaces/services/IAuthService";
import { comparePasswords } from "../utils/encode";
import { JWTService } from "../utils/jwt";

export class AuthService implements IAuthService {
   private userRepository: IUserRepository;

   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository;
   }

   async login(email: string, password: string): Promise<string> {
      try {
         const user: User | null = await this.userRepository.getUserByEmail(email);
         if (!user) {
            throw new Error("User not found");
         }
         
         const isPasswordValid = await comparePasswords(password, user.password);
         if (!isPasswordValid) {
           throw new Error("Invalid password");
         }

         const token = JWTService.generateToken({
            id: user.id.toString(),
            role: user.role,
         });
         return token;
      } catch (error: any) {
         throw new Error("Login failed: " + error.message);
      }
   }

   async logout(id: number): Promise<void> {
      try {
         await this.userRepository.updateRefreshToken(id, null);
      } catch (error: any) {
         throw new Error("Logout failed: " + error.message);
      }
   }

   async refreshToken(id: number, token: string): Promise<void> {
      try {
         await this.userRepository.updateRefreshToken(id, token);
      } catch (error: any) {
         throw new Error("Failed to refresh token: " + error.message);
      }
   }
}