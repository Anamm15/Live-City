import { 
   User, 
   UserResponse,
   CreateUserRequest, 
   UpdateUserRequest } from "../../dto/user.dto";

export interface IUserRepository {
   getUsers(): Promise<UserResponse[]>;
   getUserById(id: number): Promise<UserResponse | null>;
   getUserByEmail(email: string): Promise<User | null>;
   createUser(data: CreateUserRequest): Promise<UserResponse>;
   updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse>;
   updateRefreshToken(id: number, refreshToken: string | null): Promise<void>;
   deleteUser(id: number): Promise<void>;
}