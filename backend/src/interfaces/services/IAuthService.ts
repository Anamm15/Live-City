import { LoginResponse } from "../../dto/auth.dto";

export interface IAuthService {
  login(email: string, password: string): Promise<LoginResponse>;
  logout(id: number): Promise<void>;
  refreshToken(refreshToken: string): Promise<string>;
}
