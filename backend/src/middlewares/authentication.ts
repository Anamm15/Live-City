import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../utils/jwt';
import { buildResponseError } from '../utils/response';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send(buildResponseError('Unauthorized: Token not found', 'Token is missing or malformed'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JWTService.verifyToken(token);
    req.user = {
      id: parseInt(payload.id, 10),
      role: payload.role,
    };
    next();
  } catch (error) {
    return res.status(401).send(buildResponseError('Unauthorized: Invalid token', 'Token verification failed'));
  }
};

export default authMiddleware;
