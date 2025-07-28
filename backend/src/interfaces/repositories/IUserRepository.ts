export interface IUserRepository {
   getUsers(): Promise<User[]>;
   getUserById(userId: string): Promise<User | null>;
   getUserByEmail(email: string): Promise<User | null>;
   createUser(email: string, password: string): Promise<User>;
   updateUser(user: User): Promise<User>;
   deleteUser(userId: string): Promise<void>;
}