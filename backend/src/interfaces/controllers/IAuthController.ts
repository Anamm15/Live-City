export interface IAuthController {
   login(email: string, password: string): Promise<void>;
   register(email: string, password: string): Promise<void>;
   logout(): Promise<void>;
   refreshToken(token: string): Promise<void>;
}