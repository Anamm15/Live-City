import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

interface JWTPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class JWTService {
  static generateToken(payload: JWTPayload, type: string): string {
    const secret =
      type === "access" ? jwtConfig.ACCESS_KEY : jwtConfig.REFRESH_KEY;
    return jwt.sign(payload, secret, {
      expiresIn: type === "access" ? "1h" : "7d",
    });
  }

  static verifyToken(token: string, type: string): JWTPayload {
    const secret =
      type === "access" ? jwtConfig.ACCESS_KEY : jwtConfig.REFRESH_KEY;
    const decoded = jwt.verify(token, secret);
    return decoded as JWTPayload;
  }
}
