import { Request, Response } from "express";

import { AuthRequest, Controller } from "packages";

import { IGetUsersDto, IUpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  async findById(req: AuthRequest<IGetUsersDto>, res: Response) {
    if (req.user) return this.success(req.user, res, { req, message: "User found" });

    try {
      const user = await this.userService.find(+req.params.id);
      return this.success(user, res, { req, message: "User found" });
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
