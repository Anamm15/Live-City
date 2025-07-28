import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { JWTPayload } from '../types/jwt';

export class JWTService {
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: "1h" });
  }

  static verifyToken(token: string): JWTPayload {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return decoded as JWTPayload;
  }
}
