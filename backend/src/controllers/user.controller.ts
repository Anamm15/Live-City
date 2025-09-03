import { IUserController } from "../interfaces/controllers/IUserController";
import { Request, Response, NextFunction } from "express";
import { IUserService } from "../interfaces/services/IUserService";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateUserInput, UpdateUserInput } from "../validators/user.validator";
import { CommonMessage, UserMessage } from "../helpers/message.constants";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { StatusCode } from "../helpers/status_code.constant";

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const results = await this.userService.getUsers();
      res
        .status(StatusCode.OK)
        .send(buildResponseSuccess(results, UserMessage.USERS_RETRIEVED));
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res
          .status(StatusCode.NOT_FOUND)
          .send(buildResponseError(error.message, UserMessage.USER_NOT_FOUND));
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
      }
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new BadRequestError(CommonMessage.INVALID_PARAMS);
      }
      const userId = req.user?.id;
      if (isNaN(userId)) {
        throw new BadRequestError(CommonMessage.INVALID_PARAMS);
      }
      const user = await this.userService.getUserById(userId);
      res
        .status(StatusCode.OK)
        .send(buildResponseSuccess(user, UserMessage.USER_RETRIEVED));
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        res
          .status(StatusCode.BAD_REQUEST)
          .send(
            buildResponseError(error.message, CommonMessage.INVALID_PARAMS)
          );
      } else if (error instanceof NotFoundError) {
        res
          .status(StatusCode.NOT_FOUND)
          .send(buildResponseError(error.message, UserMessage.USER_NOT_FOUND));
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
      }
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        throw new BadRequestError(CommonMessage.INVALID_PARAMS);
      }
      const user = await this.userService.getUserById(userId);
      res
        .status(StatusCode.OK)
        .send(buildResponseSuccess(user, UserMessage.USER_RETRIEVED));
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        res
          .status(StatusCode.BAD_REQUEST)
          .send(
            buildResponseError(error.message, CommonMessage.INVALID_PARAMS)
          );
      } else if (error instanceof NotFoundError) {
        res
          .status(StatusCode.NOT_FOUND)
          .send(buildResponseError(error.message, UserMessage.USER_NOT_FOUND));
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
      }
    }
  }

  async createUser(
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newUser = await this.userService.createUser(req.body);
      res
        .status(StatusCode.CREATED)
        .send(buildResponseSuccess(newUser, UserMessage.USER_CREATED));
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send(
          buildResponseError(error.message, UserMessage.USER_CREATE_FAILED)
        );
    }
  }

  async updateUser(
    req: Request<{ id: string }, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        throw new BadRequestError(CommonMessage.INVALID_PARAMS);
      }
      const updatedUser = await this.userService.updateUser(userId, req.body);
      res
        .status(StatusCode.OK)
        .send(buildResponseSuccess(updatedUser, UserMessage.USER_UPDATED));
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        res
          .status(StatusCode.BAD_REQUEST)
          .send(
            buildResponseError(error.message, CommonMessage.INVALID_PARAMS)
          );
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send(
            buildResponseError(error.message, UserMessage.USER_UPDATE_FAILED)
          );
      }
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        throw new BadRequestError(CommonMessage.INVALID_PARAMS);
      }
      await this.userService.deleteUser(userId);
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        res
          .status(StatusCode.BAD_REQUEST)
          .send(
            buildResponseError(error.message, CommonMessage.INVALID_PARAMS)
          );
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .send(
            buildResponseError(error.message, UserMessage.USER_DELETE_FAILED)
          );
      }
    }
  }
}
