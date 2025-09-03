import {
  CreateUserRequest,
  UserResponse,
  UpdateUserRequest,
} from "../../dto/user.dto";

export interface IUserService {
  getUsers(): Promise<UserResponse[]>;
  getUserById(userId: number): Promise<UserResponse>;
  createUser(userData: CreateUserRequest): Promise<UserResponse>;
  updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse>;
  deleteUser(userId: number): Promise<void>;
}
