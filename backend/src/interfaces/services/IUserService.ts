import { CreateUserRequest, GetUserResponse, UpdateUserRequest } from "../../dto/user.dto";

export interface IUserService {
   getUsers(): Promise<GetUserResponse[]>;
   getUserById(userId: number): Promise<GetUserResponse>;
   createUser(userData: CreateUserRequest): Promise<GetUserResponse>;
   updateUser(id: number, userData: UpdateUserRequest): Promise<GetUserResponse>;
   deleteUser(userId: number): Promise<void>;
}