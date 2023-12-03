import type { NextFunction, Request, Response } from "express";

import { Controller } from "../controllers";

type User = {
  id: number;
  ege: number;
  name: string;
  email: string;
  username: string;
  password: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthRequest = Request & {
  user?: User;
};

export class AuthMiddleware extends Controller {
  run(req: AuthRequest, res: Response, next: NextFunction) {
    const userHead = req.headers["user"] as string | undefined;
    if (!userHead) return this.error({}, res, { message: "Unauthorized", req, status: 401 });

    const user = JSON.parse(userHead) as User;
    req.user = user;

    next();
  }
}
