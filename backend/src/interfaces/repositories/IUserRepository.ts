import { User, GetUserResponse, CreateUserRequest, UpdateUserRequest } from "../../dto/user.dto";

export interface IUserRepository {
   getUsers(): Promise<GetUserResponse[]>;
   getUserById(id: number): Promise<GetUserResponse | null>;
   getUserByEmail(email: string): Promise<User | null>;
   createUser(userData: CreateUserRequest): Promise<GetUserResponse>;
   updateUser(id: number, userData: UpdateUserRequest): Promise<GetUserResponse>;
   updateRefreshToken(id: number, refreshToken: string | null): Promise<void>;
   deleteUser(id: number): Promise<void>;
}