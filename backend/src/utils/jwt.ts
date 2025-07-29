import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

interface JWTPayload {
  id: string;
  role: string;
  iat?: number;   
  exp?: number;   
}

export class JWTService {
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: "1h" });
  }

  static verifyToken(token: string): JWTPayload {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return decoded as JWTPayload;
  }
}
