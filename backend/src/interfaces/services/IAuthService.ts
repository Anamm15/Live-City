

export interface IAuthService {
   login(email: string, password: string): Promise<string>;
   logout(id: number): Promise<void>;
   refreshToken(id: number, token: string): Promise<void>;
}