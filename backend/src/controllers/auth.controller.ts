import { IAuthController } from "../interfaces/controllers/IAuthController";
import { IAuthService } from "../interfaces/services/IAuthService";
import { Request, Response, NextFunction } from 'express';
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { LoginInput } from "../validators/auth.validator";
import { UserMessage } from "../helpers/message.constants";


export class AuthController implements IAuthController {
   private authService: IAuthService;

   constructor(authService: IAuthService) {
      this.authService = authService;
   }

   async login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const token = await this.authService.login(req.body.email, req.body.password);
         res.status(200).send(buildResponseSuccess({ token }, UserMessage.USER_LOGIN_SUCCESSFUL));
      } catch (error: any) {
         res.status(401).send(buildResponseError(error.message, UserMessage.USER_LOGIN_FAILED));
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
         res.status(200).send(buildResponseSuccess(null, UserMessage.USER_REFRESH_TOKEN_SUCCESSFUL));
      } catch (error: any) {
         res.status(401).send(buildResponseError(error.message, UserMessage.USER_REFRESH_TOKEN_FAILED));
      }
   }
}