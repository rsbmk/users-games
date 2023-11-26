import { Request, Response } from "express";

import { Controller } from "../shared/controllers";
import { ICreateUserDto, IGetUsersDto, IUpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  async findById(req: Request<IGetUsersDto>, res: Response) {
    try {
      const user = await this.userService.find(+req.params.id);
      return this.success(user, res, { req, message: "User found" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async create(req: Request<Request["params"], unknown, ICreateUserDto>, res: Response) {
    try {
      const userCreated = await this.userService.create(req.body);
      return this.success(userCreated, res, { req, status: 201, message: "User created" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async update(req: Request<IGetUsersDto, unknown, IUpdateUserDto>, res: Response) {
    try {
      const userUpdated = await this.userService.update(+req.params.id, req.body);
      return this.success(userUpdated, res, { req, message: "User updated" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async delete(req: Request<IGetUsersDto>, res: Response) {
    try {
      const userDeleted = await this.userService.delete(+req.params.id);
      return this.success(userDeleted, res, { req, message: "User deleted" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }
}
