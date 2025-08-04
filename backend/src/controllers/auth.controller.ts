import { IAuthController } from "../interfaces/controllers/IAuthController";
import { IAuthService } from "../interfaces/services/IAuthService";
import { Request, Response, NextFunction } from 'express';
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { LoginInput } from "../validators/auth.validator";
import { CommonMessage, UserMessage } from "../helpers/message.constants";
import { NotFoundError, UnauthenticatedError } from "../utils/errors";
import { StatusCode } from "../helpers/status_code.constant";

export class AuthController implements IAuthController {
   private authService: IAuthService;

   constructor(authService: IAuthService) {
      this.authService = authService;
   }

   async login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const data = await this.authService.login(req.body.email, req.body.password);
         res.status(StatusCode.OK).send(buildResponseSuccess(data, UserMessage.USER_LOGIN_SUCCESSFUL));
      } catch (error) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, UserMessage.USER_LOGIN_FAILED));
            return;
         }
         else if (error instanceof UnauthenticatedError) {
            res.status(StatusCode.UNAUTHORIZED).send(buildResponseError(error.message, UserMessage.USER_LOGIN_FAILED));
            return;
         }
      }
   }

   async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         await this.authService.logout(req.body.id);
         res.status(200).send(buildResponseSuccess(null, UserMessage.USER_LOGOUT_SUCCESSFUL));
      } catch (error: any) {
         res.status(401).send(buildResponseError(error.message, UserMessage.USER_LOGOUT_FAILED));
      }
   }

   async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         await this.authService.refreshToken(req.body.id, req.body.token);
         res.status(200).send(buildResponseSuccess(null, CommonMessage.TOKEN_REFRESHED));
      } catch (error: any) {
         res.status(401).send(buildResponseError(error.message, CommonMessage.TOKEN_REFRESH_FAILED));
      }
   }
}