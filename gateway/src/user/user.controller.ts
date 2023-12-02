import { Request, Response } from "express";

import { Controller } from "../shared/controllers";
import { ISignInUserDto, ISignUpUserDto } from "./user.dto";
import { UserService } from "./user.service";

type RequestSignUp = Request<Request["params"], unknown, ISignUpUserDto>;
type RequestSignIn = Request<Request["params"], unknown, ISignInUserDto>;

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  async signup(req: RequestSignUp, res: Response) {
    try {
      const userCreated = await this.userService.signUp(req.body);
      return this.success(userCreated, res, { req, status: 201, message: "User created" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async signin(req: RequestSignIn, res: Response) {
    try {
      const userLogged = await this.userService.signIn(req.body);
      return this.success(userLogged, res, { req, status: 200, message: "User logged" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }
}
