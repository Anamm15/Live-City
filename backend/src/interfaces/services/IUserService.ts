import { CreateUserDto, GetUserResponse, UpdateUserDto, User } from "../../dto/user.dto";

export interface IUserService {
   getUsers(): Promise<GetUserResponse[]>;
   getUserById(userId: number): Promise<GetUserResponse | null>;
   createUser(userData: CreateUserDto): Promise<GetUserResponse>;
   updateUser(id: number, userData: UpdateUserDto): Promise<GetUserResponse>;
   deleteUser(userId: number): Promise<void>;
}