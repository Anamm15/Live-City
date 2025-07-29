import { Request, Response, NextFunction } from 'express';
import { buildResponseError } from '../utils/response';

const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).send(buildResponseError('Forbidden: You do not have permission to access this resource', 'Role not authorized'));
    }

    next();
  };
};


export default authorizeRoles;