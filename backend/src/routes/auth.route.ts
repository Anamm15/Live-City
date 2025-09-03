import { Router } from "express";
import { validate } from "../middlewares/validate";
import { LoginSchema } from "../validators/auth.validator";
import { IAuthController } from "../interfaces/controllers/IAuthController";

export class AuthRoutes {
  private router: Router;
  private authController: IAuthController;

  constructor(authController: IAuthController) {
    this.router = Router();
    this.authController = authController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post(
      "/login",
      validate(LoginSchema),
      this.authController.login.bind(this.authController)
    );
    this.router.post(
      "/logout",
      this.authController.logout.bind(this.authController)
    );
    this.router.post(
      "/refresh",
      this.authController.refreshToken.bind(this.authController)
    );
  }

  public getRoutes() {
    return this.router;
  }
}
