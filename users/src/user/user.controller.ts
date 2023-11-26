import { Request, Response } from "express";

import { Controller } from "../shared/controllers";
import { ICreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  findById(req: Request, res: Response) {
    return this.success(req.params.id, res);
  }

  create(req: Request, res: Response) {
    const userCreated = this.userService.create(req.body as ICreateUserDto);
    return this.success(userCreated, res, { req });
  }

  update(req: Request, res: Response) {
    return res.status(200).send("OK");
  }

  delete(req: Request, res: Response) {
    return res.status(200).send("OK");
  }
}
