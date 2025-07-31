import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { CommonMessage } from '../helpers/message.constants';
import { buildResponseError } from '../utils/response';

export const validate = (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorsString = result.error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; '); 
      return res.status(400).send(
        buildResponseError(errorsString, CommonMessage.INVALID_REQUEST_DATA)
      );
    }

    req.body = result.data;
    next();
  };